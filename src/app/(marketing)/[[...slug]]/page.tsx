import { notFound } from "next/navigation"

import { SiteFrame } from "@/components/layout/site-frame"
import { SectionRenderer, startsWithHero } from "@/components/sections/section-renderer"
import { getPage, getPages, getSettings } from "@/lib/flotiq"
import { buildMetadata } from "@/lib/metadata"

// `/` → slug "index", `/o-mnie` → "o-mnie", `/a/b` → "a/b".
const toSlug = (segments?: string[]) => (segments?.length ? segments.join("/") : "index")
const toPath = (slug: string) => (slug === "index" ? "/" : `/${slug}`)

export async function generateStaticParams() {
  try {
    const pages = await getPages()
    return pages.map((page) => ({ slug: page.slug === "index" ? [] : page.slug.split("/") }))
  } catch {
    // No Flotiq access at build time – pages render on first request.
    return []
  }
}

export async function generateMetadata({ params }: PageProps<"/[[...slug]]">) {
  const { slug } = await params
  const page = await getPage(toSlug(slug))
  return page ? buildMetadata(page, toPath(page.slug)) : {}
}

export default async function CmsPage({ params }: PageProps<"/[[...slug]]">) {
  const { slug } = await params
  const [page, settings] = await Promise.all([getPage(toSlug(slug)), getSettings()])
  if (!page) notFound()

  const layoutId = (page.layout?.[0] as { id?: string } | undefined)?.id

  return (
    <SiteFrame layoutId={layoutId} overHero={startsWithHero(page.sections)}>
      <SectionRenderer sections={page.sections} ctx={{ settings }} />
    </SiteFrame>
  )
}
