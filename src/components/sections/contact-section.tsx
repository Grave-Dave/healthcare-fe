import Link from "next/link"

import { PhoneIcon } from "@/components/icons"
import { Emphasis } from "@/components/text"
import { Button, ButtonArrow } from "@/components/ui/button"
import { getOffices } from "@/lib/flotiq"
import { routes } from "@/lib/site"

import type { SectionProps } from "./types"

export async function ContactSection({ section, ctx }: SectionProps<"section_contact">) {
  const { phone, email } = ctx.settings ?? {}
  const offices = section.showOffices ? await getOffices() : []

  return (
    <section id={section.anchor || undefined} className="page-x grid grid-cols-1 gap-12 pt-16 pb-22 lg:grid-cols-12 lg:gap-8 lg:pt-28 lg:pb-[160px]">
      <div className="flex flex-col gap-6 lg:col-span-6">
        {section.eyebrow && <span className="eyebrow">{section.eyebrow}</span>}
        {section.title && (
          <h1 className="font-display text-[40px] leading-[1.08] font-light lg:text-[64px]">
            <Emphasis text={section.title} />
          </h1>
        )}
        {section.text && <p className="max-w-lg text-lg leading-relaxed text-moss-700">{section.text}</p>}
        <div className="flex flex-col gap-4 pt-4">
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-3 self-start font-display text-3xl lg:text-[40px]">
              <span className="grid size-11 place-items-center rounded-full shadow-[inset_0_0_0_1px_currentColor]">
                <PhoneIcon width={18} height={18} />
              </span>
              {phone}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="self-start text-lg text-moss-800 underline decoration-mist-300 underline-offset-4">
              {email}
            </a>
          )}
        </div>
        <Button asChild className="mt-4 self-start">
          <Link href={routes.booking}>
            Zarezerwuj termin online
            <ButtonArrow />
          </Link>
        </Button>
      </div>
      {offices.length > 0 && (
        <div className="flex flex-col gap-3 lg:col-span-5 lg:col-start-8 lg:pt-20">
          <span className="eyebrow pb-2">Gabinety</span>
          {offices.map((office) => (
            <Link
              key={office.id}
              href={`/gabinety/${office.slug}`}
              className="flex items-center justify-between gap-4 rounded-[20px] bg-white px-6 py-5 shadow-rest transition-shadow duration-500 hover:shadow-float"
            >
              <span className="flex flex-col gap-1">
                <span className="font-display text-2xl">{office.name}</span>
                <span className="text-[15px] text-moss-500">
                  {office.street}, {office.postalCode} {office.city}
                </span>
              </span>
              <span aria-hidden="true" className="text-moss-400">
                →
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
