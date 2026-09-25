import { routes } from "@/lib/site"

/** `?next=` target after login – same-site paths only (no open redirect). */
export function safeNext(next: string | null | undefined, fallback = routes.booking) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : fallback
}
