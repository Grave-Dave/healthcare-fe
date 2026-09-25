"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"

import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons"
import { Emphasis } from "@/components/text"
import { Button, ButtonArrow } from "@/components/ui/button"
import type { ResolvedLink } from "@/lib/links"
import { routes } from "@/lib/site"
import { cn } from "@/lib/utils"

const SCROLL_THRESHOLD = 80

export type NavbarProps = {
  siteName: string
  items: ResolvedLink[]
  showLogin: boolean
  phone?: string
  cta: ResolvedLink | null
  /** Transparent over a hero until the page is scrolled. */
  overHero: boolean
}

export function Navbar({ siteName, items, showLogin, phone, cta, overHero }: NavbarProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const transparent = overHero && !scrolled
  const menuItems = showLogin ? [...items, { label: "Zaloguj się", href: routes.login }] : items
  const [first, ...rest] = siteName.split(" ")

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,color,height] duration-500 ease-mist",
        transparent
          ? "h-24 text-white lg:h-28"
          : "h-[68px] bg-mist-50/85 text-moss-950 shadow-[0_1px_0_rgb(26_38_32/0.06),0_18px_40px_-30px_rgb(26_38_32/0.35)] backdrop-blur-[18px] lg:h-[76px]"
      )}
    >
      <div className="page-x flex h-full items-center justify-between">
        <Link href="/" className="font-display text-[19px] leading-tight lg:text-[22px]">
          {first} <em>{rest.join(" ")}</em>
        </Link>

        <nav aria-label="Główna" className="hidden items-center gap-9 text-lg lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="relative py-1.5 opacity-70 transition-opacity duration-400 hover:opacity-100 aria-[current=page]:opacity-100 aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:-bottom-0.5 aria-[current=page]:after:h-[1.5px] aria-[current=page]:after:bg-current"
            >
              {item.label}
            </Link>
          ))}
          {showLogin && (
            <Link href={routes.login} className="opacity-70 transition-opacity duration-400 hover:opacity-100">
              Zaloguj
            </Link>
          )}
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 font-medium opacity-85 transition-opacity hover:opacity-100">
              <PhoneIcon />
              {phone}
            </a>
          )}
          {cta && (
            <Button asChild variant={transparent ? "light" : "primary"} size="sm" className="gap-3.5">
              <Link href={cta.href}>
                {cta.label}
                <ButtonArrow className="w-[22px]" />
              </Link>
            </Button>
          )}
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, "")}`} aria-label={`Zadzwoń: ${phone}`} className="grid size-11 place-items-center">
              <PhoneIcon width={20} height={20} />
            </a>
          )}
          <button type="button" aria-label="Otwórz menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className="grid size-11 place-items-center">
            <MenuIcon />
          </button>
        </div>
      </div>

      {menuOpen && <MobileMenu siteName={siteName} items={menuItems} phone={phone} cta={cta} onClose={closeMenu} />}
    </header>
  )
}

type MobileMenuProps = { siteName: string; items: ResolvedLink[]; phone?: string; cta: ResolvedLink | null; onClose: () => void }

/**
 * Rendered in <body> through a portal: the scrolled navbar uses backdrop-filter, which would make it the
 * containing block for fixed children (the menu would shrink to the navbar height and the page would scroll under it).
 */
function MobileMenu({ siteName, items, phone, cta, onClose }: MobileMenuProps) {
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-x-0 top-0 z-50 flex h-dvh flex-col overflow-y-auto overscroll-contain bg-mist-50 text-moss-950 lg:hidden">
      <div className="flex h-[68px] items-center justify-between pr-3 pl-5">
        <span className="font-display text-[19px]">
          <Emphasis text={siteName} />
        </span>
        <button type="button" aria-label="Zamknij menu" onClick={onClose} className="grid size-11 place-items-center">
          <CloseIcon />
        </button>
      </div>
      <nav aria-label="Menu główne" className="flex flex-col px-5 pt-9">
        {items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="flex animate-fade-up items-baseline gap-4 border-b border-mist-200 py-3.5 opacity-80 last:border-none hover:opacity-100"
            style={{ animationDelay: `${50 + i * 50}ms` }}
          >
            <span className="w-5 text-xs text-moss-500">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-[34px] font-light">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-6 px-5 pb-8">
        {phone && (
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-3 font-display text-[26px]">
            <PhoneIcon width={20} height={20} />
            {phone}
          </a>
        )}
        {cta && (
          <Button asChild className="w-full justify-between">
            <Link href={cta.href} onClick={onClose}>
              {cta.label}
              <ButtonArrow />
            </Link>
          </Button>
        )}
      </div>
    </div>,
    document.body
  )
}
