"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconAlertTriangle,
  IconRefresh,
  IconArrowLeft,
  IconServerOff,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: GlobalErrorProps) {
  const [showTechnicalDetails, setShowTechnicalDetails] = React.useState(false)

  React.useEffect(() => {
    // Log the error to console or error tracking service
    console.error("[EstateHub Application Error]", error)
  }, [error])

  const errorMessage = error?.message || "An unexpected system error occurred"
  const isApiError =
    errorMessage.includes("fetch") ||
    errorMessage.includes("Network") ||
    errorMessage.includes("ECONNREFUSED") ||
    errorMessage.includes("API") ||
    errorMessage.includes("500") ||
    errorMessage.includes("502") ||
    errorMessage.includes("503") ||
    errorMessage.includes("Failed to fetch")

  return (
    <div className="flex min-h-[85vh] w-full flex-col items-center justify-center p-6 text-center">
      {/* Decorative background glow */}
      <div className="relative mb-6 flex items-center justify-center">
        <div className="absolute h-28 w-28 rounded-full bg-destructive/10 blur-xl" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl border border-destructive/20 bg-destructive/10 text-destructive shadow-md">
          {isApiError ? <IconServerOff size={32} /> : <IconAlertTriangle size={32} />}
        </div>
      </div>

      {/* Status Pill */}
      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 font-mono text-[11px] font-bold text-destructive">
        <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-ping" />
        <span>{isApiError ? "API Gateway Disconnected" : "Application Runtime Exception"}</span>
      </div>

      {/* Main Title & User-Friendly Message */}
      <h1 className="text-2xl font-black tracking-tight text-on-surface sm:text-3xl max-w-lg">
        {isApiError
          ? "Backend Service Connection Interrupted"
          : "Encountered an Unexpected Platform Error"}
      </h1>

      <p className="mt-2 text-sm text-on-surface-variant max-w-md leading-relaxed">
        {isApiError
          ? "Unable to establish a secure handshake with the primary API cluster. Your authenticated credentials and active draft contracts remain securely cached."
          : "The platform encountered an unhandled exception while compiling the interface. Please retry the request."}
      </p>

      {/* Primary Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button
          onClick={() => reset()}
          className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90 shadow-sm gap-2"
        >
          <IconRefresh size={15} />
          <span>Retry Connection &amp; Refresh</span>
        </Button>

        <Link href="/">
          <Button
            variant="outline"
            className="h-10 rounded-xl border-outline-variant/40 px-4 text-xs font-bold hover:bg-surface-container gap-1.5"
          >
            <IconArrowLeft size={15} />
            <span>Return to Global Radar</span>
          </Button>
        </Link>
      </div>

      {/* Technical Diagnostics Collapsible Box */}
      <div className="mt-8 w-full max-w-lg text-left">
        <button
          type="button"
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="flex w-full items-center justify-between rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-2.5 text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <span>Technical Diagnostic Trace</span>
          {showTechnicalDetails ? <IconChevronUp size={15} /> : <IconChevronDown size={15} />}
        </button>

        {showTechnicalDetails && (
          <div className="mt-2 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 font-mono text-[11px] text-on-surface shadow-xs">
            <div className="space-y-1.5 text-on-surface-variant">
              <div>
                <span className="text-secondary font-bold">Error Message: </span>
                <span className="text-destructive font-semibold">{errorMessage}</span>
              </div>
              {error?.digest && (
                <div>
                  <span className="text-secondary font-bold">Digest ID: </span>
                  <span>{error.digest}</span>
                </div>
              )}
              <div>
                <span className="text-secondary font-bold">Timestamp: </span>
                <span>{new Date().toISOString()}</span>
              </div>
              <div>
                <span className="text-secondary font-bold">Runtime Environment: </span>
                <span>{process.env.NODE_ENV || "development"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
