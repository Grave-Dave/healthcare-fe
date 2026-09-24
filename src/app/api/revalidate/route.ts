import { revalidateTag } from "next/cache"
import type { NextRequest } from "next/server"

import { serverEnv } from "@/lib/env"
import { FLOTIQ_TAG, flotiqTypeTag } from "@/lib/flotiq"

// Flotiq webhook target. Send the secret in the `x-revalidate-secret` header and, optionally,
// the content type name as `?type=` to invalidate only that type.
export async function POST(request: NextRequest) {
  if (request.headers.get("x-revalidate-secret") !== serverEnv.revalidateSecret) {
    return Response.json({ revalidated: false, message: "Invalid secret" }, { status: 401 })
  }

  const type = request.nextUrl.searchParams.get("type")
  const tag = type ? flotiqTypeTag(type) : FLOTIQ_TAG
  revalidateTag(tag, "max")

  return Response.json({ revalidated: true, tag })
}
