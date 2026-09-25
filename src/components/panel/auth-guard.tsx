"use client"

import { usePathname, useRouter } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"

import { AuthCard } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast"
import { errorMessage } from "@/lib/api-errors"
import { loadUser, logout, resendVerificationEmail } from "@/lib/auth/session"
import { useSession } from "@/lib/auth/use-session"
import { routes } from "@/lib/site"

/**
 * Client-side guard for /panel (keeps the panel static-export friendly). `admin` also requires the therapist role.
 * `publicPaths` render for everyone (booking: browse terms first, log in when booking).
 */
export function AuthGuard({ children, admin = false, publicPaths = [] }: { children: ReactNode; admin?: boolean; publicPaths?: string[] }) {
  const session = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const isPublic = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  useEffect(() => {
    if (isPublic) return
    if (session.status === "anonymous" && !session.endedByUser) router.replace(`${routes.login}?next=${encodeURIComponent(pathname)}`)
    if (session.status === "authenticated" && admin && !session.isAdmin) router.replace(routes.booking)
  }, [session.status, session.endedByUser, session.isAdmin, admin, pathname, router, isPublic])

  if (isPublic) return children
  if (session.status === "unverified") return <VerifyEmail />
  if (session.status !== "authenticated" || (admin && !session.isAdmin)) return <PanelLoader />
  return children
}

function PanelLoader() {
  return (
    <div role="status" aria-label="Wczytywanie" className="flex min-h-[50vh] items-center justify-center">
      <span className="size-10 animate-spin rounded-full border-2 border-mist-200 border-t-moss-600" />
    </div>
  )
}

function VerifyEmail() {
  const toast = useToast()
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function resend() {
    setPending(true)
    try {
      await resendVerificationEmail()
      toast("Wysłaliśmy nowy link na Twój e-mail")
    } catch (error) {
      toast(errorMessage(error), "error")
    } finally {
      setPending(false)
    }
  }

  async function checkAgain() {
    const session = await loadUser()
    if (session.status === "unverified") toast("Adres e-mail nie jest jeszcze potwierdzony", "error")
  }

  return (
    <div className="flex justify-center py-10">
      <AuthCard
        eyebrow="Jeszcze jeden krok"
        title="Potwierdź *adres e-mail*"
        lead="Wysłaliśmy wiadomość z linkiem potwierdzającym. Kliknij w niego, a potem wróć tutaj – dopiero wtedy można rezerwować wizyty."
      >
        <div className="flex flex-col gap-3">
          <Button onClick={checkAgain} className="w-full">
            Potwierdziłem – przejdź dalej
          </Button>
          <Button variant="quiet" onClick={resend} disabled={pending} className="w-full">
            {pending ? "Wysyłanie…" : "Wyślij link ponownie"}
          </Button>
          <button
            type="button"
            onClick={() => logout().then(() => router.replace(routes.login))}
            className="pt-2 text-[15px] font-medium text-moss-800 opacity-75 transition-opacity hover:opacity-100"
          >
            Wyloguj się
          </button>
        </div>
      </AuthCard>
    </div>
  )
}
