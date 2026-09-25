import type { Metadata } from "next"
import { Suspense } from "react"

import { PasswordResetForm } from "@/components/auth/password-forms"

export const metadata: Metadata = { title: "Nowe hasło" }

// Path is fixed by the backend e-mail (ResetPasswordNotification): /password/reset/{token}?email=...
export default function PasswordResetPage() {
  return (
    <Suspense>
      <PasswordResetForm />
    </Suspense>
  )
}
