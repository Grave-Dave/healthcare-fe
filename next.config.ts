import type { NextConfig } from "next"

// Test/staging deployments (e.g. test.psychoterapia-trzeciakiewicz.pl) must not be indexed.
const noIndex = process.env.SITE_NOINDEX === "1"

const nextConfig: NextConfig = {
  // Docker uses the standalone server (Dockerfile sets NEXT_OUTPUT); hosts that run `next start`
  // (Hostinger Node.js apps) use the default output.
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "api.flotiq.com" }],
  },
  async headers() {
    return noIndex ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }] : []
  },
  // Old Vite routes. /login, /register and /password/* keep their paths because
  // backend e-mails and the Google OAuth callback link to them.
  async redirects() {
    return [
      { source: "/umow-wizyte", destination: "/panel/rezerwacja", permanent: true },
      { source: "/moje-wizyty", destination: "/panel/wizyty", permanent: true },
      { source: "/user", destination: "/panel/konto", permanent: true },
      { source: "/dojazd", destination: "/gabinety", permanent: true },
      { source: "/admin", destination: "/panel/admin", permanent: true },
      { source: "/wizyty", destination: "/panel/admin", permanent: true },
      { source: "/kalendarz", destination: "/panel/admin/terminy", permanent: true },
    ]
  },
}

export default nextConfig
