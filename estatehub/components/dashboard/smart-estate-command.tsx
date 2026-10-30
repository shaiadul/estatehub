"use client"

import Link from "next/link"
import { Header } from "@/components/home/header"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { AppToasts } from "@/components/ui/app-toast"
import { Badge } from "@/components/ui/badge"
import { IconShieldCheck, IconLock, IconActivity } from "@tabler/icons-react"
import { useCommandState } from "./_components/use-command-state"
import { CommandHeader } from "./_components/command-header"
import { CommandSidebar } from "./_components/command-sidebar"
import { CommandToolbar } from "./_components/command-toolbar"
import { OverviewTab } from "./_components/overview-tab"
import { PropertiesTab } from "./_components/properties-tab"
import { OffersTab } from "./_components/offers-tab"
import { CrmTab } from "./_components/crm-tab"
import { FinancialsTab } from "./_components/financials-tab"
import { VaultTab } from "./_components/vault-tab"
import { SentryTab } from "./_components/sentry-tab"
import { SavedTab } from "./_components/saved-tab"
import { ToursTab } from "./_components/tours-tab"
import { CommandModals } from "./_components/command-modals"

const TABS = [
  { id: "overview", Component: OverviewTab },
  { id: "properties", Component: PropertiesTab },
  { id: "offers", Component: OffersTab },
  { id: "crm", Component: CrmTab },
  { id: "financials", Component: FinancialsTab },
  { id: "vault", Component: VaultTab },
  { id: "sentry", Component: SentryTab },
  { id: "saved", Component: SavedTab },
  { id: "tours", Component: ToursTab },
] as const

export function SmartEstateCommandView() {
  const state = useCommandState()
  const { activeNav, toastMessage } = state

  return (
    <div className="relative flex min-h-screen flex-col bg-surface font-sans text-on-surface">
      {/* Background ambient lighting glows */}
      <div className="pointer-events-none absolute top-20 right-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-10 h-120 w-120 rounded-full bg-primary/5 blur-3xl" />

      {/* Main Global Navigation */}
      <Header />

      <AppToasts toasts={toastMessage ? [{ id: toastMessage, title: toastMessage }] : []} />

      <main className="relative z-10 flex w-full flex-1 flex-col pt-20">
        <CommandHeader state={state} />

        <SectionWrapper fullWidth className="flex-1 py-6">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <CommandSidebar state={state} />

            <div className="flex flex-col gap-5 lg:col-span-9 xl:col-span-10">
              <CommandToolbar state={state} />

              {TABS.map(({ id, Component }) =>
                activeNav === id ? <Component key={id} state={state} /> : null
              )}
            </div>
          </div>
        </SectionWrapper>
      </main>

      <CommandModals state={state} />

      {/* Modern Executive App Status Footer */}
      <footer className="relative z-10 border-t border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-md py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8 text-xs text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-on-surface">EstateHub Private Client Desk</span>
            <span className="text-outline-variant/50">•</span>
            <span>Encrypted Session</span>
            <Badge variant="verified" className="text-[10px] py-0 px-1.5 h-4">
              SOC2 Type II
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <Link href="/vdr" className="hover:text-primary transition-colors flex items-center gap-1">
              <IconLock size={12} className="text-secondary" />
              <span>Virtual Data Room</span>
            </Link>
            <Link href="/closing" className="hover:text-primary transition-colors flex items-center gap-1">
              <IconActivity size={12} className="text-secondary" />
              <span>Escrow Desk</span>
            </Link>
            <Link href="/admin" className="hover:text-primary transition-colors flex items-center gap-1">
              <IconShieldCheck size={12} className="text-secondary" />
              <span>Admin Enclave</span>
            </Link>
            <span className="text-on-surface-variant/50">|</span>
            <span className="font-mono text-[10px] text-on-surface-variant/70">Build 2026.10-RC</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
