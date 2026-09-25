import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

import { serverEnv } from "@/lib/env"

// Called by the Flotiq editor preview plugin:
// /api/flotiq/draft?key=<DRAFT_MODE_SECRET>&draft=true|false&redirect=/o-mnie
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get("key")
  const target = searchParams.get("redirect") ?? "/"

  if (key !== serverEnv.draftSecret) {
    return new Response("Invalid token", { status: 401 })
  }
  // Only same-site paths – prevents using the endpoint as an open redirect.
  if (!target.startsWith("/") || target.startsWith("//")) {
    return new Response("Invalid redirect", { status: 400 })
  }

  const draft = await draftMode()
  if (searchParams.get("draft") === "false") {
    draft.disable()
  } else {
    draft.enable()
  }

  // The home page is stored with slug "index".
  redirect(target === "/index" ? "/" : target)
}
