"use client"

import Link from "next/link"
import {
  IconChartBar,
  IconUsers,
  IconBuildingEstate,
  IconScale,
  IconShieldLock,
  IconAdjustments,
  IconExternalLink,
  IconShieldCheck,
} from "@tabler/icons-react"
import type { AdminState } from "./use-admin-state"

interface AdminSidebarProps {
  state: AdminState
}

export function AdminSidebar({ state }: AdminSidebarProps) {
  const {
    activeNav,
    setActiveNav,
    pendingApprovalsCount,
    pendingKycCount,
    escrowDeals,
    auditLogs,
  } = state

  const NAV_ITEMS = [
    {
      id: "overview" as const,
      label: "Platform Analytics",
      icon: IconChartBar,
      badge: "Live",
    },
    {
      id: "users" as const,
      label: "User Governance & KYC",
      icon: IconUsers,
      badge: pendingKycCount > 0 ? `${pendingKycCount} pending` : undefined,
    },
    {
      id: "properties" as const,
      label: "Listing Moderation",
      icon: IconBuildingEstate,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} review` : undefined,
    },
    {
      id: "escrow" as const,
      label: "Escrow Supervision",
      icon: IconScale,
      count: escrowDeals.length,
    },
    {
      id: "audit" as const,
      label: "Security & Audit Logs",
      icon: IconShieldLock,
      count: auditLogs.length,
    },
    {
      id: "settings" as const,
      label: "Platform Policy & Fees",
      icon: IconAdjustments,
    },
  ]

  const PLATFORM_LINKS = [
    { href: "/properties", label: "Public Property Radar" },
    { href: "/closing", label: "Digital Closing Desk" },
    { href: "/vdr", label: "Virtual Data Room (VDR)" },
    { href: "/dashboard", label: "Client Command Desk" },
  ]

  return (
    <aside className="flex flex-col gap-4 lg:col-span-3 xl:col-span-2">
      {/* Navigation Buttons */}
      <div className="flex flex-col gap-1.5 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-3 shadow-xs">
        <div className="px-3 py-2 text-[11px] font-bold tracking-wider text-on-surface-variant/80 uppercase">
          Master Administration
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = activeNav === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveNav(item.id)}
              className={`flex h-10 w-full items-center justify-between rounded-2xl px-3.5 text-xs font-bold transition-all ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high/40 hover:text-on-surface"
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon size={17} className="shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                    active
                      ? "bg-secondary text-primary"
                      : "bg-secondary/15 text-secondary"
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {item.count !== undefined && !item.badge && (
                <span className="font-mono text-[11px] text-on-surface-variant/70">
                  {item.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Admin Operator Identity Card */}
      <div className="flex flex-col gap-3 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs">
        <div className="text-[11px] font-bold tracking-wider text-on-surface-variant/80 uppercase">
          Root Authority Key
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/15 text-sm font-black text-secondary">
            AV
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-on-surface">
              Alexander Vance
            </p>
            <p className="truncate font-mono text-[10px] text-on-secondary-container font-semibold">
              #GLOBAL-ROOT-01 • Multi-Sig
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1 border-t border-outline-variant/20 pt-2">
          <span className="px-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">
            Platform Surfaces
          </span>
          {PLATFORM_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex h-8 w-full items-center justify-between rounded-xl px-2.5 text-xs font-medium text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
            >
              <span>{link.label}</span>
              <IconExternalLink size={13} />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
