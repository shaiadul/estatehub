"use client"

import Link from "next/link"
import {
  IconScale,
  IconCheck,
  IconBuildingBank,
  IconArrowRight,
  IconShieldCheck,
  IconReceipt2,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { AdminState } from "./use-admin-state"

interface EscrowSupervisionTabProps {
  state: AdminState
}

export function EscrowSupervisionTab({ state }: EscrowSupervisionTabProps) {
  const {
    escrowDeals,
    handleVerifyEarnestWire,
    handleAdvanceEscrowStage,
    handleReleaseFunds,
    totalEscrowVolume,
    totalEarnestInTrust,
    totalPlatformFeesEarned,
  } = state

  return (
    <div className="flex flex-col gap-6">
      {/* Escrow Custody Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col justify-between rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-xs font-medium">Active Escrow Gross Value</span>
            <div className="rounded-xl bg-secondary/15 p-2 text-secondary">
              <IconScale size={18} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-on-surface">
            ${(totalEscrowVolume / 1000000).toFixed(2)}M
          </div>
          <span className="mt-1 text-xs text-on-surface-variant font-mono">
            {escrowDeals.length} Bilateral Contracts Under Custody
          </span>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-xs font-medium">Earnest Wire in Trust</span>
            <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-500">
              <IconBuildingBank size={18} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-on-surface">
            ${(totalEarnestInTrust / 1000000).toFixed(2)}M
          </div>
          <span className="mt-1 text-xs text-on-tertiary-container font-semibold">
            Locked in First American Trust
          </span>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-xs font-medium">Platform Protocol Fees Captured</span>
            <div className="rounded-xl bg-primary/10 p-2 text-primary">
              <IconReceipt2 size={18} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-on-surface">
            ${(totalPlatformFeesEarned / 1000).toFixed(0)}k
          </div>
          <span className="mt-1 text-xs text-on-surface-variant">
            Disbursed Automatically at Settlement
          </span>
        </div>
      </div>

      {/* Escrow Supervision Ledger */}
      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                <IconScale size={16} />
              </span>
              <h2 className="text-lg font-black text-on-surface">
                Master Escrow Custody &amp; Settlement Supervision
              </h2>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">
              Oversee bilateral contracts, verify incoming banking wires, advance diligence sign-offs, and authorize final disbursement
            </p>
          </div>

          <Link href="/closing">
            <Button
              variant="outline"
              className="flex h-10 items-center gap-2 rounded-xl border-outline-variant/40 px-4 text-xs font-bold sm:self-auto"
            >
              <span>Closing Desk Workstation</span>
              <IconArrowRight size={14} />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                <th className="pb-3 font-semibold">Contract Ref</th>
                <th className="pb-3 font-semibold">Target Estate</th>
                <th className="pb-3 font-semibold">Counterparties</th>
                <th className="pb-3 font-semibold">Contract Valuation</th>
                <th className="pb-3 font-semibold">Earnest Wire Status</th>
                <th className="pb-3 font-semibold">Settlement Stage</th>
                <th className="pb-3 text-right font-semibold">Escrow Supervisor Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {escrowDeals.map((deal) => (
                <tr
                  key={deal.id}
                  className="transition-colors hover:bg-surface-container-high/30"
                >
                  <td className="py-4 font-mono font-bold text-on-surface">
                    {deal.id}
                  </td>

                  <td className="py-4">
                    <p className="font-bold text-on-surface">{deal.propertyTitle}</p>
                    <p className="font-mono text-[10px] text-on-surface-variant">
                      Closing Target: {deal.closingDate}
                    </p>
                  </td>

                  <td className="py-4">
                    <p className="font-bold text-on-surface">
                      <span className="text-on-surface-variant font-normal">Buyer: </span>
                      {deal.buyerName}
                    </p>
                    <p className="text-[11px] text-on-surface-variant">
                      <span className="font-normal">Seller: </span>
                      {deal.sellerName}
                    </p>
                    <p className="text-[10px] text-on-secondary-container font-mono">
                      Broker: {deal.brokerName}
                    </p>
                  </td>

                  <td className="py-4">
                    <p className="font-mono font-black text-sm text-on-surface">
                      ${(deal.dealValue / 1000000).toFixed(2)}M
                    </p>
                    <p className="font-mono text-[10px] text-emerald-500 font-semibold">
                      Fee: ${(deal.platformFee / 1000).toFixed(0)}k (2.5%)
                    </p>
                  </td>

                  <td className="py-4">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          deal.earnestWired ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                        }`}
                      />
                      <span className="font-mono font-semibold text-on-surface">
                        ${(deal.earnestAmount / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <span className="text-[10px] text-on-surface-variant">
                      {deal.earnestWired ? "Deposit Locked in Trust" : "Awaiting Bank Wire"}
                    </span>
                  </td>

                  <td className="py-4">
                    <Badge
                      variant={
                        deal.stage === "Disbursed"
                          ? "gold"
                          : deal.stage === "Final Settlement"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-[10px] font-bold"
                    >
                      {deal.stage}
                    </Badge>
                  </td>

                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {!deal.earnestWired ? (
                        <Button
                          size="sm"
                          onClick={() => handleVerifyEarnestWire(deal.id)}
                          className="h-8 rounded-lg bg-secondary px-2.5 text-xs font-bold text-primary hover:bg-secondary/90"
                        >
                          <IconCheck size={14} />
                          <span>Verify Wire</span>
                        </Button>
                      ) : deal.stage === "Final Settlement" ? (
                        <Button
                          size="sm"
                          onClick={() => handleReleaseFunds(deal.id)}
                          className="h-8 rounded-lg bg-emerald-500 px-2.5 text-xs font-bold text-white hover:bg-emerald-600"
                        >
                          <IconReceipt2 size={14} />
                          <span>Release Funds</span>
                        </Button>
                      ) : deal.stage !== "Disbursed" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAdvanceEscrowStage(deal.id)}
                          className="h-8 rounded-lg border-outline-variant/40 px-2.5 text-xs font-semibold hover:bg-surface-container"
                        >
                          <span>Advance Milestone</span>
                        </Button>
                      ) : (
                        <span className="flex items-center gap-1 font-mono text-xs font-bold text-emerald-500">
                          <IconShieldCheck size={14} />
                          <span>Disbursed &amp; Settled</span>
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
