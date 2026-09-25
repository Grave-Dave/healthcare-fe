import type { MetadataRoute } from "next"

import { site } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  // Test deployments (SITE_NOINDEX=1) block everything; next.config also sends X-Robots-Tag: noindex.
  if (process.env.SITE_NOINDEX === "1") return { rules: { userAgent: "*", disallow: "/" } }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/panel", "/api"] },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  }
}
