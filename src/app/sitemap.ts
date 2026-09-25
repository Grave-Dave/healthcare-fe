import type { MetadataRoute } from "next"

import { getArticles, getHelpAreas, getOffices, getPages } from "@/lib/flotiq"
import { site } from "@/lib/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, areas, offices, articles] = await Promise.all([getPages(), getHelpAreas(), getOffices(), getArticles()]).catch(
    () => [[], [], [], []] as const
  )
  const url = (path: string) => new URL(path, site.url).toString()

  return [
    ...pages.filter((page) => !page.noIndex).map((page) => ({ url: url(page.slug === "index" ? "/" : `/${page.slug}`), lastModified: page.internal.updatedAt })),
    ...areas.map((area) => ({ url: url(`/obszary-pomocy/${area.slug}`), lastModified: area.internal.updatedAt })),
    ...offices.map((office) => ({ url: url(`/gabinety/${office.slug}`), lastModified: office.internal.updatedAt })),
    ...articles.map((article) => ({ url: url(`/artykuly/${article.slug}`), lastModified: article.internal.updatedAt })),
  ]
}
