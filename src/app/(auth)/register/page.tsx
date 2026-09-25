import type { Metadata } from "next"
import { Suspense } from "react"

import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = { title: "Załóż konto" }

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}
