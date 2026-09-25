import type { OfficeHydratedTwice } from "@flotiq/flotiq-api-sdk"
import Image from "next/image"
import Link from "next/link"

import { getMediaUrl, getOffices } from "@/lib/flotiq"

import { OfficesCarousel } from "./offices-carousel"
import { SectionHeading } from "./section-heading"
import type { SectionProps } from "./types"

export async function OfficesSection({ section }: SectionProps<"section_offices">) {
  const selected = (section.offices ?? []) as OfficeHydratedTwice[]
  const offices = selected.length ? selected : await getOffices()
  if (!offices.length) return null

  return (
    <section id={section.anchor || undefined} className="page-x overflow-hidden py-22 lg:py-[200px]">
      <OfficesCarousel heading={<SectionHeading eyebrow={section.eyebrow} title={section.title} />}>
        {offices.map((office) => (
          <OfficeCard key={office.id} office={office} />
        ))}
      </OfficesCarousel>
    </section>
  )
}

export function OfficeCard({ office }: { office: OfficeHydratedTwice }) {
  const photo = getMediaUrl(office.photos, { width: 1200 })

  return (
    <Link
      href={`/gabinety/${office.slug}`}
      className="group relative flex h-full flex-col gap-5 rounded-3xl bg-white p-3 pb-6 shadow-rest transition-[box-shadow,translate] duration-600 ease-mist hover:-translate-y-0.5 hover:shadow-lift after:pointer-events-none after:absolute after:-inset-px after:rounded-[inherit] after:opacity-0 after:shadow-[inset_0_0_0_1.5px_var(--color-moss-300)] after:transition-opacity after:duration-500 hover:after:opacity-100 lg:gap-7 lg:rounded-card lg:p-4 lg:pb-8"
    >
      <div className="relative h-55 overflow-hidden rounded-2xl bg-mist-100 lg:h-85 lg:rounded-[20px]">
        {photo ? (
          <Image src={photo} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        ) : (
          <div className="grid h-full place-items-center text-sm text-moss-500">{office.street}</div>
        )}
      </div>
      <div className="flex flex-col gap-1.5 px-3 lg:flex-row lg:items-end lg:justify-between lg:px-5">
        <div className="flex flex-col gap-1.5">
          <span className="font-display text-[26px] lg:text-[32px]">{office.name}</span>
          <span className="text-base text-moss-500 lg:text-[17px]">
            {office.street}, {office.postalCode} {office.city}
          </span>
        </div>
        <span className="pt-2 text-[15px] font-medium text-moss-800 lg:pt-0 lg:text-base">Dojazd →</span>
      </div>
    </Link>
  )
}
