"use client"

import { AppToasts } from "@/components/ui/app-toast"

interface DetailsToastsProps {
  bookingToast: boolean
  shareToast: boolean
  agentName: string
}

export function DetailsToasts({ bookingToast, shareToast, agentName }: DetailsToastsProps) {
  const toasts = [
    ...(bookingToast
      ? [
          {
            id: "booking",
            title: "Tour Request Received",
            description: `${agentName}'s executive concierge will confirm within 60 minutes.`,
          },
        ]
      : []),
    ...(shareToast
      ? [{ id: "share", title: "Direct property link copied to clipboard" }]
      : []),
  ]
  return <AppToasts toasts={toasts} />
}
