"use client"

import { MortgageCalculations } from "./types"
import { useI18n } from "@/lib/i18n"

interface MortgageCalculatorProps {
  calcPrice: number
  downPercent: number
  mortgageCalculations: MortgageCalculations
  onCalcPriceChange: (value: number) => void
  onDownPercentChange: (value: number) => void
}

const DONUT_SEGMENTS = [
  { stroke: "var(--primary)", offset: "60" },
  { stroke: "var(--secondary)", offset: "195" },
  { stroke: "var(--muted-foreground)", offset: "223" },
]

const INFO_TILES = [
  { label: "Interest Rate", value: "6.20% Fixed" },
  { label: "Amortization", value: "360 Months" },
]

export function MortgageCalculator({
  calcPrice,
  downPercent,
  mortgageCalculations,
  onCalcPriceChange,
  onDownPercentChange,
}: MortgageCalculatorProps) {
  const { t } = useI18n()

  const legendRows = [
    {
      key: "principal",
      dot: "bg-primary-container",
      label: "Principal & Interest",
      value: `$${Math.round(mortgageCalculations.principalAndInterest).toLocaleString()}`,
    },
    {
      key: "tax",
      dot: "bg-secondary",
      label: "Property Taxes (1.2%)",
      value: `$${Math.round(mortgageCalculations.propertyTaxMonthly).toLocaleString()}`,
    },
    {
      key: "insurance",
      dot: "bg-muted-foreground",
      label: "Insurance & HOA Fee",
      value: `$${mortgageCalculations.insuranceAndHoa.toLocaleString()}`,
    },
  ]
  return (
    <>
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-on-surface">
              {t("mortgage.title", "Mortgage & Ownership Cost Calculator")}
            </h2>
            <p className="text-xs text-on-surface-variant">
              {t("mortgage.subtitle", "Customize your acquisition model and review estimated monthly capital obligations.")}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-surface-container text-xs font-semibold text-on-surface w-fit">
            30-Year Fixed • 6.2% APR
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-on-surface-variant">
                  {t("mortgage.purchasePrice", "Purchase Price")}
                </span>
                <span className="text-on-surface font-bold text-sm">
                  ${calcPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={3000000}
                max={30000000}
                step={100000}
                value={calcPrice}
                onChange={(e) => onCalcPriceChange(Number(e.target.value))}
                className="w-full h-2 bg-surface-container rounded-lg cursor-pointer accent-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-on-surface-variant">
                  {t("mortgage.downPayment", "Down Payment")} ({downPercent}%)
                </span>
                <span className="text-on-surface font-bold text-sm">
                  ${Math.round(mortgageCalculations.downAmount).toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={downPercent}
                onChange={(e) => onDownPercentChange(Number(e.target.value))}
                className="w-full h-2 bg-surface-container rounded-lg cursor-pointer accent-secondary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {INFO_TILES.map(({ label, value }) => (
                <div key={label} className="p-3 rounded-xl bg-surface-container-low flex flex-col">
                  <span className="text-[11px] text-on-surface-variant">{label}</span>
                  <span className="text-xs font-bold text-on-surface">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center bg-surface-container-low p-5 rounded-2xl border border-outline-variant/20">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="var(--surface-container)"
                  strokeWidth="11"
                />
                {DONUT_SEGMENTS.map(({ stroke, offset }) => (
                  <circle
                    key={stroke}
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke={stroke}
                    strokeWidth="11"
                    strokeDasharray="238.76"
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                  />
                ))}
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                  Estimated
                </span>
                <span className="text-lg font-extrabold text-on-surface leading-tight">
                  ${Math.round(mortgageCalculations.totalMonthly).toLocaleString()}
                </span>
                <span className="text-[10px] text-on-surface-variant">/ month</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 mt-4 text-xs">
              {legendRows.map(({ key, dot, label, value }) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${dot} flex-shrink-0`} />
                    <span className="text-on-surface-variant">{label}</span>
                  </div>
                  <span className="text-on-surface font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
