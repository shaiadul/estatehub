"use client"

import {
  IconCurrencyDollar,
  IconBuildingBank,
  IconReceipt2,
  IconUsers,
  IconTrendingUp,
  IconShieldCheck,
  IconServer,
  IconLock,
  IconArrowRight,
  IconBuildingEstate,
  IconAlertCircle,
  IconScale,
  IconChevronRight,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { AdminState } from "./use-admin-state"

interface OverviewAnalyticsTabProps {
  state: AdminState
}

const MONTHLY_VOLUME = [
  { month: "May", volume: 18.5, revenue: 0.46, deals: 3 },
  { month: "Jun", volume: 22.0, revenue: 0.55, deals: 4 },
  { month: "Jul", volume: 19.8, revenue: 0.49, deals: 3 },
  { month: "Aug", volume: 26.4, revenue: 0.66, deals: 5 },
  { month: "Sep", volume: 31.2, revenue: 0.78, deals: 6 },
  { month: "Oct (Live)", volume: 38.6, revenue: 0.96, deals: 7 },
]

export function OverviewAnalyticsTab({ state }: OverviewAnalyticsTabProps) {
  const {
    totalEnclaveGmv,
    totalEscrowVolume,
    totalEarnestInTrust,
    totalPlatformFeesEarned,
    users,
    properties,
    escrowDeals,
    auditLogs,
    pendingApprovalsCount,
    pendingKycCount,
    setActiveNav,
    setPropertyStatusFilter,
    setUserRoleFilter,
    setSelectedAudit,
  } = state

  const KPIS = [
    {
      label: "Gross Platform Inventory GMV",
      value: `$${(totalEnclaveGmv / 1000000).toFixed(1)}M`,
      trend: "+18.4% MoM Expansion",
      subtext: `${properties.length} Verified Trophy Estates`,
      trendPositive: true,
      icon: IconCurrencyDollar,
      color: "text-primary bg-primary/10 border border-primary/20",
    },
    {
      label: "Active Escrow Custody in Trust",
      value: `$${(totalEscrowVolume / 1000000).toFixed(1)}M`,
      trend: `$${(totalEarnestInTrust / 1000000).toFixed(2)}M Earnest Locked`,
      subtext: `${escrowDeals.length} Bilateral Closing Rooms`,
      trendPositive: true,
      icon: IconBuildingBank,
      color: "text-secondary bg-secondary/15 border border-secondary/30",
    },
    {
      label: "Protocol Platform Fees Collected",
      value: `$${(totalPlatformFeesEarned / 1000).toFixed(0)}k`,
      trend: "2.5% Protocol Take-Rate",
      subtext: "Automated Escrow Deduction",
      trendPositive: true,
      icon: IconReceipt2,
      color: "text-emerald-500 bg-emerald-500/10 border border-emerald-500/20",
    },
    {
      label: "Accredited Enclave Members",
      value: `${users.length} Enrolled`,
      trend: "100% KYC / AML Notarized",
      subtext: `${users.filter((u) => u.kycStatus === "Verified").length} Verified Principals`,
      trendPositive: true,
      icon: IconUsers,
      color: "text-amber-500 bg-amber-500/10 border border-amber-500/20",
    },
  ]

  // Calculate Asset Class Breakdown
  const categories = ["Villa", "Penthouse", "Island", "Manor", "Architectural"] as const
  const categoryStats = categories.map((cat) => {
    const matching = properties.filter((p) => p.category === cat)
    const val = matching.reduce((sum, p) => sum + p.price, 0)
    const pct = totalEnclaveGmv > 0 ? Math.round((val / totalEnclaveGmv) * 100) : 0
    return { name: cat, count: matching.length, total: val, pct }
  })

  return (
    <div className="flex flex-col gap-6">
      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs transition-all hover:shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between text-on-surface-variant">
                <span className="text-xs font-semibold">{kpi.label}</span>
                <div className={`rounded-xl p-2 ${kpi.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight text-on-surface">
                  {kpi.value}
                </div>
                <p className="mt-0.5 text-[11px] font-medium text-on-surface-variant">
                  {kpi.subtext}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-outline-variant/20 pt-2.5 text-xs font-semibold">
                <div className="flex items-center gap-1 text-emerald-500">
                  <IconTrendingUp size={14} />
                  <span>{kpi.trend}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Operational Attention Center: 3 Quick Resolution Banners */}
      {(pendingApprovalsCount > 0 || pendingKycCount > 0 || escrowDeals.some((d) => !d.earnestWired)) && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {pendingApprovalsCount > 0 && (
            <div
              onClick={() => {
                setActiveNav("properties")
                setPropertyStatusFilter("Pending Review")
              }}
              className="group cursor-pointer rounded-2xl border border-secondary/40 bg-secondary/10 p-4 transition-all hover:bg-secondary/15 hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary/20 text-secondary">
                    <IconBuildingEstate size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-on-surface">
                      Listings Pending Audit
                    </h3>
                    <p className="text-[11px] text-on-surface-variant">
                      {pendingApprovalsCount} new properties require deed verification
                    </p>
                  </div>
                </div>
                <IconChevronRight size={16} className="text-secondary transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          )}

          {pendingKycCount > 0 && (
            <div
              onClick={() => {
                setActiveNav("users")
                setUserRoleFilter("pending_kyc")
              }}
              className="group cursor-pointer rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 transition-all hover:bg-amber-500/15 hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-500">
                    <IconUsers size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-on-surface">
                      KYC Accreditation Review
                    </h3>
                    <p className="text-[11px] text-on-surface-variant">
                      {pendingKycCount} member identity awaiting sovereign verification
                    </p>
                  </div>
                </div>
                <IconChevronRight size={16} className="text-amber-500 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          )}

          {escrowDeals.some((d) => !d.earnestWired) && (
            <div
              onClick={() => setActiveNav("escrow")}
              className="group cursor-pointer rounded-2xl border border-primary/30 bg-primary/10 p-4 transition-all hover:bg-primary/15 hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/20 text-primary">
                    <IconScale size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-on-surface">
                      Pending Earnest Wire
                    </h3>
                    <p className="text-[11px] text-on-surface-variant">
                      Bilateral escrow contract requires bank wire verification
                    </p>
                  </div>
                </div>
                <IconChevronRight size={16} className="text-primary transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Transaction Velocity & Financial Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Monthly Volume Bars */}
        <div className="flex flex-col justify-between rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs lg:col-span-2">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-base font-bold text-on-surface">
                Transaction Volume &amp; Platform Fee Revenue
              </h2>
              <p className="text-xs text-on-surface-variant">
                Bilateral gross contract volume ($M) versus protocol commission fee capture
              </p>
            </div>
            <Badge variant="gold" className="text-xs font-bold">
              Trailing 6 Months
            </Badge>
          </div>

          <div className="mt-6 grid grid-cols-6 items-end gap-3 sm:gap-6 border-b border-outline-variant/30 pb-4">
            {MONTHLY_VOLUME.map((m) => {
              const maxVol = 45
              const heightPct = Math.round((m.volume / maxVol) * 100)
              return (
                <div key={m.month} className="group flex flex-col items-center gap-2">
                  <div className="flex flex-col items-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-[11px] font-bold text-on-surface">
                      ${m.volume}M
                    </span>
                    <span className="text-[9px] font-mono text-emerald-500 font-semibold">
                      +${m.revenue}M fee
                    </span>
                  </div>
                  <div className="relative flex h-36 w-full max-w-10 items-end justify-center rounded-xl bg-surface-container-low p-1 group-hover:bg-surface-container transition-colors">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full rounded-lg bg-gradient-to-t from-primary via-primary to-secondary transition-all duration-500 group-hover:brightness-110 shadow-xs"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-on-surface-variant">
                    {m.month}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
                <span>Gross Settlement Volume</span>
              </span>
              <span className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="h-2.5 w-2.5 rounded-sm bg-secondary" />
                <span>2.5% Protocol Fee Share</span>
              </span>
            </div>
            <span className="font-mono font-bold text-on-secondary-container">
              All-Time Enclave Volume: $214.8M
            </span>
          </div>
        </div>

        {/* Inventory Category Breakdown */}
        <div className="flex flex-col justify-between rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-on-surface">
                Inventory by Asset Class
              </h2>
              <Badge variant="outline" className="text-[10px] font-mono">
                {properties.length} Active Assets
              </Badge>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">
              GMV allocation across prime architectural classes
            </p>

            <div className="mt-4 space-y-3">
              {categoryStats.map((item) => (
                <div key={item.name} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-on-surface">{item.name}</span>
                    <span className="font-mono font-bold text-on-surface-variant">
                      ${(item.total / 1000000).toFixed(1)}M ({item.pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-surface-container overflow-hidden">
                    <div
                      style={{ width: `${item.pct}%` }}
                      className="h-full rounded-full bg-primary transition-all duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 border-t border-outline-variant/20 pt-3">
            <Button
              variant="outline"
              onClick={() => setActiveNav("properties")}
              className="flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border-outline-variant/40 text-xs font-bold hover:bg-surface-container"
            >
              <span>Manage Platform Inventory Queue</span>
              <IconArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* Live Operational & Security Stream */}
      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-on-surface">
              Live Platform Transaction &amp; Governance Feed
            </h2>
            <p className="text-xs text-on-surface-variant">
              Real-time audit events, wire verifications, and LOI submissions across counterparties
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="gold" className="text-xs font-bold">
              Real-Time Stream
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setActiveNav("audit")}
              className="h-7 rounded-lg text-xs font-semibold px-2"
            >
              View All ({auditLogs.length})
            </Button>
          </div>
        </div>

        <div className="divide-y divide-outline-variant/20">
          {auditLogs.slice(0, 4).map((log) => (
            <div
              key={log.id}
              onClick={() => setSelectedAudit(log)}
              className="group flex flex-col justify-between gap-2 py-3 sm:flex-row sm:items-center cursor-pointer transition-colors hover:bg-surface-container-high/30 rounded-xl px-2 -mx-2"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-2.5 w-2.5 rounded-full shrink-0 ${
                    log.severity === "critical"
                      ? "bg-destructive animate-ping"
                      : log.severity === "warning"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-on-surface group-hover:text-primary transition-colors">
                      {log.eventType}
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant">
                      {log.timestamp} • {log.id}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant">{log.details}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-right">
                <div className="text-xs">
                  <p className="font-semibold text-on-surface">{log.operator}</p>
                  <p className="font-mono text-[10px] text-on-surface-variant">
                    {log.ipAddress} ({log.location})
                  </p>
                </div>
                <IconChevronRight size={14} className="text-on-surface-variant transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
