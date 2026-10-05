"use client"

import { IconCircleCheck } from "@tabler/icons-react"
import type { VdrToast } from "./use-vdr-state"

export function VdrToasts({ toasts }: { toasts: VdrToast[] }) {
  if (toasts.length === 0) return null
  return (
    <div aria-live="polite" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-primary-container text-primary-foreground px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3.5 border border-primary-foreground/20 animate-in slide-in-from-bottom duration-300 max-w-sm"
        >
          <IconCircleCheck className="w-7 h-7 text-secondary flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-bold">{t.title}</span>
            <span className="text-[11px] text-muted-foreground">{t.description}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
