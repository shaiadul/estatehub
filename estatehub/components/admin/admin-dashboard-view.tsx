"use client"

import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { AppToasts } from "@/components/ui/app-toast"
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
    <div className="flex min-h-screen flex-col bg-surface font-sans text-on-surface">
      <Header />

      <AppToasts
        toasts={toastMessage ? [{ id: toastMessage, title: toastMessage }] : []}
      />

      <main className="flex w-full flex-1 flex-col pt-20">
        <AdminHeader state={state} />

        <SectionWrapper fullWidth className="flex-1 py-6">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <AdminSidebar state={state} />

            <div className="flex flex-col gap-6 lg:col-span-9 xl:col-span-10">
              <AdminToolbar state={state} />

              {ADMIN_TABS.map(({ id, Component }) =>
                activeNav === id ? <Component key={id} state={state} /> : null
              )}
            </div>
          </div>
        </SectionWrapper>
      </main>

      <AdminModals state={state} />

      <Footer />
    </div>
  )
}
