import type { Metadata } from "next"

import { karla, newsreader } from "@/app/fonts"
import { site } from "@/lib/site"

import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – ${site.tagline} we Wrocławiu`,
    template: `%s | ${site.name}`,
  },
  description:
    "Psychoterapia psychodynamiczna osób dorosłych we Wrocławiu. Umów konsultację online u Katarzyny Trzeciakiewicz.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${newsreader.variable} ${karla.variable}`}>
      <body className="flex min-h-svh flex-col">{children}</body>
    </html>
  )
}
