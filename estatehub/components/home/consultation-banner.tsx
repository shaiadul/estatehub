"use client"

import * as React from "react"
import { IconShieldLock, IconCalendarEvent, IconFileText } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export function ConsultationBanner() {
  return (
    <SectionWrapper className="pb-16">
      <div className="relative w-full rounded-3xl bg-surface-container-high p-8 lg:p-12 overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-outline-variant/40">
        {/* Decorative metallic glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-secondary-fixed/25 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl text-left">
          <Badge
            variant="gold"
            className="text-xs uppercase tracking-wider inline-flex items-center gap-1.5 mb-3 px-3 py-1 shadow-sm"
          >
            <IconShieldLock size={14} className="shrink-0" />
            <span>Confidential Representation</span>
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
            Request Private Portfolio Showing
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
            Request an exclusive private showing or off-market asset evaluation. Our discrete
            advisory desk accommodates NDA-secured showings and remote family office escrow inquiries.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
          <Button
            type="button"
            variant="gold"
            size="xl"
            className="gap-2 shadow-md"
          >
            <IconCalendarEvent size={18} />
            <span>Schedule Consultation</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="xl"
            className="gap-2 bg-surface-container-lowest hover:bg-surface shadow-sm"
          >
            <IconFileText size={18} />
            <span>Asset Valuation Request</span>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  )
}
