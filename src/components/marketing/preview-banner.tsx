import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

async function exitPreview() {
  "use server"
  const draft = await draftMode()
  draft.disable()
  redirect("/")
}

export async function PreviewBanner() {
  const { isEnabled } = await draftMode()
  if (!isEnabled) return null

  return (
    <aside
      role="status"
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full bg-moss-950 py-2 pr-2 pl-5 text-sm text-mist-50 shadow-float"
    >
      Podgląd wersji roboczej
      <form action={exitPreview}>
        <button type="submit" className="rounded-full bg-dawn-400 px-4 py-2 font-medium text-moss-950">
          Zakończ podgląd
        </button>
      </form>
    </aside>
  )
}
