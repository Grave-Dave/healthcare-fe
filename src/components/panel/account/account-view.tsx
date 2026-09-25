"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Tabs } from "radix-ui"
import { type FormEvent, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Field, FormAlert, PasswordField } from "@/components/ui/field"
import { useToast } from "@/components/ui/toast"
import { errorMessage, fieldErrors } from "@/lib/api-errors"
import { deleteAccount, type ProfileForm, updateProfile, type User } from "@/lib/auth/session"
import { useSession } from "@/lib/auth/use-session"
import { routes } from "@/lib/site"
import { cn } from "@/lib/utils"
import { getMyVisits } from "@/lib/visits"

const sections = [
  { id: "dane", label: "Dane osobowe" },
  { id: "haslo", label: "Hasło" },
  { id: "usun", label: "Usuń konto" },
] as const

type Profile = Pick<ProfileForm, "firstName" | "lastName" | "email" | "phone">

const profileOf = (user: User): Profile => ({
  firstName: user.firstName ?? "",
  lastName: user.lastName ?? "",
  email: user.email,
  phone: user.phone ?? "",
})

/** Rendered inside AuthGuard – the user is always loaded. */
export function AccountView() {
  const { user } = useSession()
  const [section, setSection] = useState<(typeof sections)[number]["id"]>("dane")
  if (!user) return null
  const initials = [user.firstName, user.lastName].map((part) => part?.[0] ?? "").join("").toUpperCase()

  return (
    <Tabs.Root
      value={section}
      onValueChange={(value) => setSection(value as typeof section)}
      orientation="vertical"
      className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-8"
    >
      <div className="flex flex-col gap-7 lg:sticky lg:top-10 lg:col-span-4 lg:gap-10">
        <div className="flex flex-col gap-3 lg:gap-3.5">
          <span className="eyebrow">Panel</span>
          <h1 className="font-display text-[36px] leading-[1.08] font-light lg:text-[52px] lg:leading-[1.05]">
            Twoje <em>konto</em>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {user.avatar ? (
            // Google avatar (external URL) – next/image would need the host in images.remotePatterns
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatar} alt="" referrerPolicy="no-referrer" className="size-14 rounded-full object-cover lg:size-16" />
          ) : (
            <span aria-hidden="true" className="grid size-14 place-items-center rounded-full bg-[#e6ebe3] text-lg font-bold text-moss-800 lg:size-16">
              {initials || "?"}
            </span>
          )}
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-display text-[20px] lg:text-[22px]">
              {user.firstName} {user.lastName}
            </span>
            <span className="truncate text-[15px] text-moss-500">{user.email}</span>
          </div>
        </div>
        <Tabs.List
          aria-label="Sekcje konta"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
        >
          {sections.map((item) => (
            <Tabs.Trigger
              key={item.id}
              value={item.id}
              className={cn(
                "shrink-0 rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap opacity-55 shadow-[inset_0_0_0_1px_var(--color-mist-300)] transition-[opacity,background-color,color,box-shadow] duration-400 hover:opacity-90",
                "data-[state=active]:bg-moss-950 data-[state=active]:text-mist-50 data-[state=active]:opacity-100 data-[state=active]:shadow-none",
                "lg:rounded-[20px] lg:px-6 lg:py-4.5 lg:text-left lg:font-display lg:text-[22px] lg:font-normal lg:opacity-40 lg:shadow-none lg:hover:opacity-75",
                "lg:data-[state=active]:bg-white lg:data-[state=active]:text-moss-950 lg:data-[state=active]:shadow-rest",
                item.id === "usun" && "text-ember-700 lg:data-[state=active]:text-ember-700"
              )}
            >
              {item.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>

      <div className="lg:col-span-7 lg:col-start-6">
        <Tabs.Content value="dane" className="animate-fade-up">
          <ProfileSection user={user} />
        </Tabs.Content>
        <Tabs.Content value="haslo" className="animate-fade-up">
          <PasswordSection user={user} onMissingPhone={() => setSection("dane")} />
        </Tabs.Content>
        <Tabs.Content value="usun" className="animate-fade-up">
          <DeleteSection />
        </Tabs.Content>
      </div>
    </Tabs.Root>
  )
}

function Card({ title, lead, children, danger = false }: { title: string; lead?: string; children: React.ReactNode; danger?: boolean }) {
  return (
    <section
      className={cn(
        "flex flex-col gap-6 rounded-[28px] p-5 lg:gap-8 lg:rounded-[36px] lg:p-11",
        danger ? "shadow-[inset_0_0_0_1px_#e8d3cd]" : "bg-white shadow-[0_30px_60px_-40px_rgb(26_38_32/0.3)]"
      )}
    >
      <div className="flex flex-col gap-2">
        <h2 className={cn("font-display text-[26px] lg:text-[32px]", danger && "text-ember-700")}>{title}</h2>
        {lead && <p className="text-[15px] leading-relaxed text-moss-500 lg:text-base">{lead}</p>}
      </div>
      {children}
    </section>
  )
}

function ProfileSection({ user }: { user: User }) {
  const toast = useToast()
  const initial = profileOf(user)
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState("")
  const [pending, setPending] = useState(false)
  const dirty = (Object.keys(initial) as (keyof Profile)[]).some((key) => form[key].trim() !== initial[key])

  const set = (key: keyof Profile) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }))
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const data = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()])) as Profile
    const local: Record<string, string> = {}
    if (!data.email) local.email = "Podaj adres e-mail."
    if (!data.phone) local.phone = "Podaj numer telefonu."
    if (Object.keys(local).length) return setErrors(local)

    setPending(true)
    setErrors({})
    setFormError("")
    try {
      const saved = await updateProfile(data)
      setForm(profileOf(saved))
      toast("Zapisano zmiany")
    } catch (error) {
      const fields = fieldErrors(error)
      setErrors(fields)
      if (!Object.keys(fields).length) setFormError(errorMessage(error))
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <Card title="Dane osobowe" lead="Używamy ich tylko do kontaktu w sprawie wizyt.">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Imię" name="firstName" autoComplete="given-name" value={form.firstName} onChange={set("firstName")} error={errors.firstName} />
          <Field label="Nazwisko" name="lastName" autoComplete="family-name" value={form.lastName} onChange={set("lastName")} error={errors.lastName} />
        </div>
        <Field label="Adres e-mail" name="email" type="email" autoComplete="email" required value={form.email} onChange={set("email")} error={errors.email} hint="Tym adresem logujesz się do panelu." />
        <Field
          label="Telefon"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          value={form.phone}
          onChange={set("phone")}
          error={errors.phone}
          hint={user.phone ? "Wymagany do rezerwacji wizyt." : <strong className="font-medium text-[#6b5a33]">Uzupełnij telefon – bez niego nie zarezerwujesz wizyty.</strong>}
        />
      </Card>
      <FormAlert>{formError}</FormAlert>
      <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="quiet"
          disabled={!dirty || pending}
          onClick={() => {
            setForm(initial)
            setErrors({})
            setFormError("")
          }}
        >
          Anuluj zmiany
        </Button>
        <Button type="submit" disabled={!dirty || pending}>
          {pending ? "Zapisywanie…" : "Zapisz zmiany"}
        </Button>
      </div>
    </form>
  )
}

function PasswordSection({ user, onMissingPhone }: { user: User; onMissingPhone: () => void }) {
  const toast = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const [filled, setFilled] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState("")
  const [pending, setPending] = useState(false)
  const missingPhone = !user.phone

  function reset() {
    formRef.current?.reset()
    setFilled(false)
    setErrors({})
    setFormError("")
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>
    if (data.password.length < 8) return setErrors({ password: "Hasło musi mieć co najmniej 8 znaków." })
    if (data.password !== data.password_confirmation) return setErrors({ password_confirmation: "Hasła nie są takie same." })

    setPending(true)
    setErrors({})
    setFormError("")
    try {
      await updateProfile({ ...profileOf(user), password: data.password, password_confirmation: data.password_confirmation })
      reset()
      toast("Hasło zostało zmienione")
    } catch (error) {
      const fields = fieldErrors(error)
      const passwordFields = { password: fields.password, password_confirmation: fields.password_confirmation }
      setErrors(passwordFields)
      // Profile errors (e.g. phone) can't be fixed here – show them as one message.
      if (!fields.password && !fields.password_confirmation) setFormError(errorMessage(error))
    } finally {
      setPending(false)
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onChange={(event) => setFilled(Boolean(new FormData(event.currentTarget).get("password")))}
      noValidate
      className="flex flex-col gap-6"
    >
      <Card title="Zmiana hasła" lead="Jeśli logujesz się przez Google, możesz tu ustawić hasło do logowania e-mailem.">
        {missingPhone && (
          <FormAlert tone="info">
            Najpierw uzupełnij numer telefonu w{" "}
            <button type="button" onClick={onMissingPhone} className="font-medium text-moss-800 underline underline-offset-4">
              danych osobowych
            </button>
            .
          </FormAlert>
        )}
        <PasswordField label="Nowe hasło" name="password" autoComplete="new-password" required minLength={8} error={errors.password} hint="Co najmniej 8 znaków." disabled={missingPhone} />
        <PasswordField label="Powtórz hasło" name="password_confirmation" autoComplete="new-password" required error={errors.password_confirmation} disabled={missingPhone} />
      </Card>
      <FormAlert>{formError}</FormAlert>
      <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
        <Button type="button" variant="quiet" disabled={!filled || pending} onClick={reset}>
          Anuluj zmiany
        </Button>
        <Button type="submit" disabled={!filled || pending || missingPhone}>
          {pending ? "Zapisywanie…" : "Zmień hasło"}
        </Button>
      </div>
    </form>
  )
}

type Check = { state: "idle" | "loading" | "ready"; upcoming: number; error: string }

function DeleteSection() {
  const router = useRouter()
  const toast = useToast()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [check, setCheck] = useState<Check>({ state: "idle", upcoming: 0, error: "" })
  const [confirmed, setConfirmed] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  // The backend deletes the account without canceling visits – block it until upcoming visits are canceled.
  function open() {
    setConfirmed(false)
    setError("")
    setCheck({ state: "loading", upcoming: 0, error: "" })
    dialogRef.current?.showModal()
    getMyVisits()
      .then(({ upcoming }) => setCheck({ state: "ready", upcoming: upcoming.filter((v) => v.status !== "canceled").length, error: "" }))
      .catch((err) => setCheck({ state: "ready", upcoming: 0, error: errorMessage(err) }))
  }

  const close = () => dialogRef.current?.close()

  async function confirm() {
    setPending(true)
    setError("")
    try {
      await deleteAccount()
      close()
      toast("Konto zostało usunięte")
      router.replace(routes.home)
    } catch (err) {
      setError(errorMessage(err))
      setPending(false)
    }
  }

  const blocked = check.state !== "ready" || check.upcoming > 0 || Boolean(check.error)

  return (
    <>
      <Card danger title="Usuń konto" lead="Po usunięciu konta nie zalogujesz się już do panelu ani nie zarezerwujesz wizyty online. Tej operacji nie można cofnąć.">
        <div>
          <Button variant="quiet-danger" onClick={open}>
            Usuń konto
          </Button>
        </div>
      </Card>

      <dialog
        ref={dialogRef}
        role="alertdialog"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
        onClick={(event) => event.target === event.currentTarget && !pending && close()}
        className={cn(
          "m-0 mt-auto w-full max-w-none rounded-t-[32px] bg-mist-50 p-0 text-moss-950 shadow-[0_-30px_60px_-30px_rgb(0_0_0/0.4)] backdrop:bg-moss-950/32 backdrop:backdrop-blur-[4px]",
          "lg:m-auto lg:w-[560px] lg:rounded-[36px] lg:shadow-[0_50px_100px_-50px_rgb(0_0_0/0.5)] lg:backdrop:backdrop-blur-[6px]"
        )}
      >
        <div className="flex flex-col gap-6 px-5 pt-3.5 pb-8 lg:gap-7 lg:p-12">
          <span aria-hidden="true" className="h-1 w-10 self-center rounded bg-mist-300 lg:hidden" />
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-ember-700 max-lg:hidden">Usunięcie konta</span>
            <h2 id="delete-dialog-title" className="font-display text-[32px] leading-[1.1] font-light lg:text-[40px]">
              Usunąć <em>konto?</em>
            </h2>
            <p id="delete-dialog-desc" className="text-[15px] leading-relaxed text-moss-500 lg:text-base">
              Stracisz dostęp do panelu i historii wizyt. Tej operacji nie można cofnąć.
            </p>
          </div>

          {check.state === "loading" && <p className="text-[15px] text-moss-500">Sprawdzanie nadchodzących wizyt…</p>}
          {check.error && <FormAlert>{check.error}</FormAlert>}
          {check.upcoming > 0 ? (
            <FormAlert tone="info">
              Masz nadchodzące wizyty ({check.upcoming}). Najpierw je odwołaj w{" "}
              <Link href={routes.myVisits} className="font-medium text-moss-800 underline underline-offset-4">
                Moich wizytach
              </Link>
              , aby termin zwolnił się dla innych.
            </FormAlert>
          ) : (
            check.state === "ready" &&
            !check.error && (
              <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed">
                <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} className="mt-1 size-5 shrink-0 accent-ember-700" />
                <span>Rozumiem, że usunięcie konta jest nieodwracalne.</span>
              </label>
            )
          )}
          <FormAlert>{error}</FormAlert>
          <div className="flex flex-col gap-2.5 lg:flex-row-reverse lg:justify-between">
            <Button variant="danger" onClick={confirm} disabled={blocked || !confirmed || pending} className="w-full lg:w-auto">
              {pending ? "Usuwanie…" : "Usuń konto"}
            </Button>
            <Button variant="quiet" onClick={close} disabled={pending} autoFocus className="w-full lg:w-auto">
              Anuluj
            </Button>
          </div>
        </div>
      </dialog>
    </>
  )
}
