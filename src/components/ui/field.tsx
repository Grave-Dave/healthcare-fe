"use client"

import { type ComponentProps, type ReactNode, useId, useState } from "react"

import { cn } from "@/lib/utils"

// Inputs from docs/design-system.md, section 9 ("Konto"): 56 px, radius 16, mist background, soft focus ring.
const inputClass =
  "h-14 w-full rounded-2xl bg-mist-50 px-4.5 text-base text-moss-950 shadow-[inset_0_0_0_1px_var(--color-mist-200)] outline-none transition-[box-shadow,background-color] duration-500 ease-mist placeholder:text-moss-400 hover:shadow-[inset_0_0_0_1px_var(--color-moss-200)] focus:bg-white focus:shadow-[inset_0_0_0_1.5px_var(--color-moss-600),0_14px_30px_-18px_rgb(26_38_32/0.35)] aria-invalid:bg-white aria-invalid:shadow-[inset_0_0_0_1.5px_#b0624f] disabled:opacity-60"

type FieldProps = Omit<ComponentProps<"input">, "id"> & {
  label: string
  error?: string
  hint?: ReactNode
  action?: ReactNode
}

export function Field({ label, error, hint, action, className, ...props }: FieldProps) {
  const id = useId()
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[13px] font-medium text-moss-700">
        {label}
      </label>
      <div className="relative">
        <input id={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy} className={cn(inputClass, action && "pr-15")} {...props} />
        {action && <div className="absolute top-1.5 right-2">{action}</div>}
      </div>
      {error ? (
        <span id={`${id}-error`} className="text-[13px] text-ember-700">
          {error}
        </span>
      ) : hint ? (
        <span id={`${id}-hint`} className="text-[13px] text-moss-500">
          {hint}
        </span>
      ) : null}
    </div>
  )
}

export function PasswordField(props: Omit<FieldProps, "type" | "action">) {
  const [visible, setVisible] = useState(false)

  return (
    <Field
      {...props}
      type={visible ? "text" : "password"}
      action={
        <button
          type="button"
          aria-label={visible ? "Ukryj hasło" : "Pokaż hasło"}
          aria-pressed={visible}
          onClick={() => setVisible((value) => !value)}
          className="grid size-11 place-items-center rounded-full text-moss-500 opacity-70 transition-[opacity,background-color] duration-400 hover:bg-mist-100 hover:opacity-100"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
            {visible && <path d="M4 4l16 16" />}
          </svg>
        </button>
      }
    />
  )
}

/** Form-level message (e.g. wrong credentials), announced to screen readers. */
export function FormAlert({ children, tone = "error" }: { children?: ReactNode; tone?: "error" | "info" }) {
  if (!children) return null
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-2xl px-4.5 py-3.5 text-[15px] leading-relaxed",
        tone === "error" ? "bg-ember-50 text-ember-700 shadow-[inset_0_0_0_1px_var(--color-ember-200)]" : "bg-mist-100 text-moss-700"
      )}
    >
      {children}
    </div>
  )
}
