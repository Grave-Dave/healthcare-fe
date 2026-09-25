import type { Metadata } from "next"

import { AdminVisitsView } from "@/components/panel/admin/admin-visits-view"
import { getOffices } from "@/lib/flotiq"

export const metadata: Metadata = { title: "Wizyty · Administrator" }

export default async function AdminVisitsPage() {
  const offices = await getOffices().catch(() => [])
  return <AdminVisitsView offices={offices.map((o) => ({ backendLocationId: o.backendLocationId, name: o.name, slug: o.slug }))} />
}
