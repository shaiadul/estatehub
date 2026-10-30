"use client"

import Link from "next/link"
import {
  IconLayoutDashboard,
  IconBuildingEstate,
  IconFileSpreadsheet,
  IconUsers,
  IconChartBar,
  IconFolderCheck,
  IconShieldLock,
  IconBookmark,
  IconCalendarEvent,
  IconPlus,
  IconShieldCheck,
  IconUserPlus,
  IconReceipt2,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useI18n } from "@/lib/i18n"
import type { CommandState } from "./use-command-state"

interface CommandHeaderProps {
  state: CommandState
}

const TAB_METADATA: Record<
  string,
  { title: string; subtitle: string; icon: React.ComponentType<{ size?: number; className?: string }> }
> = {
  overview: {
    title: "Executive Portfolio & Command Telemetry",
    subtitle: "Real-time overview of active listings, bilateral offers, and scheduled showings",
    icon: IconLayoutDashboard,
  },
  properties: {
    title: "Syndicate Inventory & Property Assets",
    subtitle: "Curated prime estates, architectural dossiers, and active marketplace listings",
    icon: IconBuildingEstate,
  },
  offers: {
    title: "Bilateral LOI & Offer Mediation Desk",
    subtitle: "Formal letters of intent, earnest deposits, counter-offers, and escrow milestones",
    icon: IconFileSpreadsheet,
  },
  crm: {
    title: "Client Relationship Management & Leads",
    subtitle: "High-net-worth investor pipelines, syndicate allocations, and onboarding dossiers",
    icon: IconUsers,
  },
  financials: {
    title: "Commission & Capital Settlement Desk",
    subtitle: "Bilateral settlement distributions, fee take-rates, and escrow wire status",
    icon: IconChartBar,
  },
  vault: {
    title: "Compliance Vault & Encrypted VDR",
    subtitle: "Title deeds, structural inspections, environmental surveys, and NDA documents",
    icon: IconFolderCheck,
  },
  sentry: {
    title: "Sentry Telemetry & Smart Estate IoT",
    subtitle: "Biometric perimeter security, environmental HVAC zones, and automated gates",
    icon: IconShieldLock,
  },
  saved: {
    title: "Trophy Watchlist & Saved Architectural Works",
    subtitle: "Monitored luxury assets with real-time valuation comps and price adjustments",
    icon: IconBookmark,
  },
  tours: {
    title: "Private Showings & VIP Fleet Concierge",
    subtitle: "Chauffeured Maybach transfers, helicopter arrivals, and LiDAR 3D walkthroughs",
    icon: IconCalendarEvent,
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
  const TabIcon = tabInfo.icon

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
        {/* Left Section: Icon, Breadcrumbs, Context Title */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-outline-variant/30 bg-surface-container text-primary shadow-xs">
            <TabIcon size={22} className="text-secondary" />
          </div>

          <div>
            {/* Breadcrumb Hierarchy with Live Session Indicator */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-on-surface-variant font-medium">
              <span className="font-semibold text-secondary">Client Desk</span>
              <span>/</span>
              <span className="font-semibold text-on-surface">{roleLabel}</span>
              <span>/</span>
              <span className="capitalize">{activeNav}</span>
              <span className="inline-flex items-center gap-1.5 ml-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {user?.name ? `${user.name.split(" ")[0]} • Active` : "Live"}
              </span>
            </div>

            {/* Dynamic Context Header */}
            <h1 className="mt-0.5 text-xl font-bold tracking-tight text-on-surface sm:text-2xl">
              {tabInfo.title}
            </h1>
            <p className="mt-0.5 text-xs text-on-surface-variant max-w-2xl">
              {tabInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Right Section: Telemetry Pills & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 xl:justify-end">
          {/* Executive Telemetry Pills */}
          <div className="hidden md:flex items-center gap-1.5 rounded-xl border border-outline-variant/30 bg-surface-container-low px-2.5 py-1 text-xs">
            {activeRole === "buyer" ? (
              <>
                <span className="font-medium text-on-surface-variant">LOIs:</span>
                <span className="font-bold text-on-surface">{buyerActiveOffers}</span>
                <span className="text-outline-variant/60">•</span>
                <span className="font-medium text-on-surface-variant">Saved:</span>
                <span className="font-bold text-on-surface">{savedProperties.length}</span>
                <span className="text-outline-variant/60">•</span>
                <span className="font-medium text-on-surface-variant">Tours:</span>
                <span className="font-bold text-on-surface">{buyerToursCount}</span>
              </>
            ) : activeRole === "seller" ? (
              <>
                <span className="font-medium text-on-surface-variant">Listings:</span>
                <span className="font-bold text-on-surface">{properties.length}</span>
                <span className="text-outline-variant/60">•</span>
                <span className="font-medium text-on-surface-variant">Offers:</span>
                <span className="font-bold text-on-surface">{sellerPendingOffers}</span>
                <span className="text-outline-variant/60">•</span>
                <span className="font-medium text-on-surface-variant">Escrow:</span>
                <span className="font-bold text-on-surface">{sellerEscrowDeals}</span>
              </>
            ) : (
              <>
                <span className="font-medium text-on-surface-variant">Estates:</span>
                <span className="font-bold text-on-surface">{properties.length}</span>
                <span className="text-outline-variant/60">•</span>
                <span className="font-medium text-on-surface-variant">Leads:</span>
                <span className="font-bold text-on-surface">{leads.length}</span>
                <span className="text-outline-variant/60">•</span>
                <span className="font-medium text-on-surface-variant">Deals:</span>
                <span className="font-bold text-on-surface">{deals.length}</span>
              </>
            )}
          </div>

          {/* Quick Hub Links */}
          <Link href="/admin">
            <Button
              variant="outline"
              className="flex h-9 items-center gap-1.5 rounded-xl border-outline-variant/40 px-3 text-xs font-semibold hover:bg-surface-container"
            >
              <IconShieldCheck size={15} className="text-secondary" />
              <span className="hidden sm:inline">Admin</span>
              <span>Console</span>
            </Button>
          </Link>

          {/* Contextual Action CTAs */}
          {activeRole === "buyer" ? (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsBookTourModalOpen(true)}
                variant="outline"
                className="flex h-9 items-center gap-1.5 rounded-xl border-outline-variant/40 px-3.5 text-xs font-semibold hover:bg-surface-container"
              >
                <IconCalendarEvent size={15} />
                <span>Book VIP Tour</span>
              </Button>
              <Button
                onClick={() => setIsSubmitLoiModalOpen(true)}
                className="flex h-9 items-center gap-1.5 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90"
              >
                <IconPlus size={15} />
                <span>Submit LOI</span>
              </Button>
            </div>
          ) : activeRole === "seller" ? (
            <div className="flex items-center gap-2">
              <Link href="/closing">
                <Button
                  variant="outline"
                  className="flex h-9 items-center gap-1.5 rounded-xl border-outline-variant/40 px-3.5 text-xs font-semibold hover:bg-surface-container"
                >
                  <IconReceipt2 size={15} className="text-on-tertiary-container" />
                  <span className="hidden sm:inline">Closing Desk</span>
                </Button>
              </Link>
              <Button
                onClick={() => setIsAddPropertyModalOpen(true)}
                className="flex h-9 items-center gap-1.5 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90"
              >
                <IconPlus size={15} />
                <span>{t("dash.addListing", "Add Listing")}</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsAddClientModalOpen(true)}
                variant="outline"
                className="flex h-9 items-center gap-1.5 rounded-xl border-outline-variant/40 px-3.5 text-xs font-semibold hover:bg-surface-container"
              >
                <IconUserPlus size={15} />
                <span>Enroll Client</span>
              </Button>
              <Button
                onClick={() => setIsAddPropertyModalOpen(true)}
                className="flex h-9 items-center gap-1.5 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90"
              >
                <IconPlus size={15} />
                <span>Add Listing</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
