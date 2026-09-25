import type { Metadata } from "next"
import { Suspense } from "react"

import { AdminPatientsView } from "@/components/panel/admin/admin-patients-view"
import { getOffices } from "@/lib/flotiq"

export const metadata: Metadata = { title: "Pacjenci · Administrator" }

export default async function AdminPatientsPage() {
  const offices = await getOffices().catch(() => [])
  return (
    <Suspense>
      <AdminPatientsView offices={offices.map((o) => ({ backendLocationId: o.backendLocationId, name: o.name, slug: o.slug }))} />
    </Suspense>
  )
}
