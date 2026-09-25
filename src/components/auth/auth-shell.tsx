import Link from "next/link"
import type { ReactNode } from "react"

import { FogRings } from "@/components/icons"
import { Emphasis } from "@/components/text"
import { site } from "@/lib/site"

/** Frame for login / register / password pages: calm mist background, one centred card. */
export function AuthShell({ children }: { children: ReactNode }) {
  const [first, ...rest] = site.name.split(" ")

  return (
    <div className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <FogRings className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[520px] text-moss-300 opacity-40" />
      <FogRings className="pointer-events-none absolute -bottom-52 -left-52 -z-10 hidden size-[620px] text-moss-300 opacity-30 lg:block" />
      <header className="page-x flex h-[76px] items-center justify-between">
        <Link href="/" className="font-display text-[19px] lg:text-[22px]">
          {first} <em>{rest.join(" ")}</em>
        </Link>
        <Link href="/" className="group inline-flex items-center gap-2 text-[15px] font-medium text-moss-800 opacity-70 transition-opacity hover:opacity-100">
          <span aria-hidden="true" className="transition-[translate] duration-500 ease-mist group-hover:-translate-x-1">
            ←
          </span>
          Strona główna
        </Link>
      </header>
      <main className="flex flex-1 items-start justify-center px-5 pt-6 pb-16 lg:items-center lg:py-16">{children}</main>
    </div>
  )
}

export function AuthCard({ eyebrow, title, lead, children }: { eyebrow?: string; title: string; lead?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex w-full max-w-[480px] flex-col gap-8 rounded-[28px] bg-white px-6 py-9 shadow-[0_30px_70px_-44px_rgb(26_38_32/0.3)] lg:rounded-[32px] lg:px-11 lg:py-12">
      <div className="flex flex-col gap-3">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="font-display text-[34px] leading-[1.1] font-light lg:text-[40px]">
          <Emphasis text={title} />
        </h1>
        {lead && <p className="text-[15px] leading-relaxed text-moss-500">{lead}</p>}
      </div>
      {children}
    </div>
  )
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-4 text-[13px] text-moss-500" aria-hidden="true">
      <span className="h-px flex-1 bg-mist-200" />
      lub
      <span className="h-px flex-1 bg-mist-200" />
    </div>
  )
}
