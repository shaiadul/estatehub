"use client"

import type {
  DiligenceDoc,
  EarnestOption,
  Proforma,
  VdrProperty,
  VdrTabId,
} from "./types"

export function formatUSD(value: number, opts?: { decimals?: number }): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: opts?.decimals ?? 0,
  }).format(value)
}

export function formatPerSqft(price: number, sqft: number): string {
  if (!sqft) return "—"
  return `$${Math.round(price / sqft).toLocaleString()}/sf`
}

export function generateVdrHash(): string {
  const n = Math.floor(1000 + Math.random() * 9000)
  return `AC-${n}-ZH-VDR`
}

export function generateLoiNumber(): string {
  return `LOI-${Math.floor(1000 + Math.random() * 9000)}`
}

export function earnestAmount(price: number, earnest: EarnestOption): number {
  const pct = Number.parseFloat(earnest) / 100
  return Math.round(price * pct)
}

export function earnestLabel(price: number, earnest: EarnestOption): string {
  const amt = earnestAmount(price, earnest)
  return amt >= 1000 ? `$${Math.round(amt / 1000)}k` : formatUSD(amt)
}

/** Business rule: unlevered 5-yr pro-forma from price, CAGR, tax rate. */
export function buildProforma(property: VdrProperty): Proforma {
  const years = property.holdYears ?? 5
  const annualTax = Math.round(property.price * property.taxRate)
  const monthlyTax = Math.round(annualTax / 12)
  const exitValue = Math.round(property.price * Math.pow(1 + property.cagr, years))
  const capitalGain = exitValue - property.price
  const netRoiPct = (capitalGain / property.price) * 100
  const yearlyEquity = Array.from({ length: years }, (_, i) =>
    Math.round(property.price * Math.pow(1 + property.cagr, i + 1)),
  )
  return {
    annualTax,
    monthlyTax,
    annualOperating: property.annualOperatingCost,
    exitValue,
    capitalGain,
    netRoiPct,
    yearlyEquity,
  }
}

export function vaultSizeMb(docs: DiligenceDoc[]): number {
  return docs.reduce((sum, d) => sum + (d.bytesMb ?? 0), 0)
}

export function filterDocs(
  docs: DiligenceDoc[],
  tab: VdrTabId,
  query: string,
): DiligenceDoc[] {
  const q = query.trim().toLowerCase()
  return docs.filter((doc) => {
    const matchesTab = tab === "all" || doc.category === tab
    if (!matchesTab) return false
    if (!q) return true
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.source.toLowerCase().includes(q) ||
      doc.badge.toLowerCase().includes(q)
    )
  })
}

export function countByTab(docs: DiligenceDoc[]): Record<VdrTabId, number> {
  return {
    all: docs.length,
    legal: docs.filter((d) => d.category === "legal").length,
    engineering: docs.filter((d) => d.category === "engineering").length,
    financial: docs.filter((d) => d.category === "financial").length,
    permits: docs.filter((d) => d.category === "permits").length,
  }
}

export function validateLoiPrice(price: number, min: number, max: number): string | null {
  if (!Number.isFinite(price)) return "Enter a valid offer price."
  if (price < min) return `Offer must be at least ${formatUSD(min)}.`
  if (price > max) return `Offer cannot exceed ${formatUSD(max)}.`
  return null
}
