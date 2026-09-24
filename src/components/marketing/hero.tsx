import Image from "next/image"
import Link from "next/link"

import { Button, ButtonArrow } from "@/components/ui/button"
import { routes } from "@/lib/site"

type HeroProps = {
  eyebrow: string
  title: React.ReactNode
  lead: string
  image: string
  videoSrc?: string
}

export function Hero({ eyebrow, title, lead, image, videoSrc }: HeroProps) {
  return (
    <section className="relative z-10 flex h-svh min-h-[640px] flex-col justify-end overflow-hidden text-white lg:justify-center">
      {videoSrc ? (
        <video
          className="absolute inset-0 size-full animate-hero-drift object-cover"
          src={videoSrc}
          poster={image}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : (
        <Image src={image} alt="" fill priority sizes="100vw" className="animate-hero-drift object-cover" />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-moss-950/35" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-[rgb(14_22_18/0.5)] via-[rgb(14_22_18/0.18)] to-transparent lg:h-50" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-b from-transparent via-mist-50/35 to-mist-50 lg:h-28" />

      <div className="page-x relative flex max-w-[900px] animate-rise flex-col gap-6 pb-30 lg:gap-8 lg:pb-0">
        <span className="text-xs tracking-[0.16em] text-dawn-300 uppercase lg:text-sm">{eyebrow}</span>
        <h1 className="font-display text-5xl leading-[1.05] font-light lg:text-[92px] lg:leading-[1.02]">{title}</h1>
        <p className="max-w-[600px] text-[17px] leading-relaxed text-[#e6eae5] lg:text-[21px]">{lead}</p>
        <div className="flex flex-col gap-3 pt-2 lg:flex-row lg:gap-4">
          <Button asChild variant="dawn" className="justify-between lg:justify-center">
            <Link href={routes.booking}>
              Umów konsultację
              <ButtonArrow />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/o-mnie">Poznaj mnie</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
