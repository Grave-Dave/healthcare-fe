import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

import { serverEnv } from "@/lib/env"

// Flotiq preview URL: /api/draft?secret=<DRAFT_MODE_SECRET>&slug=/o-mnie
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const slug = searchParams.get("slug") ?? "/"

  if (secret !== serverEnv.draftSecret) {
    return new Response("Invalid token", { status: 401 })
  }
  // Only same-site paths – prevents using the endpoint as an open redirect.
  if (!slug.startsWith("/") || slug.startsWith("//")) {
    return new Response("Invalid slug", { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()
  redirect(slug)
}
