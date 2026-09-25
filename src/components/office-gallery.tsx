"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

type Photo = { thumb: string; full: string; alt: string; width: number; height: number }

/** Thumbnail grid + lightbox on a native <dialog> (focus trap, Esc and backdrop handled by the browser). */
export function OfficeGallery({ photos }: { photos: Photo[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState<number | null>(null)

  const open = (i: number) => {
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const close = () => dialogRef.current?.close()
  const step = useCallback((dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + photos.length) % photos.length)), [photos.length])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1)
      if (event.key === "ArrowLeft") step(-1)
    }
    const onClose = () => setIndex(null)
    dialog.addEventListener("keydown", onKey)
    dialog.addEventListener("close", onClose)
    return () => {
      dialog.removeEventListener("keydown", onKey)
      dialog.removeEventListener("close", onClose)
    }
  }, [step])

  if (!photos.length) return null
  const current = index === null ? null : photos[index]

  return (
    <>
      <ul className="grid grid-cols-3 gap-2.5 lg:gap-3">
        {photos.map((photo, i) => (
          <li key={photo.full}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`Powiększ zdjęcie ${i + 1} z ${photos.length}`}
              className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-mist-100 shadow-rest transition-[box-shadow,translate] duration-500 ease-mist hover:-translate-y-0.5 hover:shadow-float"
            >
              <Image src={photo.thumb} alt={photo.alt} fill sizes="(min-width: 1024px) 120px, 30vw" className="object-cover transition-transform duration-700 ease-mist group-hover:scale-[1.04]" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Zdjęcia gabinetu"
        onClick={(event) => event.target === event.currentTarget && close()}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-moss-950/80 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="flex h-dvh w-screen items-center justify-center p-4 lg:p-12" onClick={(event) => event.target === event.currentTarget && close()}>
            <figure className="relative flex max-h-full max-w-5xl animate-fade-up flex-col items-center gap-4">
              <Image
                src={current.full}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="h-auto max-h-[calc(100dvh-140px)] w-auto rounded-2xl object-contain shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]"
              />
              <figcaption className="text-sm text-mist-50/80">
                {index! + 1} / {photos.length}
              </figcaption>
            </figure>
            {photos.length > 1 && (
              <>
                <LightboxButton label="Poprzednie zdjęcie" className="left-3 lg:left-8" onClick={() => step(-1)} path="M15 6l-6 6 6 6" />
                <LightboxButton label="Następne zdjęcie" className="right-3 lg:right-8" onClick={() => step(1)} path="M9 6l6 6-6 6" />
              </>
            )}
            <LightboxButton label="Zamknij" className="top-4 right-3 translate-y-0 lg:top-8 lg:right-8" onClick={close} path="M6 6l12 12M18 6L6 18" />
          </div>
        )}
      </dialog>
    </>
  )
}

function LightboxButton({ label, className, onClick, path }: { label: string; className: string; onClick: () => void; path: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-mist-50/90 text-moss-950 shadow-float transition-[background-color] duration-400 hover:bg-white ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={path} />
      </svg>
    </button>
  )
}
