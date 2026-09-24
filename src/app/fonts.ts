import { Karla, Newsreader } from "next/font/google"

export const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
})

export const karla = Karla({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-karla",
})
