"use client"

import { IconLayoutDashboard, IconPlus } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import type { CommandState } from "./use-command-state"

interface CommandHeaderProps {
  state: CommandState
}

export function CommandHeader({ state }: CommandHeaderProps) {
  const { activeRole, handleRoleChange, setIsAddPropertyModalOpen, setActiveNav, triggerToast, ROLES } = state

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
                Enterprise ERP &amp; Asset Management
              </Badge>
            </div>
            <h1 className="text-xl font-black tracking-tight text-on-surface sm:text-2xl">
              Real Estate Management Console
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
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
                  <span>{r.label}</span>
                </button>
              )
            })}
          </div>

          {activeRole === "seller" || activeRole === "organizer" ? (
            <Button
              onClick={() => setIsAddPropertyModalOpen(true)}
              className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <IconPlus size={16} />
              <span>Add Property Listing</span>
            </Button>
          ) : (
            <Button
              onClick={() => {
                setActiveNav("offers")
                triggerToast("Opening LOI Submission Desk")
              }}
              className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <IconPlus size={16} />
              <span>Submit Purchase LOI</span>
            </Button>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
