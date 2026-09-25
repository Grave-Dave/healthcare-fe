"use client"

import { useId, type ReactNode } from "react"

import { cn } from "@/lib/utils"

// Switch from docs/design-system.md (section 10): 44×26 track, mist-300 → moss-800, white knob, 450 ms.
export function Switch({ checked, onChange, label, hint, disabled }: { checked: boolean; onChange: (checked: boolean) => void; label: ReactNode; hint?: ReactNode; disabled?: boolean }) {
  const id = useId()
  return (
    <div className="flex items-start justify-between gap-4">
      <label htmlFor={id} className="flex cursor-pointer flex-col gap-1">
        <span className="text-[15px] font-medium lg:text-base">{label}</span>
        {hint && <span className="text-[13px] leading-relaxed text-moss-500 lg:text-sm">{hint}</span>}
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative mt-0.5 h-[26px] w-11 shrink-0 rounded-full transition-colors duration-450 ease-mist disabled:opacity-40",
          checked ? "bg-moss-800" : "bg-mist-300"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-[3px] left-[3px] size-5 rounded-full bg-white shadow-[0_2px_6px_rgb(26_38_32/0.25)] transition-[translate] duration-450 ease-mist",
            checked && "translate-x-[18px]"
          )}
        />
      </button>
    </div>
  )
}
