import "server-only"

import {
  Flotiq,
  type Article,
  type ArticleHydratedTwice,
  type FlotiqMediaUrlOptions,
  type HelpArea,
  type HelpAreaHydratedTwice,
  type InternalMedia,
  type InternalMediaHydrated,
  type LayoutHydratedTwice,
  type OfficeHydratedTwice,
  type Page,
  type PageHydratedTwice,
  type SettingsHydrated,
} from "@flotiq/flotiq-api-sdk"
import { createNextMiddleware } from "@flotiq/nextjs-addon"
import { cache } from "react"

// The Next middleware tags every request (`flotiq-content`, `flotiq-content-<type>`), caches it in
// production, switches to `x-mode: preview` in draft mode and disables the cache in development.
export const FLOTIQ_TAG = "flotiq-content"
export const flotiqTypeTag = (contentType: string) => `${FLOTIQ_TAG}-${contentType}`

export const flotiq = new Flotiq({
  apiKey: process.env.FLOTIQ_API_KEY,
  apiUrl: process.env.FLOTIQ_API_URL || "https://api.flotiq.com",
  middleware: [createNextMiddleware({ tagNamePrefix: FLOTIQ_TAG })],
})

const bySlug = (slug: string) => ({ slug: { type: "equals" as const, filter: slug } })

// Loaders used by both generateMetadata and the page are memoised per request with React cache().

/** Home page is stored with slug `index`. Sections are hydrated with their own relations. */
export const getPage = cache(async (slug: string) => {
  const response = await flotiq.content.page.list({ limit: 1, hydrate: 2, filters: bySlug(slug) })
  return response.data?.[0] as PageHydratedTwice | undefined
})

export async function getPages() {
  const response = await flotiq.content.page.list({ limit: 1000 })
  return response.data as Page[]
}

/** Singleton. `defaultLayout` comes back as a plain Layout – load it with getLayout(). */
export const getSettings = cache(async () => {
  const response = await flotiq.content.settings.list({ limit: 1, hydrate: 1 })
  return response.data?.[0] as SettingsHydrated | undefined
})

/** hydrate: 2 resolves navbar/footer and the pages their links point to. */
export const getLayout = cache(async (id: string) => {
  return (await flotiq.content.layout.get(id, { hydrate: 2 })) as LayoutHydratedTwice
})

export async function getHelpAreas() {
  const response = await flotiq.content.help_area.list({ limit: 100, orderBy: "order", orderDirection: "asc" })
  return response.data as HelpArea[]
}

export const getHelpArea = cache(async (slug: string) => {
  const response = await flotiq.content.help_area.list({ limit: 1, hydrate: 2, filters: bySlug(slug) })
  return response.data?.[0] as HelpAreaHydratedTwice | undefined
})

export const getOffices = cache(async () => {
  const response = await flotiq.content.office.list({ limit: 100, hydrate: 1, orderBy: "order", orderDirection: "asc" })
  return response.data as OfficeHydratedTwice[]
})

export const getOffice = cache(async (slug: string) => {
  const response = await flotiq.content.office.list({ limit: 1, hydrate: 2, filters: bySlug(slug) })
  return response.data?.[0] as OfficeHydratedTwice | undefined
})

export async function getArticles(limit = 100) {
  const response = await flotiq.content.article.list({ limit, hydrate: 1, orderBy: "publishedAt", orderDirection: "desc" })
  return response.data as Article[]
}

export const getArticle = cache(async (slug: string) => {
  const response = await flotiq.content.article.list({ limit: 1, hydrate: 2, filters: bySlug(slug) })
  return response.data?.[0] as ArticleHydratedTwice | undefined
})

type Media = InternalMedia | InternalMediaHydrated

export function getMedia(media: unknown): Media | undefined {
  const first = Array.isArray(media) ? media[0] : undefined
  return first && typeof first === "object" && "url" in first ? (first as Media) : undefined
}

/**
 * Images are served from `/image/{w}x{h}/…` (0x0 = original, animated GIFs included);
 * other uploads (video) only from `/file/…` – the type is picked from the media object.
 */
export function getMediaUrl(media: unknown, options?: FlotiqMediaUrlOptions) {
  const item = getMedia(media)
  if (!item) return ""
  return flotiq.helpers.getMediaUrl(item, { type: item.type === "image" ? "image" : "file", ...options })
}
