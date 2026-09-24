import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "api.flotiq.com" }],
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
