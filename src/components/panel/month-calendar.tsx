"use client"

import { type KeyboardEvent, type ReactNode, useRef } from "react"

import { formatLongDate, formatMonthYear, toISODate } from "@/lib/dates"
import { cn } from "@/lib/utils"

const WEEKDAYS = ["PN", "WT", "ŚR", "CZ", "PT", "SB", "ND"]

type Props = {
  year: number
  month: number // 1–12
  /** Days that can be picked (e.g. with free terms). */
  enabled: Set<string>
  selected: string | null
  onSelect: (date: string) => void
  onMonthChange: (year: number, month: number) => void
  /** Hide "previous" before this month (YYYY-MM). */
  minMonth?: string
  loading?: boolean
  /** Extra marks under the day number (admin: term status dots). Defaults to one dawn dot for enabled days. */
  renderMarks?: (date: string, selected: boolean) => ReactNode
  legend?: ReactNode
}

/** Month grid from the panel mockups: Monday first, pill days, dawn dot for available, moss fill for the selected day. */
export function MonthCalendar({ year, month, enabled, selected, onSelect, onMonthChange, minMonth, loading, renderMarks, legend }: Props) {
  const gridRef = useRef<HTMLDivElement>(null)
  const first = new Date(year, month - 1, 1)
  const offset = (first.getDay() + 6) % 7 // Monday = 0
  const daysInMonth = new Date(year, month, 0).getDate()
  const cells: (string | null)[] = [...Array(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => toISODate(new Date(year, month - 1, i + 1)))]
  while (cells.length % 7) cells.push(null)

  const current = `${year}-${String(month).padStart(2, "0")}`
  const canPrev = !minMonth || current > minMonth
  const shift = (delta: number) => {
    const next = new Date(year, month - 1 + delta, 1)
    onMonthChange(next.getFullYear(), next.getMonth() + 1)
  }

  // Arrow keys move between enabled days (roving focus inside the grid).
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[event.key]
    if (!step) return
    const buttons = Array.from(gridRef.current?.querySelectorAll<HTMLButtonElement>("button[data-day]") ?? [])
    const index = buttons.findIndex((b) => b === document.activeElement)
    if (index < 0) return
    event.preventDefault()
    const target = buttons[Math.min(buttons.length - 1, Math.max(0, index + step))]
    target?.focus()
  }

  return (
    <section aria-label="Kalendarz" className="flex flex-col gap-4 rounded-[28px] bg-white px-4 pt-5 pb-4.5 shadow-[0_24px_50px_-36px_rgb(26_38_32/0.3)] lg:gap-5 lg:rounded-[32px] lg:px-8 lg:pt-8 lg:pb-7">
      <div className="flex items-center justify-between">
        <NavButton label="Poprzedni miesiąc" disabled={!canPrev} onClick={() => shift(-1)} path="M15 6l-6 6 6 6" />
        <h2 aria-live="polite" className="font-display text-[22px] lg:text-[26px]">
          {formatMonthYear(year, month)}
        </h2>
        <NavButton label="Następny miesiąc" onClick={() => shift(1)} path="M9 6l6 6-6 6" />
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] tracking-[0.1em] text-moss-500 lg:gap-1.5 lg:text-xs lg:tracking-[0.12em]" aria-hidden="true">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div ref={gridRef} role="grid" aria-busy={loading || undefined} onKeyDown={onKeyDown} className={cn("grid grid-cols-7 gap-1 transition-opacity duration-400 lg:gap-1.5", loading && "opacity-50")}>
        {cells.map((date, i) => {
          if (!date) return <span key={`blank-${i}`} aria-hidden="true" />
          const isEnabled = enabled.has(date)
          const isSelected = date === selected
          return (
            <button
              key={date}
              type="button"
              data-day={isEnabled ? "" : undefined}
              disabled={!isEnabled}
              aria-pressed={isSelected}
              aria-label={`${formatLongDate(date)}${isEnabled ? ", są wolne terminy" : ", brak terminów"}`}
              onClick={() => onSelect(date)}
              className={cn(
                "flex h-11 flex-col items-center justify-center gap-[3px] rounded-full text-[15px] transition-[background-color,box-shadow,color] duration-450 ease-mist lg:h-13 lg:gap-1 lg:text-base",
                isEnabled ? "cursor-pointer font-medium hover:bg-mist-100" : "cursor-default opacity-30",
                isSelected && "bg-moss-800 text-white shadow-[0_14px_30px_-14px_rgb(26_38_32/0.55)] hover:bg-moss-800"
              )}
            >
              <span>{Number(date.slice(8))}</span>
              <span className="flex h-[5px] gap-[3px]">
                {renderMarks ? renderMarks(date, isSelected) : isEnabled && <i className={cn("size-[5px] rounded-full", isSelected ? "bg-dawn-400" : "bg-dawn-500")} />}
              </span>
            </button>
          )
        })}
      </div>
      {legend && <div className="flex flex-wrap gap-5 border-t border-mist-100 pt-4 text-[13px] text-moss-500">{legend}</div>}
    </section>
  )
}

function NavButton({ label, disabled, onClick, path }: { label: string; disabled?: boolean; onClick: () => void; path: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full opacity-60 transition-[opacity,background-color] duration-400 hover:bg-mist-100 hover:opacity-100 disabled:invisible"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={path} />
      </svg>
    </button>
  )
}
