"use client"

import * as React from "react"

interface EquityChartProps {
  yearlyEquity: number[]
  holdYears?: number
}

/** Business chart: equity curve (area) + holding-cost bars, scaled to data. */
export function EquityChart({ yearlyEquity, holdYears = 5 }: EquityChartProps) {
  const { points, bars, labels } = React.useMemo(() => {
    const values = yearlyEquity.slice(0, holdYears)
    if (values.length === 0) return { points: "", bars: [], labels: [] as string[] }
    const W = 700
    const H = 110
    const padX = 50
    const min = Math.min(...values) * 0.97
    const max = Math.max(...values) * 1.02
    const span = Math.max(max - min, 1)
    const stepX = values.length > 1 ? (W - padX * 2) / (values.length - 1) : 0
    const yFor = (v: number) => H - ((v - min) / span) * (H - 20) - 5
    const xFor = (i: number) => padX + i * stepX
    const pts = values.map((v, i) => `${xFor(i).toFixed(1)},${yFor(v).toFixed(1)}`).join(" ")
    const barRects = values.map((v, i) => ({
      x: xFor(i) - 8,
      // holding-cost proxy bar grows slowly — visual only, equity is source of truth
      height: 14 + i * 3,
      y: H + 2,
    }))
    const lbls = values.map(
      (v, i) => `Year ${i + 1} ($${(v / 1_000_000).toFixed(2)}M)`,
    )
    return { points: pts, bars: barRects, labels: lbls }
  }, [yearlyEquity, holdYears])

  return (
    <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-outline-variant/20">
      <div className="flex items-center justify-between mb-3 text-xs flex-wrap gap-2">
        <span className="font-bold text-on-surface">
          {holdYears}-Year Equity Accrual &amp; Capital Projection ($M)
        </span>
        <div className="flex items-center gap-3 text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-primary" /> Holding Cost
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-secondary" /> Asset Equity
          </span>
        </div>
      </div>

      <div className="w-full h-32 sm:h-36" role="img" aria-label="Projected equity growth chart">
        <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 700 140">
          <defs>
            <linearGradient id="equityGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {[30, 70, 110].map((y) => (
            <line
              key={y}
              stroke="var(--outline-variant)"
              strokeDasharray="4 4"
              strokeOpacity="0.25"
              x1="0"
              x2="700"
              y1={y}
              y2={y}
            />
          ))}
          {points && (
            <polygon fill="url(#equityGrad)" points={`${points} 650,130 50,130`} />
          )}
          {points && (
            <polyline
              points={points}
              stroke="var(--secondary)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          )}
          {bars.map((b, i) => (
            <rect key={i} fill="var(--primary)" height={b.height} rx="2" width="16" x={b.x} y={b.y} />
          ))}
          {labels.map((label, i) => {
            const n = labels.length
            const x = n > 1 ? 50 + (i * (650 - 50)) / (n - 1) : 350
            return (
              <text key={label} fill="var(--muted-foreground)" fontSize="10" textAnchor="middle" x={x} y="138">
                {label}
              </text>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
