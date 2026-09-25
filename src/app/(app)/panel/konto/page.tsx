import type { Metadata } from "next"

import { AccountView } from "@/components/panel/account/account-view"

export const metadata: Metadata = { title: "Konto" }

export default function AccountPage() {
  return <AccountView />
}
