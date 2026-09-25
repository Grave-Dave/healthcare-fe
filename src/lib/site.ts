// Fallbacks and app routes. Site content (name, phone, navigation) comes from Flotiq `settings` / `layout`.
export const site = {
  name: "Katarzyna Trzeciakiewicz",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
}

export const routes = {
  home: "/",
  login: "/login",
  booking: "/panel/rezerwacja",
  myVisits: "/panel/wizyty",
  account: "/panel/konto",
}
