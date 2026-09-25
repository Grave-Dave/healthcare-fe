"use client"

import { useEffect, useSyncExternalStore } from "react"

import { bootstrapSession, sessionStore } from "./session"

export function useSession({ onlyIfKnown = false }: { onlyIfKnown?: boolean } = {}) {
  useEffect(() => bootstrapSession({ onlyIfKnown }), [onlyIfKnown])
  return useSyncExternalStore(sessionStore.subscribe, sessionStore.get, sessionStore.getServer)
}
