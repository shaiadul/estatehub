"use client"

import Link from "next/link"
import {
  IconScale,
  IconCheck,
  IconBuildingBank,
  IconArrowRight,
  IconShieldCheck,
  IconReceipt2,
  IconEye,
  IconCircleCheck,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { NoDataState } from "@/components/ui/no-data-state"
import type { AdminState } from "./use-admin-state"
import type { AdminEscrowDeal } from "./types"

interface EscrowSupervisionTabProps {
  state: AdminState
}

const ESCROW_STAGES: AdminEscrowDeal["stage"][] = [
  "Earnest Wire",
  "Diligence Audit",
  "Title Clearance",
  "Final Settlement",
  "Disbursed",
]

export function EscrowSupervisionTab({ state }: EscrowSupervisionTabProps) {
  const {
    escrowDeals,
    filteredEscrowDeals,
    escrowStageFilter,
    setEscrowStageFilter,
    setSelectedEscrow,
    handleVerifyEarnestWire,
    handleAdvanceEscrowStage,
    handleReleaseFunds,
    totalEscrowVolume,
    totalEarnestInTrust,
    totalPlatformFeesEarned,
    searchQuery,
    setSearchQuery,
  } = state

  const STAGE_FILTERS = [
    { id: "All", label: "All Contracts", count: escrowDeals.length },
    ...ESCROW_STAGES.map((st) => ({
      id: st,
      label: st,
      count: escrowDeals.filter((d) => d.stage === st).length,
    })),
  ]

  const getStageIndex = (stage: AdminEscrowDeal["stage"]) => {
    return ESCROW_STAGES.indexOf(stage)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Escrow Custody Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-secondary" />
          <CardContent className="flex flex-col justify-between p-5">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-xs font-semibold">Active Escrow Gross Value</span>
              <div className="rounded-xl bg-secondary/15 p-2 text-secondary border border-secondary/30">
                <IconScale size={17} />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-on-surface">
              ${(totalEscrowVolume / 1000000).toFixed(2)}M
            </div>
            <span className="mt-1 font-mono text-xs text-on-surface-variant">
              {escrowDeals.length} Bilateral Contracts Under Custody
            </span>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-tertiary" />
          <CardContent className="flex flex-col justify-between p-5">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-xs font-semibold">Earnest Wire in Trust</span>
              <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-500 border border-emerald-500/20">
                <IconBuildingBank size={17} />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-emerald-500">
              ${(totalEarnestInTrust / 1000000).toFixed(2)}M
            </div>
            <span className="mt-1 text-xs font-semibold text-on-tertiary-container">
              Locked in First American Trust Escrow
            </span>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
          <CardContent className="flex flex-col justify-between p-5">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-xs font-semibold">Platform Protocol Fees Captured</span>
              <div className="rounded-xl bg-primary/10 p-2 text-primary border border-primary/20">
                <IconReceipt2 size={17} />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-on-surface">
              ${(totalPlatformFeesEarned / 1000).toFixed(0)}k
            </div>
            <span className="mt-1 text-xs text-on-surface-variant">
              Disbursed Automatically at 2.5% Take-Rate
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Escrow Supervision Ledger */}
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardHeader className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                <IconScale size={16} />
              </span>
              <CardTitle className="text-base font-bold text-on-surface">
                Master Escrow Custody &amp; Settlement Supervision
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-on-surface-variant">
              Oversee bilateral contracts, verify incoming banking wires, advance diligence sign-offs, and authorize final disbursement
            </CardDescription>
          </div>

          <Link href="/closing">
            <Button
              variant="outline"
              size="sm"
              className="flex h-9 items-center gap-1.5 rounded-xl border-outline-variant/40 px-3.5 text-xs font-semibold sm:self-auto hover:bg-surface-container"
            >
              <span>Closing Desk Workstation</span>
              <IconArrowRight size={14} />
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Stage Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 border-t border-outline-variant/20 pt-3">
            {STAGE_FILTERS.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setEscrowStageFilter(st.id)}
                className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all ${
                  escrowStageFilter === st.id
                    ? "bg-primary text-primary-foreground shadow-xs ring-1 ring-primary/20"
                    : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                <span>{st.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    escrowStageFilter === st.id
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  {st.count}
                </span>
              </button>
            ))}
          </div>

          {/* Bilateral Deal Cards with Visual Milestone Steppers */}
          <div className="flex flex-col gap-4 pt-1">
            {filteredEscrowDeals.map((deal) => {
              const currentStageIdx = getStageIndex(deal.stage)

              return (
                <div
                  key={deal.id}
                  className="flex flex-col gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low/60 p-4 sm:p-5 transition-all hover:border-secondary/40 hover:bg-surface-container-low"
                >
                  {/* Deal Header Row */}
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center border-b border-outline-variant/20 pb-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="font-mono text-xs font-black rounded-lg bg-surface-container px-2.5 py-1 text-on-surface border border-outline-variant/30">
                        {deal.id}
                      </span>
                      <div>
                        <h3
                          onClick={() => setSelectedEscrow(deal)}
                          className="font-bold text-sm text-on-surface hover:text-primary transition-colors cursor-pointer"
                        >
                          {deal.propertyTitle}
                        </h3>
                        <p className="font-mono text-[10px] text-on-surface-variant">
                          Target Closing: {deal.closingDate} • Property Ref: {deal.propertyId}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="font-mono text-base font-black text-on-surface">
                          ${(deal.dealValue / 1000000).toFixed(2)}M
                        </span>
                        <p className="font-mono text-[10px] text-emerald-500 font-semibold">
                          Protocol Fee: ${(deal.platformFee / 1000).toFixed(0)}k (2.5%)
                        </p>
                      </div>

                      <Badge
                        variant={deal.earnestWired ? "verified" : "secondary"}
                        className="text-[10px] font-bold gap-1.5 py-1"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${deal.earnestWired ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`} />
                        <span>{deal.earnestWired ? "Wire In Trust" : "Wire Awaiting"}</span>
                      </Badge>
                    </div>
                  </div>

                  {/* VISUAL 5-STAGE MILESTONE STEPPER */}
                  <div className="py-2">
                    <div className="grid grid-cols-5 gap-2 text-center">
                      {ESCROW_STAGES.map((stageName, sIdx) => {
                        const isCompleted = sIdx < currentStageIdx || deal.stage === "Disbursed"
                        const isCurrent = sIdx === currentStageIdx && deal.stage !== "Disbursed"

                        return (
                          <div key={stageName} className="flex flex-col items-center gap-1.5">
                            {/* Step circle indicator */}
                            <div className="relative flex w-full items-center justify-center">
                              {/* Horizontal connector line */}
                              {sIdx > 0 && (
                                <div
                                  className={`absolute left-0 right-1/2 top-1/2 -translate-y-1/2 h-0.5 ${
                                    sIdx <= currentStageIdx ? "bg-emerald-500" : "bg-outline-variant/30"
                                  }`}
                                />
                              )}
                              {sIdx < ESCROW_STAGES.length - 1 && (
                                <div
                                  className={`absolute left-1/2 right-0 top-1/2 -translate-y-1/2 h-0.5 ${
                                    sIdx < currentStageIdx ? "bg-emerald-500" : "bg-outline-variant/30"
                                  }`}
                                />
                              )}

                              <div
                                className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-black transition-all ${
                                  isCompleted
                                    ? "bg-emerald-500 text-white shadow-xs"
                                    : isCurrent
                                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20 animate-pulse"
                                      : "border border-outline-variant/40 bg-surface-container text-on-surface-variant/70"
                                }`}
                              >
                                {isCompleted ? <IconCheck size={14} /> : sIdx + 1}
                              </div>
                            </div>

                            <span
                              className={`text-[10px] font-semibold line-clamp-1 ${
                                isCurrent
                                  ? "text-primary font-bold"
                                  : isCompleted
                                    ? "text-emerald-500"
                                    : "text-on-surface-variant"
                              }`}
                            >
                              {stageName}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Counterparties & Actions Bar */}
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center border-t border-outline-variant/20 pt-3">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-on-surface-variant">
                      <div>
                        <span className="font-semibold text-on-surface">Buyer: </span>
                        <span>{deal.buyerName}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-on-surface">Seller: </span>
                        <span>{deal.sellerName}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-secondary">Escrow Officer: </span>
                        <span className="font-mono text-[11px]">{deal.brokerName}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedEscrow(deal)}
                        className="h-8 rounded-lg border-outline-variant/40 px-2.5 text-xs font-semibold hover:bg-surface-container"
                      >
                        <IconEye size={13} />
                        <span>Inspect</span>
                      </Button>

                      {!deal.earnestWired ? (
                        <Button
                          size="sm"
                          onClick={() => handleVerifyEarnestWire(deal.id)}
                          className="h-8 rounded-lg bg-secondary px-3 text-xs font-bold text-primary hover:bg-secondary/90 shadow-xs"
                        >
                          <IconCheck size={14} />
                          <span>Verify Earnest Wire</span>
                        </Button>
                      ) : deal.stage === "Final Settlement" ? (
                        <Button
                          size="sm"
                          onClick={() => handleReleaseFunds(deal.id)}
                          className="h-8 rounded-lg bg-emerald-500 px-3 text-xs font-bold text-white hover:bg-emerald-600 shadow-xs"
                        >
                          <IconReceipt2 size={14} />
                          <span>Authorize Settlement</span>
                        </Button>
                      ) : deal.stage !== "Disbursed" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAdvanceEscrowStage(deal.id)}
                          className="h-8 rounded-lg border-outline-variant/40 px-3 text-xs font-semibold hover:bg-surface-container text-on-surface"
                        >
                          <span>Advance Milestone &rarr;</span>
                        </Button>
                      ) : (
                        <span className="flex items-center gap-1 font-mono text-xs font-bold text-emerald-500">
                          <IconCircleCheck size={15} />
                          <span>Disbursed &amp; Closed</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredEscrowDeals.length === 0 && (
            <NoDataState
              icon={IconScale}
              variant={searchQuery ? "search" : "filter"}
              searchTerm={searchQuery}
              title={searchQuery ? `No escrow contracts match "${searchQuery}"` : "No escrow contracts at this stage"}
              description={`No contracts found matching your search at stage "${escrowStageFilter}".`}
              action={{
                label: "Reset Escrow Filters",
                onClick: () => {
                  setSearchQuery("")
                  setEscrowStageFilter("All")
                },
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
