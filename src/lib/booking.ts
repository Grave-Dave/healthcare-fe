"use client"

import { request } from "@/lib/api"
import { authRequest } from "@/lib/auth/session"
import { firstBookableDate, formatTime, pad2 } from "@/lib/dates"

export type Term = {
  id: number
  date: string
  time: string
  location: { id: number; name: string }
}

export type CreatedVisit = { id: number; status: string; availableTerm: Term }

/** Days of the month that have free terms (public endpoint; the backend already starts from tomorrow). */
export function getMonthTerms(year: number, month: number) {
  return request<string[]>("/month-terms", { method: "POST", body: { year, month: pad2(month) } })
}

/** Free terms of one day (public). Today's terms are dropped – the backend would reject them anyway. */
export async function getDayTerms(date: string) {
  if (date < firstBookableDate()) return []
  const terms = await request<Term[]>("/terms", { method: "POST", body: { date } })
  return terms.map((term) => ({ ...term, time: formatTime(term.time) }))
}

/** Books a term; the visit starts as "pending" until the therapist confirms it. */
export function createVisit(termId: number) {
  return authRequest<CreatedVisit>("/new-visit", { method: "POST", body: { availableTermId: termId } })
}
