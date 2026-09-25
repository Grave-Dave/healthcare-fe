"use client"

import Link from "next/link"
import { type ReactNode, useEffect, useRef, useState } from "react"

import { HelpAreaIllustration } from "@/components/illustrations"
import { cn } from "@/lib/utils"

type Area = { id: string; name: string; slug: string; summary: string; illustration: string; hasPage: boolean }

// Height of the sticky navbar; the pinned panel sits below it.
const NAVBAR_HEIGHT = 76
// Scroll distance per area, as a fraction of the viewport height.
const STEP = 0.35

/** The heading is rendered inside the pinned area on desktop, so it stays next to the list. */
export function HelpAreasExplorer({ areas, heading }: { areas: Area[]; heading: ReactNode }) {
  return (
    <>
      <StickyExplorer areas={areas} heading={heading} />
      <div className="flex flex-col gap-9 lg:hidden">
        {heading}
        <Accordion areas={areas} />
      </div>
    </>
  )
}

/** Desktop: the section is pinned while the page scroll moves through the areas. */
function StickyExplorer({ areas, heading }: { areas: Area[]; heading: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const distance = rect.height - (window.innerHeight - NAVBAR_HEIGHT)
      const progress = Math.min(1, Math.max(0, (NAVBAR_HEIGHT - rect.top) / Math.max(distance, 1)))
      setActive(Math.min(areas.length - 1, Math.floor(progress * areas.length)))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [areas.length])

  const scrollTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const distance = track.offsetHeight - (window.innerHeight - NAVBAR_HEIGHT)
    const top = track.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT
    window.scrollTo({ top: top + ((index + 0.5) / areas.length) * distance, behavior: "smooth" })
  }

  const current = areas[active]

  return (
    <div ref={trackRef} className="relative hidden lg:block" style={{ height: `calc(${100 + areas.length * STEP * 100}vh - ${NAVBAR_HEIGHT}px)` }}>
      <div className="sticky flex flex-col justify-center gap-12" style={{ top: NAVBAR_HEIGHT, height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}>
        {heading}
        <div className="grid w-full grid-cols-12 gap-8">
          <div className="col-span-5 flex gap-7">
            <div className="flex flex-col items-center gap-3.5 py-6" aria-hidden="true">
              <div className="relative w-0.5 flex-1 overflow-hidden rounded-sm bg-mist-200">
                <div
                  className="absolute inset-x-0 top-0 rounded-sm bg-moss-800 transition-[height] duration-700 ease-mist"
                  style={{ height: `${((active + 1) / areas.length) * 100}%` }}
                />
              </div>
              <span className="rotate-180 text-xs tracking-[0.14em] text-moss-500 [writing-mode:vertical-rl]">PRZEWIŃ</span>
            </div>
            <div role="tablist" aria-label="Obszary pomocy" aria-orientation="vertical" className="flex flex-1 flex-col gap-1.5">
              {areas.map((area, index) => (
                <button
                  key={area.id}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-controls="help-area-panel"
                  onClick={() => scrollTo(index)}
                  className={cn(
                    "group flex items-center gap-7 rounded-[20px] px-7 py-4.5 text-left opacity-42 transition-[opacity,background-color,box-shadow] duration-500 ease-mist hover:opacity-80",
                    index === active && "bg-white opacity-100 shadow-float hover:opacity-100"
                  )}
                >
                  <span className="w-6 text-[13px] font-medium text-moss-500">{String(index + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display text-[30px] leading-tight">{area.name}</span>
                  <span
                    aria-hidden="true"
                    className={cn("text-xl text-moss-400 opacity-0 transition-[opacity,translate] duration-500 ease-mist -translate-x-1.5", index === active && "translate-x-0 opacity-100")}
                  >
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div
            id="help-area-panel"
            role="tabpanel"
            className="col-span-6 col-start-7 flex h-[min(560px,calc(100vh-340px))] flex-col gap-8 overflow-hidden rounded-panel bg-white p-14 shadow-[0_30px_70px_-40px_rgb(26_38_32/0.25)]"
          >
            <div key={current.id} className="flex min-h-0 flex-1 animate-fade-up flex-col gap-8">
              <HelpAreaIllustration name={current.illustration} className="mx-auto h-[min(220px,24vh)] w-auto shrink-0" />
              <div className="flex min-h-0 flex-1 flex-col gap-4">
                <h3 className="font-display text-4xl">{current.name}</h3>
                <p className="line-clamp-5 text-lg leading-[1.7] text-moss-700">{current.summary}</p>
                {current.hasPage && <AreaLink slug={current.slug} className="mt-auto" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Mobile: one open item at a time. */
function Accordion({ areas }: { areas: Area[] }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="flex flex-col gap-1.5 lg:hidden">
      {areas.map((area, index) => {
        const isOpen = index === open
        return (
          <div key={area.id} className={cn("rounded-[18px] transition-[background-color,box-shadow] duration-500 ease-mist", isOpen && "bg-white shadow-float")}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : index)}
              className={cn("flex min-h-16 w-full items-center gap-4 px-4.5 py-5 text-left opacity-50 transition-opacity duration-500", isOpen && "opacity-100")}
            >
              <span className="w-5 text-xs font-medium text-moss-500">{String(index + 1).padStart(2, "0")}</span>
              <span className="flex-1 font-display text-2xl leading-tight">{area.name}</span>
              <span aria-hidden="true" className={cn("size-2.5 -translate-y-0.5 rotate-45 border-r-[1.5px] border-b-[1.5px] border-moss-600 transition-transform duration-500", isOpen && "translate-y-0.5 -rotate-135")} />
            </button>
            {isOpen && (
              <div className="flex animate-fade-up flex-col gap-4 pr-4.5 pb-6 pl-13.5">
                <HelpAreaIllustration name={area.illustration} className="size-35" strokeWidth={2.4} />
                <p className="text-base leading-[1.7] text-moss-700">{area.summary}</p>
                {area.hasPage && <AreaLink slug={area.slug} />}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function AreaLink({ slug, className }: { slug: string; className?: string }) {
  return (
    <Link href={`/obszary-pomocy/${slug}`} className={cn("group inline-flex items-center gap-2 self-start font-medium text-moss-800 opacity-75 transition-opacity duration-400 hover:opacity-100", className)}>
      Dowiedz się więcej
      <span aria-hidden="true" className="transition-transform duration-500 ease-mist group-hover:translate-x-1">
        →
      </span>
    </Link>
  )
}
