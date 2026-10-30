"use client"

import * as React from "react"
import { IconServerOff, IconRefresh, IconAlertTriangle } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

export interface ApiErrorCardProps {
  title?: string
  message?: string
  statusCode?: number | string
  onRetry?: () => void
  isRetrying?: boolean
  className?: string
}

export function ApiErrorCard({
  title = "API Service Unreachable",
  message = "Failed to synchronize with the backend service. Operating in sovereign offline baseline mode.",
  statusCode,
  onRetry,
  isRetrying = false,
  className = "",
}: ApiErrorCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center ${className}`}
    >
      <div className="relative mb-3 flex items-center justify-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-destructive/30 bg-destructive/10 text-destructive">
          <IconServerOff size={22} />
        </div>
      </div>

      <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-destructive">
        <IconAlertTriangle size={13} />
        <span>{statusCode ? `HTTP Error ${statusCode}` : "API Network Exception"}</span>
      </div>

      <h3 className="mt-1 font-heading text-sm font-bold text-on-surface">
        {title}
      </h3>

      <p className="mt-1 max-w-md text-xs text-on-surface-variant leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <Button
          size="sm"
          variant="outline"
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-4 h-8 rounded-xl border-outline-variant/40 px-3.5 text-xs font-semibold gap-1.5"
        >
          <IconRefresh size={13} className={isRetrying ? "animate-spin" : ""} />
          <span>{isRetrying ? "Reconnecting..." : "Retry API Handshake"}</span>
        </Button>
      )}
    </div>
  )
}
