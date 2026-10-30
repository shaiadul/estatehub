"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconAlertTriangle,
  IconRefresh,
  IconArrowLeft,
  IconServerOff,
  IconLock,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

interface AdminErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AdminErrorPage({ error, reset }: AdminErrorProps) {
  const [showTechnicalDetails, setShowTechnicalDetails] = React.useState(false)

  React.useEffect(() => {
    console.error("[Admin Enclave Exception]", error)
  }, [error])

  const errorMessage = error?.message || "Internal administrative service error"
  const isApiError =
    errorMessage.includes("fetch") ||
    errorMessage.includes("Network") ||
    errorMessage.includes("ECONNREFUSED") ||
    errorMessage.includes("API") ||
    errorMessage.includes("500") ||
    errorMessage.includes("502") ||
    errorMessage.includes("503")

  return (
    <div className="flex min-h-[75vh] w-full flex-col items-center justify-center p-6 text-center">
      {/* Visual Icon */}
      <div className="relative mb-5 flex items-center justify-center">
        <div className="absolute h-24 w-24 rounded-full bg-secondary/15 blur-lg" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/15 text-secondary shadow-md">
          {isApiError ? <IconServerOff size={28} /> : <IconAlertTriangle size={28} />}
        </div>
      </div>

      {/* Header Tags */}
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-outline-variant/30 bg-surface-container px-3 py-1 font-mono text-[11px] font-bold text-on-surface">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span>Admin Enclave Handshake Interrupted</span>
      </div>

      <h1 className="text-xl font-black tracking-tight text-on-surface sm:text-2xl max-w-md">
        {isApiError
          ? "Authority Node API Connection Error"
          : "Administrative Console Exception"}
      </h1>

      <p className="mt-2 text-xs text-on-surface-variant max-w-md leading-relaxed">
        {isApiError
          ? "The administrative console could not complete telemetry sync with the core Postgres/Supabase database. Local sovereign state caching is active."
          : "An unexpected error occurred in the administrative workstation. You can retry the operation or re-authenticate."}
      </p>

      {/* Action Buttons */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        <Button
          onClick={() => reset()}
          className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90 shadow-sm gap-2"
        >
          <IconRefresh size={14} />
          <span>Retry Sync &amp; Reload</span>
        </Button>

        <Link href="/admin">
          <Button
            variant="outline"
            className="h-10 rounded-xl border-outline-variant/40 px-4 text-xs font-bold hover:bg-surface-container gap-1.5"
          >
            <span>Overview Console</span>
          </Button>
        </Link>

        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="h-10 rounded-xl px-3 text-xs font-semibold text-on-surface-variant hover:text-on-surface"
          >
            <IconArrowLeft size={14} />
            <span>Client Desk</span>
          </Button>
        </Link>
      </div>

      {/* Technical Diagnostics */}
      <div className="mt-7 w-full max-w-md text-left">
        <button
          type="button"
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="flex w-full items-center justify-between rounded-xl border border-outline-variant/20 bg-surface-container-low px-3.5 py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <span>Diagnostic Log Trace</span>
          {showTechnicalDetails ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
        </button>

        {showTechnicalDetails && (
          <div className="mt-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-3.5 font-mono text-[11px] text-on-surface shadow-xs">
            <div className="space-y-1.5 text-on-surface-variant">
              <div>
                <span className="text-secondary font-bold">Error: </span>
                <span className="text-destructive font-semibold">{errorMessage}</span>
              </div>
              {error?.digest && (
                <div>
                  <span className="text-secondary font-bold">Digest: </span>
                  <span>{error.digest}</span>
                </div>
              )}
              <div>
                <span className="text-secondary font-bold">Enclave Node: </span>
                <span>ap-southeast-2 (Isolated)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
