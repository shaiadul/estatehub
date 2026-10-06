"use client"

import Link from "next/link"
import { IconReceipt2, IconSend, IconShieldCheck } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useI18n } from "@/lib/i18n"
import { LOI_BOUNDS } from "./vdr-data"
import { earnestLabel, formatUSD } from "./vdr-utils"
import type { ClosingOption, ContingencyOption, EarnestOption } from "./types"

interface LoiGeneratorProps {
  price: number
  onPriceChange: (value: number) => void
  earnest: EarnestOption
  onEarnestChange: (value: EarnestOption) => void
  closingDays: ClosingOption
  onClosingDaysChange: (value: ClosingOption) => void
  contingency: ContingencyOption
  onContingencyChange: (value: ContingencyOption) => void
  principal: string
  submitting: boolean
  submitted: boolean
  loiNumber: string | null
  error: string | null
  onSubmit: (e: React.FormEvent) => void
  onReset?: () => void
}

const EARNEST_OPTIONS: EarnestOption[] = ["3%", "5%", "10%"]
const CLOSING_OPTIONS: ClosingOption[] = ["14", "21", "30"]
const CONTINGENCY_OPTIONS: { id: ContingencyOption; labelKey?: string; days?: number; fallback: string }[] = [
  { id: "waived", labelKey: "vdr.waived", fallback: "Waived" },
  { id: "7days", days: 7, fallback: "7 Days" },
  { id: "14days", days: 14, fallback: "14 Days" },
]

export function LoiGenerator({
  price,
  onPriceChange,
  earnest,
  onEarnestChange,
  closingDays,
  onClosingDaysChange,
  contingency,
  onContingencyChange,
  principal,
  submitting,
  submitted,
  loiNumber,
  error,
  onSubmit,
  onReset,
}: LoiGeneratorProps) {
  const { t } = useI18n()

  if (submitted) {
    return (
      <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xl p-5 sm:p-6 flex flex-col gap-4 border-2 border-secondary/40">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <IconReceipt2 className="w-5 h-5 text-on-secondary-container" />
            <h3 className="text-base sm:text-lg font-bold text-on-surface">
              {t("vdr.loiTitle", "Institutional LOI Generator")}
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-on-secondary-container text-[10px] font-mono font-bold">
            Fast-Track
          </span>
        </div>
        <div className="p-4 rounded-xl bg-tertiary/10 border border-tertiary/30 text-on-tertiary-container flex flex-col gap-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <IconShieldCheck className="w-5 h-5" />
            <span>Formal LOI Dispatched (#{loiNumber ?? "LOI-8841"})</span>
          </div>
          <p className="text-xs text-on-surface-variant">
            Your offer of <strong>{formatUSD(price)}</strong> has been cryptographically signed and
            transmitted to Cheryl Vance, Escrow Officer.
          </p>
          <Link href="/closing" className="mt-2">
            <Button className="w-full bg-tertiary hover:bg-tertiary text-primary-foreground font-bold text-xs rounded-xl py-2 h-auto">
              {t("vdr.openClosingRoom", "Open Bilateral Closing Room")}
            </Button>
          </Link>
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="text-[11px] text-on-surface-variant underline underline-offset-2 hover:text-on-surface"
            >
              {t("vdr.draftRevised", "Draft a revised offer")}
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xl p-5 sm:p-6 flex flex-col gap-4 border-2 border-secondary/40">
      <div className="flex items-center justify-between pb-2 border-b border-surface-container">
        <div className="flex items-center gap-2">
          <IconReceipt2 className="w-5 h-5 text-on-secondary-container" />
          <h3 className="text-base sm:text-lg font-bold text-on-surface">
            {t("vdr.loiTitle", "Institutional LOI Generator")}
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-on-secondary-container text-[10px] font-mono font-bold">
          Fast-Track
        </span>
      </div>

      <p className="text-xs text-on-surface-variant">
        {t("vdr.loiSubtitle", "Draft and transmit a binding Letter of Intent directly to the Seller Family Office Legal Counsel.")}
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-3.5" noValidate>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="loi-price" className="text-xs font-bold text-on-surface flex justify-between">
            <span>{t("vdr.proposedPrice", "Proposed Purchase Price (USD)")}</span>
            <span className="text-on-secondary-container font-mono">{formatUSD(price)}</span>
          </label>
          <InputGroup className="h-10 gap-1.5 rounded-xl border-outline-variant/30 bg-surface-container-low px-3">
            <InputGroupAddon
              aria-hidden
              className="h-full p-0 font-mono text-sm font-bold text-on-surface-variant"
            >
              $
            </InputGroupAddon>
            <InputGroupInput
              id="loi-price"
              type="number"
              min={LOI_BOUNDS.min}
              max={LOI_BOUNDS.max}
              step={LOI_BOUNDS.step}
              value={price}
              onChange={(e) => onPriceChange(Number(e.target.value))}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "loi-price-error" : undefined}
              className="h-full px-0! font-mono text-sm font-bold text-on-surface [appearance:textfield]"
            />
          </InputGroup>
          {error ? (
            <span id="loi-price-error" role="alert" className="text-[11px] text-destructive font-semibold">
              {error}
            </span>
          ) : (
            <span className="text-[11px] text-outline">
              Range {formatUSD(LOI_BOUNDS.min)} – {formatUSD(LOI_BOUNDS.max)}
            </span>
          )}
        </div>

        <fieldset className="flex flex-col gap-1.5">
          <legend className="text-xs font-bold text-on-surface">{t("vdr.earnestDeposit", "Earnest Money Deposit")}</legend>
          <div className="grid grid-cols-3 gap-2">
            {EARNEST_OPTIONS.map((val) => (
              <button
                key={val}
                type="button"
                aria-pressed={earnest === val}
                onClick={() => onEarnestChange(val)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-bold transition-all ${
                  earnest === val
                    ? "bg-primary text-on-primary border-primary shadow-xs"
                    : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/30"
                }`}
              >
                <span>{val}</span>
                <span className="text-[10px] opacity-75 font-normal">
                  {earnestLabel(price, val)}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-1.5">
          <legend className="text-xs font-bold text-on-surface">{t("vdr.closingTimeline", "Closing Timeline")}</legend>
          <div className="grid grid-cols-3 gap-2">
            {CLOSING_OPTIONS.map((days) => (
              <button
                key={days}
                type="button"
                aria-pressed={closingDays === days}
                onClick={() => onClosingDaysChange(days)}
                className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                  closingDays === days
                    ? "bg-primary text-on-primary border-primary shadow-xs"
                    : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/30"
                }`}
              >
                {days} {t("vdr.days", "Days")}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-1.5">
          <legend className="text-xs font-bold text-on-surface">{t("vdr.contingency", "Due Diligence Contingency")}</legend>
          <div className="grid grid-cols-3 gap-2">
            {CONTINGENCY_OPTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={contingency === item.id}
                onClick={() => onContingencyChange(item.id)}
                className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                  contingency === item.id
                    ? "bg-primary text-on-primary border-primary shadow-xs"
                    : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/30"
                }`}
              >
                {item.labelKey
                  ? t(item.labelKey, item.fallback)
                  : `${item.days} ${t("vdr.days", "Days")}`}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-1">
          <label htmlFor="loi-principal" className="text-xs font-bold text-on-surface">
            {t("vdr.submittingPrincipal", "Submitting Principal")}
          </label>
          <Input
            id="loi-principal"
            readOnly
            value={principal}
            className="bg-surface-container text-xs rounded-xl cursor-not-allowed font-semibold text-on-surface"
          />
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="w-full mt-2 py-3 h-auto rounded-xl bg-secondary hover:bg-secondary-fixed-dim text-on-secondary font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <IconSend className="w-4 h-4" />
          <span>{submitting ? t("vdr.dispatchingLoi", "Dispatching Enclave LOI...") : t("vdr.transmitLoi", "Transmit Formal LOI")}</span>
        </Button>
        <span className="text-[10px] text-center text-outline block">
          {t("vdr.docusignNote", "Triggers cryptographic DocuSign envelope to registered principal email")}
        </span>
      </form>
    </div>
  )
}
