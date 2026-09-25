"use client"

import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { type FormEvent, useState } from "react"

import { AuthCard } from "@/components/auth/auth-shell"
import { Button, ButtonArrow } from "@/components/ui/button"
import { Field, FormAlert, PasswordField } from "@/components/ui/field"
import { useToast } from "@/components/ui/toast"
import { errorMessage, fieldErrors } from "@/lib/api-errors"
import { resetPassword, sendPasswordResetLink } from "@/lib/auth/session"
import { routes } from "@/lib/site"

const backLink = (
  <Link href={routes.login} className="text-center text-[15px] font-medium text-moss-800 opacity-75 transition-opacity hover:opacity-100">
    ← Wróć do logowania
  </Link>
)

export function PasswordResetLinkForm() {
  const [pending, setPending] = useState(false)
  const [sentTo, setSentTo] = useState("")
  const [error, setError] = useState("")

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = String(new FormData(event.currentTarget).get("email"))
    setPending(true)
    setError("")
    try {
      await sendPasswordResetLink(email)
      setSentTo(email)
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setPending(false)
    }
  }

  if (sentTo) {
    return (
      <AuthCard title="Sprawdź *skrzynkę*" lead={<>Wysłaliśmy link do zmiany hasła na adres <strong className="font-medium text-moss-950">{sentTo}</strong>. Link jest ważny przez ograniczony czas.</>}>
        <FormAlert tone="info">Nie widzisz wiadomości? Sprawdź folder spam albo wyślij link ponownie za minutę.</FormAlert>
        {backLink}
      </AuthCard>
    )
  }

  return (
    <AuthCard title="Nie pamiętasz *hasła?*" lead="Podaj adres e-mail konta – wyślemy link do ustawienia nowego hasła.">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <Field label="Adres e-mail" name="email" type="email" autoComplete="email" required error={error} />
        <Button type="submit" disabled={pending} className="w-full justify-between">
          {pending ? "Wysyłanie…" : "Wyślij link"}
          <ButtonArrow />
        </Button>
      </form>
      {backLink}
    </AuthCard>
  )
}

// Link from the e-mail: /password/reset/{token}?email=...
export function PasswordResetForm() {
  const router = useRouter()
  const toast = useToast()
  const { token } = useParams<{ token: string }>()
  const email = useSearchParams().get("email") ?? ""
  const [pending, setPending] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState("")

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const password = String(data.get("password"))
    const password_confirmation = String(data.get("password_confirmation"))
    if (password !== password_confirmation) {
      setErrors({ password_confirmation: "Hasła nie są takie same." })
      return
    }

    setPending(true)
    setErrors({})
    setFormError("")
    try {
      await resetPassword({ email, token, password, password_confirmation })
      toast("Hasło zmienione – możesz się zalogować")
      router.replace(routes.login)
    } catch (error) {
      const fields = fieldErrors(error)
      setErrors(fields)
      if (!fields.password && !fields.password_confirmation) setFormError(errorMessage(error))
      setPending(false)
    }
  }

  return (
    <AuthCard title="Ustaw nowe *hasło*" lead={email ? <>Dla konta <strong className="font-medium text-moss-950">{email}</strong>.</> : undefined}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <FormAlert>{formError}</FormAlert>
        <PasswordField label="Nowe hasło" name="password" autoComplete="new-password" required minLength={8} error={errors.password} hint="Co najmniej 8 znaków." />
        <PasswordField label="Powtórz hasło" name="password_confirmation" autoComplete="new-password" required error={errors.password_confirmation} />
        <Button type="submit" disabled={pending} className="w-full justify-between">
          {pending ? "Zapisywanie…" : "Zmień hasło"}
          <ButtonArrow />
        </Button>
      </form>
      {backLink}
    </AuthCard>
  )
}
