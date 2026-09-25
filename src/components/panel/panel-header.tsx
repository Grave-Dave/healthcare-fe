"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useSyncExternalStore } from "react"

import { useToast } from "@/components/ui/toast"
import { getAdminOverview, pendingStore } from "@/lib/admin"
import { endImpersonation, getImpersonation, logout } from "@/lib/auth/session"
import { useSession } from "@/lib/auth/use-session"
import { routes, site } from "@/lib/site"

const panelNav = [
  { href: routes.booking, label: "Rezerwacja" },
  { href: routes.myVisits, label: "Moje wizyty" },
  { href: routes.account, label: "Konto" },
]

const adminNav = [
  { href: routes.admin, label: "Wizyty", exact: true },
  { href: routes.adminTerms, label: "Terminy" },
  { href: routes.adminPatients, label: "Pacjenci" },
]

const noSubscribe = () => () => {}

export function PanelHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const toast = useToast()
  const { status, user, isAdmin } = useSession()
  const pending = useSyncExternalStore(pendingStore.subscribe, pendingStore.get, pendingStore.getServer)
  // localStorage is read on the client only (the server snapshot is null).
  const impersonating = useSyncExternalStore(noSubscribe, getImpersonation, () => null)
  const initials = [user?.firstName, user?.lastName].map((part) => part?.[0] ?? "").join("").toUpperCase()

  // Load the pending count for the badge once (admin pages refresh it themselves).
  useEffect(() => {
    if (status === "authenticated" && isAdmin && pendingStore.get() === null) getAdminOverview().catch(() => undefined)
  }, [status, isAdmin])

  const nav = isAdmin ? adminNav : panelNav
  const isActive = (item: { href: string; exact?: boolean }) => (item.exact ? pathname === item.href : pathname.startsWith(item.href))

  async function onLogout() {
    await logout().catch(() => undefined)
    toast("Wylogowano")
    router.replace(routes.home)
  }

  async function onEndImpersonation() {
    await endImpersonation()
    router.replace(`${routes.login}?next=${encodeURIComponent(routes.adminPatients)}`)
  }

  return (
    <>
      {impersonating && status === "authenticated" && !isAdmin && (
        <div role="status" className="page-x flex flex-col gap-2 bg-dawn-400 py-3 text-[14px] text-moss-950 sm:flex-row sm:items-center sm:justify-between lg:text-[15px]">
          <span>
            Przeglądasz panel jako <strong className="font-semibold">{impersonating}</strong>
          </span>
          <button type="button" onClick={onEndImpersonation} className="self-start font-medium underline underline-offset-4 sm:self-auto">
            Zakończ i wróć do panelu administratora
          </button>
        </div>
      )}
      <header className="page-x flex h-[76px] items-center justify-between border-b border-mist-200">
        <div className="flex items-center gap-16">
          <Link href={routes.home} className="font-display text-[19px] lg:text-[22px]">
            {site.name.split(" ")[0]} <em>{site.name.split(" ").slice(1).join(" ")}</em>
          </Link>
          <nav aria-label="Panel" className="hidden gap-9 text-[15px] font-medium lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item) ? "page" : undefined}
                className="relative flex items-center gap-2 py-1.5 opacity-55 transition-opacity duration-400 hover:opacity-100 aria-[current=page]:opacity-100 aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:-bottom-0.5 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-sm aria-[current=page]:after:bg-moss-950"
              >
                {item.label}
                {isAdmin && item.href === routes.admin && pending ? (
                  <span aria-label={`${pending} do potwierdzenia`} className="grid h-5 min-w-5 place-items-center rounded-full bg-dawn-400 px-1.5 text-[11px] font-bold text-moss-950">
                    {pending}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
        </div>
        {status === "anonymous" && (
          <Link href={`${routes.login}?next=${encodeURIComponent(pathname)}`} className="text-[15px] font-medium opacity-70 transition-opacity hover:opacity-100">
            Zaloguj się
          </Link>
        )}
        {status === "authenticated" && user && (
          <div className="flex items-center gap-3.5">
            <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-[#e6ebe3] text-[13px] font-bold text-moss-800 lg:size-10">
              {initials || "?"}
            </span>
            <span className="hidden text-[15px] lg:inline">
              {user.firstName} {user.lastName}
            </span>
            {isAdmin && <span className="hidden rounded-full bg-moss-950 px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-mist-50 uppercase sm:inline">Administrator</span>}
            <button type="button" onClick={onLogout} className="ml-2 text-sm font-medium opacity-55 transition-opacity hover:opacity-100">
              Wyloguj
            </button>
          </div>
        )}
      </header>
      {nav.length > 0 && status === "authenticated" && (
        <nav aria-label="Panel (mobile)" className="page-x flex gap-2 overflow-x-auto border-b border-mist-200 py-3 [scrollbar-width:none] lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item) ? "page" : undefined}
              className="flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium opacity-60 shadow-[inset_0_0_0_1px_var(--color-mist-300)] transition-[opacity,background-color,color] duration-400 aria-[current=page]:bg-moss-950 aria-[current=page]:text-mist-50 aria-[current=page]:opacity-100 aria-[current=page]:shadow-none"
            >
              {item.label}
              {isAdmin && item.href === routes.admin && pending ? <span className="grid h-5 min-w-5 place-items-center rounded-full bg-dawn-400 px-1.5 text-[11px] font-bold text-moss-950">{pending}</span> : null}
            </Link>
          ))}
        </nav>
      )}
    </>
  )
}
