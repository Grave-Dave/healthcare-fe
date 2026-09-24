// Static site settings until they are moved to Flotiq (global settings content type).
export const site = {
  name: "Katarzyna Trzeciakiewicz",
  tagline: "Gabinet psychoterapii",
  city: "Wrocław",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? null,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? null,
}

export const mainNav = [
  { href: "/o-mnie", label: "O mnie" },
  { href: "/obszary-pomocy", label: "Obszary pomocy" },
  { href: "/gabinety", label: "Gabinety" },
  { href: "/kontakt", label: "Kontakt" },
]

export const routes = {
  home: "/",
  login: "/login",
  booking: "/panel/rezerwacja",
  myVisits: "/panel/wizyty",
  account: "/panel/konto",
}
