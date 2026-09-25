import type { FaqItem } from "@flotiq/flotiq-api-sdk"

import { RichText } from "@/components/text"

import { SectionHeading } from "./section-heading"
import type { SectionProps } from "./types"

const plain = (html?: string) => html?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() ?? ""

export function FaqSection({ section }: SectionProps<"section_faq">) {
  const items = ((section.items ?? []) as FaqItem[]).filter((item) => item?.question)
  if (!items.length) return null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: plain(item.answer) },
    })),
  }

  return (
    <section id={section.anchor || undefined} className="page-x grid grid-cols-1 gap-9 py-22 lg:grid-cols-12 lg:gap-8 lg:py-[160px]">
      <div className="lg:col-span-4">
        <SectionHeading eyebrow={section.eyebrow} title={section.title} />
      </div>
      <div className="flex flex-col lg:col-span-7 lg:col-start-6">
        {items.map((item) => (
          <details key={item.id} className="group border-t border-mist-200 last:border-b">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[22px] leading-snug opacity-80 transition-opacity duration-400 hover:opacity-100 group-open:opacity-100 lg:py-7 lg:text-[26px] [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="size-2.5 shrink-0 -translate-y-0.5 rotate-45 border-r-[1.5px] border-b-[1.5px] border-moss-600 transition-transform duration-500 ease-mist group-open:translate-y-0.5 group-open:-rotate-135"
              />
            </summary>
            <div className="animate-fade-up pb-7">
              <RichText html={item.answer} className="text-[17px]" />
            </div>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </section>
  )
}
