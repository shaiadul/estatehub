"use client"

import Link from "next/link"
import {
  IconCalendarEvent,
  IconPlus,
  IconShieldCheck,
  IconUserPlus,
  IconReceipt2,
  IconChevronRight,
  IconActivity,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useI18n } from "@/lib/i18n"
import type { CommandState } from "./use-command-state"

interface CommandHeaderProps {
  state: CommandState
}

const TAB_METADATA: Record<string, { title: string; subtitle: string }> = {
  overview: {
    title: "Executive Portfolio & Command Telemetry",
    subtitle: "Real-time overview of active listings, bilateral offers, and scheduled showings",
  },
  properties: {
    title: "Syndicate Inventory & Property Assets",
    subtitle: "Curated prime estates, architectural dossiers, and active marketplace listings",
  },
  offers: {
    title: "Bilateral LOI & Offer Mediation Desk",
    subtitle: "Formal letters of intent, earnest deposits, counter-offers, and escrow milestones",
  },
  crm: {
    title: "Client Relationship Management & Leads",
    subtitle: "High-net-worth investor pipelines, syndicate allocations, and onboarding dossiers",
  },
  financials: {
    title: "Commission & Capital Settlement Desk",
    subtitle: "Bilateral settlement distributions, fee take-rates, and escrow wire status",
  },
  vault: {
    title: "Compliance Vault & Encrypted VDR",
    subtitle: "Title deeds, structural inspections, environmental surveys, and NDA documents",
  },
  sentry: {
    title: "Sentry Telemetry & Smart Estate IoT",
    subtitle: "Biometric perimeter security, environmental HVAC zones, and automated gates",
  },
  saved: {
    title: "Trophy Watchlist & Saved Architectural Works",
    subtitle: "Monitored luxury assets with real-time valuation comps and price adjustments",
  },
  tours: {
    title: "Private Showings & VIP Fleet Concierge",
    subtitle: "Chauffeured Maybach transfers, helicopter arrivals, and LiDAR 3D walkthroughs",
  },
}

export function CommandHeader({ state }: CommandHeaderProps) {
  const { t } = useI18n()
  const {
    activeRole,
    activeNav,
    user,
    properties,
    offers,
    tours,
    savedProperties,
    leads,
    deals,
    setIsAddPropertyModalOpen,
    setIsSubmitLoiModalOpen,
    setIsBookTourModalOpen,
    setIsAddClientModalOpen,
  } = state

  const tabInfo = TAB_METADATA[activeNav] || TAB_METADATA.overview

  const roleLabel =
    activeRole === "buyer"
      ? "Buyer Acquisition"
      : activeRole === "seller"
        ? "Seller Portfolio"
        : "Broker Syndicate"

  // Contextual telemetry counts
  const buyerActiveOffers = offers.filter(
    (o) => o.buyerName.toLowerCase().includes("julian") || o.buyerName.toLowerCase().includes("rossi")
  ).length
  const buyerToursCount = tours.filter(
    (t) => t.clientRole === "buyer" || t.clientName.toLowerCase().includes("julian")
  ).length

  const sellerPendingOffers = offers.filter((o) => o.status === "Pending Review").length
  const sellerEscrowDeals = offers.filter((o) => o.status === "Escrow Opened").length

  return (
    <SectionWrapper
      fullWidth
      className="border-b border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-md shadow-xs"
      innerClassName="py-4"
    >
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        {/* Left Section: Breadcrumbs & Context Title */}
        <div>
          {/* Breadcrumb Hierarchy */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-on-surface-variant font-medium">
            <span className="font-semibold text-secondary">Client Desk</span>
            <IconChevronRight size={13} className="text-outline-variant" />
            <span className="font-semibold text-on-surface">{roleLabel}</span>
            <IconChevronRight size={13} className="text-outline-variant" />
            <span className="capitalize text-on-surface-variant">{activeNav}</span>
          </div>

          {/* Dynamic Context Header */}
          <h1 className="mt-1 text-xl font-bold tracking-tight text-on-surface sm:text-2xl">
            {tabInfo.title}
          </h1>
          <p className="mt-0.5 text-xs text-on-surface-variant max-w-2xl leading-relaxed">
            {tabInfo.subtitle}
          </p>
        </div>

        {/* Right Section: Telemetry Chips & Primary Action CTAs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 xl:justify-end">
          {/* Executive Telemetry Chips */}
          <div className="hidden lg:flex items-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-low px-3 py-1.5 text-xs">
            <IconActivity size={14} className="text-secondary" />
            {activeRole === "buyer" ? (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-on-surface-variant">LOIs:</span>
                <span className="font-bold text-on-surface">{buyerActiveOffers}</span>
                <span className="text-outline-variant/50">•</span>
                <span className="text-on-surface-variant">Saved:</span>
                <span className="font-bold text-on-surface">{savedProperties.length}</span>
                <span className="text-outline-variant/50">•</span>
                <span className="text-on-surface-variant">Tours:</span>
                <span className="font-bold text-on-surface">{buyerToursCount}</span>
              </div>
            ) : activeRole === "seller" ? (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-on-surface-variant">Listings:</span>
                <span className="font-bold text-on-surface">{properties.length}</span>
                <span className="text-outline-variant/50">•</span>
                <span className="text-on-surface-variant">Offers:</span>
                <span className="font-bold text-on-surface">{sellerPendingOffers}</span>
                <span className="text-outline-variant/50">•</span>
                <span className="text-on-surface-variant">In Escrow:</span>
                <span className="font-bold text-on-surface">{sellerEscrowDeals}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-on-surface-variant">Estates:</span>
                <span className="font-bold text-on-surface">{properties.length}</span>
                <span className="text-outline-variant/50">•</span>
                <span className="text-on-surface-variant">Leads:</span>
                <span className="font-bold text-on-surface">{leads.length}</span>
                <span className="text-outline-variant/50">•</span>
                <span className="text-on-surface-variant">Deals:</span>
                <span className="font-bold text-on-surface">{deals.length}</span>
              </div>
            )}
          </div>

          {/* Quick Hub Switcher */}
          <Link href="/admin">
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-xl border-outline-variant/40 px-3 text-xs font-semibold hover:bg-surface-container"
            >
              <IconShieldCheck size={14} className="text-secondary" />
              <span className="hidden sm:inline">Admin</span>
              <span>Enclave</span>
            </Button>
          </Link>

          {/* Contextual Action CTAs */}
          {activeRole === "buyer" ? (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsBookTourModalOpen(true)}
                variant="outline"
                size="sm"
                className="h-9 rounded-xl border-outline-variant/40 px-3.5 text-xs font-semibold hover:bg-surface-container"
              >
                <IconCalendarEvent size={14} />
                <span>Book VIP Tour</span>
              </Button>
              <Button
                onClick={() => setIsSubmitLoiModalOpen(true)}
                size="sm"
                className="h-9 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                <IconPlus size={14} />
                <span>Submit LOI</span>
              </Button>
            </div>
          ) : activeRole === "seller" ? (
            <div className="flex items-center gap-2">
              <Link href="/closing">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-xl border-outline-variant/40 px-3.5 text-xs font-semibold hover:bg-surface-container"
                >
                  <IconReceipt2 size={14} className="text-secondary" />
                  <span className="hidden sm:inline">Closing Desk</span>
                </Button>
              </Link>
              <Button
                onClick={() => setIsAddPropertyModalOpen(true)}
                size="sm"
                className="h-9 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                <IconPlus size={14} />
                <span>{t("dash.addListing", "Add Listing")}</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsAddClientModalOpen(true)}
                variant="outline"
                size="sm"
                className="h-9 rounded-xl border-outline-variant/40 px-3.5 text-xs font-semibold hover:bg-surface-container"
              >
                <IconUserPlus size={14} />
                <span>Enroll Client</span>
              </Button>
              <Button
                onClick={() => setIsAddPropertyModalOpen(true)}
                size="sm"
                className="h-9 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                <IconPlus size={14} />
                <span>Add Listing</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
