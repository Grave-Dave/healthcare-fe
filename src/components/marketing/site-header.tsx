"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons"
import { Button, ButtonArrow } from "@/components/ui/button"
import { mainNav, routes, site } from "@/lib/site"
import { cn } from "@/lib/utils"

const SCROLL_THRESHOLD = 80

export function SiteHeader() {
  const pathname = usePathname()
  const hasHero = pathname === "/"
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Transparent only on top of the hero; solid mist bar everywhere else.
  const onHero = hasHero && !scrolled

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,color,height] duration-500 ease-mist",
        onHero
          ? "h-24 text-white lg:h-28"
          : "h-[68px] bg-mist-50/85 text-moss-950 shadow-[0_1px_0_rgb(26_38_32/0.06),0_18px_40px_-30px_rgb(26_38_32/0.35)] backdrop-blur-[18px] lg:h-[76px]"
      )}
    >
      <div className="page-x flex h-full items-center justify-between">
        <Link href={routes.home} className="font-display text-[19px] leading-tight lg:text-[22px]">
          {site.name.split(" ")[0]} <em>{site.name.split(" ").slice(1).join(" ")}</em>
        </Link>

        <nav aria-label="Główna" className="hidden items-center gap-9 text-[15px] lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="opacity-70 transition-opacity duration-400 hover:opacity-100 aria-[current=page]:opacity-100"
            >
              {item.label}
            </Link>
          ))}
          <Link href={routes.login} className="opacity-70 transition-opacity duration-400 hover:opacity-100">
            Zaloguj
          </Link>
          {site.phone && (
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 font-medium opacity-85 hover:opacity-100">
              <PhoneIcon />
              {site.phone}
            </a>
          )}
          <Button asChild variant={onHero ? "light" : "primary"} size="sm" className="gap-3.5">
            <Link href={routes.booking}>
              Umów wizytę
              <ButtonArrow className="w-[22px]" />
            </Link>
          </Button>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          {site.phone && (
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} aria-label="Zadzwoń" className="grid size-11 place-items-center">
              <PhoneIcon width={20} height={20} />
            </a>
          )}
          <button type="button" aria-label="Otwórz menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className="grid size-11 place-items-center">
            <MenuIcon />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col bg-mist-50 text-moss-950 lg:hidden">
          <div className="flex h-[68px] items-center justify-between pr-3 pl-5">
            <span className="font-display text-[19px]">{site.name}</span>
            <button type="button" aria-label="Zamknij menu" onClick={() => setMenuOpen(false)} className="grid size-11 place-items-center">
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="Menu główne" className="flex flex-col px-5 pt-9">
            {[...mainNav, { href: routes.login, label: "Zaloguj się" }].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-4 border-b border-mist-200 py-3.5 opacity-80 last:border-none hover:opacity-100 animate-fade-up"
                style={{ animationDelay: `${50 + i * 50}ms` }}
              >
                <span className="w-5 text-xs text-moss-500">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[34px] font-light">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-6 px-5 pb-8">
            <Button asChild className="w-full justify-between">
              <Link href={routes.booking} onClick={() => setMenuOpen(false)}>
                Umów wizytę
                <ButtonArrow />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
