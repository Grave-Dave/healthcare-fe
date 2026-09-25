import type { Metadata } from "next"
import { Suspense } from "react"

import { BookingView, type OfficeInfo } from "@/components/panel/booking/booking-view"
import { getOffices, getSettings } from "@/lib/flotiq"

export const metadata: Metadata = { title: "Rezerwacja" }

// Office names and the booking note come from Flotiq (at build time in a static export); terms are fetched in the browser.
export default async function BookingPage() {
  const [offices, settings] = await Promise.all([getOffices().catch(() => []), getSettings().catch(() => undefined)])
  const officeInfo: OfficeInfo[] = offices.map((office) => ({ backendLocationId: office.backendLocationId, name: office.name, slug: office.slug }))

  return (
    <Suspense>
      <BookingView offices={officeInfo} note={settings?.bookingNote} />
    </Suspense>
  )
}
