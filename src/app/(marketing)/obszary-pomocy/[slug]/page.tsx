import { notFound } from "next/navigation"

import { HelpAreaIllustration } from "@/components/illustrations"
import { DetailHeader } from "@/components/layout/detail-header"
import { SiteFrame } from "@/components/layout/site-frame"
import { SectionRenderer } from "@/components/sections/section-renderer"
import { RichText } from "@/components/text"
import { getHelpArea, getHelpAreas, getSettings } from "@/lib/flotiq"
import { buildMetadata } from "@/lib/metadata"

export async function generateStaticParams() {
  try {
    return (await getHelpAreas()).map((area) => ({ slug: area.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps<"/obszary-pomocy/[slug]">) {
  const { slug } = await params
  const area = await getHelpArea(slug)
  return area ? buildMetadata({ ...area, title: area.name }, `/obszary-pomocy/${area.slug}`, area.summary) : {}
}

export default async function HelpAreaPage({ params }: PageProps<"/obszary-pomocy/[slug]">) {
  const { slug } = await params
  const [area, settings] = await Promise.all([getHelpArea(slug), getSettings()])
  if (!area) notFound()

  return (
    <SiteFrame overHero={false}>
      <DetailHeader
        back={{ label: "Obszary pomocy", href: "/obszary-pomocy" }}
        eyebrow="Obszar pomocy"
        title={area.name}
        lead={area.summary}
        aside={<HelpAreaIllustration name={area.illustration} className="mx-auto h-auto w-full max-w-[320px]" />}
      />
      {area.body && (
        <div className="page-x grid pb-20 lg:grid-cols-12 lg:gap-8 lg:pb-32">
          <RichText html={area.body} className="lg:col-span-7" />
        </div>
      )}
      <SectionRenderer sections={area.extraSections} ctx={{ settings }} />
    </SiteFrame>
  )
}
