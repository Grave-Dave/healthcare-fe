import type { HelpArea } from "@flotiq/flotiq-api-sdk"
import Image from "next/image"
import Link from "next/link"

import { getArticles, getMediaUrl } from "@/lib/flotiq"

import { SectionHeading } from "./section-heading"
import type { SectionProps } from "./types"

const dateFormat = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" })

export async function ArticlesSection({ section }: SectionProps<"section_articles">) {
  const area = ((section.helpArea ?? []) as HelpArea[])[0]
  const all = await getArticles(section.limit || 100)
  const articles = area
    ? all.filter((article) =>
        (article.helpAreas as { id?: string; dataUrl?: string }[] | undefined)?.some(
          (related) => related.id === area.id || related.dataUrl?.endsWith(`/${area.id}`)
        )
      )
    : all

  return (
    <section id={section.anchor || undefined} className="page-x flex flex-col gap-10 pt-16 pb-22 lg:gap-16 lg:pt-28 lg:pb-[160px]">
      <SectionHeading eyebrow={section.eyebrow} title={section.title} />
      {articles.length === 0 ? (
        <p className="rounded-3xl p-8 text-lg text-moss-500 shadow-[inset_0_0_0_1px_var(--color-mist-200)]">Pierwsze artykuły pojawią się wkrótce.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {articles.map((article) => {
            const cover = getMediaUrl(article.cover, { width: 900 })
            return (
              <Link key={article.id} href={`/artykuly/${article.slug}`} className="group flex flex-col gap-5 rounded-3xl bg-white p-3 pb-6 shadow-rest transition-[box-shadow,translate] duration-600 ease-mist hover:-translate-y-0.5 hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist-100">
                  {cover && <Image src={cover} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />}
                </div>
                <div className="flex flex-col gap-2 px-3">
                  <span className="text-sm text-moss-500">{dateFormat.format(new Date(article.publishedAt))}</span>
                  <span className="font-display text-2xl leading-tight">{article.title}</span>
                  <p className="line-clamp-3 text-[15px] leading-relaxed text-moss-700">{article.lead}</p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}
