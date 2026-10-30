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
  IconCircleCheck,
  IconServer,
  IconBuildingBank,
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
    properties,
    escrowDeals,
    auditLogs,
    users,
    totalEarnestInTrust,
  } = state

  const GOVERNANCE_ITEMS = [
    {
      id: "overview" as const,
      label: "Platform Analytics",
      icon: IconChartBar,
      badge: "Live",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30",
    },
    {
      id: "users" as const,
      label: "User Governance",
      icon: IconUsers,
      badge: pendingKycCount > 0 ? `${pendingKycCount} KYC` : `${users.length}`,
      badgeColor:
        pendingKycCount > 0
          ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
          : "bg-surface-container text-on-surface-variant",
    },
    {
      id: "properties" as const,
      label: "Listing Moderation",
      icon: IconBuildingEstate,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} Audit` : `${properties.length}`,
      badgeColor:
        pendingApprovalsCount > 0
          ? "bg-secondary/20 text-on-secondary-container border border-secondary/40 font-bold"
          : "bg-surface-container text-on-surface-variant",
    },
    {
      id: "escrow" as const,
      label: "Escrow Supervision",
      icon: IconScale,
      badge: `${escrowDeals.length} active`,
      badgeColor: "bg-surface-container text-on-surface-variant",
    },
  ]

  const SYSTEM_ITEMS = [
    {
      id: "audit" as const,
      label: "Cryptographic Audit",
      icon: IconShieldLock,
      badge: `${auditLogs.length}`,
      badgeColor: "bg-surface-container text-on-surface-variant",
    },
    {
      id: "settings" as const,
      label: "Platform Economics",
      icon: IconAdjustments,
      badge: "v2.4",
      badgeColor: "bg-surface-container text-on-surface-variant font-mono",
    },
  ]

  const PLATFORM_PORTALS = [
    { href: "/properties", label: "Public Property Radar" },
    { href: "/closing", label: "Digital Closing Desk" },
    { href: "/vdr", label: "Virtual Data Room (VDR)" },
    { href: "/dashboard", label: "Client Command Desk" },
  ]

  return (
    <aside className="flex flex-col gap-4 lg:col-span-3 xl:col-span-2">
      {/* Navigation Buttons Card */}
      <div className="flex flex-col gap-3 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-3 shadow-xs">
        {/* Governance Group */}
        <div>
          <div className="px-3 py-1.5 text-[10px] font-black tracking-wider text-on-surface-variant/80 uppercase">
            Platform Operations
          </div>
          <div className="mt-1 flex flex-col gap-1">
            {GOVERNANCE_ITEMS.map((item) => {
              const Icon = item.icon
              const active = activeNav === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={`group flex h-10 w-full items-center justify-between rounded-2xl px-3.5 text-xs font-bold transition-all ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container-high/40 hover:text-on-surface"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon size={17} className={`shrink-0 ${active ? "text-primary-foreground" : "text-on-surface-variant group-hover:text-primary"}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        active
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* System & Policy Group */}
        <div className="border-t border-outline-variant/20 pt-2">
          <div className="px-3 py-1.5 text-[10px] font-black tracking-wider text-on-surface-variant/80 uppercase">
            Security &amp; Policy
          </div>
          <div className="mt-1 flex flex-col gap-1">
            {SYSTEM_ITEMS.map((item) => {
              const Icon = item.icon
              const active = activeNav === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={`group flex h-10 w-full items-center justify-between rounded-2xl px-3.5 text-xs font-bold transition-all ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container-high/40 hover:text-on-surface"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon size={17} className={`shrink-0 ${active ? "text-primary-foreground" : "text-on-surface-variant group-hover:text-primary"}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        active
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Security & Node Telemetry Widget */}
      <div className="flex flex-col gap-2 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-3.5 shadow-xs">
        <div className="flex items-center justify-between text-[11px] font-bold text-on-surface">
          <div className="flex items-center gap-1.5">
            <IconServer size={14} className="text-secondary" />
            <span>Enclave Telemetry</span>
          </div>
          <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            18ms
          </span>
        </div>

        <div className="space-y-1.5 border-t border-outline-variant/20 pt-2 text-[11px]">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span>Primary Node</span>
            <span className="font-mono font-semibold text-on-surface">ap-southeast-2</span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant">
            <span>Vault Trust Locked</span>
            <span className="font-mono font-bold text-emerald-500">
              ${(totalEarnestInTrust / 1000000).toFixed(2)}M
            </span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant">
            <span>HSM Signer</span>
            <span className="font-mono font-semibold text-on-surface">YubiKey FIDO2</span>
          </div>
        </div>
      </div>

      {/* Cross-Platform Enclave Links */}
      <div className="flex flex-col gap-1 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-3 shadow-xs">
        <div className="px-3 py-1 text-[10px] font-black tracking-wider text-on-surface-variant/80 uppercase">
          Enclave Portals
        </div>
        {PLATFORM_PORTALS.map((portal) => (
          <Link
            key={portal.href}
            href={portal.href}
            className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all"
          >
            <span>{portal.label}</span>
            <IconExternalLink size={13} className="text-on-surface-variant/60" />
          </Link>
        ))}
      </div>
    </aside>
  )
}
