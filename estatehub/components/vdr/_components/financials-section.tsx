"use client"

import * as React from "react"
import { CompsTable } from "./comps-table"
import { EquityChart } from "./equity-chart"
import type { CompRow, VdrProperty } from "./types"
import { buildProforma, formatUSD } from "./vdr-utils"

interface FinancialsSectionProps {
  property: VdrProperty
  comps: CompRow[]
}

export function FinancialsSection({ property, comps }: FinancialsSectionProps) {
  const proforma = React.useMemo(() => buildProforma(property), [property])
  const holdYears = property.holdYears ?? 5

  const matrixCards = [
    {
      label: "Annual Property Tax",
      value: formatUSD(proforma.annualTax),
      sub: `${formatUSD(proforma.monthlyTax)} / month`,
      foot: `CA Prop 13 (${(property.taxRate * 100).toFixed(2)}%)`,
      highlight: false,
    },
    {
      label: "Annual Operating Costs",
      value: formatUSD(proforma.annualOperating),
      sub: "Comprehensive Guard/Facility",
      foot: "Solar Microgrid reduces 65%",
      highlight: false,
    },
    {
      label: `Est. ${holdYears}-Yr Exit Value`,
      value: formatUSD(proforma.exitValue),
      sub: `@ ${(property.cagr * 100).toFixed(1)}% Bel Air CAGR`,
      foot: `+${formatUSD(proforma.capitalGain, { decimals: 1 }).replace(".0", "")} Capital Gain`,
      highlight: false,
    },
    {
      label: "Syndicate Net ROI",
      value: `+${proforma.netRoiPct.toFixed(2)}%`,
      sub: `Unlevered Net ${holdYears}-Yr IRR`,
      foot: "Model Version 4.1",
      highlight: true,
    },
  ]

  return (
    <section
      aria-label="Underwriting pro-forma"
      className="w-full bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 sm:p-7 flex flex-col gap-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-container">
        <div>
          <span className="text-xs uppercase tracking-wider text-on-secondary-container font-bold">
            Institutional Underwriting
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-on-surface">
            {holdYears}-Year Holding &amp; Carry Cost Pro-Forma
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1 rounded-xl text-xs">
          <span className="text-on-surface-variant">Tax Basis:</span>
          <span className="font-bold text-on-surface">
            CA Prop 13 ({(property.taxRate * 100).toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {matrixCards.map((card) => (
          <div
            key={card.label}
            className={
              card.highlight
                ? "bg-primary text-on-primary p-4 rounded-xl flex flex-col justify-between shadow-xs"
                : "bg-surface-container-low p-4 rounded-xl flex flex-col justify-between border border-outline-variant/20"
            }
          >
            <span
              className={
                card.highlight
                  ? "text-xs text-muted-foreground font-medium"
                  : "text-xs text-on-surface-variant font-medium"
              }
            >
              {card.label}
            </span>
            <div className="mt-2">
              <span
                className={
                  card.highlight
                    ? "text-xl font-extrabold text-secondary font-mono"
                    : card.label.includes("Exit")
                      ? "text-xl font-bold text-on-secondary-container font-mono"
                      : "text-xl font-bold text-on-surface font-mono"
                }
              >
                {card.value}
              </span>
              <span
                className={
                  card.highlight
                    ? "text-[11px] text-muted-foreground block mt-0.5"
                    : "text-[11px] text-on-surface-variant block mt-0.5"
                }
              >
                {card.sub}
              </span>
            </div>
            <span
              className={
                card.highlight
                  ? "text-[10px] text-muted-foreground font-mono mt-2"
                  : card.label === "Annual Property Tax"
                    ? "text-[10px] text-outline mt-2"
                    : "text-[10px] text-on-tertiary-container font-bold mt-2"
              }
            >
              {card.foot}
            </span>
          </div>
        ))}
      </div>

      <EquityChart yearlyEquity={proforma.yearlyEquity} holdYears={holdYears} />
      <CompsTable comps={comps} property={property} />
    </section>
  )
}
