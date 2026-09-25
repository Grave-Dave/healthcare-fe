import type { Metadata } from "next"
import { Suspense } from "react"

import { GoogleCallback } from "@/components/auth/google-callback"

export const metadata: Metadata = { title: "Logowanie przez Google" }

export default function GoogleLoginPage() {
  return (
    <Suspense>
      <GoogleCallback />
    </Suspense>
  )
}
