import Link from "next/link"

import { Button, ButtonArrow } from "@/components/ui/button"
import { mainNav, routes, site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="page-x bg-moss-950 pt-16 pb-8 text-moss-200 lg:pt-26 lg:pb-12">
      <div className="grid gap-11 lg:grid-cols-12 lg:gap-8">
        <p className="font-display text-3xl leading-tight font-light text-mist-50 lg:col-span-6 lg:text-[44px]">
          {site.name}
          <br />
          {site.tagline}
        </p>
        <nav aria-label="Stopka" className="grid grid-cols-2 gap-3.5 text-[15px] lg:col-span-2 lg:col-start-8 lg:grid-cols-1">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="opacity-70 transition-opacity duration-400 hover:opacity-100">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-start gap-3.5 text-[15px] lg:col-span-3 lg:col-start-10">
          {site.phone && (
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-display text-[26px] text-mist-50">
              {site.phone}
            </a>
          )}
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          <Button asChild variant="dawn" size="sm" className="mt-2">
            <Link href={routes.booking}>
              Umów wizytę
              <ButtonArrow className="w-[22px]" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-16 flex flex-col justify-between gap-2 border-t border-[#2c3b33] pt-6 text-[13px] lg:mt-20 lg:flex-row">
        <span>© {site.name}</span>
        <span>Polityka prywatności · Regulamin</span>
      </div>
    </footer>
  )
}
