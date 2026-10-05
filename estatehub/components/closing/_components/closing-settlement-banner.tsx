"use client"

import { IconCheck } from "@tabler/icons-react"

export function ClosingSettlementBanner() {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-xs border border-outline-variant/30 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary/10 text-on-secondary-container font-label-sm text-xs font-bold">
            Bilateral Digital Closing Active
          </span>
          <span className="text-xs text-on-surface-variant font-mono">
            Escrow Agent: First American Title • Cheryl Vance
          </span>
        </div>
        <h1 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          Bilateral PSA Digital Closing &amp; Execution Room
        </h1>
        <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
          Cryptographic multisig settlement room for binding contract execution, earnest wire escrow lock, and final deed tokenization.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 shrink-0">
        <div>
          <span className="font-caption text-[11px] text-on-surface-variant block font-medium">Contract Price</span>
          <span className="font-headline-sm text-lg sm:text-xl font-extrabold text-on-surface font-mono">
            $9,850,000
          </span>
        </div>
        <div>
          <span className="font-caption text-[11px] text-on-surface-variant block font-medium">Earnest Wire (5%)</span>
          <span className="font-headline-sm text-lg sm:text-xl font-extrabold text-on-tertiary-container font-mono">
            $492,500 <IconCheck className="w-3.5 h-3.5 inline stroke-[3]" />
          </span>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="font-caption text-[11px] text-on-surface-variant block font-medium">Balance to Close</span>
          <span className="font-headline-sm text-lg sm:text-xl font-extrabold text-on-secondary-container font-mono">
            $9,357,500
          </span>
        </div>
      </div>
    </div>
  )
}
