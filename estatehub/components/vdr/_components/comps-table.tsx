"use client"

import type { CompRow, VdrProperty } from "./types"
import { formatPerSqft, formatUSD } from "./vdr-utils"

interface CompsTableProps {
  comps: CompRow[]
  property: VdrProperty
  subjectSqft?: number
}

export function CompsTable({ comps, property, subjectSqft = 12400 }: CompsTableProps) {
  const subjectPerSqft = formatPerSqft(property.price, subjectSqft)
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs sm:text-sm font-bold text-on-surface">
        Unredacted Closed Comps Benchmark (Bel Air Submarket)
      </span>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-surface-container text-on-surface-variant uppercase text-[10px] font-bold">
              <th className="py-2.5 px-3 rounded-l-lg">Property Address</th>
              <th className="py-2.5 px-3">Closed Date</th>
              <th className="py-2.5 px-3">Sale Price</th>
              <th className="py-2.5 px-3">Sq Ft</th>
              <th className="py-2.5 px-3">$/Sq Ft</th>
              <th className="py-2.5 px-3 rounded-r-lg">Diff vs Subject</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {comps.map((row) => {
              const perSqft = formatPerSqft(row.price, row.sqft)
              const subjectPer = property.price / subjectSqft
              const rowPer = row.price / row.sqft
              const diffPct = ((rowPer - subjectPer) / subjectPer) * 100
              return (
                <tr key={row.address} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-2.5 px-3 font-bold text-on-surface">{row.address}</td>
                  <td className="py-2.5 px-3 text-on-surface-variant">{row.date}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold">{formatUSD(row.price)}</td>
                  <td className="py-2.5 px-3 text-on-surface-variant">{row.sqft.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-mono">{perSqft}</td>
                  <td className="py-2.5 px-3 text-on-tertiary-container font-bold">
                    +{diffPct.toFixed(1)}% Higher
                  </td>
                </tr>
              )
            })}
            <tr className="bg-secondary/10 font-bold">
              <td className="py-2.5 px-3 text-on-secondary-container">
                {property.name} (Subject)
              </td>
              <td className="py-2.5 px-3 text-on-secondary-container">Current Active</td>
              <td className="py-2.5 px-3 font-mono text-on-secondary-container">
                {formatUSD(property.price)}
              </td>
              <td className="py-2.5 px-3 text-on-secondary-container">
                {subjectSqft.toLocaleString()}
              </td>
              <td className="py-2.5 px-3 font-mono text-on-secondary-container">{subjectPerSqft}</td>
              <td className="py-2.5 px-3 text-on-tertiary-container font-bold">Target Arbitrage</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
