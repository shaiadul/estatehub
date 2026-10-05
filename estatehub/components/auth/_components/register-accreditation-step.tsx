"use client"

import { Input } from "@/components/ui/input"

interface RegisterAccreditationStepProps {
  netWorthTier: string
  onNetWorthTierChange: (value: string) => void
  liquidCapital: string
  onLiquidCapitalChange: (value: string) => void
  sourceOfFunds: string
  onSourceOfFundsChange: (value: string) => void
}

export function RegisterAccreditationStep({
  netWorthTier,
  onNetWorthTierChange,
  liquidCapital,
  onLiquidCapitalChange,
  sourceOfFunds,
  onSourceOfFundsChange,
}: RegisterAccreditationStepProps) {
  return (
    <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between pb-2 border-b border-surface-container">
        <span className="font-label-md text-xs sm:text-sm text-on-surface uppercase tracking-wider font-bold">
          Accreditation &amp; Liquidity Classification
        </span>
        <span className="font-caption text-xs text-on-secondary-container font-bold">Rule 506(c) Protocol</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="font-label-sm text-xs font-semibold text-on-surface block mb-2">
            Verifiable Net Worth Tier
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "10m-25m", label: "$10M – $25M USD" },
              { id: "25m-50m", label: "$25M – $50M USD" },
              { id: "50m-plus", label: "$50M+ Sovereign" },
            ].map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => onNetWorthTierChange(tier.id)}
                className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center ${
                  netWorthTier === tier.id
                    ? "bg-primary text-on-primary border-primary shadow-sm"
                    : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/40"
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-label-sm text-xs font-semibold text-on-surface block mb-2">
            Immediate Liquid Escrow Allocation
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "5m-10m", label: "$5,000,000" },
              { id: "10m-25m", label: "$10,000,000+" },
              { id: "full-wire", label: "Full All-Cash Wire" },
            ].map((liq) => (
              <button
                key={liq.id}
                type="button"
                onClick={() => onLiquidCapitalChange(liq.id)}
                className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center ${
                  liquidCapital === liq.id
                    ? "bg-primary text-on-primary border-primary shadow-sm"
                    : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/40"
                }`}
              >
                {liq.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-label-sm text-xs font-semibold text-on-surface">Primary Source of Funds</label>
          <Input
            value={sourceOfFunds}
            onChange={(e) => onSourceOfFundsChange(e.target.value)}
            className="w-full bg-surface-container-low py-2.5 rounded-xl text-on-surface focus:bg-surface-container-lowest"
          />
        </div>
      </div>
    </div>
  )
}