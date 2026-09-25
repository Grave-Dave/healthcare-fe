import type { HelpArea } from "@flotiq/flotiq-api-sdk"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { DetailHeader } from "@/components/layout/detail-header"
import { SiteFrame } from "@/components/layout/site-frame"
import { SectionRenderer } from "@/components/sections/section-renderer"
import { RichText } from "@/components/text"
import { getArticle, getArticles, getMediaUrl, getSettings } from "@/lib/flotiq"
import { buildMetadata } from "@/lib/metadata"

const dateFormat = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" })

export async function generateStaticParams() {
  try {
    return (await getArticles()).map((article) => ({ slug: article.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps<"/artykuly/[slug]">) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return {}
  const metadata = await buildMetadata({ ...article, ogImage: article.ogImage?.length ? article.ogImage : article.cover }, `/artykuly/${article.slug}`, article.lead)
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: article.publishedAt } }
}

export default async function ArticlePage({ params }: PageProps<"/artykuly/[slug]">) {
  const { slug } = await params
  const [article, settings] = await Promise.all([getArticle(slug), getSettings()])
  if (!article) notFound()

  const cover = getMediaUrl(article.cover, { width: 1800 })
  const areas = (article.helpAreas ?? []) as HelpArea[]

  return (
    <SiteFrame overHero={false}>
      <article>
        <DetailHeader back={{ label: "Artykuły", href: "/artykuly" }} eyebrow={dateFormat.format(new Date(article.publishedAt))} title={article.title} lead={article.lead} />
        {cover && (
          <div className="page-x pb-14 lg:pb-20">
            <div className="relative aspect-[16/9] overflow-hidden rounded-card lg:rounded-panel">
              <Image src={cover} alt="" fill priority sizes="100vw" className="object-cover" />
            </div>
          </div>
        )}
        <div className="page-x pb-20 lg:pb-32">
          <RichText html={article.body} className="mx-auto max-w-[760px]" />
          {areas.length > 0 && (
            <div className="mx-auto mt-14 flex max-w-[760px] flex-wrap items-center gap-3 border-t border-mist-200 pt-8">
              <span className="eyebrow mr-2">Powiązane obszary</span>
              {areas.map((area) => (
                <Link key={area.id} href={`/obszary-pomocy/${area.slug}`} className="rounded-full px-4 py-2 text-sm font-medium shadow-[inset_0_0_0_1px_var(--color-mist-300)] transition-colors hover:bg-white">
                  {area.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </article>
      <SectionRenderer sections={article.extraSections} ctx={{ settings }} />
    </SiteFrame>
  )
}
