import type { ComponentType } from "react"

import { AboutSection } from "./about-section"
import { ArticlesSection } from "./articles-section"
import { ContactSection } from "./contact-section"
import { CtaSection } from "./cta-section"
import { FaqSection } from "./faq-section"
import { HelpAreasSection } from "./help-areas-section"
import { HeroSection } from "./hero-section"
import { ImageBannerSection } from "./image-banner-section"
import { OfficesSection } from "./offices-section"
import { RichTextSection } from "./rich-text-section"
import { StatementSection } from "./statement-section"
import type { SectionContext, SectionProps, SectionType } from "./types"

// One component per Flotiq `section_*` content type (docs/content-model.md, part B).
const registry: { [T in SectionType]?: ComponentType<SectionProps<T>> } = {
  section_hero: HeroSection,
  section_statement: StatementSection,
  section_help_areas: HelpAreasSection,
  section_image_banner: ImageBannerSection,
  section_about: AboutSection,
  section_cta: CtaSection,
  section_offices: OfficesSection,
  section_rich_text: RichTextSection,
  section_faq: FaqSection,
  section_contact: ContactSection,
  section_articles: ArticlesSection,
}

type AnySection = { id: string; internal: { contentType: string } }

export function SectionRenderer({ sections, ctx }: { sections: unknown[] | undefined; ctx: SectionContext }) {
  return (sections ?? []).map((section) => {
    if (!section || typeof section !== "object" || !("internal" in section)) return null
    const { id, internal } = section as AnySection
    const Component = registry[internal.contentType as SectionType] as ComponentType<{ section: unknown; ctx: SectionContext }> | undefined

    // Unknown types are skipped, so a content type can exist in Flotiq before its component does.
    if (!Component) {
      if (process.env.NODE_ENV === "development") console.warn(`[sections] No component for "${internal.contentType}"`)
      return null
    }
    // `contents` keeps the layout untouched; the attribute names the section in analytics events.
    return (
      <div key={id} data-analytics={internal.contentType.replace("section_", "")} className="contents">
        <Component section={section} ctx={ctx} />
      </div>
    )
  })
}

export function startsWithHero(sections: unknown[] | undefined) {
  const first = sections?.[0] as AnySection | undefined
  return first?.internal?.contentType === "section_hero"
}
