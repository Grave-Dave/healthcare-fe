import Link from "next/link"

import { Emphasis } from "@/components/text"
import { Button, ButtonArrow } from "@/components/ui/button"
import type { ResolvedLink } from "@/lib/links"

export type FooterProps = {
  siteName: string
  headline?: string
  links: ResolvedLink[]
  legalLinks: ResolvedLink[]
  phone?: string
  email?: string
  cta: ResolvedLink | null
}

export function Footer({ siteName, headline, links, legalLinks, phone, email, cta }: FooterProps) {
  return (
    <footer id="site-footer" className="page-x bg-moss-950 pt-16 pb-8 text-moss-200 lg:pt-26 lg:pb-12">
      <div className="grid gap-11 lg:grid-cols-12 lg:gap-8">
        <p className="font-display text-3xl leading-tight font-light text-mist-50 lg:col-span-6 lg:text-[44px]">
          <Emphasis text={headline || siteName} />
        </p>
        {links.length > 0 && (
          <nav aria-label="Stopka" className="grid grid-cols-2 gap-3.5 text-[15px] lg:col-span-2 lg:col-start-8 lg:grid-cols-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="opacity-70 transition-opacity duration-400 hover:opacity-100">
                {link.label}
              </Link>
            ))}
          </nav>
        )}
        <div className="flex flex-col items-start gap-3.5 text-[15px] lg:col-span-3 lg:col-start-10">
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-display text-[26px] text-mist-50">
              {phone}
            </a>
          )}
          {email && <a href={`mailto:${email}`}>{email}</a>}
          {cta && (
            <Button asChild variant="dawn" size="sm" className="mt-2">
              <Link href={cta.href}>
                {cta.label}
                <ButtonArrow className="w-[22px]" />
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="mt-16 flex flex-col justify-between gap-2 border-t border-[#2c3b33] pt-6 text-[13px] lg:mt-20 lg:flex-row">
        <span>© {siteName}</span>
        {legalLinks.length > 0 && (
          <span className="flex gap-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="opacity-80 transition-opacity hover:opacity-100">
                {link.label}
              </Link>
            ))}
          </span>
        )}
      </div>
    </footer>
  )
}
