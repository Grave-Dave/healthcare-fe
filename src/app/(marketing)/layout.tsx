import { PreviewBanner } from "@/components/marketing/preview-banner"

// Navbar and footer come from the Flotiq layout of each page (components/layout/site-frame.tsx).
export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {children}
      <PreviewBanner />
    </>
  )
}
