import type { Metadata } from "next"

import { karla, newsreader } from "@/app/fonts"
import { Analytics } from "@/components/analytics"
import { ToastProvider } from "@/components/ui/toast"
import { site } from "@/lib/site"

import "./globals.css"

// Page titles and descriptions come from Flotiq (lib/metadata.ts); these are fallbacks only.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${newsreader.variable} ${karla.variable}`}>
      <body className="flex min-h-svh flex-col">
        <ToastProvider>{children}</ToastProvider>
        <Analytics />
      </body>
    </html>
  )
}
