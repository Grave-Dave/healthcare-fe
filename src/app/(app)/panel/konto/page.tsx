import type { Metadata } from "next"

export const metadata: Metadata = { title: "Konto" }

// Stage 2: port from legacy/src/containers (see docs/design-system.md, sections 8–9).
export default function AccountPage() {
  return (
    <div className="flex flex-col gap-3.5">
      <span className="eyebrow">Panel</span>
      <h1 className="font-display text-4xl font-light lg:text-[52px]">
        Twoje <em>konto</em>
      </h1>
    </div>
  )
}
