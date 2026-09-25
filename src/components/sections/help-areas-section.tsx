import type { HelpArea } from "@flotiq/flotiq-api-sdk"

import { getHelpAreas } from "@/lib/flotiq"
import { resolveLink } from "@/lib/links"

import { HelpAreasExplorer } from "./help-areas-explorer"
import { SectionHeading } from "./section-heading"
import type { SectionProps } from "./types"

export async function HelpAreasSection({ section }: SectionProps<"section_help_areas">) {
  const selected = (section.areas ?? []) as HelpArea[]
  const areas = selected.length ? selected : await getHelpAreas()
  if (!areas.length) return null

  return (
    <section id={section.anchor || undefined} className="page-x py-22 lg:py-10">
      <HelpAreasExplorer
        heading={<SectionHeading eyebrow={section.eyebrow} title={section.title} link={resolveLink(section.moreLabel, section.morePage, section.moreUrl)} />}
        areas={areas.map((area) => ({
          id: area.id,
          name: area.name,
          slug: area.slug,
          summary: area.summary,
          illustration: area.illustration,
          hasPage: Boolean(area.body),
        }))}
      />
    </section>
  )
}
