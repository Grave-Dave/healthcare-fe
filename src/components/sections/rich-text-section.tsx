import { Emphasis, RichText } from "@/components/text"
import { cn } from "@/lib/utils"

import type { SectionProps } from "./types"

export function RichTextSection({ section }: SectionProps<"section_rich_text">) {
  const narrow = section.width !== "szeroka"

  return (
    <section id={section.anchor || undefined} className="page-x py-16 lg:py-24">
      <div className={cn("flex flex-col gap-8 lg:gap-12", narrow && "mx-auto max-w-[760px]")}>
        {(section.eyebrow || section.title) && (
          <div className="flex flex-col gap-4">
            {section.eyebrow && <span className="eyebrow">{section.eyebrow}</span>}
            {section.title && (
              <h2 className="font-display text-[38px] leading-[1.1] font-light lg:text-[56px]">
                <Emphasis text={section.title} />
              </h2>
            )}
          </div>
        )}
        <RichText html={section.body} />
      </div>
    </section>
  )
}
