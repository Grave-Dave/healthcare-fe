"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { AdminCancelDialog, patientName } from "@/components/panel/admin/admin-cancel-dialog"
import { PinIcon, StatusBadge } from "@/components/panel/visit-status"
import { Button } from "@/components/ui/button"
import { FormAlert } from "@/components/ui/field"
import { useToast } from "@/components/ui/toast"
import { type AdminVisit, confirmVisit, getAdminOverview, getDayVisits, getFreeTermDays, getPatientVisits } from "@/lib/admin"
import { errorMessage } from "@/lib/api-errors"
import { useSession } from "@/lib/auth/use-session"
import type { Term } from "@/lib/booking"
import { addDays, formatLongDate, toISODate } from "@/lib/dates"
import { cn } from "@/lib/utils"
import { startsAt } from "@/lib/visits"

export type OfficeInfo = { backendLocationId: number; name: string; slug: string }

type Data = { pending: AdminVisit[]; upcoming: AdminVisit[]; freeDays: number }

const ordinal = (n: number) => (n === 1 ? "pierwsza wizyta" : `${n}. wizyta`)

export function AdminVisitsView({ offices }: { offices: OfficeInfo[] }) {
  const toast = useToast()
  const { user } = useSession()
  const [reloadKey, setReloadKey] = useState(0)
  const [result, setResult] = useState<{ key: number; data: Data | null; error: string }>({ key: -1, data: null, error: "" })
  const loading = result.key !== reloadKey
  const data = result.data
  // "N. wizyta" per pending visit, loaded after the list (one request per patient).
  const [ordinals, setOrdinals] = useState<Record<number, number>>({})

  const today = toISODate(new Date())

  useEffect(() => {
    let cancelled = false
    const now = new Date()
    Promise.all([getAdminOverview(), getDayVisits(toISODate(now)), getFreeTermDays(now.getFullYear(), now.getMonth() + 1)])
      .then(([overview, todays, freeDays]) => {
        if (cancelled) return
        // The overview starts tomorrow – today's visits come from the day endpoint.
        const upcoming = [...todays.filter((v) => v.status === "confirmed"), ...overview.confirmed].sort((a, b) => startsAt(a).localeCompare(startsAt(b)))
        const pending = [...todays.filter((v) => v.status === "pending"), ...overview.pending].sort((a, b) => startsAt(a).localeCompare(startsAt(b)))
        setResult({ key: reloadKey, data: { pending, upcoming, freeDays: freeDays.length }, error: "" })

        const patients = [...new Set(pending.map((v) => v.user.id))]
        Promise.all(patients.map((id) => getPatientVisits(id).catch(() => [])))
          .then((histories) => {
            if (cancelled) return
            const next: Record<number, number> = {}
            for (const visit of pending) {
              const history = histories[patients.indexOf(visit.user.id)]
              const earlier = history.filter((v) => startsAt(v) < startsAt(visit)).length
              if (history.length) next[visit.id] = earlier + 1
            }
            setOrdinals(next)
          })
      })
      .catch((error) => !cancelled && setResult((prev) => ({ key: reloadKey, data: prev.data, error: errorMessage(error) })))
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const officeName = useCallback(
    (location: Term["location"]) => offices.find((o) => o.backendLocationId === location.id)?.name ?? location.name.split(",")[0],
    [offices]
  )

  const weekCount = useMemo(() => {
    const now = new Date()
    const monday = addDays(now, -((now.getDay() + 6) % 7))
    const sunday = toISODate(addDays(monday, 6))
    return [...(data?.pending ?? []), ...(data?.upcoming ?? [])].filter((v) => v.term.date >= toISODate(monday) && v.term.date <= sunday).length
  }, [data])

  const byDay = useMemo(() => {
    const groups = new Map<string, AdminVisit[]>()
    for (const visit of data?.upcoming ?? []) groups.set(visit.term.date, [...(groups.get(visit.term.date) ?? []), visit])
    return [...groups]
  }, [data])

  const [busy, setBusy] = useState<number | null>(null)
  async function onConfirm(visit: AdminVisit) {
    setBusy(visit.id)
    try {
      await confirmVisit(visit.id)
      toast("Wizyta potwierdzona – pacjent dostanie e-mail")
      setReloadKey((k) => k + 1)
    } catch (error) {
      toast(errorMessage(error), "error")
    } finally {
      setBusy(null)
    }
  }

  const dialogRef = useRef<HTMLDialogElement>(null)
  const [toCancel, setToCancel] = useState<AdminVisit | null>(null)
  const askCancel = (visit: AdminVisit) => {
    setToCancel(visit)
    dialogRef.current?.showModal()
  }

  return (
    <div className="flex flex-col gap-10 lg:gap-14">
      <div className="flex flex-col gap-3 lg:gap-3.5">
        <span className="eyebrow">{formatLongDate(today)}</span>
        <h1 className="font-display text-[36px] leading-[1.08] font-light lg:text-[52px] lg:leading-[1.05]">
          Dzień dobry{user?.firstName ? `, ${user.firstName}` : ""}
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-2.5 lg:gap-5">
        {[
          ["Do potwierdzenia", data?.pending.length],
          ["Wizyty w tym tygodniu", data ? weekCount : undefined],
          ["Dni z wolnymi terminami", data?.freeDays],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1.5 rounded-[20px] bg-white px-4 py-4 shadow-rest lg:gap-2 lg:rounded-[28px] lg:px-8 lg:py-7">
            <span className={cn("font-display text-[28px] leading-none lg:text-[34px]", value === undefined && "text-mist-300")}>{value ?? "–"}</span>
            <span className="text-[12px] leading-snug text-moss-500 lg:text-[15px]">{label}</span>
          </div>
        ))}
      </div>

      {result.error && (
        <div className="flex flex-col items-start gap-3">
          <FormAlert>{result.error}</FormAlert>
          <Button variant="quiet" size="sm" onClick={() => setReloadKey((k) => k + 1)} disabled={loading}>
            Spróbuj ponownie
          </Button>
        </div>
      )}

      <section aria-labelledby="pending-title" className="flex flex-col gap-5 lg:gap-6">
        <h2 id="pending-title" className="font-display text-[26px] lg:text-[34px]">
          Do potwierdzenia
        </h2>
        {!data ? (
          loading && <div className="h-[150px] animate-pulse rounded-[24px] bg-mist-100" />
        ) : data.pending.length ? (
          <ul className={cn("grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4", loading && "opacity-60")}>
            {data.pending.map((visit) => (
              <li key={visit.id} className="flex flex-col gap-5 rounded-[24px] bg-white p-5 shadow-rest lg:rounded-[28px] lg:p-7">
                <div className="flex items-start gap-3.5">
                  <Avatar user={visit.user} />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate font-display text-[20px] lg:text-[22px]">{patientName(visit.user)}</span>
                    <span className="text-[13px] text-moss-500 lg:text-sm">
                      {ordinals[visit.id] ? ordinal(ordinals[visit.id]) : ""}
                      {visit.user.phone && (
                        <>
                          {ordinals[visit.id] ? " · " : ""}
                          <a href={`tel:${visit.user.phone}`} className="font-medium text-moss-800 underline-offset-4 hover:underline">
                            {visit.user.phone}
                          </a>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 rounded-2xl bg-mist-50 px-4 py-3.5">
                  <span className="text-[15px] font-medium lg:text-base">
                    {formatLongDate(visit.term.date)}, {visit.term.time}
                  </span>
                  <span className="flex items-center gap-1.5 text-[13px] text-moss-500 lg:text-sm">
                    <PinIcon />
                    {officeName(visit.term.location)}
                  </span>
                </div>
                <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                  {visit.term.date > today ? (
                    <Button variant="quiet-danger" size="sm" onClick={() => askCancel(visit)}>
                      Odrzuć
                    </Button>
                  ) : (
                    <span className="text-[13px] text-moss-500">Dzisiejszej wizyty nie można odrzucić</span>
                  )}
                  <Button size="sm" onClick={() => onConfirm(visit)} disabled={busy === visit.id}>
                    {busy === visit.id ? "Potwierdzanie…" : "Potwierdź"}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-[24px] px-6 py-8 text-center text-[15px] text-moss-500 shadow-[inset_0_0_0_1px_var(--color-mist-200)] lg:text-base">Wszystkie wizyty są potwierdzone.</p>
        )}
      </section>

      <section aria-labelledby="upcoming-title" className="flex flex-col gap-5 lg:gap-6">
        <h2 id="upcoming-title" className="font-display text-[26px] lg:text-[34px]">
          Nadchodzące
        </h2>
        {data && !byDay.length && <p className="text-[15px] text-moss-500 lg:text-base">Brak potwierdzonych wizyt w najbliższym czasie.</p>}
        <div className={cn("flex flex-col gap-7", loading && "opacity-60")}>
          {byDay.map(([date, visits]) => (
            <div key={date} className="flex flex-col gap-2.5 lg:gap-3">
              <h3 className="eyebrow">{date === today ? `Dziś · ${formatLongDate(date)}` : formatLongDate(date)}</h3>
              <ul className="flex flex-col gap-2.5 lg:gap-3">
                {visits.map((visit) => (
                  <li
                    key={visit.id}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 rounded-[20px] bg-white px-5 py-4 shadow-rest lg:grid-cols-[80px_minmax(0,1.3fr)_minmax(0,1fr)_150px_90px] lg:gap-6 lg:rounded-[22px] lg:px-7 lg:py-5"
                  >
                    <span className="font-display text-[20px] tabular-nums lg:text-[22px]">{visit.term.time}</span>
                    <span className="min-w-0 truncate text-[15px] font-medium lg:text-base">{patientName(visit.user)}</span>
                    <span className="col-start-2 row-start-2 flex items-center gap-1.5 text-[13px] text-moss-500 lg:col-start-auto lg:row-start-auto lg:text-[15px]">
                      <PinIcon />
                      {officeName(visit.term.location)}
                    </span>
                    <span className="hidden lg:block">
                      <StatusBadge visit={visit} />
                    </span>
                    <span className="col-start-3 row-span-2 row-start-1 justify-self-end lg:col-start-auto lg:row-span-1 lg:row-start-auto">
                      {visit.term.date > today && (
                        <button
                          type="button"
                          onClick={() => askCancel(visit)}
                          className="text-[15px] font-medium text-ember-700 underline-offset-4 opacity-85 transition-opacity hover:underline hover:opacity-100"
                        >
                          Odwołaj
                        </button>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <AdminCancelDialog
        dialogRef={dialogRef}
        visit={toCancel}
        officeName={toCancel ? officeName(toCancel.term.location) : ""}
        onDone={(visit) => {
          toast(visit.status === "pending" ? "Wizyta odrzucona – pacjent dostanie e-mail" : "Wizyta odwołana – pacjent dostanie e-mail")
          setReloadKey((k) => k + 1)
        }}
      />
    </div>
  )
}

export function Avatar({ user, size = "md" }: { user: AdminVisit["user"]; size?: "md" | "lg" }) {
  const initials = [user.firstName, user.lastName].map((part) => part?.[0] ?? "").join("").toUpperCase()
  const box = size === "lg" ? "size-16 text-lg lg:size-20 lg:text-xl" : "size-11 text-sm lg:size-12"
  return user.avatar ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={user.avatar} alt="" referrerPolicy="no-referrer" className={cn("shrink-0 rounded-full object-cover", box)} />
  ) : (
    <span aria-hidden="true" className={cn("grid shrink-0 place-items-center rounded-full bg-[#e6ebe3] font-bold text-moss-800", box)}>
      {initials || "?"}
    </span>
  )
}
