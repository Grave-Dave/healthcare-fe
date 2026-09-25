import type { Metadata } from "next"

import { MyVisitsView, type OfficeLink } from "@/components/panel/visits/my-visits-view"
import { getOffices, getSettings } from "@/lib/flotiq"

export const metadata: Metadata = { title: "Moje wizyty" }

// Office names/links and the cancellation policy come from Flotiq; the visits themselves are fetched in the browser.
export default async function MyVisitsPage() {
  const [offices, settings] = await Promise.all([getOffices().catch(() => []), getSettings().catch(() => undefined)])
  const officeLinks: OfficeLink[] = offices.map((office) => ({ backendLocationId: office.backendLocationId, name: office.name, slug: office.slug }))

  return <MyVisitsView offices={officeLinks} cancellationPolicy={settings?.cancellationPolicy} />
}
