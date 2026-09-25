"use client"

import { Tabs } from "radix-ui"
import type { ReactNode } from "react"

type Tab = { id: string; label: string; body: ReactNode; facts: { label: string; value: string }[] }

export function AboutTabs({ tabs }: { tabs: Tab[] }) {
  if (!tabs.length) return null

  return (
    <Tabs.Root defaultValue={tabs[0].id} className="flex flex-col gap-8 lg:gap-10">
      <Tabs.List
        aria-label="O mnie"
        className="-mx-5 flex gap-6 overflow-x-auto border-b border-mist-200 px-5 [scrollbar-width:none] [mask-image:linear-gradient(to_right,#000_calc(100%-56px),transparent)] lg:mx-0 lg:gap-7 lg:overflow-visible lg:px-0 lg:[mask-image:none]"
      >
        {tabs.map((tab, index) => (
          <Tabs.Trigger
            key={tab.id}
            value={tab.id}
            onFocus={(event) => event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" })}
            className="group relative flex shrink-0 flex-col gap-2 pb-4 text-left whitespace-nowrap opacity-38 transition-opacity duration-500 ease-mist hover:opacity-70 data-[state=active]:opacity-100 lg:gap-3 lg:pb-5"
          >
            <span className="text-[11px] tracking-[0.14em] text-moss-500 lg:text-xs">{String(index + 1).padStart(2, "0")}</span>
            <span className="font-display text-[19px] leading-tight lg:text-xl">{tab.label}</span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-moss-950 transition-transform duration-700 ease-mist group-data-[state=active]:scale-x-100"
            />
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Content key={tab.id} value={tab.id} className="flex min-h-80 animate-fade-up flex-col gap-6 lg:min-h-80">
          {tab.body}
          {tab.facts.length > 0 && (
            <div className="flex flex-col gap-2.5 lg:gap-3">
              {tab.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 rounded-2xl bg-white px-5 py-4 text-[15px] shadow-rest lg:flex-row lg:justify-between lg:gap-6 lg:rounded-[18px] lg:px-7 lg:py-5.5 lg:text-[17px]"
                >
                  <span className="font-medium">{fact.label}</span>
                  <span className="text-moss-500 lg:text-right">{fact.value}</span>
                </div>
              ))}
            </div>
          )}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
