"use client"

import { IconCircleCheck } from "@tabler/icons-react"

export interface AppToast {
  id: string | number
  title: string
  description?: string
}

export function AppToastItem({ toast }: { toast: AppToast }) {
  return (
    <div className="bg-primary-container text-primary-foreground px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3.5 border border-primary-foreground/20 animate-in slide-in-from-bottom duration-300 max-w-sm">
      <IconCircleCheck className="w-7 h-7 text-secondary shrink-0" />
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-bold">{toast.title}</span>
        {toast.description ? (
          <span className="text-[11px] text-muted-foreground">{toast.description}</span>
        ) : null}
      </div>
    </div>
  )
}

export function AppToasts({ toasts }: { toasts: AppToast[] }) {
  if (toasts.length === 0) return null
  return (
    <div aria-live="polite" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
      {toasts.map((t) => (
        <AppToastItem key={t.id} toast={t} />
      ))}
    </div>
  )
}
