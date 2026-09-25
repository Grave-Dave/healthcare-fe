// Umami (cookieless) – see components/analytics.tsx. Event data must never contain personal data:
// no names, e-mails, ids, or visit dates.

type EventData = Record<string, string | number | boolean>

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void }
  }
}

/** Custom event; a no-op when the tracker is not loaded (dev, preview, blocked). */
export function track(event: string, data?: EventData) {
  try {
    window.umami?.track(event, data)
  } catch {
    // analytics must never break the page
  }
}

// Umami skips tracking while this key is set – used for the therapist's browsers so her own visits don't count.
const DISABLED_KEY = "umami.disabled"

export function excludeThisBrowser() {
  try {
    localStorage.setItem(DISABLED_KEY, "1")
  } catch {
    // storage unavailable
  }
}
