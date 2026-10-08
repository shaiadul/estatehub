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
  IconFlame,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { AdminState } from "./use-admin-state"

interface OverviewAnalyticsTabProps {
  state: AdminState
}

const MONTHLY_VOLUME = [
  { month: "May", volume: 18.5, revenue: 0.46 },
  { month: "Jun", volume: 22.0, revenue: 0.55 },
  { month: "Jul", volume: 19.8, revenue: 0.49 },
  { month: "Aug", volume: 26.4, revenue: 0.66 },
  { month: "Sep", volume: 31.2, revenue: 0.78 },
  { month: "Oct (Live)", volume: 38.6, revenue: 0.96 },
]

export function OverviewAnalyticsTab({ state }: OverviewAnalyticsTabProps) {
  const {
    totalEnclaveGmv,
    totalEscrowVolume,
    totalEarnestInTrust,
    totalPlatformFeesEarned,
    users,
    properties,
    auditLogs,
    setActiveNav,
  } = state

  const KPIS = [
    {
      label: "Gross Platform Inventory GMV",
      value: `$${(totalEnclaveGmv / 1000000).toFixed(1)}M`,
      trend: "+18.4% MoM Expansion",
      trendPositive: true,
      icon: IconCurrencyDollar,
      color: "text-primary bg-primary/10",
    },
    {
      label: "Active Escrow Custody in Trust",
      value: `$${(totalEscrowVolume / 1000000).toFixed(1)}M`,
      trend: `$${(totalEarnestInTrust / 1000000).toFixed(2)}M Earnest Locked`,
      icon: IconBuildingBank,
      color: "text-secondary bg-secondary/15",
    },
    {
      label: "Protocol Platform Fees Collected",
      value: `$${(totalPlatformFeesEarned / 1000).toFixed(0)}k`,
      trend: "2.5% Protocol Take-Rate",
      trendPositive: true,
      icon: IconReceipt2,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      label: "Accredited Enclave Members",
      value: `${users.length} Enrolled`,
      trend: "100% KYC / AML Notarized",
      icon: IconUsers,
      color: "text-amber-500 bg-amber-500/10",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs"
            >
              <div className="mb-2 flex items-center justify-between text-on-surface-variant">
                <span className="text-xs font-medium">{kpi.label}</span>
                <div className={`rounded-xl p-2 ${kpi.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <div className="text-2xl font-black tracking-tight text-on-surface">
                {kpi.value}
              </div>
              <div
                className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${
                  kpi.trendPositive
                    ? "text-on-tertiary-container"
                    : "text-on-surface-variant"
                }`}
              >
                {kpi.trendPositive && <IconTrendingUp size={14} />}
                <span>{kpi.trend}</span>
              </div>
            </div>
          )
        })}
      </div>

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
                <div key={m.month} className="flex flex-col items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-on-surface">
                    ${m.volume}M
                  </span>
                  <div className="relative flex h-36 w-full max-w-10 items-end justify-center rounded-xl bg-surface-container-low p-1">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full rounded-lg bg-gradient-to-t from-primary to-secondary transition-all duration-500"
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

        {/* System Telemetry & Cryptographic Rigor */}
        <div className="flex flex-col justify-between rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-on-surface">
                Enclave Security Health
              </h2>
              <Badge variant="outline" className="text-[10px]">
                HSM Tier 1
              </Badge>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">
              Hardware-isolated security &amp; cryptographic diligence status
            </p>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-surface-container-low p-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <IconShieldCheck size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">Dual Multi-Sig Escrow</p>
                    <p className="text-[10px] text-on-surface-variant">First American Escrow Sync</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-500">OPTIMAL</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-surface-container-low p-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                    <IconLock size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">VDR Watermark Engine</p>
                    <p className="text-[10px] text-on-surface-variant">Dynamic SHA-256 Notary</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-secondary">ACTIVE</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-surface-container-low p-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <IconServer size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">Audit Trail Integrity</p>
                    <p className="text-[10px] text-on-surface-variant">Immutable Append Log</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-primary">VERIFIED</span>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-outline-variant/20 pt-3">
            <Button
              variant="outline"
              onClick={() => setActiveNav("audit")}
              className="flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border-outline-variant/40 text-xs font-bold hover:bg-surface-container"
            >
              <span>Inspect Audit Trail ({auditLogs.length} events)</span>
              <IconArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* Live Operational Feed */}
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
          <Badge variant="gold" className="text-xs font-bold">
            Real-Time Stream
          </Badge>
        </div>

        <div className="divide-y divide-outline-variant/20">
          {auditLogs.slice(0, 4).map((log) => (
            <div
              key={log.id}
              className="flex flex-col justify-between gap-2 py-3 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-2 w-2 rounded-full ${
                    log.severity === "critical"
                      ? "bg-destructive animate-ping"
                      : log.severity === "warning"
                        ? "bg-amber-500"
                        : "bg-secondary"
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-on-surface">
                      {log.eventType}
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant">
                      {log.timestamp}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
