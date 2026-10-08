import Link from "next/link"
import { IconLayoutDashboard, IconPlus, IconShieldCheck, IconCalendarEvent, IconUserPlus } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useI18n } from "@/lib/i18n"
import type { CommandState } from "./use-command-state"

interface CommandHeaderProps {
  state: CommandState
}

export function CommandHeader({ state }: CommandHeaderProps) {
  const { t } = useI18n()
  const {
    activeRole,
    handleRoleChange,
    setIsAddPropertyModalOpen,
    setIsSubmitLoiModalOpen,
    setIsBookTourModalOpen,
    setIsAddClientModalOpen,
    ROLES,
  } = state

  return (
    <SectionWrapper
      fullWidth
      className="border-b border-outline-variant/30 bg-surface-container-lowest shadow-xs"
      innerClassName="py-4"
    >
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-inner">
            <IconLayoutDashboard size={22} />
          </div>
          <div>
            <div className="mb-0.5 flex items-center gap-2">
              <Badge
                variant="gold"
                className="px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase"
              >
                {activeRole === "buyer"
                  ? "Sovereign Investor Command Desk"
                  : activeRole === "seller"
                    ? "Estate Principal Asset Management"
                    : "Broker Syndicate & Diligence Network"}
              </Badge>
            </div>
            <h1 className="text-xl font-black tracking-tight text-on-surface sm:text-2xl">
              {activeRole === "buyer"
                ? "Buyer Acquisition & Diligence Portal"
                : activeRole === "seller"
                  ? "Seller Portfolio & Offers Console"
                  : "Organizer & Broker Syndicate Station"}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Role Switching Selector */}
          <div className="flex items-center rounded-2xl border border-outline-variant/40 bg-surface-container-low p-1 shadow-inner">
            {ROLES.map((r) => {
              const Icon = r.icon
              const active = activeRole === r.id
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRoleChange(r.id)}
                  className={`flex h-10 items-center gap-2 rounded-xl px-4 text-xs font-bold transition-all ${
                    active
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <Icon size={16} />
                  <span>{t(`dash.role.${r.id}`, r.label)}</span>
                </button>
              )
            })}
          </div>

          {/* Quick link to Platform Admin Console */}
          <Link href="/admin">
            <Button
              variant="outline"
              className="flex h-10 items-center gap-1.5 rounded-xl border-secondary/40 bg-secondary/10 px-3.5 text-xs font-bold text-on-secondary-container hover:bg-secondary/20 shadow-xs"
            >
              <IconShieldCheck size={16} className="text-secondary" />
              <span>Admin Console</span>
            </Button>
          </Link>

          {/* Role-specific Action Buttons */}
          {activeRole === "buyer" ? (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsBookTourModalOpen(true)}
                variant="outline"
                className="flex h-10 items-center gap-1.5 rounded-xl border-outline-variant/40 px-3.5 text-xs font-bold hover:bg-surface-container"
              >
                <IconCalendarEvent size={15} />
                <span>Book Tour</span>
              </Button>
              <Button
                onClick={() => setIsSubmitLoiModalOpen(true)}
                className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                <IconPlus size={16} />
                <span>Submit LOI</span>
              </Button>
            </div>
          ) : activeRole === "seller" ? (
            <Button
              onClick={() => setIsAddPropertyModalOpen(true)}
              className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <IconPlus size={16} />
              <span>{t("dash.addListing", "Add Property Listing")}</span>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsAddClientModalOpen(true)}
                variant="outline"
                className="flex h-10 items-center gap-1.5 rounded-xl border-outline-variant/40 px-3.5 text-xs font-bold hover:bg-surface-container"
              >
                <IconUserPlus size={15} />
                <span>Enroll Client</span>
              </Button>
              <Button
                onClick={() => setIsAddPropertyModalOpen(true)}
                className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                <IconPlus size={16} />
                <span>Add Listing</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
