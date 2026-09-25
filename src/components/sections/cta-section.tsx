import Link from "next/link"

import { PhoneIcon } from "@/components/icons"
import { Emphasis } from "@/components/text"
import { Button, ButtonArrow } from "@/components/ui/button"
import { resolveLink } from "@/lib/links"

import type { SectionProps } from "./types"

export function CtaSection({ section, ctx }: SectionProps<"section_cta">) {
  const cta = resolveLink(section.ctaLabel, section.ctaPage, section.ctaUrl)
  const phone = section.showPhone ? ctx.settings?.phone : undefined

  return (
    <section id={section.anchor || undefined} className="page-x py-10 lg:py-16">
      <div className="relative isolate mr-3.5 lg:mr-7">
        <div aria-hidden="true" className="absolute inset-0 -z-10 translate-3.5 rounded-[28px] shadow-[inset_0_0_0_1px_var(--color-moss-200)] lg:translate-7 lg:rounded-[40px]" />
        <div className="grid gap-7 rounded-[28px] bg-moss-800 px-6 pt-11 pb-10 text-white shadow-[0_40px_80px_-48px_rgb(26_38_32/0.5)] lg:grid-cols-12 lg:items-center lg:gap-8 lg:rounded-[40px] lg:px-24 lg:py-26">
          <div className="flex flex-col gap-3.5 lg:col-span-7 lg:gap-5">
            <h2 className="font-display text-[32px] leading-tight font-light lg:text-[54px] lg:leading-[1.1]">
              <Emphasis text={section.title} />
            </h2>
            {section.text && <p className="text-base leading-relaxed text-moss-100 lg:text-[19px]">{section.text}</p>}
          </div>
          <div className="flex flex-col gap-7 lg:col-span-4 lg:col-start-9 lg:items-end">
            {cta && (
              <Button asChild variant="dawn" size="lg" className="justify-between">
                <Link href={cta.href}>
                  {cta.label}
                  <ButtonArrow />
                </Link>
              </Button>
            )}
            {phone && (
              <div className="flex flex-col gap-2.5 border-t border-white/15 pt-6 lg:items-end lg:border-none lg:pt-0">
                <span className="text-xs tracking-[0.18em] text-moss-100 uppercase">lub zadzwoń</span>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-3 font-display text-3xl text-white opacity-90 transition-opacity hover:opacity-100 lg:text-[38px]">
                  <span className="grid size-10 place-items-center rounded-full shadow-[inset_0_0_0_1px_currentColor] lg:size-11">
                    <PhoneIcon width={18} height={18} />
                  </span>
                  {phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
