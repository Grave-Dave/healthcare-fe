"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { routes, site } from "@/lib/site"

const panelNav = [
  { href: routes.booking, label: "Rezerwacja" },
  { href: routes.myVisits, label: "Moje wizyty" },
  { href: routes.account, label: "Konto" },
]

export function PanelHeader() {
  const pathname = usePathname()

  return (
    <header className="page-x flex h-[76px] items-center justify-between border-b border-mist-200">
      <div className="flex items-center gap-16">
        <Link href={routes.home} className="font-display text-[19px] lg:text-[22px]">
          {site.name.split(" ")[0]} <em>{site.name.split(" ").slice(1).join(" ")}</em>
        </Link>
        <nav aria-label="Panel" className="hidden gap-9 text-[15px] font-medium lg:flex">
          {panelNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
              className="relative py-1.5 opacity-55 transition-opacity duration-400 hover:opacity-100 aria-[current=page]:opacity-100 aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:-bottom-0.5 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-sm aria-[current=page]:after:bg-moss-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
