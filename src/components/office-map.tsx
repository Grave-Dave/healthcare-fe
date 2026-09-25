import { cn } from "@/lib/utils"

type Props = {
  location?: { lat: number; lon: number }
  address: string
  title: string
  className?: string
}

/**
 * Google Maps embed (no API key needed), centred on the office pin – or on the address when there is no pin.
 * Lazy-loaded; slightly desaturated to sit calmly in the mist palette.
 */
export function OfficeMap({ location, address, title, className }: Props) {
  const query = location ? `${location.lat},${location.lon}` : address
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&hl=pl&output=embed`

  return (
    <div className={cn("overflow-hidden rounded-card bg-mist-100 shadow-rest", className)}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full border-0 saturate-[0.7]"
      />
    </div>
  )
}
