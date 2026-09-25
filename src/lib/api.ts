// Client for the Laravel API (healthcare-be), used from the browser only (the panel stays static-export friendly).
// Auth matches the backend: short-lived Bearer access token kept in memory + httpOnly `refresh_token` cookie.
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api"

export class ApiError extends Error {
  constructor(
    public status: number,
    public body: { message?: string; error?: string; errors?: Record<string, string[]> } | null
  ) {
    super(body?.message || `API request failed with status ${status}`)
  }
}

export type ApiInit = Omit<RequestInit, "body"> & { body?: unknown; token?: string | null }

export async function request<T>(path: string, { token, headers, body, ...init }: ApiInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    // The refresh cookie is sent to /auth/refresh and set by /login, /register and /auth/refresh.
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const data = response.status === 204 ? null : await response.json().catch(() => null)
  if (!response.ok) {
    throw new ApiError(response.status, data)
  }
  return data as T
}
