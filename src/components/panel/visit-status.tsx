import { cn } from "@/lib/utils"
import type { Visit } from "@/lib/visits"

// Status badges from docs/design-system.md ("Statusy wizyt").
const badgeStyles = {
  pending: { box: "bg-[#f3ead6] text-[#6b5a33]", dot: "bg-dawn-500" },
  confirmed: { box: "bg-[#e6ebe3] text-moss-800", dot: "bg-moss-600" },
  muted: { box: "bg-mist-100 text-moss-500", dot: "bg-mist-300" },
  free: { box: "bg-transparent text-moss-500 shadow-[inset_0_0_0_1px_var(--color-mist-300)]", dot: "bg-dawn-500" },
}

type Props = { visit: Pick<Visit, "status" | "term">; past?: boolean; free?: boolean }

export function StatusBadge({ visit, past = false, free = false }: Props) {
  // Past visits: "Odbyta" is derived here – the backend has no "completed" status.
  const [label, style, short] = free
    ? ["Wolny termin", badgeStyles.free]
    : visit.status === "canceled"
      ? ["Odwołana", badgeStyles.muted]
      : past
        ? visit.status === "confirmed"
          ? ["Odbyta", badgeStyles.confirmed]
          : ["Niepotwierdzona", badgeStyles.muted]
        : visit.status === "confirmed"
          ? ["Potwierdzona", badgeStyles.confirmed]
          : ["Oczekuje na potwierdzenie", badgeStyles.pending, "Oczekuje"]
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium whitespace-nowrap lg:text-sm", style.box)}>
      <i aria-hidden="true" className={cn("size-1.5 rounded-full lg:size-2", style.dot)} />
      <span className={cn(short && "max-sm:hidden")}>{label}</span>
      {short && <span className="sm:hidden">{short}</span>}
    </span>
  )
}

export function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}
