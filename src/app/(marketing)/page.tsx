import { FogRings } from "@/components/icons"
import { Hero } from "@/components/marketing/hero"

// Content is hardcoded until the Flotiq space is connected (see docs/design-system.md, section 6).
export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Psychoterapia psychodynamiczna · Wrocław"
        title={
          <>
            Znajdź przestrzeń, by <em>zrozumieć siebie</em>
          </>
        }
        lead="Psychoterapia indywidualna osób dorosłych. Spokojnie, bez pośpiechu, we własnym tempie."
        image="/images/hero.webp"
      />

      <section className="page-x relative grid gap-5 py-22 lg:grid-cols-12 lg:gap-8 lg:pt-44 lg:pb-56">
        <FogRings className="pointer-events-none absolute -top-28 -right-28 size-65 text-moss-300 opacity-50 lg:-top-48 lg:-right-44 lg:size-130 lg:opacity-55" />
        <span className="eyebrow lg:col-span-3 lg:pt-4">Gabinet psychoterapii</span>
        <p className="font-display text-3xl leading-snug font-light text-moss-900 lg:col-span-9 lg:text-[52px] lg:leading-tight">
          Psychoterapia to spotkanie, w którym możesz przyjrzeć się temu, co trudne, i odkryć,{" "}
          <em className="text-moss-400">skąd się to bierze</em>, zamiast jedynie radzić sobie z objawami.
        </p>
      </section>
    </>
  )
}
