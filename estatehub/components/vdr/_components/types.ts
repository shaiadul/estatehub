export interface DiligenceDoc {
  id: string
  title: string
  badge: string
  source: string
  date: string
  size: string
  sha: string
  category: "legal" | "engineering" | "financial" | "permits"
}

export type VdrTabId = "all" | "legal" | "engineering" | "financial" | "permits"

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
  },
]
