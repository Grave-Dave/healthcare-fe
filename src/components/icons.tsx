import type { SVGProps } from "react"

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.6} width={16} height={16} {...base} {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  )
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.5} width={22} height={22} {...base} {...props}>
      <path d="M4 8h16" />
      <path d="M8 16h12" />
    </svg>
  )
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.5} width={20} height={20} {...base} {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  )
}

export function FogRings(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 520 520" strokeWidth={1} {...base} {...props}>
      <circle cx="260" cy="260" r="250" />
      <circle cx="260" cy="260" r="200" opacity="0.8" />
      <circle cx="260" cy="260" r="150" opacity="0.6" />
      <circle cx="260" cy="260" r="100" opacity="0.4" />
    </svg>
  )
}
