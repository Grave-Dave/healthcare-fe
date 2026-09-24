import Link from "next/link"

import { Button, ButtonArrow } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="page-x flex flex-1 flex-col items-start justify-center gap-6 py-24">
      <span className="eyebrow">Błąd 404</span>
      <h1 className="font-display text-5xl font-light lg:text-[64px]">
        Tej strony <em>nie ma</em>
      </h1>
      <p className="max-w-md text-lg text-moss-500">Mogła zostać przeniesiona albo adres zawiera literówkę.</p>
      <Button asChild>
        <Link href="/">
          Strona główna
          <ButtonArrow />
        </Link>
      </Button>
    </main>
  )
}
