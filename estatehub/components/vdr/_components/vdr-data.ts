"use client"

import type {
  CompRow,
  DiligenceDoc,
  EscrowChannel,
  SpatialPin,
  VdrDirector,
  VdrProperty,
  VdrTabId,
} from "./types"

export const VDR_TABS: { id: VdrTabId; label: string }[] = [
  { id: "all", label: "Full Repository" },
  { id: "legal", label: "Legal & Title Vault" },
  { id: "engineering", label: "Engineering & Plans" },
  { id: "financial", label: "Financial Pro-Forma & Tax" },
  { id: "permits", label: "Permits & Warranties" },
]

export const DEFAULT_PROPERTY: VdrProperty = {
  id: "glass-promontory",
  name: "The Glass Promontory Sanctuary",
  enclave: "Promontory Enclave",
  location: "Bel Air, Los Angeles, CA",
  description:
    "Private single-family trophy compound perched on a monolithic private ridge with 270° panoramic ocean and city lights skyline views.",
  price: 9850000,
  heroImage:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  specs: [
    { label: "Interior Living", value: "12,400 sq ft", mono: true },
    { label: "Private Lot", value: "1.82 Acres", mono: true },
    { label: "Bedrooms / Baths", value: "6 Beds • 9 Baths" },
    { label: "Year Completed", value: "2024 New Build" },
    { label: "Automotive Gallery", value: "8 Vehicles (EV)" },
    { label: "Energy Autonomy", value: "Tesla 4x Powerwall" },
  ],
  cagr: 0.058,
  taxRate: 0.0125,
  annualOperatingCost: 48500,
  holdYears: 5,
}

export const DOCUMENTS: DiligenceDoc[] = [
  {
    id: "doc-1",
    title: "Preliminary Title Report & CLTA Guarantee",
    badge: "Grade AAA • Clean Title",
    source: "First American Title Insurance Co.",
    date: "Oct 24, 2024",
    size: "4.2 MB (Vector PDF)",
    sha: "SHA: 8e4b7...d31f",
    category: "legal",
    bytesMb: 4.2,
  },
  {
    id: "doc-2",
    title: "Geotechnical Soils & Hillside Stability Report",
    badge: "Seismic Pass • Zero Fault",
    source: "GeoLabs SoCal Engineering",
    date: "Sep 18, 2024",
    size: "18.4 MB (6 Borehole Cores)",
    sha: "SHA: 1b9c2...7a4e",
    category: "engineering",
    bytesMb: 18.4,
  },
  {
    id: "doc-3",
    title: "As-Built Vector CAD Floorplans & Structural Schematics",
    badge: "DWG + IFC + PDF",
    source: "Marmol Radziner Studio Architectural",
    date: "Aug 30, 2024",
    size: "42.1 MB",
    sha: "SHA: 77a01...f99c",
    category: "engineering",
    bytesMb: 42.1,
  },
  {
    id: "doc-4",
    title: "Phase I ESA & Hillside Wildfire Hardening Audit",
    badge: "Class A Roof & Perimeter Mist",
    source: "Apex Environmental & CalFire Compliant",
    date: "Nov 02, 2024",
    size: "8.9 MB",
    sha: "SHA: 412aa...60e2",
    category: "permits",
    bytesMb: 8.9,
  },
  {
    id: "doc-5",
    title: "Bel Air ARB Approval & Final Certificate of Occupancy (C of O)",
    badge: "Unconditional Issuance",
    source: "City of Los Angeles LADBS",
    date: "Nov 14, 2024",
    size: "3.1 MB",
    sha: "SHA: 90cf1...bb44",
    category: "permits",
    bytesMb: 3.1,
  },
  {
    id: "doc-6",
    title: "Master Architectural Warranty Ledger & Finish Schedule",
    badge: "Transferable 10-Yr",
    source: "Boffi, Gaggenau 400 Series, Fleetwood USA, Tesla",
    date: "Dec 01, 2024",
    size: "14.2 MB",
    sha: "SHA: 5c2d1...32f1",
    category: "financial",
    bytesMb: 14.2,
  },
]

export const COMP_ROWS: CompRow[] = [
  { address: "10432 Bellagio Rd, Bel Air", date: "Aug 2024", price: 11400000, sqft: 11800 },
  { address: "10820 Chalon Rd, Bel Air", date: "Jun 2024", price: 12750000, sqft: 13100 },
  { address: "850 Stone Canyon Rd, Bel Air", date: "Oct 2024", price: 9200000, sqft: 9600 },
]

export const ESCROW_CHANNELS: EscrowChannel[] = [
  {
    title: "1. Traditional Fedwire / SWIFT",
    badge: "USD Wire",
    badgeClassName:
      "px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-mono",
    description: "First American Title Co. • National Commercial Services (Los Angeles HQ)",
    foot: "Escrow Officer: Cheryl Vance, VP Escrow",
    footClassName: "text-[11px] text-on-secondary-container font-semibold",
  },
  {
    title: "2. Institutional Digital Custody",
    badge: "USDC / USDT",
    badgeClassName:
      "px-2 py-0.5 rounded bg-tertiary/20 text-on-tertiary-container text-[10px] font-mono font-bold",
    description: "Anchorage Digital Bank (Qualified Custodian Settlement)",
    foot: "Instant programmatic closing available",
    footClassName: "text-[11px] text-outline",
  },
]

export const SPATIAL_PINS: SpatialPin[] = [
  {
    label: "Boffi Minimalist Kitchen & Sub-Zero Suite",
    positionClassName: "absolute top-1/4 left-1/3",
    borderClassName: "border-secondary/50",
    dotClassName: "w-2 h-2 rounded-full bg-secondary animate-ping",
  },
  {
    label: "75-ft Cantilevered Zero-Edge Pool",
    positionClassName: "absolute top-1/2 right-1/4",
    borderClassName: "border-tertiary/50",
    dotClassName: "w-2 h-2 rounded-full bg-tertiary",
  },
]

export const DIRECTOR: VdrDirector = {
  name: "Julian Vance-Moreau",
  title: "Managing Partner • Ultra-Prime Division",
  license: "DRE #01928411",
  image:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  phoneHref: "tel:+13105550199",
  emailHref: "mailto:julian@estatehub.com",
}

export const LOI_BOUNDS = { min: 8000000, max: 15000000, step: 50000 } as const
export const DEFAULT_LOI_PRINCIPAL = "Alpha Crest Sovereign Capital AG"
