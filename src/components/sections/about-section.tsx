import Image from "next/image"

import { FogRings } from "@/components/icons"
import { Emphasis, RichText } from "@/components/text"
import { getMediaUrl } from "@/lib/flotiq"
import { cn } from "@/lib/utils"

import { AboutTabs } from "./about-tabs"
import type { SectionProps } from "./types"

// "Psychologia | Uniwersytet Wrocławski" per line → fact cards.
function parseFacts(facts?: string) {
  return (facts ?? "")
    .split("\n")
    .map((line) => line.split("|").map((part) => part.trim()))
    .filter(([label]) => label)
    .map(([label, value]) => ({ label, value: value ?? "" }))
}

export function AboutSection({ section }: SectionProps<"section_about">) {
  const portrait = getMediaUrl(section.portrait)

  return (
    <section
      id={section.anchor || undefined}
      className={cn(
        "page-x relative grid gap-10 py-22 lg:grid-cols-12 lg:gap-8 lg:pt-[200px] lg:pb-[220px]",
        // Offset block bleeds into the next section; -z-10 in <main>'s stacking context keeps it under all content.
        section.decoration === "przesuniete-tlo" &&
          "after:absolute after:top-[640px] after:right-0 after:-bottom-15 after:left-[30%] after:-z-10 after:rounded-l-[40px] after:bg-mist-100 lg:after:top-[300px] lg:after:-bottom-50 lg:after:left-[46%] lg:after:rounded-l-[64px]"
      )}
    >
      <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
        <FogRings className="pointer-events-none absolute top-1/2 -left-24 hidden size-[300px] -translate-y-1/2 text-moss-300 opacity-60 lg:block xl:-left-10" />
        <div className="relative isolate w-full max-w-[326px] lg:max-w-[440px]">
          <div aria-hidden="true" className="absolute inset-0 -z-10 translate-3.5 rounded-t-full rounded-b-[28px] shadow-[inset_0_0_0_1px_var(--color-moss-300)] lg:translate-7 lg:rounded-b-[36px]" />
          {portrait && (
            <Image
              src={portrait}
              alt={section.personName.replace(/\*/g, "")}
              width={440}
              height={600}
              sizes="(min-width: 1024px) 440px, 326px"
              className="h-[440px] w-full rounded-t-full rounded-b-[28px] object-cover lg:h-[600px] lg:rounded-b-[36px]"
            />
          )}
          {section.badgeTitle && (
            <div className="absolute bottom-[-28px] left-4 flex flex-col gap-0.5 rounded-2xl bg-white px-4.5 py-3.5 shadow-[0_20px_40px_-20px_rgb(26_38_32/0.3)] lg:right-[-40px] lg:bottom-14 lg:left-auto lg:rounded-[20px] lg:px-6.5 lg:py-5.5">
              <span className="font-display text-lg lg:text-[22px]">{section.badgeTitle}</span>
              {section.badgeText && <span className="text-xs text-moss-500 lg:text-sm">{section.badgeText}</span>}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-10 pt-5 lg:col-span-6 lg:col-start-7 lg:gap-14 lg:pt-6">
        <div className="flex flex-col gap-3 lg:gap-5">
          {section.eyebrow && <span className="eyebrow">{section.eyebrow}</span>}
          <h2 className="font-display text-[38px] leading-[1.1] font-light lg:text-[60px] lg:leading-[1.08]">
            <Emphasis text={section.personName} />
          </h2>
          {section.role && <p className="text-base text-moss-500 lg:text-lg">{section.role}</p>}
        </div>
        <AboutTabs
          tabs={section.tabs.map((tab, index) => ({
            id: `tab-${index}`,
            label: tab.label ?? `Zakładka ${index + 1}`,
            body: <RichText html={tab.body} className="text-[17px] leading-[1.75] text-moss-700 lg:text-[19px] lg:leading-[1.8]" />,
            facts: parseFacts(tab.facts),
          }))}
        />
      </div>
    </section>
  )
}
