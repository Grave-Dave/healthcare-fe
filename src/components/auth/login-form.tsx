"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { type FormEvent, useEffect, useState } from "react"

import { AuthCard, AuthDivider } from "@/components/auth/auth-shell"
import { GoogleButton } from "@/components/auth/google-button"
import { Button, ButtonArrow } from "@/components/ui/button"
import { Field, FormAlert, PasswordField } from "@/components/ui/field"
import { useToast } from "@/components/ui/toast"
import { track } from "@/lib/analytics"
import { errorMessage, fieldErrors } from "@/lib/api-errors"
import { safeNext } from "@/lib/auth/redirect"
import { login } from "@/lib/auth/session"
import { useSession } from "@/lib/auth/use-session"

export function LoginForm() {
  const router = useRouter()
  const next = safeNext(useSearchParams().get("next"))
  const session = useSession()
  const toast = useToast()
  const [pending, setPending] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState("")

  // Already signed in (e.g. back button) – go straight to the panel.
  useEffect(() => {
    if (session.status === "authenticated" && !pending) router.replace(next)
  }, [session.status, pending, next, router])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setPending(true)
    setErrors({})
    setFormError("")
    try {
      const result = await login({ email: String(data.get("email")), password: String(data.get("password")) })
      track("Logowanie", { metoda: "e-mail" })
      if (result.status === "authenticated") toast("Zalogowano")
      router.replace(next)
    } catch (error) {
      const fields = fieldErrors(error)
      setErrors(fields)
      if (!Object.keys(fields).length) setFormError(errorMessage(error))
      setPending(false)
    }
  }

  return (
    <AuthCard eyebrow="Panel pacjenta" title="Witaj *ponownie*" lead="Zaloguj się, aby zarezerwować wizytę lub sprawdzić swoje terminy.">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <FormAlert>{formError}</FormAlert>
        <Field label="Adres e-mail" name="email" type="email" autoComplete="email" required error={errors.email} />
        <PasswordField label="Hasło" name="password" autoComplete="current-password" required error={errors.password} />
        <Link href="/password/reset/link" className="-mt-1 self-end text-sm font-medium text-moss-800 opacity-75 transition-opacity hover:opacity-100">
          Nie pamiętasz hasła?
        </Link>
        <Button type="submit" disabled={pending} className="mt-1 w-full justify-between">
          {pending ? "Logowanie…" : "Zaloguj się"}
          <ButtonArrow />
        </Button>
      </form>
      <AuthDivider />
      <GoogleButton />
      <p className="text-center text-[15px] text-moss-500">
        Nie masz konta?{" "}
        <Link href={`/register${next !== safeNext(null) ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-medium text-moss-800 underline decoration-mist-300 underline-offset-4">
          Załóż konto
        </Link>
      </p>
    </AuthCard>
  )
}
