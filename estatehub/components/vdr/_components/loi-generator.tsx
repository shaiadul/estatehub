"use client"

import Link from "next/link"
import { IconReceipt2, IconShieldCheck, IconSend } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoiGeneratorProps {
  loiPrice: number
  onLoiPriceChange: (value: number) => void
  earnestDeposit: string
  onEarnestChange: (value: string) => void
  closingDays: string
  onClosingDaysChange: (value: string) => void
  contingency: string
  onContingencyChange: (value: string) => void
  loiSubmitted: boolean
  loiSubmitting: boolean
  onSubmit: (e: React.FormEvent) => void
}

export function LoiGenerator({
  loiPrice,
  onLoiPriceChange,
  earnestDeposit,
  onEarnestChange,
  closingDays,
  onClosingDaysChange,
  contingency,
  onContingencyChange,
  loiSubmitted,
  loiSubmitting,
  onSubmit,
}: LoiGeneratorProps) {
  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xl p-5 sm:p-6 flex flex-col gap-4 border-2 border-secondary/40">
      <div className="flex items-center justify-between pb-2 border-b border-surface-container">
        <div className="flex items-center gap-2">
          <IconReceipt2 className="w-5 h-5 text-on-secondary-container" />
          <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
            Institutional LOI Generator
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-on-secondary-container text-[10px] font-mono font-bold">
          Fast-Track
        </span>
      </div>

      <p className="font-body-sm text-xs text-on-surface-variant">
        Draft and transmit a binding Letter of Intent directly to the Seller Family Office Legal Counsel.
      </p>

      {loiSubmitted ? (
        <div className="p-4 rounded-xl bg-tertiary/10 border border-tertiary/30 text-on-tertiary-container flex flex-col gap-2 animate-fade-in">
          <div className="flex items-center gap-2 font-bold text-sm">
            <IconShieldCheck className="w-5 h-5" />
            <span>Formal LOI Dispatched (#LOI-8841)</span>
          </div>
          <p className="text-xs text-on-surface-variant">
            Your offer of <strong>${loiPrice.toLocaleString()}</strong> has been cryptographically signed and transmitted to Cheryl Vance, Escrow Officer.
          </p>
          <Link href="/closing" className="mt-2">
            <Button className="w-full bg-tertiary hover:bg-tertiary text-primary-foreground font-bold text-xs rounded-xl py-2 h-auto">
              Open Bilateral Closing Room
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs font-bold text-on-surface flex justify-between">
              <span>Proposed Purchase Price (USD)</span>
              <span className="text-on-secondary-container font-mono">${loiPrice.toLocaleString()}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 font-bold text-on-surface-variant text-sm">$</span>
              <Input
                type="number"
                min={8000000}
                max={15000000}
                step={50000}
                value={loiPrice}
                onChange={(e) => onLoiPriceChange(Number(e.target.value))}
                className="bg-surface-container-low pl-8 font-mono font-bold text-sm rounded-xl py-2"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs font-bold text-on-surface">Earnest Money Deposit</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: "3%", amount: `$${((loiPrice * 0.03) / 1000).toFixed(0)}k` },
                { val: "5%", amount: `$${((loiPrice * 0.05) / 1000).toFixed(0)}k` },
                { val: "10%", amount: `$${((loiPrice * 0.1) / 1000).toFixed(0)}k` },
              ].map((chip) => (
                <button
                  key={chip.val}
                  type="button"
                  onClick={() => onEarnestChange(chip.val)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-bold transition-all ${
                    earnestDeposit === chip.val
                      ? "bg-primary text-on-primary border-primary shadow-xs"
                      : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/30"
                  }`}
                >
                  <span>{chip.val}</span>
                  <span className="text-[10px] opacity-75 font-normal">{chip.amount}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs font-bold text-on-surface">Closing Timeline</label>
            <div className="grid grid-cols-3 gap-2">
              {["14", "21", "30"].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => onClosingDaysChange(days)}
                  className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                    closingDays === days
                      ? "bg-primary text-on-primary border-primary shadow-xs"
                      : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/30"
                  }`}
                >
                  {days} Days
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs font-bold text-on-surface">Due Diligence Contingency</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "waived", label: "Waived" },
                { id: "7days", label: "7 Days" },
                { id: "14days", label: "14 Days" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onContingencyChange(item.id)}
                  className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                    contingency === item.id
                      ? "bg-primary text-on-primary border-primary shadow-xs"
                      : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/30"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-xs font-bold text-on-surface">Submitting Principal</label>
            <Input
              readOnly
              value="Alpha Crest Sovereign Capital AG"
              className="bg-surface-container text-xs rounded-xl cursor-not-allowed font-semibold text-on-surface"
            />
          </div>

          <Button
            type="submit"
            disabled={loiSubmitting}
            className="w-full mt-2 py-3 h-auto rounded-xl bg-secondary hover:bg-secondary-fixed-dim text-on-secondary font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <IconSend className="w-4 h-4" />
            <span>{loiSubmitting ? "Dispatching Enclave LOI..." : "Transmit Formal LOI"}</span>
          </Button>
          <span className="text-[10px] text-center text-outline block">
            Triggers cryptographic DocuSign envelope to registered principal email
          </span>
        </form>
      )}
    </div>
  )
}