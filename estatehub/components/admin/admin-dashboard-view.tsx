"use client"

import Link from "next/link"
import { Header } from "@/components/home/header"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { AppToasts } from "@/components/ui/app-toast"
import { Badge } from "@/components/ui/badge"
import { IconShieldLock, IconScale, IconBuildingEstate, IconActivity } from "@tabler/icons-react"
import {
  useAdminState,
  AdminHeader,
  AdminSidebar,
  AdminToolbar,
  OverviewAnalyticsTab,
  UserGovernanceTab,
  PropertyModerationTab,
  EscrowSupervisionTab,
  SystemAuditTab,
  PlatformSettingsTab,
  AdminModals,
} from "./_components"

const ADMIN_TABS = [
  { id: "overview", Component: OverviewAnalyticsTab },
  { id: "users", Component: UserGovernanceTab },
  { id: "properties", Component: PropertyModerationTab },
  { id: "escrow", Component: EscrowSupervisionTab },
  { id: "audit", Component: SystemAuditTab },
  { id: "settings", Component: PlatformSettingsTab },
] as const

export function AdminDashboardView() {
  const state = useAdminState()
  const { activeNav, toastMessage } = state

  return (
    <div className="relative flex min-h-screen flex-col bg-surface font-sans text-on-surface">
      {/* Background ambient lighting glows */}
      <div className="pointer-events-none absolute top-20 left-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-10 h-120 w-120 rounded-full bg-primary/5 blur-3xl" />

      {/* Main Global Navigation */}
      <Header />

      <AppToasts
        toasts={toastMessage ? [{ id: toastMessage, title: toastMessage }] : []}
      />

      <main className="relative z-10 flex w-full flex-1 flex-col pt-20">
        <AdminHeader state={state} />

        <SectionWrapper fullWidth className="flex-1 py-6">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <AdminSidebar state={state} />

            <div className="flex flex-col gap-5 lg:col-span-9 xl:col-span-10">
              <AdminToolbar state={state} />

              {ADMIN_TABS.map(({ id, Component }) =>
                activeNav === id ? <Component key={id} state={state} /> : null
              )}
            </div>
          </div>
        </SectionWrapper>
      </main>

      <AdminModals state={state} />

      {/* Modern Executive Enclave Status Footer */}
      <footer className="relative z-10 border-t border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-md py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 text-xs text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-on-surface">EstateHub Enclave Administration</span>
            <span className="text-outline-variant/50">•</span>
            <span>Cryptographic Multisig Signer Active</span>
            <Badge variant="verified" className="text-[10px] py-0 px-1.5 h-4">
              FIDO2 Tier III
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <Link href="/dashboard" className="hover:text-primary transition-colors flex items-center gap-1">
              <IconBuildingEstate size={12} className="text-secondary" />
              <span>Client Command Desk</span>
            </Link>
            <Link href="/closing" className="hover:text-primary transition-colors flex items-center gap-1">
              <IconScale size={12} className="text-secondary" />
              <span>Digital Escrow Desk</span>
            </Link>
            <Link href="/vdr" className="hover:text-primary transition-colors flex items-center gap-1">
              <IconShieldLock size={12} className="text-secondary" />
              <span>Virtual Data Room</span>
            </Link>
            <span className="text-on-surface-variant/50">|</span>
            <span className="font-mono text-[10px] text-on-surface-variant/70">Protocol v2.4-Enclave</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
