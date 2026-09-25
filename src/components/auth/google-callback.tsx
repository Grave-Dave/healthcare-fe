"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

import { AuthCard } from "@/components/auth/auth-shell"
import { useToast } from "@/components/ui/toast"
import { completeGoogleLogin } from "@/lib/auth/session"
import { routes } from "@/lib/site"

// The backend redirects here with ?success=true after setting the refresh cookie (or without it on failure).
export function GoogleCallback() {
  const router = useRouter()
  const success = useSearchParams().get("success") === "true"
  const toast = useToast()
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    const fail = () => {
      toast("Nie udało się zalogować przez Google. Spróbuj ponownie.", "error")
      router.replace(routes.login)
    }
    if (!success) return fail()

    completeGoogleLogin().then((session) => {
      if (session.status === "anonymous") return fail()
      toast("Zalogowano przez Google")
      router.replace(routes.panel)
    })
  }, [success, router, toast])

  return <AuthCard title="Logowanie *przez Google*" lead="Chwileczkę, kończymy logowanie…">{null}</AuthCard>
}
