"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { MonthCalendar } from "@/components/panel/month-calendar"
import { Button, ButtonArrow } from "@/components/ui/button"
import { FormAlert } from "@/components/ui/field"
import { useToast } from "@/components/ui/toast"
import { track } from "@/lib/analytics"
import { errorMessage } from "@/lib/api-errors"
import { useSession } from "@/lib/auth/use-session"
import { createVisit, getDayTerms, getMonthTerms, type Term } from "@/lib/booking"
import { firstBookableDate, formatDayMonth, formatLongDate, parseISODate } from "@/lib/dates"
import { routes } from "@/lib/site"
import { cn } from "@/lib/utils"

export type OfficeInfo = { backendLocationId: number; name: string; slug: string }

type Props = { offices: OfficeInfo[]; note?: string }

const plural = (n: number) =>
  n === 1 ? "1 wolny termin" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? `${n} wolne terminy` : `${n} wolnych terminów`

export function BookingView({ offices, note }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const toast = useToast()
  const session = useSession()

  // Selection lives in the URL (?date=&term=) so it survives the detour through /login.
  const selectedDate = params.get("date")
  const selectedTermId = params.get("term") ? Number(params.get("term")) : null
  const initial = parseISODate(selectedDate ?? firstBookableDate())
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() + 1 })
  const [office, setOffice] = useState<number | "all">("all")
  const [reloadKey, setReloadKey] = useState(0)

  // Results are stored with the key of the request that produced them; "loading" = key mismatch.
  // (State is only set in async callbacks – no synchronous setState inside effects.)
  const monthKey = `${view.year}-${String(view.month).padStart(2, "0")}|${reloadKey}`
  const [monthResult, setMonthResult] = useState<{ key: string; days: Set<string> }>({ key: "", days: new Set() })
  const days = monthResult.days
  const daysLoading = monthResult.key !== monthKey
  const dayKey = selectedDate ? `${selectedDate}|${reloadKey}` : ""
  const [dayResult, setDayResult] = useState<{ key: string; terms: Term[] | null }>({ key: "", terms: null })
  const terms = selectedDate ? dayResult.terms : null
  const termsLoading = Boolean(selectedDate) && dayResult.key !== dayKey

  const officeName = useCallback(
    (location: Term["location"]) => offices.find((o) => o.backendLocationId === location.id)?.name ?? location.name.split(",")[0],
    [offices]
  )

  const select = useCallback(
    (date: string | null, term: number | null = null) => {
      const next = new URLSearchParams()
      if (date) next.set("date", date)
      if (term) next.set("term", String(term))
      router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false })
    },
    [pathname, router]
  )

  // Days with free terms in the visible month; pick the first one when nothing (valid) is selected.
  useEffect(() => {
    let cancelled = false
    getMonthTerms(view.year, view.month)
      .then((list) => {
        if (cancelled) return
        const available = new Set(list)
        setMonthResult({ key: monthKey, days: available })
        const inView = selectedDate?.startsWith(`${view.year}-${String(view.month).padStart(2, "0")}`)
        if ((!selectedDate || !inView || !available.has(selectedDate)) && list[0]) select(list[0])
      })
      .catch((error) => {
        if (cancelled) return
        setMonthResult({ key: monthKey, days: new Set() })
        toast(errorMessage(error), "error")
      })
    return () => {
      cancelled = true
    }
    // selectedDate intentionally omitted: re-fetch only when the month (or data after booking) changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthKey])

  useEffect(() => {
    if (!selectedDate) return
    let cancelled = false
    getDayTerms(selectedDate)
      .then((list) => !cancelled && setDayResult({ key: dayKey, terms: list }))
      .catch((error) => {
        if (cancelled) return
        setDayResult({ key: dayKey, terms: [] })
        toast(errorMessage(error), "error")
      })
    return () => {
      cancelled = true
    }
  }, [selectedDate, dayKey, toast])

  // Filter chips: offices from Flotiq; without them (e.g. unpublished CMS content) fall back to the term locations.
  const officeOptions = useMemo(() => {
    if (offices.length) return offices.map((o) => ({ id: o.backendLocationId, name: o.name }))
    const seen = new Map<number, string>()
    for (const t of terms ?? []) seen.set(t.location.id, officeName(t.location))
    return [...seen].map(([id, name]) => ({ id, name }))
  }, [offices, terms, officeName])

  const visible = useMemo(() => (terms ?? []).filter((t) => office === "all" || t.location.id === office), [terms, office])
  const selectedTerm = terms?.find((t) => t.id === selectedTermId) ?? null
  const minMonth = firstBookableDate().slice(0, 7)

  const dialogRef = useRef<HTMLDialogElement>(null)
  const [booked, setBooked] = useState<Term | null>(null)

  function onBook() {
    if (!selectedTerm) return
    track("Rezerwacja – Zarezerwuj", { zalogowany: session.status === "authenticated" || session.status === "unverified" })
    if (session.status !== "authenticated" && session.status !== "unverified") {
      router.push(`${routes.login}?next=${encodeURIComponent(`${pathname}?date=${selectedTerm.date}&term=${selectedTerm.id}`)}`)
      return
    }
    setBooked(null)
    dialogRef.current?.showModal()
  }

  return (
    <div className="flex flex-col gap-9 pb-36 lg:gap-12 lg:pb-0">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-3 lg:gap-3.5">
          <span className="eyebrow">Rezerwacja</span>
          <h1 className="font-display text-[36px] leading-[1.08] font-light lg:text-[52px] lg:leading-[1.05]">
            Wybierz dogodny <em>termin</em>
          </h1>
        </div>
        {note && <p className="max-w-[380px] text-[15px] leading-relaxed text-moss-500 lg:text-right lg:text-base">{note}</p>}
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <MonthCalendar
            year={view.year}
            month={view.month}
            enabled={days}
            selected={selectedDate}
            minMonth={minMonth}
            loading={daysLoading}
            onSelect={(date) => {
              track("Rezerwacja – dzień")
              select(date)
            }}
            onMonthChange={(year, month) => setView({ year, month })}
            legend={
              <>
                <span className="inline-flex items-center gap-2">
                  <i className="size-1.5 rounded-full bg-dawn-500" />
                  wolne terminy
                </span>
                <span className="inline-flex items-center gap-2">
                  <i className="size-3.5 rounded-full bg-moss-800" />
                  wybrany dzień
                </span>
              </>
            }
          />
          {!daysLoading && days.size === 0 && (
            <p className="mt-4 text-[15px] text-moss-500">W tym miesiącu nie ma już wolnych terminów – sprawdź następny.</p>
          )}
        </div>

        <section aria-label="Wolne terminy" className="flex flex-col gap-5 lg:col-span-6 lg:col-start-7 lg:gap-6">
          <div className="flex flex-col gap-1 lg:flex-row lg:items-baseline lg:justify-between">
            <h2 className="font-display text-[26px] lg:text-[34px]">{selectedDate ? formatLongDate(selectedDate) : "Wybierz dzień"}</h2>
            {terms && <span className="text-sm text-moss-500">{visible.length ? plural(visible.length) : "brak wolnych terminów"}</span>}
          </div>

          <div role="group" aria-label="Gabinet" className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0">
            {[{ id: "all" as const, name: "Wszystkie gabinety" }, ...officeOptions].map((o) => (
              <button
                key={o.id}
                type="button"
                aria-pressed={office === o.id}
                onClick={() => setOffice(o.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap opacity-55 shadow-[inset_0_0_0_1px_var(--color-mist-300)] transition-[opacity,background-color,color] duration-400 hover:opacity-90",
                  office === o.id && "bg-moss-950 text-mist-50 opacity-100 shadow-none hover:opacity-100"
                )}
              >
                {o.name}
              </button>
            ))}
          </div>

          {/* Fixed height on desktop – switching days must not move the content below. The padding (offset by the negative
              margin) leaves room for the hover lift, which the scroll container would otherwise clip. */}
          <div className={cn("min-h-[250px] transition-opacity duration-400 lg:-m-3 lg:h-[354px] lg:overflow-y-auto lg:p-3", termsLoading && "opacity-50")}>
            {visible.length > 0 ? (
              <div className="grid animate-fade-in grid-cols-2 gap-2.5 lg:gap-3.5" key={`${selectedDate}-${office}`}>
                {visible.map((term) => {
                  const active = term.id === selectedTermId
                  return (
                    <button
                      key={term.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        if (!active) track("Rezerwacja – godzina")
                        select(term.date, active ? null : term.id)
                      }}
                      className={cn(
                        "relative flex flex-col gap-1.5 rounded-[20px] bg-white p-4.5 text-left shadow-rest transition-[box-shadow,translate] duration-500 ease-mist hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-26px_rgb(26_38_32/0.35)] lg:rounded-[22px] lg:px-6 lg:py-5.5",
                        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_0_0_1.5px_var(--color-moss-800)] after:transition-opacity after:duration-450",
                        active ? "shadow-[0_22px_44px_-26px_rgb(26_38_32/0.35)] after:opacity-100" : "after:opacity-0"
                      )}
                    >
                      <span className="font-display text-[26px] leading-none lg:text-[30px]">{term.time}</span>
                      <span className="flex items-center gap-1.5 text-[13px] text-moss-500 lg:text-sm">
                        <PinIcon />
                        {officeName(term.location)}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute top-4 right-4 grid size-[22px] place-items-center rounded-full bg-moss-800 transition-[opacity,scale] duration-450 lg:top-5 lg:right-5 lg:size-6",
                          active ? "scale-100 opacity-100" : "scale-75 opacity-0"
                        )}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12l5 5 9-10" />
                        </svg>
                      </span>
                    </button>
                  )
                })}
              </div>
            ) : (
              terms && (
                <div className="flex h-full min-h-[200px] animate-fade-in flex-col items-center justify-center gap-2 rounded-3xl p-8 text-center shadow-[inset_0_0_0_1px_var(--color-mist-200)]">
                  <span className="font-display text-[22px] text-moss-950 lg:text-2xl">Brak wolnych terminów{office !== "all" && " w tym gabinecie"}</span>
                  <span className="text-[15px] text-moss-500">Wybierz inny {office !== "all" ? "gabinet albo " : ""}dzień w kalendarzu.</span>
                </div>
              )
            )}
          </div>

          {/* Desktop summary */}
          <div className="hidden items-center justify-between gap-6 rounded-[28px] bg-mist-100 py-5.5 pr-5.5 pl-8 lg:flex">
            <Summary term={selectedTerm} officeName={officeName} />
            <Button onClick={onBook} disabled={!selectedTerm}>
              Zarezerwuj
              <ButtonArrow />
            </Button>
          </div>
        </section>
      </div>

      {/* Mobile sticky summary */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex flex-col gap-3 bg-mist-50/92 px-4 pt-3.5 pb-[max(1.75rem,env(safe-area-inset-bottom))] shadow-[0_-18px_40px_-24px_rgb(26_38_32/0.25)] backdrop-blur-[16px] lg:hidden">
        <div className="flex items-baseline justify-between px-1.5">
          <span className="text-[11px] tracking-[0.16em] text-moss-500 uppercase">Wybrany termin</span>
          <span className="font-display text-lg">{selectedTerm ? `${formatDayMonth(selectedTerm.date)}, ${selectedTerm.time}` : "wybierz godzinę"}</span>
        </div>
        <Button onClick={onBook} disabled={!selectedTerm} className="w-full justify-between">
          Zarezerwuj
          <ButtonArrow />
        </Button>
      </div>

      <ConfirmDialog
        dialogRef={dialogRef}
        term={selectedTerm ?? booked}
        booked={booked}
        officeName={officeName}
        onBooked={(term) => {
          setBooked(term)
          setReloadKey((k) => k + 1)
          select(term.date)
        }}
      />
    </div>
  )
}

function Summary({ term, officeName }: { term: Term | null; officeName: (l: Term["location"]) => string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs tracking-[0.16em] text-moss-500 uppercase">Wybrany termin</span>
      <span className="font-display text-[22px]">{term ? `${formatDayMonth(term.date)}, ${term.time} · ${officeName(term.location)}` : "Wybierz dzień i godzinę"}</span>
    </div>
  )
}

type DialogProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>
  term: Term | null
  booked: Term | null
  officeName: (l: Term["location"]) => string
  onBooked: (term: Term) => void
}

function ConfirmDialog({ dialogRef, term, booked, officeName, onBooked }: DialogProps) {
  const session = useSession()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const close = () => {
    setError("")
    dialogRef.current?.close()
  }

  const missingPhone = session.status === "authenticated" && !session.user?.phone
  const unverified = session.status === "unverified"

  async function confirm() {
    if (!term) return
    setPending(true)
    setError("")
    try {
      await createVisit(term.id)
      track("Rezerwacja – potwierdzona")
      onBooked(term)
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setPending(false)
    }
  }

  const shown = booked ?? term

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="booking-dialog-title"
      onClick={(event) => event.target === event.currentTarget && close()}
      className={cn(
        "m-0 mt-auto w-full max-w-none rounded-t-[32px] bg-mist-50 p-0 text-moss-950 shadow-[0_-30px_60px_-30px_rgb(0_0_0/0.4)] backdrop:bg-moss-950/32 backdrop:backdrop-blur-[4px]",
        "lg:m-auto lg:w-[580px] lg:rounded-[36px] lg:shadow-[0_50px_100px_-50px_rgb(0_0_0/0.5)] lg:backdrop:backdrop-blur-[6px]"
      )}
    >
      {shown && (
        <div className="flex animate-fade-in flex-col gap-6 px-5 pt-3.5 pb-8 lg:gap-7 lg:p-12">
          <span aria-hidden="true" className="h-1 w-10 self-center rounded bg-mist-300 lg:hidden" />
          {booked ? (
            <>
              <span className="grid size-15 place-items-center rounded-full bg-[#e6ebe3] lg:size-18">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-moss-800)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l5 5 9-10" />
                </svg>
              </span>
              <div className="flex flex-col gap-3">
                <h2 id="booking-dialog-title" className="font-display text-[32px] leading-[1.1] font-light lg:text-[40px]">
                  Wizyta <em>zarezerwowana</em>
                </h2>
                <p className="text-base leading-relaxed text-moss-700 lg:text-[17px]">
                  {formatLongDate(booked.date)}, godz. {booked.time} · {officeName(booked.location)}
                </p>
              </div>
              <span className="inline-flex items-center gap-2.5 self-start rounded-full bg-[#f3ead6] px-4 py-2.5 text-sm font-medium text-[#6b5a33]">
                <i className="size-2 rounded-full bg-dawn-500" />
                Oczekuje na potwierdzenie
              </span>
              <p className="text-[15px] leading-relaxed text-moss-500">Szczegóły wysłaliśmy na Twój adres e-mail. Kolejną wiadomość dostaniesz po potwierdzeniu wizyty.</p>
              <div className="flex flex-col gap-2.5 lg:flex-row-reverse lg:justify-between">
                <Button asChild className="w-full justify-between lg:w-auto">
                  <Link href={routes.myVisits}>
                    Moje wizyty
                    <ButtonArrow />
                  </Link>
                </Button>
                <Button variant="quiet" onClick={close} className="w-full lg:w-auto">
                  Zamknij
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                <span className="eyebrow max-lg:hidden">Potwierdzenie</span>
                <h2 id="booking-dialog-title" className="font-display text-[32px] leading-[1.1] font-light lg:text-[40px]">
                  Zarezerwować <em>wizytę?</em>
                </h2>
              </div>
              <dl className="flex flex-col gap-2.5">
                {[
                  ["Data", formatLongDate(shown.date)],
                  ["Godzina", shown.time],
                  ["Gabinet", `${officeName(shown.location)}, Wrocław`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 rounded-2xl bg-white px-4.5 py-4 text-[15px] lg:rounded-[18px] lg:px-6 lg:py-4.5 lg:text-base">
                    <dt className="text-moss-500">{label}</dt>
                    <dd className="text-right font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
              {missingPhone ? (
                <FormAlert tone="info">
                  Do rezerwacji potrzebny jest numer telefonu.{" "}
                  <Link href={routes.account} className="font-medium text-moss-800 underline underline-offset-4">
                    Uzupełnij go w koncie
                  </Link>
                  .
                </FormAlert>
              ) : unverified ? (
                <FormAlert tone="info">Najpierw potwierdź adres e-mail – link wysłaliśmy po rejestracji.</FormAlert>
              ) : (
                <p className="text-sm leading-relaxed text-moss-500 lg:text-[15px]">Wizyta zostanie zapisana ze statusem „oczekuje na potwierdzenie”. Możesz ją odwołać w zakładce Moje wizyty.</p>
              )}
              <FormAlert>{error}</FormAlert>
              <div className="flex flex-col gap-2.5 lg:flex-row-reverse lg:justify-between">
                <Button onClick={confirm} disabled={pending || missingPhone || unverified} className="w-full justify-between lg:w-auto">
                  {pending ? "Rezerwowanie…" : "Potwierdzam rezerwację"}
                  <ButtonArrow />
                </Button>
                <Button variant="quiet" onClick={close} className="w-full lg:w-auto">
                  Wróć
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </dialog>
  )
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}
