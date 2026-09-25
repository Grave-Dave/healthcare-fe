"use client"

import { Children, type ReactNode, useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Horizontal scroll-snap carousel: two cards + a peek of the next on desktop, one + peek on mobile.
 * Cards bleed to the viewport edge; arrows appear only when the track overflows.
 */
export function OfficesCarousel({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const update = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setCanPrev(track.scrollLeft > 4)
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    update()
    track.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      track.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [update])

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current
    const card = track?.firstElementChild as HTMLElement | null
    if (!track || !card) return
    track.scrollBy({ left: direction * (card.offsetWidth + 32), behavior: "smooth" })
  }

  return (
    <div className="flex flex-col gap-9 lg:gap-16">
      <div className="flex items-end justify-between gap-6">
        {heading}
        {(canPrev || canNext) && (
          <div className="hidden shrink-0 gap-2 lg:flex">
            <ArrowButton label="Poprzedni gabinet" direction="prev" disabled={!canPrev} onClick={() => scroll(-1)} />
            <ArrowButton label="Następny gabinet" direction="next" disabled={!canNext} onClick={() => scroll(1)} />
          </div>
        )}
      </div>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="karuzela"
        aria-label="Gabinety"
        tabIndex={0}
        className="-mx-5 -my-4 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pt-4 pb-16 [scrollbar-width:none] focus-visible:outline-offset-[-2px] lg:-mx-[120px] lg:scroll-px-[120px] lg:gap-8 lg:px-[120px] [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child) => (
          <div className="w-[85%] shrink-0 snap-start lg:w-[calc((100vw-240px-32px)/2.25)]">{child}</div>
        ))}
      </div>
    </div>
  )
}

function ArrowButton({ label, direction, disabled, onClick }: { label: string; direction: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "grid size-12 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--color-mist-300)] transition-[background-color,box-shadow,opacity] duration-500 ease-mist hover:bg-white hover:shadow-[inset_0_0_0_1px_var(--color-moss-300)] disabled:pointer-events-none disabled:opacity-35"
      )}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={direction === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  )
}
