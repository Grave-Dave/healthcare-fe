"use client"

import { type RefObject, useState } from "react"

import { Button } from "@/components/ui/button"
import { FormAlert } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { adminCancelVisit, type AdminVisit } from "@/lib/admin"
import { errorMessage } from "@/lib/api-errors"
import { formatLongDate } from "@/lib/dates"
import { cn } from "@/lib/utils"

export const patientName = (user: AdminVisit["user"]) => [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email

type Props = {
  dialogRef: RefObject<HTMLDialogElement | null>
  visit: AdminVisit | null
  officeName: string
  onDone: (visit: AdminVisit) => void
}

/** Reject (pending) or cancel (confirmed) a visit. Replaces the old "delete the term too?" question with a switch. */
export function AdminCancelDialog({ dialogRef, visit, officeName, onDone }: Props) {
  const [releaseTerm, setReleaseTerm] = useState(true)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const reject = visit?.status === "pending"

  const close = () => {
    setError("")
    setReleaseTerm(true)
    dialogRef.current?.close()
  }

  async function confirm() {
    if (!visit) return
    setPending(true)
    setError("")
    try {
      await adminCancelVisit(visit.id, releaseTerm)
      close()
      onDone(visit)
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
      aria-labelledby="admin-cancel-title"
      onClick={(event) => event.target === event.currentTarget && !pending && close()}
      onClose={() => setReleaseTerm(true)}
      className={cn(
        "m-0 mt-auto w-full max-w-none rounded-t-[32px] bg-mist-50 p-0 text-moss-950 shadow-[0_-30px_60px_-30px_rgb(0_0_0/0.4)] backdrop:bg-moss-950/32 backdrop:backdrop-blur-[4px]",
        "lg:m-auto lg:w-[560px] lg:rounded-[36px] lg:shadow-[0_50px_100px_-50px_rgb(0_0_0/0.5)] lg:backdrop:backdrop-blur-[6px]"
      )}
    >
      {visit && (
        <div className="flex animate-fade-in flex-col gap-6 px-5 pt-3.5 pb-8 lg:gap-7 lg:p-12">
          <span aria-hidden="true" className="h-1 w-10 self-center rounded bg-mist-300 lg:hidden" />
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-ember-700 max-lg:hidden">{reject ? "Odrzucenie wizyty" : "Odwołanie wizyty"}</span>
            <h2 id="admin-cancel-title" className="font-display text-[32px] leading-[1.1] font-light lg:text-[40px]">
              {reject ? "Odrzucić" : "Odwołać"} <em>wizytę?</em>
            </h2>
          </div>
          <dl className="flex flex-col gap-2.5">
            {[
              ["Pacjent", patientName(visit.user)],
              ["Termin", `${formatLongDate(visit.term.date)}, ${visit.term.time}`],
              ["Gabinet", officeName],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 rounded-2xl bg-white px-4.5 py-4 text-[15px] lg:rounded-[18px] lg:px-6 lg:py-4.5 lg:text-base">
                <dt className="text-moss-500">{label}</dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <Switch
            checked={releaseTerm}
            onChange={setReleaseTerm}
            disabled={pending}
            label="Zwolnij termin dla innych pacjentów"
            hint={releaseTerm ? "Godzina wróci do kalendarza rezerwacji." : "Termin zostanie usunięty z grafiku."}
          />
          <p className="text-sm leading-relaxed text-moss-500 lg:text-[15px]">Pacjent dostanie e-mail z informacją o {reject ? "odrzuceniu" : "odwołaniu"} wizyty.</p>
          <FormAlert>{error}</FormAlert>
          <div className="flex flex-col gap-2.5 lg:flex-row-reverse lg:justify-between">
            <Button variant="danger" onClick={confirm} disabled={pending} className="w-full lg:w-auto">
              {pending ? "Zapisywanie…" : reject ? "Odrzuć wizytę" : "Odwołaj wizytę"}
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
