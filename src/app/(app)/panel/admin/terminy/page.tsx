import type { Metadata } from "next"
import { Suspense } from "react"

import { AdminTermsView } from "@/components/panel/admin/admin-terms-view"
import { getOffices } from "@/lib/flotiq"

export const metadata: Metadata = { title: "Terminy · Administrator" }

export default async function AdminTermsPage() {
  const offices = await getOffices().catch(() => [])
  return (
    <Suspense>
      <AdminTermsView offices={offices.map((o) => ({ backendLocationId: o.backendLocationId, name: o.name, slug: o.slug }))} />
    </Suspense>
  )
}
