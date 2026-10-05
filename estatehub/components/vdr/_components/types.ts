"use client"

export type DiligenceCategory = "legal" | "engineering" | "financial" | "permits"
export type VdrTabId = "all" | DiligenceCategory

export interface DiligenceDoc {
  id: string
  title: string
  badge: string
  source: string
  date: string
  size: string
  /** Short display hash, e.g. "SHA: 8e4b7...d31f" */
  sha: string
  category: DiligenceCategory
  /** Approx bytes for vault-size accounting */
  bytesMb: number
}

export interface VdrSpec {
  label: string
  value: string
  mono?: boolean
}

export interface VdrProperty {
  id: string
  name: string
  enclave: string
  location: string
  description: string
  price: number
  heroImage: string
  specs: VdrSpec[]
  /** Annual appreciation assumption, e.g. 0.058 */
  cagr: number
  /** CA Prop-13 effective rate, e.g. 0.0125 */
  taxRate: number
  annualOperatingCost: number
  holdYears?: number
}

export interface CompRow {
  address: string
  date: string
  price: number
  sqft: number
}

export interface EscrowChannel {
  title: string
  badge: string
  badgeClassName: string
  description: string
  foot: string
  footClassName: string
}

export interface SpatialPin {
  label: string
  positionClassName: string
  borderClassName: string
  dotClassName: string
}

export interface VdrDirector {
  name: string
  title: string
  license: string
  image: string
  phoneHref: string
  emailHref: string
}

export type EarnestOption = "3%" | "5%" | "10%"
export type ClosingOption = "14" | "21" | "30"
export type ContingencyOption = "waived" | "7days" | "14days"

export interface LoiFormState {
  price: number
  earnest: EarnestOption
  closingDays: ClosingOption
  contingency: ContingencyOption
  principal: string
}

export interface Proforma {
  annualTax: number
  monthlyTax: number
  annualOperating: number
  exitValue: number
  capitalGain: number
  netRoiPct: number
  yearlyEquity: number[]
}
