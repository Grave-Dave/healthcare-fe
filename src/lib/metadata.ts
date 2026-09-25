import "server-only"

import type { Metadata } from "next"

import { stripEmphasis } from "@/components/text"
import { getMediaUrl, getSettings } from "@/lib/flotiq"

type Seo = { title?: string; seoTitle?: string; seoDescription?: string; ogImage?: unknown; noIndex?: boolean }

/** Page-level metadata with fallbacks to the site settings from Flotiq. */
export async function buildMetadata(seo: Seo | undefined, path: string, fallbackDescription?: string): Promise<Metadata> {
  const settings = await getSettings()
  const template = settings?.titleTemplate?.includes("%s") ? settings.titleTemplate : undefined
  const title = stripEmphasis(seo?.seoTitle || seo?.title)
  const description = seo?.seoDescription || fallbackDescription || settings?.seoDescription
  const image = getMediaUrl(seo?.ogImage) || getMediaUrl(settings?.ogImage)

  return {
    // Home page SEO titles are complete sentences – no template.
    title: path === "/" || !template ? title || settings?.siteName : { absolute: template.replace("%s", title) },
    description,
    alternates: { canonical: path },
    openGraph: { title: title || settings?.siteName, description, url: path, type: "website", images: image ? [{ url: image }] : undefined },
    robots: seo?.noIndex ? { index: false, follow: true } : undefined,
  }
}
