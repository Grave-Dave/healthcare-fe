import Image from "next/image"
import Link from "next/link"

import { Emphasis } from "@/components/text"
import { Button, ButtonArrow } from "@/components/ui/button"
import { getMediaUrl } from "@/lib/flotiq"
import { resolveLink } from "@/lib/links"

import type { SectionProps } from "./types"

export function HeroSection({ section }: SectionProps<"section_hero">) {
  const image = getMediaUrl(section.image)
  const animation = getMediaUrl(section.animation)
  const video = getMediaUrl(section.video)
  const primary = resolveLink(section.primaryCtaLabel, section.primaryCtaPage, section.primaryCtaUrl)
  const secondary = resolveLink(section.secondaryCtaLabel, section.secondaryCtaPage, section.secondaryCtaUrl)

  return (
    <section id={section.anchor || undefined} className="relative z-10 flex h-svh min-h-[640px] flex-col justify-end overflow-hidden text-white lg:justify-center">
      {video ? (
        <video className="absolute inset-0 size-full animate-hero-drift object-cover" src={video} poster={image} autoPlay muted loop playsInline aria-hidden="true" />
      ) : animation ? (
        <picture>
          {image && <source media="(prefers-reduced-motion: reduce)" srcSet={image} />}
          {/* GIFs are served as-is (next/image would not optimise them anyway) */}
          <img src={animation} alt="" fetchPriority="high" className="absolute inset-0 size-full animate-hero-drift object-cover" />
        </picture>
      ) : image ? (
        <Image src={image} alt="" fill priority sizes="100vw" className="animate-hero-drift object-cover" />
      ) : null}
      <div aria-hidden="true" className="absolute inset-0 bg-moss-950/35" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-[rgb(14_22_18/0.5)] via-[rgb(14_22_18/0.18)] to-transparent lg:h-50" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-b from-transparent via-mist-50/35 to-mist-50 lg:h-28" />

      <div className="page-x relative flex max-w-[1020px] animate-rise flex-col gap-6 pb-30 lg:gap-8 lg:pb-0">
        {section.eyebrow && <span className="text-xs tracking-[0.16em] text-dawn-300 uppercase lg:text-sm">{section.eyebrow}</span>}
        <h1 className="font-display text-5xl leading-[1.05] font-light lg:text-[92px] lg:leading-[1.02]">
          <Emphasis text={section.title} />
        </h1>
        {section.lead && <p className="max-w-[600px] text-[17px] leading-relaxed text-[#e6eae5] lg:text-[21px]">{section.lead}</p>}
        {(primary || secondary) && (
          <div className="flex flex-col gap-3 pt-2 lg:flex-row lg:gap-4">
            {primary && (
              <Button asChild variant="dawn" className="justify-between lg:justify-center">
                <Link href={primary.href}>
                  {primary.label}
                  <ButtonArrow />
                </Link>
              </Button>
            )}
            {secondary && (
              <Button asChild variant="ghost">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        )}
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-9 left-1/2 flex h-[38px] w-6 -translate-x-1/2 animate-scroll-cue justify-center rounded-full border-[1.5px] border-white/70 pt-[7px] lg:bottom-12 lg:h-[46px] lg:w-7 lg:pt-2"
      >
        <span className="h-[7px] w-[3px] rounded-full bg-white lg:h-2" />
      </div>
    </section>
  )
}
