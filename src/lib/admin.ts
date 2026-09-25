"use client"

import { request } from "@/lib/api"
import { authRequest, type User } from "@/lib/auth/session"
import type { Term } from "@/lib/booking"
import { formatTime, pad2 } from "@/lib/dates"
import { type ApiVisit, startsAt, toVisit, type Visit } from "@/lib/visits"

// Admin (therapist) endpoints of healthcare-be. All of them are scoped to the logged-in therapist.

export type AdminVisit = Visit & { user: User }

// Pending count for the header badge – shared between the header and the admin pages.
let pendingCount: number | null = null
const listeners = new Set<() => void>()
export const pendingStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  get: () => pendingCount,
  getServer: () => null,
}

const toAdminVisits = (list: ApiVisit[]) => list.map(toVisit).filter((v): v is AdminVisit => Boolean(v.user))

/** Upcoming visits (from tomorrow – the backend compares the date with `now()`), split by status. */
export async function getAdminOverview() {
  const data = await authRequest<{ incoming_pending_visits: ApiVisit[]; incoming_confirmed_visits: ApiVisit[] }>("/admin-visits")
  const pending = toAdminVisits(data.incoming_pending_visits)
  pendingCount = pending.length
  listeners.forEach((listener) => listener())
  return { pending, confirmed: toAdminVisits(data.incoming_confirmed_visits) }
}

/** pending → confirmed; the backend e-mails the patient. */
export function confirmVisit(id: number) {
  return authRequest<{ message: string }>(`/update-visit/${id}`, { method: "POST" })
}

/** Rejects or cancels a visit (the patient gets an e-mail). `releaseTerm: false` also removes the term. */
export function adminCancelVisit(id: number, releaseTerm: boolean) {
  return authRequest<{ message: string }>(`/admin-delete-visit/${id}`, { method: "DELETE", body: { withTerm: !releaseTerm } })
}

/** Visits (pending + confirmed) of one day, with patients. */
export async function getDayVisits(date: string) {
  return toAdminVisits(await authRequest<ApiVisit[]>("/admin-visits", { method: "POST", body: { date } }))
}

/** Days of the month with visits up to today (history). Future visit days come from the overview. */
export function getPastVisitDays(year: number, month: number) {
  return authRequest<string[]>("/admin-month-terms", { method: "POST", body: { year, month: pad2(month) } })
}

/** Days of the month with free terms (from tomorrow). */
export function getFreeTermDays(year: number, month: number) {
  return request<string[]>("/month-terms", { method: "POST", body: { year, month: pad2(month) } })
}

/** Free terms of a day, including today (the patient-facing helper hides today). */
export async function getFreeTerms(date: string) {
  const terms = await request<Term[]>("/terms", { method: "POST", body: { date } })
  return terms.map((term) => ({ ...term, time: formatTime(term.time) }))
}

export type Location = { id: number; name: string }

export function getLocations() {
  return authRequest<Location[]>("/locations")
}

/**
 * Adds terms for the picked hours. The API takes an hour range [from, to], so consecutive hours are sent
 * as one request each (hours that already have a term are skipped by the backend).
 */
export async function addTerms(locationId: number, date: string, hours: number[]) {
  const runs: [number, number][] = []
  for (const hour of [...hours].sort((a, b) => a - b)) {
    const last = runs.at(-1)
    if (last && hour === last[1] + 1) last[1] = hour
    else runs.push([hour, hour])
  }
  for (const time of runs) {
    await authRequest("/new-terms", { method: "POST", body: { locationId, date, time } })
  }
}

/** Only free terms can be deleted. */
export function deleteTerm(id: number) {
  return authRequest<{ message: string }>(`/term/${id}`, { method: "DELETE" })
}

export const PATIENTS_LIMIT = 100

/**
 * Patients search (first or last name – the backend does not search e-mail or phone). The controller paginates
 * but returns only the items (no meta), so one page of the maximum size is fetched.
 */
export function searchPatients(q: string) {
  const params = new URLSearchParams({ limit: String(PATIENTS_LIMIT), order: "lastName" })
  if (q) params.set("q", q)
  return authRequest<User[]>(`/users?${params}`)
}

/** All visits of a patient with this therapist, newest first. */
export async function getPatientVisits(userId: number) {
  const visits = toAdminVisits(await authRequest<ApiVisit[]>(`/admin-user-visits/${userId}`))
  return visits.sort((a, b) => startsAt(b).localeCompare(startsAt(a)))
}
