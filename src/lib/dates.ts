// Dates from the API are plain "YYYY-MM-DD" strings (Europe/Warsaw). Work with local dates only –
// `new Date("2026-10-03")` would be parsed as UTC and could shift the day.

export const pad2 = (n: number) => String(n).padStart(2, "0")

export function toISODate(date: Date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}

export function parseISODate(value: string) {
  const [y, m, d] = value.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

/** Earliest bookable day – the backend accepts visits from tomorrow on. */
export const firstBookableDate = () => toISODate(addDays(new Date(), 1))

/** "9:00" → "09:00" */
export const formatTime = (time: string) => {
  const [h, m = "00"] = time.split(":")
  return `${pad2(Number(h))}:${m.slice(0, 2)}`
}

const monthName = new Intl.DateTimeFormat("pl-PL", { month: "long" })
const weekdayDayMonth = new Intl.DateTimeFormat("pl-PL", { weekday: "long", day: "numeric", month: "long" })
const dayMonth = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long" })

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

/** "Październik 2026" – month-only format gives the nominative ("październik"), with the year it would be genitive. */
export const formatMonthYear = (year: number, month: number) => `${capitalize(monthName.format(new Date(year, month - 1, 1)))} ${year}`

/** "Czwartek, 15 października" */
export const formatLongDate = (iso: string) => capitalize(weekdayDayMonth.format(parseISODate(iso)))

/** "15 października" */
export const formatDayMonth = (iso: string) => dayMonth.format(parseISODate(iso))
