import type { AnySpaceCTDHydrated, SettingsHydrated } from "@flotiq/flotiq-api-sdk"

export type SectionContext = {
  settings?: SettingsHydrated
}

export type SectionType = AnySpaceCTDHydrated["internal"]["contentType"]
export type SectionOf<T extends SectionType> = Extract<AnySpaceCTDHydrated, { internal: { contentType: T } }>

export type SectionProps<T extends SectionType> = {
  section: SectionOf<T>
  ctx: SectionContext
}
