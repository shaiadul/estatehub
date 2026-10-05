"use client"

import { IconSparkles } from "@tabler/icons-react"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { SectionWrapper } from "@/components/ui/section-wrapper"
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
import { CommandModals } from "./_components/command-modals"

const TABS = [
  { id: "overview", Component: OverviewTab },
  { id: "properties", Component: PropertiesTab },
  { id: "offers", Component: OffersTab },
  { id: "crm", Component: CrmTab },
  { id: "financials", Component: FinancialsTab },
  { id: "vault", Component: VaultTab },
  { id: "sentry", Component: SentryTab },
] as const

export function SmartEstateCommandView() {
  const state = useCommandState()
  const { activeNav, toastMessage } = state

  return (
    <div className="flex min-h-screen flex-col bg-surface font-sans text-on-surface">
      <Header />

      {toastMessage && (
        <div className="fixed right-6 bottom-6 z-50 flex animate-in items-center gap-3 rounded-2xl border border-primary/30 bg-surface-container-highest/95 px-5 py-3 text-primary-foreground shadow-2xl backdrop-blur-xl slide-in-from-bottom-5 fade-in">
          <IconSparkles size={18} className="shrink-0 text-secondary" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <main className="flex w-full flex-1 flex-col pt-20">
        <CommandHeader state={state} />

        <SectionWrapper fullWidth className="flex-1 py-6">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <CommandSidebar state={state} />

            <div className="flex flex-col gap-6 lg:col-span-9 xl:col-span-10">
              <CommandToolbar state={state} />

              {TABS.map(({ id, Component }) =>
                activeNav === id ? <Component key={id} state={state} /> : null
              )}
            </div>
          </div>
        </SectionWrapper>
      </main>

      <CommandModals state={state} />

      <Footer />
    </div>
  )
}
