"use client"

import Link from "next/link"
import {
  IconBuildingBank,
  IconReceipt2,
  IconShieldCheck,
  IconFileCertificate,
  IconArrowRight,
  IconCheck,
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
import type { CommandState } from "./use-command-state"

interface FinancialsTabProps {
  state: CommandState
}

export function FinancialsTab({ state }: FinancialsTabProps) {
  const { ASSET_BREAKDOWN, activeRole, totalPortfolioValue, totalCommissionPipeline } = state

  const isBuyer = activeRole === "buyer"
  const isSeller = activeRole === "seller"

  const buyerSummary = [
    {
      label: "Liquid Acquisition Reserve",
      val: "$25,000,000",
      sub: "Verified UBS Zurich Custody Account",
      subColor: "text-on-tertiary-container font-semibold",
    },
    {
      label: "Committed to Escrow Wire",
      val: "$1,400,000",
      sub: "First American Trust #ESC-9081",
      subColor: "text-secondary font-mono",
    },
    {
      label: "Available Immediate Liquidity",
      val: "$23,600,000",
      sub: "Fedwire / SWIFT MT103 Clearance",
      subColor: "text-emerald-500 font-semibold",
    },
  ]

  const sellerSummary = [
    {
      label: "Gross Active Portfolio Valuation",
      val: `$${(totalPortfolioValue / 1000000).toFixed(1)}M`,
      sub: "+14.2% YoY Appraised Value",
      subColor: "text-on-tertiary-container",
    },
    {
      label: "Projected Net Settlement Proceeds",
      val: `$${((totalPortfolioValue * 0.97) / 1000000).toFixed(1)}M`,
      sub: "After 3.0% Syndicate Protocol Fee",
      subColor: "text-secondary font-semibold",
    },
    {
      label: "Active Inbound Earnest Received",
      val: "$2,265,000",
      sub: "Held in Bilateral Multi-Sig Escrow",
      subColor: "text-emerald-500 font-mono",
    },
  ]

  const organizerSummary = [
    {
      label: "Closed Deals Volume (YTD)",
      val: "$74,200,000",
      sub: "+28.5% over previous fiscal year",
      subColor: "text-on-tertiary-container",
    },
    {
      label: "Brokerage Earned Commissions",
      val: `$${(totalCommissionPipeline / 1000).toFixed(0)}k`,
      sub: "Avg 3.0% Syndicate Fee Rate",
      subColor: "text-secondary font-semibold",
    },
    {
      label: "Active Escrow Retainers",
      val: "$4,115,000",
      sub: "Secured in First American Trust",
      subColor: "text-on-surface-variant font-mono",
    },
  ]

  const summaryData = isBuyer
    ? buyerSummary
    : isSeller
      ? sellerSummary
      : organizerSummary

  return (
    <div className="flex flex-col gap-6">
      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {summaryData.map((fin, i) => (
          <Card
            key={i}
            className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div
              className={`absolute top-0 inset-x-0 h-1 ${
                i === 0 ? "bg-primary" : i === 1 ? "bg-secondary" : "bg-tertiary"
              }`}
            />
            <CardContent className="flex flex-col justify-between p-5">
              <span className="text-xs font-semibold text-on-surface-variant">
                {fin.label}
              </span>
              <div className="mt-2 text-2xl font-black tracking-tight text-on-surface">
                {fin.val}
              </div>
              <span className={`mt-2 text-xs font-semibold ${fin.subColor}`}>
                {fin.sub}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role-Specific Detail Section */}
      {isBuyer ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Proof of Funds Verification Card */}
          <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                  <IconFileCertificate size={18} />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-on-surface">
                    Proof of Funds &amp; Liquidity Vault
                  </CardTitle>
                  <CardDescription className="text-xs text-on-surface-variant">
                    Cryptographically notarized sovereign liquidity
                  </CardDescription>
                </div>
              </div>
              <Badge variant="gold" className="text-[10px] font-bold">
                Verified Active
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Your accredited sovereign liquidity letter is cryptographically notarized and shared exclusively with verified sellers upon LOI submission.
              </p>

              <div className="space-y-2 rounded-2xl bg-surface-container-low/70 p-3.5 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">Issuing Custodian:</span>
                  <span className="font-bold text-on-surface">UBS Wealth Management (Zurich)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">Accreditation Tier:</span>
                  <span className="font-bold text-secondary">Qualified Purchaser ($25M+)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">Validation Hash:</span>
                  <span className="font-mono text-[11px] text-on-surface-variant">0x7F2b...c914</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-on-surface-variant">Valid Through:</span>
                  <span className="font-bold text-on-surface">December 31, 2026</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-outline-variant/20 pt-3">
                <span className="text-xs text-on-surface-variant">Need to update bank attestations?</span>
                <Button size="sm" variant="outline" className="h-8 rounded-xl text-xs font-semibold">
                  Upload Attestation
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Wire Coordinates & Escrow Desk Card */}
          <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IconBuildingBank size={18} />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-on-surface">
                    Escrow Wire &amp; Settlement Channels
                  </CardTitle>
                  <CardDescription className="text-xs text-on-surface-variant">
                    Direct title trust integration
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px]">
                Multi-Sig Escrow
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Direct integration with First American Title Trust and bilateral Fedwire settlement channels.
              </p>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 rounded-2xl bg-surface-container-low/70 p-3 text-xs">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <IconCheck size={13} />
                  </div>
                  <div>
                    <span className="font-bold text-on-surface">First American Title Escrow Desk</span>
                    <p className="text-[11px] text-on-surface-variant">
                      Active earnest deposit instructions verified for &ldquo;Biscayne Bay Deepwater Palazzo&rdquo;.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-2xl bg-surface-container-low/70 p-3 text-xs">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                    <IconShieldCheck size={13} />
                  </div>
                  <div>
                    <span className="font-bold text-on-surface">Dual-Key Security Authorization</span>
                    <p className="text-[11px] text-on-surface-variant">
                      Requires bilateral sign-off from buyer representative and closing attorney before release.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-outline-variant/20 pt-3">
                <Link href="/closing" className="w-full">
                  <Button className="flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-secondary text-xs font-bold text-primary shadow-xs hover:bg-secondary/90">
                    <span>Open Digital Closing Desk</span>
                    <IconArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Asset Breakdown Chart / Bars */}
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-bold text-on-surface">
              Capital Allocation by Asset Category
            </CardTitle>
            <CardDescription className="text-xs text-on-surface-variant">
              Breakdown across our sovereign portfolio &amp; enclave syndication
            </CardDescription>
          </div>
          <Badge variant="gold" className="text-xs font-bold">
            2026 Fiscal
          </Badge>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ASSET_BREAKDOWN.map((asset, i) => (
              <div
                key={i}
                className="flex flex-col gap-2.5 rounded-2xl border border-outline-variant/30 bg-surface-container-low/60 p-4 transition-all duration-200 hover:border-secondary/40"
              >
                <span className="text-xs font-medium text-on-surface-variant">
                  {asset.label}
                </span>
                <div className="text-lg font-black text-on-surface">
                  {asset.value}
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                  <div className={`${asset.color} h-full ${asset.pct} rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
