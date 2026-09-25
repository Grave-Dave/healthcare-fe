"use client"

import { useEffect } from "react"

import { track } from "@/lib/analytics"
import { routes } from "@/lib/site"

// Where on the page a click happened: sections are wrapped with data-analytics (SectionRenderer), plus the layout parts.
function placeOf(element: Element) {
  const marked = element.closest<HTMLElement>("[data-analytics]")
  if (marked?.dataset.analytics) return marked.dataset.analytics
  if (element.closest("header")) return "nawigacja"
  if (element.closest("footer")) return "stopka"
  return location.pathname.startsWith(routes.panel) ? "panel" : "strona"
}

/** One delegated listener for the common clicks, so marketing components (driven by Flotiq) need no tracking code. */
export function AnalyticsEvents() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null
      if (!target) return

      const summary = target.closest("details > summary")
      if (summary) {
        // Fires on open only (the click happens before the toggle).
        if (!summary.parentElement?.hasAttribute("open")) track("FAQ – rozwinięcie", { pytanie: summary.textContent?.trim().slice(0, 80) ?? "" })
        return
      }

      const link = target.closest<HTMLAnchorElement>("a[href]")
      if (!link) return
      const href = link.getAttribute("href") ?? ""
      const miejsce = placeOf(link)

      if (href.startsWith("tel:")) return track("Telefon", { miejsce })
      if (href.startsWith("mailto:")) return track("E-mail", { miejsce })
      if (/google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/.test(href)) return track("Dojazd", { miejsce })

      const url = new URL(link.href, location.href)
      if (url.origin !== location.origin) return track("Link zewnętrzny", { domena: url.hostname, miejsce })
      // "Umów wizytę" CTAs outside the panel (navbar, hero, CTA sections, mobile bar).
      if (url.pathname === routes.booking && !location.pathname.startsWith(routes.panel)) track("Umów wizytę", { miejsce })
    }

    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}
