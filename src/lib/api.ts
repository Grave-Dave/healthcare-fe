// Client for the Laravel API (healthcare-be).
// Auth matches the legacy app: short-lived Bearer access token + httpOnly refresh cookie (POST /auth/refresh).
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api"

export class ApiError extends Error {
  constructor(
    public status: number,
    public body: unknown
  ) {
    super(`API request failed with status ${status}`)
  }
}

type ApiInit = RequestInit & { token?: string | null }

export async function api<T>(path: string, { token, headers, ...init }: ApiInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  })

  const body = response.status === 204 ? null : await response.json().catch(() => null)
  if (!response.ok) {
    throw new ApiError(response.status, body)
  }
  return body as T
}
