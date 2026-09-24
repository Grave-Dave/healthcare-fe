import { redirect } from "next/navigation"

import { routes } from "@/lib/site"

export default function PanelIndex() {
  redirect(routes.booking)
}
