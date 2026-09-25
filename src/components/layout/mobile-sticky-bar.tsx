"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { PhoneIcon } from "@/components/icons"
import { Button, ButtonArrow } from "@/components/ui/button"
import type { ResolvedLink } from "@/lib/links"
import { cn } from "@/lib/utils"

/** Mobile only: appears after the first screen, hides while the footer (which has its own CTA) is visible. */
export function MobileStickyBar({ phone, cta }: { phone?: string; cta: ResolvedLink | null }) {
  const [pastHero, setPastHero] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    const footer = document.getElementById("site-footer")
    const observer = footer ? new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting)) : null
    if (footer) observer?.observe(footer)

    return () => {
      window.removeEventListener("scroll", onScroll)
      observer?.disconnect()
    }
  }, [])

  if (!cta) return null
  const visible = pastHero && !footerVisible

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 flex items-center gap-2.5 bg-mist-50/90 px-4 pt-3 pb-[max(1.75rem,env(safe-area-inset-bottom))] shadow-[0_-18px_40px_-24px_rgb(26_38_32/0.25)] backdrop-blur-[16px] transition-[opacity,translate] duration-700 ease-mist lg:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      {phone && (
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          aria-label={`Zadzwoń: ${phone}`}
          tabIndex={visible ? undefined : -1}
          className="grid size-14 shrink-0 place-items-center rounded-full bg-white text-moss-800 shadow-[inset_0_0_0_1px_var(--color-mist-300)]"
        >
          <PhoneIcon width={21} height={21} />
        </a>
      )}
      <Button asChild className="flex-1 justify-between">
        <Link href={cta.href} tabIndex={visible ? undefined : -1}>
          {cta.label}
          <ButtonArrow className="w-7" />
        </Link>
      </Button>
    </div>
  )
}
