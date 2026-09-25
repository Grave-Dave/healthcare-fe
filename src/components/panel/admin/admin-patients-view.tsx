"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

import { patientName } from "@/components/panel/admin/admin-cancel-dialog"
import { Avatar, type OfficeInfo } from "@/components/panel/admin/admin-visits-view"
import { PinIcon, StatusBadge } from "@/components/panel/visit-status"
import { Button } from "@/components/ui/button"
import { FormAlert } from "@/components/ui/field"
import { useToast } from "@/components/ui/toast"
import { type AdminVisit, getPatientVisits, PATIENTS_LIMIT, searchPatients } from "@/lib/admin"
import { errorMessage } from "@/lib/api-errors"
import { startImpersonation, type User } from "@/lib/auth/session"
import { useSession } from "@/lib/auth/use-session"
import type { Term } from "@/lib/booking"
import { formatLongDate, formatTime, toISODate } from "@/lib/dates"
import { routes } from "@/lib/site"
import { cn } from "@/lib/utils"
import { startsAt } from "@/lib/visits"

type Results = { key: string | null; users: User[]; error: string }

export function AdminPatientsView({ offices }: { offices: OfficeInfo[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const { user: me } = useSession()
  const selectedId = params.get("id") ? Number(params.get("id")) : null

  const [query, setQuery] = useState("")
  const [search, setSearch] = useState("")
  useEffect(() => {
    const timer = setTimeout(() => setSearch(query.trim()), 300)
    return () => clearTimeout(timer)
  }, [query])

  const resultsKey = search
  const [results, setResults] = useState<Results>({ key: null, users: [], error: "" })
  const loading = results.key !== resultsKey
  useEffect(() => {
    let cancelled = false
    searchPatients(search)
      .then((users) => !cancelled && setResults({ key: resultsKey, users, error: "" }))
      .catch((error) => !cancelled && setResults((prev) => ({ ...prev, key: resultsKey, error: errorMessage(error) })))
    return () => {
      cancelled = true
    }
  }, [search, resultsKey])

  // The therapist's own account is not a patient.
  const users = results.users.filter((u) => u.id !== me?.id)
  const selected = users.find((u) => u.id === selectedId) ?? null

  const cardRef = useRef<HTMLDivElement>(null)
  const select = (id: number) => {
    router.replace(`${pathname}?id=${id}`, { scroll: false })
    if (window.matchMedia("(max-width: 1023px)").matches) setTimeout(() => cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50)
  }

  const officeName = useCallback(
    (location: Term["location"]) => offices.find((o) => o.backendLocationId === location.id)?.name ?? location.name.split(",")[0],
    [offices]
  )

  return (
    <div className="flex flex-col gap-9 lg:gap-12">
      <div className="flex flex-col gap-3 lg:gap-3.5">
        <span className="eyebrow">Administrator</span>
        <h1 className="font-display text-[36px] leading-[1.08] font-light lg:text-[52px] lg:leading-[1.05]">
          <em>Pacjenci</em>
        </h1>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <label className="relative block">
            <span className="sr-only">Szukaj pacjenta</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" className="absolute top-1/2 left-5 -translate-y-1/2 text-moss-500">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
              }}
              placeholder="Imię lub nazwisko"
              className="h-14 w-full rounded-full bg-white pr-5 pl-13 text-base shadow-rest outline-none transition-shadow duration-400 placeholder:text-moss-400 focus:shadow-[inset_0_0_0_1.5px_var(--color-moss-600),0_14px_30px_-18px_rgb(26_38_32/0.35)]"
            />
          </label>
          <FormAlert>{results.error}</FormAlert>
          <span className="px-1 text-[13px] text-moss-500" aria-live="polite">
            {loading && !users.length ? "Wyszukiwanie…" : results.users.length >= PATIENTS_LIMIT ? `Pokazano pierwszych ${PATIENTS_LIMIT} – zawęź wyszukiwanie` : users.length ? `Znaleziono: ${users.length}` : "Brak wyników"}
          </span>
          <ul className={cn("flex flex-col gap-1 transition-opacity duration-400", loading && "opacity-60")}>
            {users.map((user) => (
              <li key={user.id}>
                <button
                  type="button"
                  aria-current={user.id === selectedId ? "true" : undefined}
                  onClick={() => select(user.id)}
                  className="flex w-full items-center gap-3.5 rounded-[20px] px-4 py-3 text-left opacity-60 transition-[opacity,background-color,box-shadow] duration-400 hover:opacity-90 aria-[current=true]:bg-white aria-[current=true]:opacity-100 aria-[current=true]:shadow-rest"
                >
                  <Avatar user={user} />
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate font-display text-[19px]">{patientName(user)}</span>
                    <span className="truncate text-[13px] text-moss-500">{user.email}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div ref={cardRef} className="scroll-mt-6 lg:col-span-7 lg:col-start-6">
          {selected ? (
            <PatientCard key={selected.id} patient={selected} officeName={officeName} />
          ) : (
            <p className="rounded-[28px] px-6 py-14 text-center text-[15px] text-moss-500 shadow-[inset_0_0_0_1px_var(--color-mist-200)] lg:rounded-[36px] lg:py-20 lg:text-base">
              Wybierz pacjenta z listy, aby zobaczyć historię wizyt.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function PatientCard({ patient, officeName }: { patient: User; officeName: (location: Term["location"]) => string }) {
  const router = useRouter()
  const toast = useToast()
  const [history, setHistory] = useState<{ visits: AdminVisit[] | null; error: string }>({ visits: null, error: "" })

  useEffect(() => {
    let cancelled = false
    getPatientVisits(patient.id)
      .then((visits) => !cancelled && setHistory({ visits, error: "" }))
      .catch((error) => !cancelled && setHistory({ visits: [], error: errorMessage(error) }))
    return () => {
      cancelled = true
    }
  }, [patient.id])

  const now = new Date()
  const nowKey = `${toISODate(now)} ${formatTime(`${now.getHours()}:${now.getMinutes()}`)}`
  const visits = history.visits ?? []
  const done = visits.filter((v) => startsAt(v) <= nowKey && v.status === "confirmed").length
  const upcoming = visits.filter((v) => startsAt(v) > nowKey).length

  const dialogRef = useRef<HTMLDialogElement>(null)
  const [pending, setPending] = useState(false)
  async function impersonate() {
    setPending(true)
    try {
      await startImpersonation(patient)
      dialogRef.current?.close()
      router.replace(routes.myVisits)
    } catch (error) {
      toast(errorMessage(error), "error")
      setPending(false)
    }
  }

  return (
    <article className="flex animate-fade-up flex-col gap-7 rounded-[28px] bg-white p-5 shadow-[0_30px_60px_-40px_rgb(26_38_32/0.3)] lg:gap-9 lg:rounded-[36px] lg:p-11">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar user={patient} size="lg" />
          <div className="flex min-w-0 flex-col gap-1">
            <h2 className="font-display text-[26px] leading-tight lg:text-[32px]">{patientName(patient)}</h2>
            <span className="truncate text-[15px] text-moss-500">{patient.email}</span>
            {patient.phone ? (
              <a href={`tel:${patient.phone}`} className="text-[15px] font-medium text-moss-800 underline-offset-4 hover:underline">
                {patient.phone}
              </a>
            ) : (
              <span className="text-[15px] text-moss-500">brak telefonu</span>
            )}
          </div>
        </div>
        <Button variant="quiet" size="sm" onClick={() => dialogRef.current?.showModal()} className="self-start sm:self-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Zobacz panel jako pacjent
        </Button>
      </div>

      <dl className="grid grid-cols-3 gap-2.5 lg:gap-4">
        {[
          ["Wszystkie", visits.length],
          ["Odbyte", done],
          ["Nadchodzące", upcoming],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col-reverse gap-1 rounded-2xl bg-mist-50 px-4 py-3.5 lg:px-6 lg:py-5">
            <dt className="text-[13px] text-moss-500 lg:text-sm">{label}</dt>
            <dd className={cn("font-display text-[26px] leading-none lg:text-[30px]", history.visits === null && "text-mist-300")}>{history.visits === null ? "–" : value}</dd>
          </div>
        ))}
      </dl>

      <section aria-label="Historia wizyt" className="flex flex-col gap-3">
        <h3 className="eyebrow">Historia wizyt</h3>
        <FormAlert>{history.error}</FormAlert>
        {history.visits && !visits.length && !history.error && <p className="text-[15px] text-moss-500">Pacjent nie ma jeszcze wizyt.</p>}
        <ul className="flex flex-col gap-2">
          {visits.map((visit) => {
            const past = startsAt(visit) <= nowKey
            return (
              <li key={visit.id} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 rounded-[18px] px-4.5 py-3.5 shadow-[inset_0_0_0_1px_var(--color-mist-200)] lg:px-6">
                <span className={cn("text-[15px] font-medium lg:text-base", past && "text-moss-700")}>
                  {formatLongDate(visit.term.date)}, {visit.term.time}
                </span>
                <span className="row-span-2 justify-self-end">
                  <StatusBadge visit={visit} past={past} />
                </span>
                <span className="flex items-center gap-1.5 text-[13px] text-moss-500">
                  <PinIcon />
                  {officeName(visit.term.location)}
                </span>
              </li>
            )
          })}
        </ul>
      </section>

      <dialog
        ref={dialogRef}
        role="alertdialog"
        aria-labelledby="impersonate-title"
        onClick={(event) => event.target === event.currentTarget && !pending && dialogRef.current?.close()}
        className={cn(
          "m-0 mt-auto w-full max-w-none rounded-t-[32px] bg-mist-50 p-0 text-moss-950 shadow-[0_-30px_60px_-30px_rgb(0_0_0/0.4)] backdrop:bg-moss-950/32 backdrop:backdrop-blur-[4px]",
          "lg:m-auto lg:w-[560px] lg:rounded-[36px] lg:shadow-[0_50px_100px_-50px_rgb(0_0_0/0.5)] lg:backdrop:backdrop-blur-[6px]"
        )}
      >
        <div className="flex flex-col gap-6 px-5 pt-3.5 pb-8 lg:gap-7 lg:p-12">
          <span aria-hidden="true" className="h-1 w-10 self-center rounded bg-mist-300 lg:hidden" />
          <div className="flex flex-col gap-3">
            <span className="eyebrow max-lg:hidden">Tryb pacjenta</span>
            <h2 id="impersonate-title" className="font-display text-[32px] leading-[1.1] font-light lg:text-[40px]">
              Panel jako <em>{patient.firstName || "pacjent"}</em>
            </h2>
          </div>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-moss-700 lg:text-base">
            <li>Zobaczysz panel tak, jak widzi go pacjent, i możesz działać w jego imieniu (np. zarezerwować wizytę).</li>
            <li>Sesja administratora się zakończy – żeby wrócić, zaloguj się ponownie.</li>
            <li>Pacjent zostanie wylogowany na swoich urządzeniach.</li>
          </ul>
          <div className="flex flex-col gap-2.5 lg:flex-row-reverse lg:justify-between">
            <Button onClick={impersonate} disabled={pending} className="w-full lg:w-auto">
              {pending ? "Przełączanie…" : "Przejdź do panelu pacjenta"}
            </Button>
            <Button variant="quiet" onClick={() => dialogRef.current?.close()} disabled={pending} autoFocus className="w-full lg:w-auto">
              Anuluj
            </Button>
          </div>
        </div>
      </dialog>
    </article>
  )
}
