"use client"

import { Badge } from "@/components/ui/badge"
import type { CommandState } from "./use-command-state"

interface FinancialsTabProps {
  state: CommandState
}

const FINANCIAL_SUMMARY = [
  {
    label: "Closed Deals Volume (YTD)",
    val: "$74,200,000",
    sub: "+28.5% over previous fiscal year",
    subColor: "text-on-tertiary-container",
  },
  {
    label: "Brokerage Earned Commissions",
    val: "$2,226,000",
    sub: "Avg 3.0% Syndicate Fee Rate",
    subColor: "text-secondary",
  },
  {
    label: "Active Escrow Retainers",
    val: "$4,115,000",
    sub: "Secured in First American Trust",
    subColor: "text-on-surface-variant font-mono",
  },
]

export function FinancialsTab({ state }: FinancialsTabProps) {
  const { ASSET_BREAKDOWN } = state

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {FINANCIAL_SUMMARY.map((fin, i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs"
          >
            <span className="text-xs font-medium text-on-surface-variant">
              {fin.label}
            </span>
            <div className="mt-1 text-2xl font-black tracking-tight text-on-surface">
              {fin.val}
            </div>
            <span className={`mt-2 text-xs font-semibold ${fin.subColor}`}>
              {fin.sub}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-on-surface">
              Capital Allocation by Asset Category
            </h3>
            <p className="text-xs text-on-surface-variant">
              Breakdown across our sovereign portfolio
            </p>
          </div>
          <Badge variant="gold" className="text-xs font-bold">
            2026 Fiscal
          </Badge>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ASSET_BREAKDOWN.map((asset, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4"
            >
              <span className="text-xs text-on-surface-variant">
                {asset.label}
              </span>
              <div className="text-lg font-black text-on-surface">
                {asset.value}
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                <div className={`${asset.color} h-full ${asset.pct}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
