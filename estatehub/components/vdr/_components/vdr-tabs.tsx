"use client"

import { cn } from "cn"
import { VDR_TABS } from "./vdr-data"
import { countByTab } from "./vdr-utils"
import type { DiligenceDoc, VdrTabId } from "./types"

interface VdrTabsProps {
  activeTab: VdrTabId
  onChange: (tab: VdrTabId) => void
  docs?: DiligenceDoc[]
}

export function VdrTabs({ activeTab, onChange, docs }: VdrTabsProps) {
  const counts = countByTab(docs ?? [])
  return (
    <div
      role="tablist"
      aria-label="Diligence categories"
      className="flex items-center overflow-x-auto gap-2 pb-1 scrollbar-none"
    >
      {VDR_TABS.map((tab) => {
        const isActive = activeTab === tab.id
        const count = counts[tab.id]
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2",
              isActive
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface",
            )}
          >
            <span>{tab.id === "all" ? `Full Repository (${count} Exhibits)` : tab.label}</span>
            {tab.id !== "all" && (
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded-full text-[10px] font-mono",
                  isActive ? "bg-on-primary/20" : "bg-surface-container",
                )}
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
