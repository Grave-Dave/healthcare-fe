import { notFound } from "next/navigation"

import { DetailHeader } from "@/components/layout/detail-header"
import { SiteFrame } from "@/components/layout/site-frame"
import { OfficeGallery } from "@/components/office-gallery"
import { OfficeMap } from "@/components/office-map"
import { SectionRenderer } from "@/components/sections/section-renderer"
import { RichText } from "@/components/text"
import { Button, ButtonArrow } from "@/components/ui/button"
import { getMediaUrl, getOffice, getOffices, getSettings } from "@/lib/flotiq"
import { buildMetadata } from "@/lib/metadata"

export async function generateStaticParams() {
  try {
    return (await getOffices()).map((office) => ({ slug: office.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps<"/gabinety/[slug]">) {
  const { slug } = await params
  const office = await getOffice(slug)
  if (!office) return {}
  return buildMetadata(
    { ...office, title: `Gabinet ${office.name}` },
    `/gabinety/${office.slug}`,
    `Gabinet psychoterapii: ${office.street}, ${office.postalCode} ${office.city}. Dojazd i informacje o dostępności.`
  )
}

export default async function OfficePage({ params }: PageProps<"/gabinety/[slug]">) {
  const { slug } = await params
  const [office, settings] = await Promise.all([getOffice(slug), getSettings()])
  if (!office) notFound()

  const photos = (office.photos ?? []).map((media, i) => ({
    thumb: getMediaUrl([media], { width: 480 }),
    full: getMediaUrl([media], { width: 1800 }),
    alt: `Gabinet ${office.name} – zdjęcie ${i + 1}`,
    width: (media as { width?: number }).width || 1600,
    height: (media as { height?: number }).height || 1067,
  }))
  const mapsUrl = office.location
    ? `https://www.google.com/maps/search/?api=1&query=${office.location.lat},${office.location.lon}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${office.street}, ${office.city}`)}`

  return (
    <SiteFrame overHero={false}>
      <DetailHeader back={{ label: "Gabinety", href: "/gabinety" }} eyebrow="Gabinet" title={office.name} lead={`${office.street}, ${office.postalCode} ${office.city}`} />
      <div className="page-x grid grid-cols-1 gap-10 pb-20 lg:grid-cols-12 lg:gap-8 lg:pb-32">
        <OfficeMap
          location={office.location}
          address={`${office.street}, ${office.postalCode} ${office.city}`}
          title={`Mapa: gabinet ${office.name}, ${office.street}`}
          className="h-80 lg:col-span-7 lg:h-[560px]"
        />
        <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9">
          <div className="flex flex-col gap-3">
            <span className="eyebrow">Dojazd</span>
            <RichText html={office.directions} className="text-[17px]" />
          </div>
          {office.accessibility && (
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Dostępność</span>
              <p className="text-[17px] leading-relaxed text-moss-700">{office.accessibility}</p>
            </div>
          )}
          {photos.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Zdjęcia</span>
              <OfficeGallery photos={photos} />
            </div>
          )}
          <Button asChild variant="quiet" className="self-start">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Otwórz w Mapach Google
              <ButtonArrow className="w-[22px]" />
            </a>
          </Button>
        </div>
      </div>
      <SectionRenderer sections={office.extraSections} ctx={{ settings }} />
    </SiteFrame>
  )
}
