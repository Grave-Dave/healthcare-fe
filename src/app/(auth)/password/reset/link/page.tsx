import type { Metadata } from "next"

import { PasswordResetLinkForm } from "@/components/auth/password-forms"

export const metadata: Metadata = { title: "Przypomnienie hasła" }

export default function PasswordResetLinkPage() {
  return <PasswordResetLinkForm />
}
