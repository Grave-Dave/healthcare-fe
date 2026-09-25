import { draftMode } from "next/headers"
import Script from "next/script"

import { AnalyticsEvents } from "@/components/analytics-events"
import { site } from "@/lib/site"

const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

// Runs before every Umami request: drops query strings and hashes (e.g. ?email= on password reset) and masks the
// reset token. The tracker sends full URLs, and `referrer` holds the previous page after client-side navigation, so
// both are masked. Returning the payload sends it.
const beforeSend = `window.umamiBeforeSend = function (type, payload) {
  var mask = function (value) {
    if (typeof value !== "string") return value;
    return value.split(/[?#]/)[0].replace(new RegExp("(/password/reset)/(?!link(?:[/?#]|$))[^/?#]+"), "$1/[token]");
  };
  if (payload) {
    payload.url = mask(payload.url);
    payload.referrer = mask(payload.referrer);
  }
  return payload;
};`

/**
 * Umami, cookieless (docs: analytics decision in project notes). Loaded only in production builds, outside Flotiq
 * preview, and only on the site's own domain. Query strings are dropped (`data-exclude-search`).
 */
export async function Analytics() {
  if (!websiteId || process.env.NODE_ENV !== "production") return null
  if ((await draftMode()).isEnabled) return null

  return (
    <>
      {/* Plain inline script: part of the server HTML, so it runs before the (afterInteractive) tracker loads. */}
      <script id="umami-before-send" dangerouslySetInnerHTML={{ __html: beforeSend }} />
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id={websiteId}
        data-domains={new URL(site.url).hostname}
        data-exclude-search="true"
        data-before-send="umamiBeforeSend"
        strategy="afterInteractive"
      />
      <AnalyticsEvents />
    </>
  )
}
