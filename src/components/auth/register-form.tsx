"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { type FormEvent, useState } from "react"

import { AuthCard, AuthDivider } from "@/components/auth/auth-shell"
import { GoogleButton } from "@/components/auth/google-button"
import { Button, ButtonArrow } from "@/components/ui/button"
import { Field, FormAlert, PasswordField } from "@/components/ui/field"
import { useToast } from "@/components/ui/toast"
import { track } from "@/lib/analytics"
import { errorMessage, fieldErrors } from "@/lib/api-errors"
import { safeNext } from "@/lib/auth/redirect"
import { register, type RegisterForm as RegisterData } from "@/lib/auth/session"

export function RegisterForm() {
  const router = useRouter()
  const next = safeNext(useSearchParams().get("next"))
  const toast = useToast()
  const [pending, setPending] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState("")

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>

    if (data.password !== data.password_confirmation) {
      setErrors({ password_confirmation: "Hasła nie są takie same." })
      return
    }
    if (!data.terms) {
      setErrors({ terms: "Zaakceptuj regulamin, aby założyć konto." })
      return
    }

    setPending(true)
    setErrors({})
    setFormError("")
    try {
      const form: RegisterData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        password_confirmation: data.password_confirmation,
      }
      await register(form)
      track("Rejestracja")
      toast("Konto utworzone – sprawdź skrzynkę e-mail")
      router.replace(next)
    } catch (error) {
      const fields = fieldErrors(error)
      setErrors(fields)
      if (!Object.keys(fields).length) setFormError(errorMessage(error))
      setPending(false)
    }
  }

  return (
    <AuthCard eyebrow="Panel pacjenta" title="Załóż *konto*" lead="Konto pozwala rezerwować wizyty online i zarządzać swoimi terminami.">
      <GoogleButton label="Załóż konto przez Google" />
      <AuthDivider />
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <FormAlert>{formError}</FormAlert>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Imię" name="firstName" autoComplete="given-name" required error={errors.firstName} />
          <Field label="Nazwisko" name="lastName" autoComplete="family-name" required error={errors.lastName} />
        </div>
        <Field label="Adres e-mail" name="email" type="email" autoComplete="email" required error={errors.email} hint="Na ten adres wyślemy link potwierdzający." />
        <Field label="Telefon" name="phone" type="tel" autoComplete="tel" required error={errors.phone} hint="Potrzebny do potwierdzania wizyt." />
        <PasswordField label="Hasło" name="password" autoComplete="new-password" required minLength={8} error={errors.password} hint="Co najmniej 8 znaków." />
        <PasswordField label="Powtórz hasło" name="password_confirmation" autoComplete="new-password" required error={errors.password_confirmation} />
        <div className="flex flex-col gap-2">
          <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed">
            <input type="checkbox" name="terms" aria-invalid={errors.terms ? true : undefined} className="mt-1 size-5 shrink-0 accent-moss-800" />
            <span>
              Akceptuję{" "}
              <Link href="/regulamin" target="_blank" className="font-medium text-moss-800 underline decoration-mist-300 underline-offset-4">
                regulamin
              </Link>{" "}
              i{" "}
              <Link href="/polityka-prywatnosci" target="_blank" className="font-medium text-moss-800 underline decoration-mist-300 underline-offset-4">
                politykę prywatności
              </Link>
              .
            </span>
          </label>
          {errors.terms && <span className="text-[13px] text-ember-700">{errors.terms}</span>}
        </div>
        <Button type="submit" disabled={pending} className="mt-1 w-full justify-between">
          {pending ? "Tworzenie konta…" : "Załóż konto"}
          <ButtonArrow />
        </Button>
      </form>
      <p className="text-center text-[15px] text-moss-500">
        Masz już konto?{" "}
        <Link href="/login" className="font-medium text-moss-800 underline decoration-mist-300 underline-offset-4">
          Zaloguj się
        </Link>
      </p>
    </AuthCard>
  )
}
