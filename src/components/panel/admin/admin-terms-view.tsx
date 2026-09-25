"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"

import { patientName } from "@/components/panel/admin/admin-cancel-dialog"
import type { OfficeInfo } from "@/components/panel/admin/admin-visits-view"
import { MonthCalendar } from "@/components/panel/month-calendar"
import { PinIcon, StatusBadge } from "@/components/panel/visit-status"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast"
import {
  type AdminVisit,
  addTerms,
  deleteTerm,
  getAdminOverview,
  getDayVisits,
  getFreeTermDays,
  getFreeTerms,
  getLocations,
  getPastVisitDays,
  type Location,
} from "@/lib/admin"
import { errorMessage } from "@/lib/api-errors"
import type { Term } from "@/lib/booking"
import { formatLongDate, pad2, parseISODate, toISODate } from "@/lib/dates"
import { cn } from "@/lib/utils"

type Mark = "free" | "pending" | "confirmed"
type Row = { time: string; free?: Term; visit?: AdminVisit }

const HOURS = Array.from({ length: 13 }, (_, i) => 8 + i) // 08:00–20:00
const markColor: Record<Mark, string> = { free: "bg-dawn-500", pending: "bg-[#b08a3e]", confirmed: "bg-moss-600" }

const termsLabel = (n: number) =>
  n === 1 ? "1 termin" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? `${n} terminy` : `${n} terminów`

export function AdminTermsView({ offices }: { offices: OfficeInfo[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const toast = useToast()

  const today = toISODate(new Date())
  const selected = params.get("date") ?? today
  const initial = parseISODate(selected)
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() + 1 })
  const [reloadKey, setReloadKey] = useState(0)
  const reload = () => setReloadKey((k) => k + 1)

  const select = useCallback((date: string) => router.replace(`${pathname}?date=${date}`, { scroll: false }), [pathname, router])

  const officeName = useCallback(
    (location: Term["location"]) => offices.find((o) => o.backendLocationId === location.id)?.name ?? location.name.split(",")[0],
    [offices]
  )

  // Month marks: free days + future visits (overview) + past visit days (history). Keyed results – see BookingView.
  const monthKey = `${view.year}-${pad2(view.month)}|${reloadKey}`
  const [marks, setMarks] = useState<{ key: string; days: Map<string, Set<Mark>> }>({ key: "", days: new Map() })
  useEffect(() => {
    let cancelled = false
    const prefix = `${view.year}-${pad2(view.month)}`
    Promise.all([getFreeTermDays(view.year, view.month), getPastVisitDays(view.year, view.month), getAdminOverview(), getDayVisits(today)])
      .then(([free, past, overview, todays]) => {
        if (cancelled) return
        const days = new Map<string, Set<Mark>>()
        const add = (date: string, mark: Mark) => date.startsWith(prefix) && days.set(date, (days.get(date) ?? new Set()).add(mark))
        free.forEach((date) => add(date, "free"))
        past.forEach((date) => add(date, "confirmed"))
        ;[...overview.pending, ...overview.confirmed, ...todays].forEach((v) => add(v.term.date, v.status === "pending" ? "pending" : "confirmed"))
        setMarks({ key: monthKey, days })
      })
      .catch((error) => {
        if (cancelled) return
        setMarks({ key: monthKey, days: new Map() })
        toast(errorMessage(error), "error")
      })
    return () => {
      cancelled = true
    }
  }, [monthKey, view.year, view.month, today, toast])

  // Schedule of the selected day: free terms + visits.
  const dayKey = `${selected}|${reloadKey}`
  const [day, setDay] = useState<{ key: string; rows: Row[] }>({ key: "", rows: [] })
  const dayLoading = day.key !== dayKey
  useEffect(() => {
    let cancelled = false
    Promise.all([getFreeTerms(selected), getDayVisits(selected)])
      .then(([free, visits]) => {
        if (cancelled) return
        const rows: Row[] = [...free.map((term) => ({ time: term.time, free: term })), ...visits.map((visit) => ({ time: visit.term.time, visit }))]
        setDay({ key: dayKey, rows: rows.sort((a, b) => a.time.localeCompare(b.time)) })
      })
      .catch((error) => {
        if (cancelled) return
        setDay({ key: dayKey, rows: [] })
        toast(errorMessage(error), "error")
      })
    return () => {
      cancelled = true
    }
  }, [selected, dayKey, toast])

  const [locations, setLocations] = useState<Location[]>([])
  useEffect(() => {
    getLocations()
      .then(setLocations)
      .catch(() => undefined)
  }, [])

  const allDays = useMemo(() => {
    const count = new Date(view.year, view.month, 0).getDate()
    return new Set(Array.from({ length: count }, (_, i) => toISODate(new Date(view.year, view.month - 1, i + 1))))
  }, [view])

  const [deleting, setDeleting] = useState<number | null>(null)
  async function onDelete(term: Term) {
    setDeleting(term.id)
    try {
      await deleteTerm(term.id)
      toast(`Usunięto termin ${term.time}`)
      reload()
    } catch (error) {
      toast(errorMessage(error), "error")
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="flex flex-col gap-9 lg:gap-12">
      <div className="flex flex-col gap-3 lg:gap-3.5">
        <span className="eyebrow">Administrator</span>
        <h1 className="font-display text-[36px] leading-[1.08] font-light lg:text-[52px] lg:leading-[1.05]">
          Terminy i <em>grafik</em>
        </h1>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <MonthCalendar
            year={view.year}
            month={view.month}
            enabled={allDays}
            selected={selected}
            loading={marks.key !== monthKey}
            onSelect={select}
            onMonthChange={(year, month) => setView({ year, month })}
            renderMarks={(date, isSelected) => {
              const set = marks.days.get(date)
              if (!set) return null
              return (
                <span className="flex gap-[3px]">
                  {(["free", "pending", "confirmed"] as const)
                    .filter((mark) => set.has(mark))
                    .map((mark) => (
                      <i key={mark} className={cn("size-[5px] rounded-full", markColor[mark], isSelected && "ring-1 ring-white/70")} />
                    ))}
                </span>
              )
            }}
            legend={
              <>
                {(
                  [
                    ["free", "wolny"],
                    ["pending", "oczekuje"],
                    ["confirmed", "wizyta"],
                  ] as const
                ).map(([mark, label]) => (
                  <span key={mark} className="inline-flex items-center gap-2">
                    <i className={cn("size-1.5 rounded-full", markColor[mark])} />
                    {label}
                  </span>
                ))}
              </>
            }
          />
        </div>

        <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
          <section aria-label="Grafik dnia" className="flex flex-col gap-5 lg:gap-6">
            <div className="flex flex-col gap-1 lg:flex-row lg:items-baseline lg:justify-between">
              <h2 className="font-display text-[26px] lg:text-[34px]">{formatLongDate(selected)}</h2>
              {!dayLoading && <span className="text-sm text-moss-500">{day.rows.length ? `${termsLabel(day.rows.length)} w grafiku` : "brak terminów"}</span>}
            </div>
            <ul className={cn("flex min-h-[120px] flex-col gap-2 transition-opacity duration-400 lg:gap-2.5", dayLoading && "opacity-50")}>
              {day.rows.map((row) =>
                row.free ? (
                  <li key={`t${row.free.id}`} className="grid grid-cols-[64px_1fr_auto] items-center gap-4 rounded-[18px] px-5 py-3 shadow-[inset_0_0_0_1px_var(--color-mist-200)] lg:grid-cols-[72px_1fr_auto_44px] lg:px-6">
                    <span className="font-display text-[20px] tabular-nums lg:text-[22px]">{row.time}</span>
                    <span className="flex items-center gap-1.5 text-[13px] text-moss-500 lg:text-sm">
                      <PinIcon />
                      {officeName(row.free.location)}
                    </span>
                    <span className="hidden lg:block">
                      <StatusBadge visit={{ status: "pending", term: row.free }} free />
                    </span>
                    <button
                      type="button"
                      aria-label={`Usuń wolny termin ${row.time}`}
                      disabled={deleting === row.free.id}
                      onClick={() => row.free && onDelete(row.free)}
                      className="grid size-10 place-items-center rounded-full text-moss-500 transition-[background-color,color] duration-400 hover:bg-ember-50 hover:text-ember-700 disabled:opacity-40"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </li>
                ) : (
                  row.visit && (
                    <li key={`v${row.visit.id}`} className="grid grid-cols-[64px_1fr_auto] items-center gap-4 rounded-[18px] bg-white px-5 py-3.5 shadow-rest lg:grid-cols-[72px_1fr_auto_44px] lg:px-6">
                      <span className="font-display text-[20px] tabular-nums lg:text-[22px]">{row.time}</span>
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate text-[15px] font-medium lg:text-base">{patientName(row.visit.user)}</span>
                        <span className="flex items-center gap-1.5 text-[13px] text-moss-500">
                          <PinIcon />
                          {officeName(row.visit.term.location)}
                        </span>
                      </span>
                      <StatusBadge visit={row.visit} past={row.visit.term.date < today} />
                    </li>
                  )
                )
              )}
              {!dayLoading && !day.rows.length && (
                <li className="rounded-[18px] px-6 py-8 text-center text-[15px] text-moss-500 shadow-[inset_0_0_0_1px_var(--color-mist-200)]">Tego dnia nie ma terminów.</li>
              )}
            </ul>
          </section>

          {selected >= today && (
            <AddTermsPanel
              key={selected}
              date={selected}
              locations={locations}
              officeName={officeName}
              taken={new Set(day.rows.map((row) => Number(row.time.slice(0, 2))))}
              disabled={dayLoading}
              onAdded={(count) => {
                toast(`Dodano ${termsLabel(count)}`)
                reload()
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

type PanelProps = {
  date: string
  locations: Location[]
  officeName: (location: Term["location"]) => string
  taken: Set<number>
  disabled: boolean
  onAdded: (count: number) => void
}

function AddTermsPanel({ date, locations, officeName, taken, disabled, onAdded }: PanelProps) {
  const toast = useToast()
  const [location, setLocation] = useState<number | null>(null)
  const [hours, setHours] = useState<Set<number>>(new Set())
  const [pending, setPending] = useState(false)
  const locationId = location ?? locations[0]?.id ?? null
  // Today: hours that already started can't be added.
  const now = new Date()
  const minHour = date === toISODate(now) ? now.getHours() + 1 : 0
  const picked = [...hours].filter((hour) => !taken.has(hour)).sort((a, b) => a - b)

  const toggle = (hour: number) =>
    setHours((prev) => {
      const next = new Set(prev)
      if (next.has(hour)) next.delete(hour)
      else next.add(hour)
      return next
    })

  async function submit() {
    if (!locationId || !picked.length) return
    setPending(true)
    try {
      await addTerms(locationId, date, picked)
      setHours(new Set())
      onAdded(picked.length)
    } catch (error) {
      toast(errorMessage(error), "error")
    } finally {
      setPending(false)
    }
  }

  return (
    <section aria-labelledby="add-terms-title" className="flex flex-col gap-5 rounded-[28px] bg-mist-100 p-5 lg:gap-6 lg:rounded-[32px] lg:p-8">
      <h2 id="add-terms-title" className="font-display text-[22px] lg:text-[26px]">
        Dodaj terminy
      </h2>
      <div role="group" aria-label="Gabinet" className="flex flex-wrap gap-2">
        {locations.map((loc) => (
          <button
            key={loc.id}
            type="button"
            aria-pressed={locationId === loc.id}
            onClick={() => setLocation(loc.id)}
            className={cn(
              "rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap opacity-60 shadow-[inset_0_0_0_1px_var(--color-mist-300)] transition-[opacity,background-color,color] duration-400 hover:opacity-90",
              locationId === loc.id && "bg-moss-950 text-mist-50 opacity-100 shadow-none hover:opacity-100"
            )}
          >
            {officeName(loc)}
          </button>
        ))}
      </div>
      <div role="group" aria-label="Godziny" className="grid grid-cols-4 gap-2 sm:grid-cols-5 lg:grid-cols-5">
        {HOURS.map((hour) => {
          const isTaken = taken.has(hour)
          const isPast = hour < minHour
          const on = hours.has(hour) && !isTaken
          return (
            <button
              key={hour}
              type="button"
              aria-pressed={on}
              disabled={isTaken || isPast}
              onClick={() => toggle(hour)}
              className={cn(
                "h-11 rounded-2xl bg-white text-[15px] font-medium tabular-nums shadow-rest transition-[background-color,color,opacity] duration-400",
                on && "bg-moss-800 text-white",
                (isTaken || isPast) && "bg-transparent text-moss-400 shadow-none",
                isTaken && "line-through"
              )}
            >
              {pad2(hour)}:00
            </button>
          )
        })}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[15px] text-moss-500">{picked.length ? `Wybrano: ${picked.map((h) => `${pad2(h)}:00`).join(", ")}` : "Zaznacz godziny do dodania"}</span>
        <Button size="sm" onClick={submit} disabled={!picked.length || !locationId || pending || disabled}>
          {pending ? "Dodawanie…" : picked.length ? `Dodaj ${termsLabel(picked.length)}` : "Dodaj terminy"}
        </Button>
      </div>
    </section>
  )
}
