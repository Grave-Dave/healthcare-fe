import type { Metadata } from "next"

import { AuthGuard } from "@/components/panel/auth-guard"
import { PanelHeader } from "@/components/panel/panel-header"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function PanelLayout({ children }: LayoutProps<"/panel">) {
  return (
    <>
      <PanelHeader />
      <main className="page-x flex-1 py-9 lg:py-16">
        <AuthGuard>{children}</AuthGuard>
      </main>
    </>
  )
}
