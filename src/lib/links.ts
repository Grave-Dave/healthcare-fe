type PageLike = { slug?: string }

export type ResolvedLink = { label: string; href: string }

export function pageHref(page: PageLike | undefined) {
  if (!page?.slug) return undefined
  return page.slug === "index" ? "/" : `/${page.slug}`
}

/**
 * CMS links come as three fields: label + related page (preferred) + url.
 * Returns null when the link is incomplete, so components can skip it.
 */
export function resolveLink(label: string | undefined, page: unknown, url: string | undefined): ResolvedLink | null {
  const related = Array.isArray(page) ? (page[0] as PageLike | undefined) : undefined
  const href = pageHref(related) ?? url?.trim()
  return label && href ? { label, href } : null
}
