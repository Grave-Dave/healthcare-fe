"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useSession } from "@/lib/auth/use-session"
import { routes } from "@/lib/site"

// Landing after login: the therapist goes to the admin panel, patients to booking. (AuthGuard shows the loader meanwhile.)
export default function PanelIndex() {
  const { status, isAdmin } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") router.replace(isAdmin ? routes.admin : routes.booking)
  }, [status, isAdmin, router])

  return null
}
