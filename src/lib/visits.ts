"use client"

import { authRequest } from "@/lib/auth/session"
import type { Term } from "@/lib/booking"
import { formatTime, toISODate } from "@/lib/dates"

export type VisitStatus = "pending" | "confirmed" | "canceled"

export type Visit = { id: number; status: VisitStatus; term: Term }

type ApiVisit = { id: number; status: "0" | "1" | "2"; availableTerm: Term }
type ApiVisits = { incoming_visits: ApiVisit[]; past_visits: ApiVisit[] }

const statuses: Record<ApiVisit["status"], VisitStatus> = { "0": "pending", "1": "confirmed", "2": "canceled" }

const toVisit = (visit: ApiVisit): Visit => ({
  id: visit.id,
  status: statuses[visit.status] ?? "pending",
  term: { ...visit.availableTerm, time: formatTime(visit.availableTerm.time) },
})

const startsAt = (visit: Visit) => `${visit.term.date} ${visit.term.time}`

/**
 * The patient's visits split by the start time. The backend splits by date only (today's visits land in "past"),
 * so both lists are merged and split again here. Canceling a visit soft-deletes it – it disappears from both lists.
 */
export async function getMyVisits(now = new Date()) {
  const data = await authRequest<ApiVisits>("/user-visits")
  const all = [...data.incoming_visits, ...data.past_visits].map(toVisit)
  const nowKey = `${toISODate(now)} ${formatTime(`${now.getHours()}:${now.getMinutes()}`)}`
  const upcoming = all.filter((v) => startsAt(v) > nowKey).sort((a, b) => startsAt(a).localeCompare(startsAt(b)))
  const past = all.filter((v) => startsAt(v) <= nowKey).sort((a, b) => startsAt(b).localeCompare(startsAt(a)))
  return { upcoming, past }
}

/** The backend only cancels visits from tomorrow on (`date > now()`). */
export const canCancel = (visit: Visit, now = new Date()) => visit.status !== "canceled" && visit.term.date > toISODate(now)

/** Cancels the visit and frees the term for other patients. */
export function cancelVisit(id: number) {
  return authRequest<{ message: string }>(`/delete-visit/${id}`, { method: "DELETE" })
}
