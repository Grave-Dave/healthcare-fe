import "server-only"

import { draftMode } from "next/headers"

import { serverEnv } from "@/lib/env"

// Every Flotiq response is cached under these tags; the /api/revalidate webhook invalidates them.
export const FLOTIQ_TAG = "flotiq"
export const flotiqTypeTag = (contentType: string) => `flotiq:${contentType}`

type ListResponse<T> = {
  data: T[]
  total_count: number
  total_pages: number
  current_page: number
  count: number
}

type Query = Record<string, string | number | boolean | undefined>

async function flotiqFetch<T>(path: string, contentType: string, query: Query = {}): Promise<T> {
  const { isEnabled: isDraft } = await draftMode()

  const url = new URL(`/api/v1/content/${path}`, serverEnv.flotiqApiUrl)
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) url.searchParams.set(key, String(value))
  }

  const response = await fetch(url, {
    headers: { "X-AUTH-TOKEN": serverEnv.flotiqApiKey },
    // Draft mode bypasses the cache on its own; published content is cached until the webhook fires.
    cache: isDraft ? "no-store" : "force-cache",
    next: { tags: [FLOTIQ_TAG, flotiqTypeTag(contentType)] },
  })

  if (!response.ok) {
    throw new Error(`Flotiq request failed (${response.status}) for ${url.pathname}`)
  }

  return response.json() as Promise<T>
}

export function getFlotiqList<T>(contentType: string, query: Query = {}) {
  return flotiqFetch<ListResponse<T>>(contentType, contentType, { hydrate: 1, ...query })
}

export function getFlotiqObject<T>(contentType: string, id: string, query: Query = {}) {
  return flotiqFetch<T>(`${contentType}/${encodeURIComponent(id)}`, contentType, { hydrate: 1, ...query })
}
