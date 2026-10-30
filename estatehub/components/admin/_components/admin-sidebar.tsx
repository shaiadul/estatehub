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
  IconServer,
} from "@tabler/icons-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
      badgeVariant: "gold" as const,
    },
    {
      id: "users" as const,
      label: "User Governance",
      icon: IconUsers,
      badge: pendingKycCount > 0 ? `${pendingKycCount} KYC` : `${users.length}`,
      badgeVariant: pendingKycCount > 0 ? ("secondary" as const) : ("outline" as const),
    },
    {
      id: "properties" as const,
      label: "Listing Moderation",
      icon: IconBuildingEstate,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} Audit` : `${properties.length}`,
      badgeVariant: pendingApprovalsCount > 0 ? ("gold" as const) : ("outline" as const),
    },
    {
      id: "escrow" as const,
      label: "Escrow Supervision",
      icon: IconScale,
      badge: `${escrowDeals.length} active`,
      badgeVariant: "outline" as const,
    },
  ]

  const SYSTEM_ITEMS = [
    {
      id: "audit" as const,
      label: "Cryptographic Audit",
      icon: IconShieldLock,
      badge: `${auditLogs.length}`,
      badgeVariant: "outline" as const,
    },
    {
      id: "settings" as const,
      label: "Platform Economics",
      icon: IconAdjustments,
      badge: "v2.4",
      badgeVariant: "secondary" as const,
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
      {/* Navigation Card */}
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardContent className="flex flex-col gap-3 p-3">
          {/* Platform Operations */}
          <div className="flex flex-col gap-1">
            <span className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-widest text-on-surface-variant/70 uppercase">
              Platform Operations
            </span>
            {GOVERNANCE_ITEMS.map((item) => {
              const Icon = item.icon
              const active = activeNav === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={`group relative flex h-10 w-full items-center justify-between rounded-xl px-3 text-xs font-semibold transition-all duration-200 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20"
                      : "text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
                        active
                          ? "bg-primary-foreground/15 text-primary-foreground"
                          : "bg-surface-container/60 text-on-surface-variant group-hover:text-on-surface"
                      }`}
                    >
                      <Icon size={16} />
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <Badge
                      variant={active ? "outline" : item.badgeVariant}
                      className={`text-[10px] py-0 px-1.5 h-4 font-mono font-bold ${
                        active ? "border-primary-foreground/30 text-primary-foreground" : ""
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              )
            })}
          </div>

          <Separator className="my-1 bg-outline-variant/20" />

          {/* Security & Policy */}
          <div className="flex flex-col gap-1">
            <span className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-widest text-on-surface-variant/70 uppercase">
              Security &amp; Policy
            </span>
            {SYSTEM_ITEMS.map((item) => {
              const Icon = item.icon
              const active = activeNav === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={`group relative flex h-10 w-full items-center justify-between rounded-xl px-3 text-xs font-semibold transition-all duration-200 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20"
                      : "text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
                        active
                          ? "bg-primary-foreground/15 text-primary-foreground"
                          : "bg-surface-container/60 text-on-surface-variant group-hover:text-on-surface"
                      }`}
                    >
                      <Icon size={16} />
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <Badge
                      variant={active ? "outline" : item.badgeVariant}
                      className={`text-[10px] py-0 px-1.5 h-4 font-mono font-bold ${
                        active ? "border-primary-foreground/30 text-primary-foreground" : ""
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Security & Node Telemetry Widget */}
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardContent className="flex flex-col gap-2 p-3.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-on-surface">
            <div className="flex items-center gap-1.5">
              <IconServer size={14} className="text-secondary" />
              <span>Enclave Telemetry</span>
            </div>
            <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-500 font-semibold">
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
        </CardContent>
      </Card>

      {/* Cross-Platform Enclave Links */}
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardContent className="flex flex-col gap-1 p-3">
          <span className="px-3 pt-1 pb-1 text-[10px] font-bold tracking-widest text-on-surface-variant/70 uppercase">
            Enclave Portals
          </span>
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
        </CardContent>
      </Card>
    </aside>
  )
}
