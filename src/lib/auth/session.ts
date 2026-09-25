"use client"

import { ApiError, request, type ApiInit } from "@/lib/api"

export type User = {
  id: number
  firstName: string | null
  lastName: string | null
  email: string
  phone: string | null
  avatar: string | null
}

export type SessionStatus = "loading" | "anonymous" | "unverified" | "authenticated"

export type Session = {
  status: SessionStatus
  user: User | null
  isAdmin: boolean
}

type TokenResponse = { access_token: string; token_type: string }

// Module-level store: survives route changes between (auth) and (app) layouts; the access token never leaves memory.
let accessToken: string | null = null
let session: Session = { status: "loading", user: null, isAdmin: false }
const listeners = new Set<() => void>()

// Non-sensitive hint that this browser had a session. The refresh cookie is httpOnly (unreadable), so public pages use
// the hint to skip the /auth/refresh round-trip for visitors who never logged in.
const HINT_KEY = "kt-has-session"

function setHint(on: boolean) {
  try {
    if (on) localStorage.setItem(HINT_KEY, "1")
    else localStorage.removeItem(HINT_KEY)
  } catch {
    // storage unavailable (private mode) – the hint is only an optimisation
  }
}

function hasHint() {
  try {
    return localStorage.getItem(HINT_KEY) === "1"
  } catch {
    return false
  }
}

function setSession(next: Session) {
  session = next
  if (next.status !== "loading") setHint(next.status !== "anonymous")
  listeners.forEach((listener) => listener())
}

export const sessionStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  get: () => session,
  // Server render: always "loading" – the real state is known only in the browser.
  getServer: (): Session => ({ status: "loading", user: null, isAdmin: false }),
}

// The backend rotates the refresh token on every refresh, so concurrent refreshes would invalidate each other.
let refreshing: Promise<string | null> | null = null

export function refreshAccessToken() {
  refreshing ??= request<TokenResponse>("/auth/refresh", { method: "POST" })
    .then((response) => (accessToken = response.access_token))
    .catch(() => (accessToken = null))
    .finally(() => (refreshing = null))
  return refreshing
}

/** Authenticated request: adds the Bearer token and retries once after refreshing it on 401. */
export async function authRequest<T>(path: string, init: ApiInit = {}): Promise<T> {
  if (!accessToken) await refreshAccessToken()
  try {
    return await request<T>(path, { ...init, token: accessToken })
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) throw error
    if (!(await refreshAccessToken())) {
      setSession({ status: "anonymous", user: null, isAdmin: false })
      throw error
    }
    return request<T>(path, { ...init, token: accessToken })
  }
}

/** Loads the current user; 403 means the account exists but the e-mail is not verified yet. */
export async function loadUser() {
  try {
    const { user, isAdmin } = await authRequest<{ user: User; isAdmin: boolean }>("/user")
    setSession({ status: "authenticated", user, isAdmin })
  } catch (error) {
    const unverified = error instanceof ApiError && error.status === 403 && Boolean(accessToken)
    setSession({ status: unverified ? "unverified" : "anonymous", user: null, isAdmin: false })
  }
  return session
}

let bootstrapped = false

/**
 * Restores the session from the refresh cookie once per page load.
 * `onlyIfKnown`: public pages skip the request when this browser never had a session (status stays "loading").
 */
export function bootstrapSession({ onlyIfKnown = false }: { onlyIfKnown?: boolean } = {}) {
  if (bootstrapped || (onlyIfKnown && !hasHint())) return
  bootstrapped = true
  refreshAccessToken().then((token) => {
    if (token) loadUser()
    else setSession({ status: "anonymous", user: null, isAdmin: false })
  })
}

export async function login(credentials: { email: string; password: string }) {
  const response = await request<TokenResponse>("/login", { method: "POST", body: credentials })
  accessToken = response.access_token
  bootstrapped = true
  return loadUser()
}

export type RegisterForm = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  password_confirmation: string
}

export async function register(form: RegisterForm) {
  const response = await request<TokenResponse>("/register", { method: "POST", body: form })
  accessToken = response.access_token
  bootstrapped = true
  return loadUser()
}

/** After the Google redirect the backend has set the refresh cookie – exchange it for an access token. */
export async function completeGoogleLogin() {
  bootstrapped = true
  const token = await refreshAccessToken()
  if (!token) {
    setSession({ status: "anonymous", user: null, isAdmin: false })
    return session
  }
  return loadUser()
}

export async function logout() {
  try {
    await authRequest("/logout", { method: "POST" })
  } finally {
    accessToken = null
    setSession({ status: "anonymous", user: null, isAdmin: false })
  }
}

export function resendVerificationEmail() {
  return authRequest<{ message: string }>("/email/resend", { method: "POST" })
}

export function sendPasswordResetLink(email: string) {
  return request<{ message: string }>("/password/email", { method: "POST", body: { email } })
}

export function resetPassword(data: { email: string; token: string; password: string; password_confirmation: string }) {
  return request<{ message: string }>("/password/reset", { method: "POST", body: data })
}
