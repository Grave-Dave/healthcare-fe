import type { ReactNode } from "react"

import { getLayout, getSettings } from "@/lib/flotiq"
import { resolveLink, type ResolvedLink } from "@/lib/links"
import { site } from "@/lib/site"

import { Footer } from "./footer"
import { MobileStickyBar } from "./mobile-sticky-bar"
import { Navbar } from "./navbar"

type LinkFields = { label?: string; page?: unknown; url?: string }

const toLinks = (items: LinkFields[] | undefined) =>
  (items ?? []).map((item) => resolveLink(item.label, item.page, item.url)).filter((link): link is ResolvedLink => link !== null)

/**
 * Navbar + content + footer for a CMS page. The layout comes from the page (`layoutId`)
 * or falls back to `settings.defaultLayout`.
 */
export async function SiteFrame({ layoutId, overHero, children }: { layoutId?: string; overHero: boolean; children: ReactNode }) {
  const settings = await getSettings()
  const id = layoutId ?? (settings?.defaultLayout?.[0] as { id?: string } | undefined)?.id
  const layout = id ? await getLayout(id) : undefined
  const navbar = layout?.navbar?.[0]
  const footer = layout?.footer?.[0]

  const siteName = settings?.siteName ?? site.name
  const phone = settings?.phone || undefined
  const email = settings?.email || undefined
  const navbarCta = navbar ? resolveLink(navbar.ctaLabel, navbar.ctaPage, navbar.ctaUrl) : null

  return (
    <>
      {navbar && (
        <Navbar
          siteName={siteName}
          items={toLinks(navbar.items)}
          showLogin={Boolean(navbar.showLogin)}
          phone={navbar.showPhone ? phone : undefined}
          cta={navbarCta}
          overHero={overHero}
        />
      )}
      {/* isolate: section decorations with negative z-index stay above the page background */}
      <main className={overHero ? "isolate flex-1" : "isolate flex-1 pt-[68px] lg:pt-[76px]"}>{children}</main>
      {footer && (
        <Footer
          siteName={siteName}
          headline={footer.headline}
          links={toLinks(footer.links)}
          legalLinks={toLinks(footer.legalLinks)}
          phone={footer.showContact ? phone : undefined}
          email={footer.showContact ? email : undefined}
          cta={resolveLink(footer.ctaLabel, footer.ctaPage, footer.ctaUrl)}
        />
      )}
      {layout?.mobileStickyBar && <MobileStickyBar phone={phone} cta={navbarCta} />}
    </>
  )
}
