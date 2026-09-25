import Image from "next/image"
import Link from "next/link"

import { Emphasis } from "@/components/text"
import { Button, ButtonArrow } from "@/components/ui/button"
import { getMediaUrl } from "@/lib/flotiq"
import { resolveLink } from "@/lib/links"
import { cn } from "@/lib/utils"

import type { SectionProps } from "./types"

export function ImageBannerSection({ section }: SectionProps<"section_image_banner">) {
  const image = getMediaUrl(section.image)
  const cta = resolveLink(section.ctaLabel, section.ctaPage, section.ctaUrl)

  return (
    <section
      id={section.anchor || undefined}
      className={cn(
        "page-x relative py-6",
        // Band from the middle of the banner that runs into the next section (under its content).
        section.backdrop === "pas-od-polowy" &&
          "before:absolute before:inset-x-0 before:top-1/2 before:-bottom-[260px] before:-z-10 before:bg-[#e6ebe3] lg:before:-bottom-[520px]"
      )}
    >
      <div className="relative h-[440px] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-50px_rgb(26_38_32/0.45)] lg:h-[560px] lg:rounded-[40px]">
        {image && <Image src={image} alt="" fill sizes="100vw" className="object-cover saturate-75" />}
        <div aria-hidden="true" className="absolute inset-0 bg-moss-950/35" />
        <div className="relative flex h-full flex-col justify-end gap-6 p-6 text-white lg:items-center lg:justify-center lg:gap-8 lg:px-60 lg:text-center">
          <p className="font-display text-3xl leading-tight font-light italic lg:text-[50px] lg:leading-[1.25]">
            <Emphasis text={section.quote} />
          </p>
          {cta && (
            <Button asChild variant="light" className="justify-between">
              <Link href={cta.href}>
                {cta.label}
                <ButtonArrow />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
