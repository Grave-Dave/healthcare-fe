import { FogRings } from "@/components/icons"
import { Emphasis } from "@/components/text"

import type { SectionProps } from "./types"

export function StatementSection({ section }: SectionProps<"section_statement">) {
  return (
    <section id={section.anchor || undefined} className="page-x relative grid gap-5 overflow-x-clip pt-22 pb-8 lg:grid-cols-12 lg:gap-8 lg:pt-44 lg:pb-16">
      {section.fogRings && (
        <FogRings className="pointer-events-none absolute -top-28 -right-28 size-65 text-moss-300 opacity-50 lg:-top-48 lg:-right-44 lg:size-130 lg:opacity-55" />
      )}
      {section.eyebrow && <span className="eyebrow lg:col-span-3 lg:pt-4">{section.eyebrow}</span>}
      <p className="font-display text-3xl leading-snug font-light text-moss-900 lg:col-span-9 lg:col-start-4 lg:text-[52px] lg:leading-tight [&_em]:text-moss-400">
        <Emphasis text={section.text} />
      </p>
    </section>
  )
}
