"use client"

import Link from "next/link"
import { Tabs } from "radix-ui"
import { useCallback, useEffect, useRef, useState } from "react"

import { PinIcon, StatusBadge } from "@/components/panel/visit-status"
import { Button, ButtonArrow } from "@/components/ui/button"
import { FormAlert } from "@/components/ui/field"
import { useToast } from "@/components/ui/toast"
import { errorMessage } from "@/lib/api-errors"
import type { Term } from "@/lib/booking"
import { formatDayMonth, formatLongDate, parseISODate } from "@/lib/dates"
import { routes } from "@/lib/site"
import { cn } from "@/lib/utils"
import { cancelVisit, canCancel, getMyVisits, type Visit } from "@/lib/visits"

export type OfficeLink = { backendLocationId: number; name: string; slug: string }

type Props = { offices: OfficeLink[]; cancellationPolicy?: string }
type Visits = Awaited<ReturnType<typeof getMyVisits>>

const weekday = new Intl.DateTimeFormat("pl-PL", { weekday: "long" })
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

export function MyVisitsView({ offices, cancellationPolicy }: Props) {
  const toast = useToast()
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming")
  const [reloadKey, setReloadKey] = useState(0)
  // Keyed result (see BookingView): "loading" = the stored key differs from the current one.
  const [result, setResult] = useState<{ key: number; visits: Visits | null; error: string }>({ key: -1, visits: null, error: "" })
  const loading = result.key !== reloadKey
  const visits = result.visits

  useEffect(() => {
    let cancelled = false
    getMyVisits()
      .then((data) => !cancelled && setResult({ key: reloadKey, visits: data, error: "" }))
      .catch((error) => !cancelled && setResult((prev) => ({ key: reloadKey, visits: prev.visits, error: errorMessage(error) })))
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const office = useCallback(
    (location: Term["location"]) => {
      const match = offices.find((o) => o.backendLocationId === location.id)
      return {
        name: match?.name ?? location.name.split(",")[0],
        href: match ? `/gabinety/${match.slug}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name)}`,
      }
    },
    [offices]
  )

  const dialogRef = useRef<HTMLDialogElement>(null)
  const [toCancel, setToCancel] = useState<Visit | null>(null)
  const askCancel = (visit: Visit) => {
    setToCancel(visit)
    dialogRef.current?.showModal()
  }

  const [next, ...later] = visits?.upcoming ?? []

  return (
    <div className="flex flex-col gap-9 lg:gap-12">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-3 lg:gap-3.5">
          <span className="eyebrow">Panel</span>
          <h1 className="font-display text-[36px] leading-[1.08] font-light lg:text-[52px] lg:leading-[1.05]">
            Moje <em>wizyty</em>
          </h1>
        </div>
        <Button asChild variant="quiet" size="sm" className="self-start lg:self-auto">
          <Link href={routes.booking}>
            Umów kolejną wizytę
            <ButtonArrow />
          </Link>
        </Button>
      </div>

      <Tabs.Root value={tab} onValueChange={(value) => setTab(value as typeof tab)} className="flex flex-col gap-8 lg:gap-10">
        <Tabs.List aria-label="Wizyty" className="flex gap-7 border-b border-mist-200">
          {(
            [
              ["upcoming", "Nadchodzące", visits?.upcoming.length],
              ["past", "Zakończone", visits?.past.length],
            ] as const
          ).map(([value, label, count]) => (
            <Tabs.Trigger
              key={value}
              value={value}
              className="group relative flex items-baseline gap-2 pb-4 font-display text-[19px] opacity-38 transition-opacity duration-500 ease-mist hover:opacity-70 data-[state=active]:opacity-100 lg:pb-5 lg:text-[22px]"
            >
              {label}
              {count !== undefined && <span className="font-sans text-sm text-moss-500 tabular-nums">{count}</span>}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-moss-950 transition-transform duration-700 ease-mist group-data-[state=active]:scale-x-100"
              />
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {result.error && (
          <div className="flex flex-col items-start gap-3">
            <FormAlert>{result.error}</FormAlert>
            <Button variant="quiet" size="sm" onClick={() => setReloadKey((k) => k + 1)} disabled={loading}>
              Spróbuj ponownie
            </Button>
          </div>
        )}

        <Tabs.Content value="upcoming" className="flex animate-fade-up flex-col gap-8 lg:gap-10">
          {!visits ? (
            loading && <Skeleton />
          ) : next ? (
            <>
              <NextVisitCard visit={next} office={office(next.term.location)} onCancel={askCancel} />
              {later.length > 0 && (
                <section aria-labelledby="later-visits" className="flex flex-col gap-4 lg:gap-5">
                  <h2 id="later-visits" className="eyebrow">
                    Kolejne wizyty
                  </h2>
                  <ul className="flex flex-col gap-2.5 lg:gap-3">
                    {later.map((visit) => (
                      <VisitRow key={visit.id} visit={visit} officeName={office(visit.term.location).name} onCancel={askCancel} />
                    ))}
                  </ul>
                </section>
              )}
            </>
          ) : (
            <EmptyState title="Nie masz zaplanowanych wizyt" text="Wybierz dogodny termin w kalendarzu – rezerwacja zajmuje chwilę." />
          )}
        </Tabs.Content>

        <Tabs.Content value="past" className="flex animate-fade-up flex-col">
          {!visits ? (
            loading && <Skeleton />
          ) : visits.past.length ? (
            <ul className="flex flex-col gap-2.5 lg:gap-3">
              {visits.past.map((visit) => (
                <VisitRow key={visit.id} visit={visit} officeName={office(visit.term.location).name} past />
              ))}
            </ul>
          ) : (
            <EmptyState title="Nie masz jeszcze zakończonych wizyt" text="Tutaj pojawi się historia Twoich spotkań." />
          )}
        </Tabs.Content>
      </Tabs.Root>

      <CancelDialog
        dialogRef={dialogRef}
        visit={toCancel}
        officeName={toCancel ? office(toCancel.term.location).name : ""}
        policy={cancellationPolicy}
        onCanceled={() => {
          toast("Wizyta odwołana – termin wrócił do kalendarza")
          setReloadKey((k) => k + 1)
        }}
      />
    </div>
  )
}

type Office = { name: string; href: string }

function NextVisitCard({ visit, office, onCancel }: { visit: Visit; office: Office; onCancel: (visit: Visit) => void }) {
  const { term } = visit
  const external = office.href.startsWith("http")
  return (
    <article
      aria-label="Najbliższa wizyta"
      className="relative flex flex-col gap-7 overflow-hidden rounded-[28px] bg-white p-6 shadow-[0_30px_60px_-40px_rgb(26_38_32/0.35)] lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:rounded-[36px] lg:p-11"
    >
      <div className="flex flex-col gap-5 lg:gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-start lg:gap-5">
          <span className="eyebrow">Najbliższa wizyta</span>
          <StatusBadge visit={visit} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-display text-[40px] leading-none font-light lg:text-[48px]">{formatDayMonth(term.date)}</p>
          <p className="text-[17px] text-moss-700 lg:text-lg">
            {capitalize(weekday.format(parseISODate(term.date)))}, godz. {term.time}
          </p>
        </div>
        <p className="flex items-center gap-2 text-[15px] text-moss-500 lg:text-base">
          <PinIcon />
          {office.name}, Wrocław
        </p>
      </div>
      <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col lg:items-stretch xl:flex-row">
        <Button asChild variant="quiet" size="sm">
          <Link href={office.href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            Jak dojechać
          </Link>
        </Button>
        {canCancel(visit) ? (
          <Button variant="quiet-danger" size="sm" onClick={() => onCancel(visit)}>
            Odwołaj wizytę
          </Button>
        ) : (
          <p className="max-w-[260px] text-sm leading-relaxed text-moss-500">Wizytę w dniu terminu odwołasz tylko telefonicznie.</p>
        )}
      </div>
    </article>
  )
}

function VisitRow({ visit, officeName, past = false, onCancel }: { visit: Visit; officeName: string; past?: boolean; onCancel?: (visit: Visit) => void }) {
  const { term } = visit
  const canceled = visit.status === "canceled"
  return (
    <li
      className={cn(
        "grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 rounded-[20px] px-5 py-4.5 lg:grid-cols-[minmax(0,1.5fr)_90px_minmax(0,1fr)_minmax(0,1.1fr)_130px] lg:gap-6 lg:rounded-[22px] lg:px-7 lg:py-5",
        past ? "shadow-[inset_0_0_0_1px_var(--color-mist-200)]" : "bg-white shadow-rest"
      )}
    >
      <div className="flex flex-col gap-0.5 lg:contents">
        <span className={cn("font-display text-[20px] lg:text-[22px]", canceled && "text-moss-500 line-through decoration-1", past && !canceled && "text-moss-700")}>
          {formatLongDate(term.date)}
        </span>
        <span className="text-[15px] text-moss-500 lg:text-base lg:text-moss-950 lg:tabular-nums">
          <span className="lg:hidden">godz. </span>
          {term.time}
          <span className="lg:hidden"> · {officeName}</span>
        </span>
        <span className="hidden items-center gap-1.5 text-[15px] text-moss-500 lg:flex">
          <PinIcon />
          {officeName}
        </span>
      </div>
      <div className="row-span-2 self-start justify-self-end lg:row-span-1 lg:self-center lg:justify-self-start">
        <StatusBadge visit={visit} past={past} />
      </div>
      {!past && onCancel && canCancel(visit) && (
        <div className="lg:col-start-5 lg:justify-self-end">
          <button
            type="button"
            onClick={() => onCancel(visit)}
            className="text-[15px] font-medium text-ember-700 underline-offset-4 opacity-85 transition-opacity hover:underline hover:opacity-100"
          >
            Odwołaj
          </button>
        </div>
      )}
    </li>
  )
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[28px] px-6 py-14 text-center shadow-[inset_0_0_0_1px_var(--color-mist-200)] lg:rounded-[36px] lg:py-20">
      <span className="font-display text-[24px] lg:text-[28px]">{title}</span>
      <span className="max-w-[360px] text-[15px] leading-relaxed text-moss-500 lg:text-base">{text}</span>
      <Button asChild size="sm" className="mt-4">
        <Link href={routes.booking}>
          Zarezerwuj wizytę
          <ButtonArrow />
        </Link>
      </Button>
    </div>
  )
}

function Skeleton() {
  return (
    <div role="status" aria-label="Wczytywanie wizyt" className="flex animate-pulse flex-col gap-3">
      <div className="h-[260px] rounded-[28px] bg-mist-100 lg:h-[230px] lg:rounded-[36px]" />
      <div className="h-[76px] rounded-[20px] bg-mist-100" />
    </div>
  )
}

type DialogProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>
  visit: Visit | null
  officeName: string
  policy?: string
  onCanceled: () => void
}

function CancelDialog({ dialogRef, visit, officeName, policy, onCanceled }: DialogProps) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const close = () => {
    setError("")
    dialogRef.current?.close()
  }

  async function confirm() {
    if (!visit) return
    setPending(true)
    setError("")
    try {
      await cancelVisit(visit.id)
      close()
      onCanceled()
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setPending(false)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      role="alertdialog"
      aria-labelledby="cancel-dialog-title"
      aria-describedby="cancel-dialog-desc"
      onClick={(event) => event.target === event.currentTarget && !pending && close()}
      className={cn(
        "m-0 mt-auto w-full max-w-none rounded-t-[32px] bg-mist-50 p-0 text-moss-950 shadow-[0_-30px_60px_-30px_rgb(0_0_0/0.4)] backdrop:bg-moss-950/32 backdrop:backdrop-blur-[4px]",
        "lg:m-auto lg:w-[560px] lg:rounded-[36px] lg:shadow-[0_50px_100px_-50px_rgb(0_0_0/0.5)] lg:backdrop:backdrop-blur-[6px]"
      )}
    >
      {visit && (
        <div className="flex animate-fade-in flex-col gap-6 px-5 pt-3.5 pb-8 lg:gap-7 lg:p-12">
          <span aria-hidden="true" className="h-1 w-10 self-center rounded bg-mist-300 lg:hidden" />
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-ember-700 max-lg:hidden">Odwołanie wizyty</span>
            <h2 id="cancel-dialog-title" className="font-display text-[32px] leading-[1.1] font-light lg:text-[40px]">
              Odwołać <em>wizytę?</em>
            </h2>
          </div>
          <dl className="flex flex-col gap-2.5">
            {[
              ["Data", formatLongDate(visit.term.date)],
              ["Godzina", visit.term.time],
              ["Gabinet", `${officeName}, Wrocław`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 rounded-2xl bg-white px-4.5 py-4 text-[15px] lg:rounded-[18px] lg:px-6 lg:py-4.5 lg:text-base">
                <dt className="text-moss-500">{label}</dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <div id="cancel-dialog-desc" className="flex flex-col gap-2 text-sm leading-relaxed text-moss-500 lg:text-[15px]">
            <p>Termin zwolni się dla innych pacjentów, a gabinet dostanie powiadomienie e-mail.</p>
            {policy && <p className="whitespace-pre-line">{policy}</p>}
          </div>
          <FormAlert>{error}</FormAlert>
          <div className="flex flex-col gap-2.5 lg:flex-row-reverse lg:justify-between">
            <Button variant="danger" onClick={confirm} disabled={pending} className="w-full lg:w-auto">
              {pending ? "Odwoływanie…" : "Odwołaj wizytę"}
            </Button>
            <Button variant="quiet" onClick={close} disabled={pending} autoFocus className="w-full lg:w-auto">
              Zostaw wizytę
            </Button>
          </div>
        </div>
      )}
    </dialog>
  )
}
