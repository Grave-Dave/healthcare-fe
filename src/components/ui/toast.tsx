"use client"

import { createContext, type ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type Toast = { id: number; message: string; tone: "success" | "error" }

const ToastContext = createContext<(message: string, tone?: Toast["tone"]) => void>(() => {})

export const useToast = () => useContext(ToastContext)

// Pill toast from the mockups (moss-950, dawn check), bottom centre, ~3.5 s.
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const show = useCallback((message: string, tone: Toast["tone"] = "success") => {
    clearTimeout(timer.current)
    setToast({ id: Date.now(), message, tone })
    timer.current = setTimeout(() => setToast(null), 3500)
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-6 z-[60] flex justify-center lg:bottom-10">
        {toast && (
          <div
            key={toast.id}
            role={toast.tone === "error" ? "alert" : "status"}
            className={cn(
              "flex max-w-md animate-fade-up items-center gap-3 rounded-full px-5.5 py-4 text-[15px] shadow-[0_24px_50px_-24px_rgb(0_0_0/0.5)]",
              toast.tone === "error" ? "bg-ember-700 text-white" : "bg-moss-950 text-mist-50"
            )}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={toast.tone === "error" ? "currentColor" : "var(--color-dawn-400)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {toast.tone === "error" ? (
                <>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v5" />
                  <path d="M12 16.5v.5" />
                </>
              ) : (
                <path d="M5 12l5 5 9-10" />
              )}
            </svg>
            {toast.message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}
