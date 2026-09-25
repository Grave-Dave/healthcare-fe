import Link from "next/link"

import { Emphasis } from "@/components/text"
import type { ResolvedLink } from "@/lib/links"

export function SectionHeading({ eyebrow, title, link }: { eyebrow?: string; title?: string; link?: ResolvedLink | null }) {
  if (!eyebrow && !title) return null
  return (
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
      <div className="flex flex-col gap-4 lg:gap-5">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        {title && (
          <h2 className="font-display text-[38px] leading-[1.1] font-light lg:text-[64px] lg:leading-[1.05]">
            <Emphasis text={title} />
          </h2>
        )}
      </div>
      {link && (
        <Link href={link.href} className="group inline-flex items-center gap-2 font-medium text-moss-800 opacity-75 transition-opacity duration-400 hover:opacity-100">
          {link.label}
          <span aria-hidden="true" className="transition-transform duration-500 ease-mist group-hover:translate-x-1">
            →
          </span>
        </Link>
      )}
    </div>
  )
}
