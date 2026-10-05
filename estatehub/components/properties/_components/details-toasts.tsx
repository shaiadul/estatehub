"use client"

import { IconCheck, IconCircleCheck } from "@tabler/icons-react"

interface DetailsToastsProps {
  bookingToast: boolean
  shareToast: boolean
  agentName: string
}

export function DetailsToasts({ bookingToast, shareToast, agentName }: DetailsToastsProps) {
  return (
    <>
      {bookingToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary-container text-primary-foreground px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3.5 border border-primary-foreground/20 animate-in slide-in-from-bottom duration-300">
          <IconCircleCheck className="w-7 h-7 text-secondary flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-bold">Tour Request Received</span>
            <span className="text-[11px] text-muted-foreground">
              {agentName}&apos;s executive concierge will confirm within 60 minutes.
            </span>
          </div>
        </div>
      )}

      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary-container text-primary-foreground px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-primary-foreground/20 animate-in slide-in-from-bottom duration-300">
          <IconCheck className="w-5 h-5 text-tertiary flex-shrink-0" />
          <span className="text-xs font-semibold">Direct property link copied to clipboard</span>
        </div>
      )}
    </>
  )
}
