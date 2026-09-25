import type { SVGProps } from "react"

// Help area illustrations (docs/design-system.md, "Ilustracje"): stroke-only, moss-600 lines, one dawn accent.
const stroke = "var(--color-moss-600)"
const accent = "var(--color-dawn-500)"

const shapes: Record<string, React.ReactNode> = {
  circles: (
    <>
      <circle cx="120" cy="130" r="70" />
      <circle cx="180" cy="130" r="70" strokeDasharray="3 7" />
      <circle cx="150" cy="182" r="70" opacity="0.5" />
      <circle cx="150" cy="148" r="6" fill={accent} stroke="none" />
    </>
  ),
  waves: (
    <>
      <path d="M20 150c30-60 60-60 90 0s60 60 90 0 60-60 80 0" />
      <path d="M20 190c30-30 60-30 90 0s60 30 90 0 60-30 80 0" opacity="0.5" />
      <path d="M20 110c30-20 60-20 90 0s60 20 90 0 60-20 80 0" opacity="0.3" />
      <circle cx="230" cy="70" r="18" fill={accent} stroke="none" />
    </>
  ),
  ripples: (
    <>
      <path d="M150 60c52 4 92 38 90 92s-44 88-94 86-86-40-84-92 38-90 88-86Z" opacity="0.28" />
      <path d="M150 90c36 2 64 26 62 62s-30 60-64 58-58-28-56-62 26-60 58-58Z" opacity="0.55" />
      <path d="M150 120c18 1 32 14 31 31s-15 30-32 29-29-14-28-31 13-30 29-29Z" />
      <circle cx="150" cy="150" r="5" fill={accent} stroke="none" />
    </>
  ),
  relations: (
    <>
      <circle cx="105" cy="150" r="60" />
      <circle cx="195" cy="150" r="60" />
      <path d="M60 250c40-30 140-30 180 0" opacity="0.45" />
      <path d="M150 108v84" stroke={accent} strokeWidth="2" />
    </>
  ),
  path: (
    <>
      <path d="M40 250c40-10 60-50 90-70s70-10 90-60 20-60 40-70" />
      <circle cx="70" cy="238" r="10" />
      <circle cx="130" cy="182" r="10" />
      <circle cx="200" cy="140" r="10" />
      <circle cx="258" cy="52" r="12" fill={accent} stroke="none" />
    </>
  ),
  sprout: (
    <>
      <path d="M150 260V130" />
      <path d="M150 180c-40 0-64-24-64-60 36 0 64 24 64 60Z" />
      <path d="M150 150c34 0 58-22 58-54-32 0-58 22-58 54Z" />
      <path d="M90 260h120" opacity="0.45" />
      <circle cx="150" cy="80" r="14" fill={accent} stroke="none" />
    </>
  ),
}

export function HelpAreaIllustration({ name, ...props }: { name?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      stroke={stroke}
      strokeWidth={1.25}
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      {shapes[name ?? ""] ?? shapes.circles}
    </svg>
  )
}
