"use client"

import * as React from "react"
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { formatUSD } from "./vdr-utils"

interface EquityChartProps {
  yearlyEquity: number[]
  holdYears?: number
  /** Original purchase price — used for gain / YoY math. */
  basePrice?: number
  annualTax?: number
  annualOperating?: number
  cagr?: number
}

interface ChartRow {
  year: string
  fullLabel: string
  equity: number
  carry: number
  gain: number
  net: number
  yoyPct: number
}

const chartConfig: ChartConfig = {
  equity: {
    label: "Asset Equity",
    color: "var(--secondary)",
  },
  carry: {
    label: "Holding Cost (cumul.)",
    color: "var(--primary)",
  },
} satisfies ChartConfig

/** Business chart: equity area + cumulative holding-cost bars, driven by pro-forma data. */
export function EquityChart({
  yearlyEquity,
  holdYears = 5,
  basePrice,
  annualTax = 0,
  annualOperating = 0,
  cagr,
}: EquityChartProps) {
  const gradientId = React.useId().replace(/:/g, "")

  const { rows, yMin, yMax, totalGain, totalCarry, netAfterCarry } = React.useMemo(() => {
    const equityValues = yearlyEquity.slice(0, holdYears)
    if (equityValues.length === 0) {
      return { rows: [] as ChartRow[], yMin: 0, yMax: 0, totalGain: 0, totalCarry: 0, netAfterCarry: 0 }
    }
    const base = basePrice ?? equityValues[0] / 1.058
    const annualCarry = annualTax + annualOperating

    const rows: ChartRow[] = equityValues.map((equity, i) => {
      const prev = i === 0 ? base : equityValues[i - 1]
      const carry = Math.round(annualCarry * (i + 1))
      const gain = Math.round(equity - base)
      return {
        year: `Yr ${i + 1}`,
        fullLabel: `Year ${i + 1} (${formatUSD(equity, { decimals: 0 })})`,
        equity: Math.round(equity),
        carry,
        gain,
        net: gain - carry,
        yoyPct: prev > 0 ? ((equity - prev) / prev) * 100 : 0,
      }
    })

    const min = Math.min(base, ...rows.map((r) => Math.min(r.equity, r.carry)))
    const max = Math.max(...rows.map((r) => Math.max(r.equity, r.carry)))
    const pad = Math.max((max - min) * 0.12, max * 0.02)
    const last = rows[rows.length - 1]
    return {
      rows,
      yMin: Math.max(Math.floor((min - pad) / 500_000) * 500_000, 0),
      yMax: Math.ceil((max + pad) / 500_000) * 500_000,
      totalGain: last.gain,
      totalCarry: last.carry,
      netAfterCarry: last.net,
    }
  }, [yearlyEquity, holdYears, basePrice, annualTax, annualOperating])

  if (rows.length === 0) return null

  return (
    <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-outline-variant/20 flex flex-col gap-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="font-bold text-sm text-on-surface">
            {holdYears}-Year Equity Accrual &amp; Capital Projection
          </p>
          <p className="text-[11px] text-on-surface-variant">
            Equity compounding
            {cagr ? ` @ ${(cagr * 100).toFixed(1)}% CAGR` : ""} vs cumulative carry (tax + ops)
          </p>
        </div>
        {cagr ? (
          <span className="px-2.5 py-1 rounded-full bg-secondary/15 text-on-secondary-container font-mono text-[11px] font-bold">
            +{(cagr * 100).toFixed(1)}% p.a.
          </span>
        ) : null}
      </div>

      <ChartContainer config={chartConfig} className="aspect-auto h-64 sm:h-72 w-full">
        <ComposedChart data={rows} margin={{ top: 8, right: 8, bottom: 0, left: 0 }} barCategoryGap="28%">
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--secondary)" stopOpacity={0.45} />
              <stop offset="100%" stopColor="var(--secondary)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="4 4" strokeOpacity={0.35} />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={64}
            domain={[yMin, yMax]}
            tickFormatter={(v: number) => `$${(Number(v) / 1_000_000).toFixed(1)}M`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(_, payload) => {
                  const row = payload?.[0]?.payload as ChartRow | undefined
                  return row?.fullLabel ?? ""
                }}
                formatter={(value, name, item) => {
                  const row = item?.payload as ChartRow | undefined
                  const items: React.ReactNode[] = []
                  if (name === "equity" || name === undefined) {
                    items.push(
                      <div key="eq" className="flex w-full items-center justify-between gap-6">
                        <span className="text-muted-foreground">Asset Equity</span>
                        <span className="font-mono font-medium tabular-nums">
                          {formatUSD(Number(value))}
                        </span>
                      </div>,
                    )
                    if (row) {
                      items.push(
                        <div key="gain" className="flex w-full items-center justify-between gap-6">
                          <span className="text-muted-foreground">Capital gain</span>
                          <span className="font-mono font-medium tabular-nums text-emerald-600">
                            +{formatUSD(row.gain)}
                          </span>
                        </div>,
                        <div key="yoy" className="flex w-full items-center justify-between gap-6">
                          <span className="text-muted-foreground">YoY growth</span>
                          <span className="font-mono font-medium tabular-nums">
                            +{row.yoyPct.toFixed(2)}%
                          </span>
                        </div>,
                      )
                    }
                  } else {
                    items.push(
                      <div key="carry" className="flex w-full items-center justify-between gap-6">
                        <span className="text-muted-foreground">Holding cost (cumul.)</span>
                        <span className="font-mono font-medium tabular-nums">
                          {formatUSD(Number(value))}
                        </span>
                      </div>,
                    )
                    if (row) {
                      items.push(
                        <div key="net" className="flex w-full items-center justify-between gap-6">
                          <span className="text-muted-foreground">Net after carry</span>
                          <span className="font-mono font-medium tabular-nums">
                            {formatUSD(row.net)}
                          </span>
                        </div>,
                      )
                    }
                  }
                  return <div className="grid w-full gap-1.5">{items}</div>
                }}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="carry" fill="var(--color-carry)" radius={[5, 5, 0, 0]} barSize={22} />
          <Area
            type="monotone"
            dataKey="equity"
            stroke="var(--color-equity)"
            strokeWidth={2.5}
            fill={`url(#${gradientId})`}
            dot={{ r: 3.5, fill: "var(--color-equity)", strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ChartContainer>

      {/* Business summary strip — derived from the same rows */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-outline-variant/20">
        {[
          { label: `Exit equity (Yr ${rows.length})`, value: formatUSD(rows[rows.length - 1].equity) },
          { label: "Total capital gain", value: `+${formatUSD(totalGain)}` },
          { label: "Net after carry", value: formatUSD(netAfterCarry) },
        ].map((s) => (
          <div key={s.label} className="flex flex-col px-1 py-1.5">
            <span className="text-[10px] uppercase tracking-wide text-on-surface-variant font-semibold">
              {s.label}
            </span>
            <span className="text-sm font-bold font-mono text-on-surface tabular-nums">
              {s.value}
            </span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-outline">
        Cumulative carry {formatUSD(totalCarry)} (tax + ops) already netted in the right-hand figure.
      </p>
    </div>
  )
}
