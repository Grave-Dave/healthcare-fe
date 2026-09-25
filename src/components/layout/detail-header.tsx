import Link from "next/link"
import type { ReactNode } from "react"

import { Emphasis } from "@/components/text"

type Crumb = { label: string; href: string }

/** Title block for collection detail pages (help area, office, article). */
export function DetailHeader({ back, eyebrow, title, lead, aside }: { back: Crumb; eyebrow?: string; title: string; lead?: string; aside?: ReactNode }) {
  return (
    <header className="page-x grid grid-cols-1 gap-10 pt-12 pb-14 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-24">
      <div className="flex flex-col gap-6 lg:col-span-7">
        <Link href={back.href} className="group inline-flex items-center gap-2 self-start text-sm font-medium text-moss-800 opacity-70 transition-opacity hover:opacity-100">
          <span aria-hidden="true" className="transition-transform duration-500 ease-mist group-hover:-translate-x-1">
            ←
          </span>
          {back.label}
        </Link>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="font-display text-[40px] leading-[1.08] font-light lg:text-[72px] lg:leading-[1.04]">
          <Emphasis text={title} />
        </h1>
        {lead && <p className="max-w-2xl text-lg leading-relaxed text-moss-700 lg:text-[21px]">{lead}</p>}
      </div>
      {aside && <div className="lg:col-span-4 lg:col-start-9">{aside}</div>}
    </header>
  )
}
