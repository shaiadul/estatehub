"use client"

import { IconCheck } from "@tabler/icons-react"

export function DraftToast() {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-primary-container text-primary-foreground px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-primary-foreground/20 animate-in slide-in-from-bottom duration-300">
      <IconCheck size={20} className="text-tertiary shrink-0" />
      <div className="flex flex-col">
        <span className="text-xs font-bold">Draft Saved Successfully</span>
        <span className="text-[11px] text-muted-foreground">
          Listing state cached locally and synced with your advisor vault.
        </span>
      </div>
    </div>
  )
}
