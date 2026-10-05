"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconFolder,
  IconPhoneCall,
  IconRefresh,
  IconSearch,
  IconFileText,
  IconBuildingBank,
  IconMapPin,
  IconShieldCheck,
  IconDownload,
  IconEye,
  IconSend,
  IconReceipt2,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SectionWrapper } from "@/components/ui/section-wrapper"

interface DiligenceDoc {
  id: string
  title: string
  badge: string
  source: string
  date: string
  size: string
  sha: string
  category: "legal" | "engineering" | "financial" | "permits"
}

const DOCUMENTS: DiligenceDoc[] = [
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

export function VirtualDataRoomView() {
  const [activeTab, setActiveTab] = React.useState<"all" | "legal" | "engineering" | "financial" | "permits">("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [vdrHash, setVdrHash] = React.useState("AC-8841-ZH-VDR")
  const [downloadingId, setDownloadingId] = React.useState<string | null>(null)
  const [previewDoc, setPreviewDoc] = React.useState<DiligenceDoc | null>(null)

  // LOI Generator State
  const [loiPrice, setLoiPrice] = React.useState(9850000)
  const [earnestDeposit, setEarnestDeposit] = React.useState("5%")
  const [closingDays, setClosingDays] = React.useState("21")
  const [contingency, setContingency] = React.useState("waived")
  const [loiSubmitted, setLoiSubmitted] = React.useState(false)
  const [loiSubmitting, setLoiSubmitting] = React.useState(false)

  const handleLoiSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoiSubmitting(true)
    setTimeout(() => {
      setLoiSubmitting(false)
      setLoiSubmitted(true)
    }, 900)
  }

  const handleDownload = (id: string) => {
    setDownloadingId(id)
    setTimeout(() => {
      setDownloadingId(null)
      alert("Encrypted document downloaded successfully (SHA-256 verified).")
    }, 800)
  }

  const filteredDocs = DOCUMENTS.filter((doc) => {
    const matchesTab = activeTab === "all" || doc.category === activeTab
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.source.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-surface">
      <SectionWrapper fullWidth innerClassName="py-6 md:py-10 flex flex-col gap-6 md:gap-8">
        {/* PROPERTY HERO BANNER WITH VDR CLEARANCE */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-slate-950 text-white shadow-xl border border-outline-variant/30">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />

          <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col gap-6">
            {/* Top Security Clearance Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-caption text-xs uppercase tracking-wider text-slate-200 font-bold">
                  Level 4 Sovereign Diligence • Unredacted Access Active
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-400">Watermark:</span>
                <code className="px-2 py-0.5 rounded bg-slate-900 text-amber-400 font-mono text-xs border border-slate-700">
                  {vdrHash}
                </code>
                <button
                  type="button"
                  onClick={() => setVdrHash(`AC-${Math.floor(1000 + Math.random() * 9000)}-ZH-VDR`)}
                  className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
                  title="Refresh Hash"
                >
                  <IconRefresh className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Title & Valuation */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 text-amber-400 font-caption text-xs uppercase font-bold tracking-wider">
                  <IconMapPin className="w-4 h-4" />
                  <span>Bel Air, Los Angeles, CA • Promontory Enclave</span>
                </div>
                <h1 className="font-headline-lg text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                  The Glass Promontory Sanctuary
                </h1>
                <p className="font-body-sm text-xs sm:text-sm text-slate-300">
                  Private single-family trophy compound perched on a monolithic private ridge with 270° panoramic ocean and city lights skyline views.
                </p>
              </div>

              <div className="lg:text-right flex flex-col lg:items-end">
                <span className="font-caption text-xs uppercase text-slate-400 font-bold tracking-wider">
                  Sovereign Offering Valuation
                </span>
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-amber-400">$9,850,000</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Bilateral Escrow Ready • 21-Day Close
                </span>
              </div>
            </div>

            {/* Key Specs Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block">Interior Living</span>
                <span className="text-sm font-bold text-white font-mono">12,400 sq ft</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block">Private Lot</span>
                <span className="text-sm font-bold text-white font-mono">1.82 Acres</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block">Bedrooms / Baths</span>
                <span className="text-sm font-bold text-white">6 Beds • 9 Baths</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block">Year Completed</span>
                <span className="text-sm font-bold text-white">2024 New Build</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block">Automotive Gallery</span>
                <span className="text-sm font-bold text-white">8 Vehicles (EV)</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block">Energy Autonomy</span>
                <span className="text-sm font-bold text-white">Tesla 4x Powerwall</span>
              </div>
            </div>

            {/* Global Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  onClick={() => alert("Downloading full encrypted vault archive (412 MB)...")}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-md"
                >
                  <IconFolder className="w-4 h-4" />
                  <span>Download Full Vault (.ZIP 412 MB)</span>
                </Button>
                <Link href="/closing">
                  <Button
                    variant="outline"
                    className="border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl px-4 py-2.5 flex items-center gap-2"
                  >
                    <IconReceipt2 className="w-4 h-4 text-emerald-400" />
                    <span>Enter Digital Closing Room</span>
                  </Button>
                </Link>
                <a
                  href="tel:+13105550199"
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors border border-white/10"
                >
                  <IconPhoneCall className="w-4 h-4 text-amber-400" />
                  <span>Advisor Hotline</span>
                </a>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <IconShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Encrypted with SHA-256 Ledger Verification</span>
              </div>
            </div>
          </div>
        </div>

        {/* TABBED VDR DILIGENCE SUITE SELECTOR */}
        <div className="flex items-center overflow-x-auto gap-2 pb-1 scrollbar-none">
          {[
            { id: "all" as const, label: "Full Repository (6 Exhibits)" },
            { id: "legal" as const, label: "Legal & Title Vault" },
            { id: "engineering" as const, label: "Engineering & Plans" },
            { id: "financial" as const, label: "Financial Pro-Forma & Tax" },
            { id: "permits" as const, label: "Permits & Warranties" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl font-label-md text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* MAIN TWO-COLUMN WORKSPACE: 8 COLS DILIGENCE STACK + 4 COLS ACTION SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 8-COLUMN DILIGENCE STACK */}
          <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
            {/* SECTION 1: UNREDACTED DILIGENCE REPOSITORY */}
            <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 sm:p-7 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-container">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
                      Unredacted Diligence Repository
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 font-mono text-[10px] font-bold">
                      SHA-256 Validated
                    </span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    All exhibits contain unredacted legal descriptors, surveyor stamps, and bilateral escrow disclosures.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Filter exhibits..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-surface-container-low text-xs pl-8 pr-3 py-1.5 h-auto rounded-xl w-40 sm:w-48"
                    />
                    <IconSearch className="w-3.5 h-3.5 text-outline absolute left-2.5 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Document List */}
              <div className="flex flex-col gap-2.5">
                {filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-xl bg-surface-container-low/70 hover:bg-surface-container transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-outline-variant/20"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs">
                        <IconFileText className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface">
                            {doc.title}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-caption text-[10px] font-bold">
                            {doc.badge}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-caption text-[11px] text-on-surface-variant flex-wrap mt-0.5">
                          <span>{doc.source}</span>
                          <span>•</span>
                          <span>{doc.date}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span className="font-mono text-[10px] text-outline">{doc.sha}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setPreviewDoc(doc)}
                        className="text-xs rounded-lg px-2.5 py-1.5 h-auto font-semibold gap-1 bg-surface-container-lowest"
                      >
                        <IconEye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </Button>
                      <Button
                        size="sm"
                        disabled={downloadingId === doc.id}
                        onClick={() => handleDownload(doc.id)}
                        className="text-xs rounded-lg px-3 py-1.5 h-auto font-semibold gap-1 bg-primary text-on-primary"
                      >
                        <IconDownload className="w-3.5 h-3.5" />
                        <span>{downloadingId === doc.id ? "Decrypting..." : "Download"}</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: 5-YEAR PRO-FORMA & CARRY COST BENCHMARK */}
            <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 sm:p-7 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-container">
                <div>
                  <span className="font-caption text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold">
                    Institutional Underwriting
                  </span>
                  <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
                    5-Year Holding &amp; Carry Cost Pro-Forma
                  </h2>
                </div>
                <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1 rounded-xl text-xs">
                  <span className="text-on-surface-variant">Tax Basis:</span>
                  <span className="font-bold text-on-surface">CA Prop 13 (1.25%)</span>
                </div>
              </div>

              {/* Financial Matrix Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-surface-container-low p-4 rounded-xl flex flex-col justify-between border border-outline-variant/20">
                  <span className="font-caption text-xs text-on-surface-variant font-medium">Annual Property Tax</span>
                  <div className="mt-2">
                    <span className="font-headline-sm text-xl font-bold text-on-surface font-mono">$123,125</span>
                    <span className="text-[11px] text-on-surface-variant block mt-0.5">$10,260 / month</span>
                  </div>
                  <span className="text-[10px] text-outline mt-2">Locked against re-assessment</span>
                </div>

                <div className="bg-surface-container-low p-4 rounded-xl flex flex-col justify-between border border-outline-variant/20">
                  <span className="font-caption text-xs text-on-surface-variant font-medium">Annual Operating Costs</span>
                  <div className="mt-2">
                    <span className="font-headline-sm text-xl font-bold text-on-surface font-mono">$48,500</span>
                    <span className="text-[11px] text-on-surface-variant block mt-0.5">Comprehensive Guard/Facility</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold mt-2">Solar Microgrid reduces 65%</span>
                </div>

                <div className="bg-surface-container-low p-4 rounded-xl flex flex-col justify-between border border-outline-variant/20">
                  <span className="font-caption text-xs text-on-surface-variant font-medium">Est. 5-Yr Exit Value</span>
                  <div className="mt-2">
                    <span className="font-headline-sm text-xl font-bold text-amber-700 dark:text-amber-400 font-mono">
                      $13,050,000
                    </span>
                    <span className="text-[11px] text-on-surface-variant block mt-0.5">@ 5.8% Bel Air CAGR</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold mt-2">+$3.2M Capital Gain</span>
                </div>

                <div className="bg-primary text-on-primary p-4 rounded-xl flex flex-col justify-between shadow-xs">
                  <span className="font-caption text-xs text-slate-300 font-medium">Syndicate Net ROI</span>
                  <div className="mt-2">
                    <span className="font-headline-sm text-xl font-extrabold text-amber-400 font-mono">+32.48%</span>
                    <span className="text-[11px] text-slate-300 block mt-0.5">Unlevered Net 5-Yr IRR</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-2">Model Version 4.1</span>
                </div>
              </div>

              {/* Inline Visual Cashflow Sparkline / Area Graph */}
              <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-outline-variant/20">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-on-surface">5-Year Equity Accrual &amp; Capital Projection ($M)</span>
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-primary" /> Holding Cost
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-amber-400" /> Asset Equity
                    </span>
                  </div>
                </div>

                <div className="w-full h-32 sm:h-36">
                  <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 700 140">
                    <defs>
                      <linearGradient id="equityGrad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line stroke="#c6c6cd" strokeDasharray="4 4" strokeOpacity="0.25" x1="0" x2="700" y1="30" y2="30" />
                    <line stroke="#c6c6cd" strokeDasharray="4 4" strokeOpacity="0.25" x1="0" x2="700" y1="70" y2="70" />
                    <line stroke="#c6c6cd" strokeDasharray="4 4" strokeOpacity="0.25" x1="0" x2="700" y1="110" y2="110" />
                    <polygon fill="url(#equityGrad)" points="50,110 180,95 320,80 480,58 650,25 650,130 50,130" />
                    <polyline
                      points="50,110 180,95 320,80 480,58 650,25"
                      stroke="#d97706"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                    />
                    <rect fill="#0f172a" height="18" rx="2" width="16" x="42" y="112" />
                    <rect fill="#0f172a" height="20" rx="2" width="16" x="172" y="110" />
                    <rect fill="#0f172a" height="22" rx="2" width="16" x="312" y="108" />
                    <rect fill="#0f172a" height="25" rx="2" width="16" x="472" y="105" />
                    <rect fill="#0f172a" height="28" rx="2" width="16" x="642" y="102" />
                    <text fill="#64748b" fontSize="10" textAnchor="middle" x="50" y="138">Year 1 ($9.85M)</text>
                    <text fill="#64748b" fontSize="10" textAnchor="middle" x="180" y="138">Year 2 ($10.42M)</text>
                    <text fill="#64748b" fontSize="10" textAnchor="middle" x="320" y="138">Year 3 ($11.10M)</text>
                    <text fill="#64748b" fontSize="10" textAnchor="middle" x="480" y="138">Year 4 ($12.01M)</text>
                    <text fill="#64748b" fontSize="10" textAnchor="middle" x="650" y="138">Year 5 ($13.05M)</text>
                  </svg>
                </div>
              </div>

              {/* Unredacted Bel Air Closed Comps Table */}
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface">
                  Unredacted Closed Comps Benchmark (Bel Air Submarket)
                </span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-body-sm text-xs">
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
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="py-2.5 px-3 font-bold text-on-surface">10432 Bellagio Rd, Bel Air</td>
                        <td className="py-2.5 px-3 text-on-surface-variant">Aug 2024</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">$11,400,000</td>
                        <td className="py-2.5 px-3 text-on-surface-variant">11,800</td>
                        <td className="py-2.5 px-3 font-mono">$966/sf</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">+21.6% Higher</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="py-2.5 px-3 font-bold text-on-surface">10820 Chalon Rd, Bel Air</td>
                        <td className="py-2.5 px-3 text-on-surface-variant">Jun 2024</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">$12,750,000</td>
                        <td className="py-2.5 px-3 text-on-surface-variant">13,100</td>
                        <td className="py-2.5 px-3 font-mono">$973/sf</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">+22.5% Higher</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="py-2.5 px-3 font-bold text-on-surface">850 Stone Canyon Rd, Bel Air</td>
                        <td className="py-2.5 px-3 text-on-surface-variant">Oct 2024</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">$9,200,000</td>
                        <td className="py-2.5 px-3 text-on-surface-variant">9,600</td>
                        <td className="py-2.5 px-3 font-mono">$958/sf</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">+20.6% Higher</td>
                      </tr>
                      <tr className="bg-amber-500/10 font-bold">
                        <td className="py-2.5 px-3 text-amber-800 dark:text-amber-300">The Glass Promontory (Subject)</td>
                        <td className="py-2.5 px-3 text-amber-800 dark:text-amber-300">Current Active</td>
                        <td className="py-2.5 px-3 font-mono text-amber-800 dark:text-amber-300">$9,850,000</td>
                        <td className="py-2.5 px-3 text-amber-800 dark:text-amber-300">12,400</td>
                        <td className="py-2.5 px-3 font-mono text-amber-800 dark:text-amber-300">$794/sf</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">Target Arbitrage</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* SECTION 3: 3D MATTERPORT / LIDAR PREVIEW */}
            <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 sm:p-7 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-container">
                <div>
                  <span className="font-caption text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold">
                    Confidential Scan Data
                  </span>
                  <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
                    3D LiDAR Interior Mesh &amp; Drone Flight-Through
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-mono text-xs font-semibold">
                  Matterport Pro3 • 4K HDR
                </span>
              </div>

              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden group border border-outline-variant/30">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
                  alt="3D LiDAR space"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40" />

                {/* Spatial Pin Overlays */}
                <div className="absolute top-1/4 left-1/3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 text-white text-xs backdrop-blur-md border border-amber-400/50 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="font-semibold">Boffi Minimalist Kitchen &amp; Sub-Zero Suite</span>
                </div>
                <div className="absolute top-1/2 right-1/4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 text-white text-xs backdrop-blur-md border border-emerald-400/50 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold">75-ft Cantilevered Zero-Edge Pool</span>
                </div>

                {/* Viewer Control Bar Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl flex items-center justify-between text-white border border-slate-700">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Button
                      size="sm"
                      onClick={() => alert("Launching 3D dollhouse model...")}
                      className="bg-amber-400 text-slate-950 font-bold text-xs rounded-lg px-3 py-1.5"
                    >
                      Launch Interactive Dollhouse
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => alert("Loading 4K drone perimeter scan...")}
                      className="border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 bg-slate-800"
                    >
                      4K Drone Perimeter (3m 40s)
                    </Button>
                  </div>
                  <span className="hidden sm:inline-block text-[11px] text-slate-400 font-mono">
                    Measured Accuracy: ±0.1%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 4-COLUMN ACTION & ADVISORY SIDEBAR */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-28">
            {/* MODULE 1: INSTITUTIONAL LOI GENERATOR WIDGET */}
            <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xl p-5 sm:p-6 flex flex-col gap-4 border-2 border-amber-500/40">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <IconReceipt2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
                    Institutional LOI Generator
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 text-[10px] font-mono font-bold">
                  Fast-Track
                </span>
              </div>

              <p className="font-body-sm text-xs text-on-surface-variant">
                Draft and transmit a binding Letter of Intent directly to the Seller Family Office Legal Counsel.
              </p>

              {loiSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex flex-col gap-2 animate-fade-in">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <IconShieldCheck className="w-5 h-5" />
                    <span>Formal LOI Dispatched (#LOI-8841)</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Your offer of <strong>${loiPrice.toLocaleString()}</strong> has been cryptographically signed and transmitted to Cheryl Vance, Escrow Officer.
                  </p>
                  <Link href="/closing" className="mt-2">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl py-2 h-auto">
                      Open Bilateral Closing Room
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleLoiSubmit} className="flex flex-col gap-3.5">
                  {/* Purchase Price Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-sm text-xs font-bold text-on-surface flex justify-between">
                      <span>Proposed Purchase Price (USD)</span>
                      <span className="text-amber-700 dark:text-amber-400 font-mono">${loiPrice.toLocaleString()}</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 font-bold text-on-surface-variant text-sm">$</span>
                      <Input
                        type="number"
                        min={8000000}
                        max={15000000}
                        step={50000}
                        value={loiPrice}
                        onChange={(e) => setLoiPrice(Number(e.target.value))}
                        className="bg-surface-container-low pl-8 font-mono font-bold text-sm rounded-xl py-2"
                      />
                    </div>
                  </div>

                  {/* Earnest Deposit Radio Chips */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-sm text-xs font-bold text-on-surface">Earnest Money Deposit</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: "3%", amount: `$${((loiPrice * 0.03) / 1000).toFixed(0)}k` },
                        { val: "5%", amount: `$${((loiPrice * 0.05) / 1000).toFixed(0)}k` },
                        { val: "10%", amount: `$${((loiPrice * 0.1) / 1000).toFixed(0)}k` },
                      ].map((chip) => (
                        <button
                          key={chip.val}
                          type="button"
                          onClick={() => setEarnestDeposit(chip.val)}
                          className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-bold transition-all ${
                            earnestDeposit === chip.val
                              ? "bg-primary text-on-primary border-primary shadow-xs"
                              : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/30"
                          }`}
                        >
                          <span>{chip.val}</span>
                          <span className="text-[10px] opacity-75 font-normal">{chip.amount}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Escrow Closing Period */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-sm text-xs font-bold text-on-surface">Closing Timeline</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["14", "21", "30"].map((days) => (
                        <button
                          key={days}
                          type="button"
                          onClick={() => setClosingDays(days)}
                          className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                            closingDays === days
                              ? "bg-primary text-on-primary border-primary shadow-xs"
                              : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/30"
                          }`}
                        >
                          {days} Days
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contingencies Selection */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-sm text-xs font-bold text-on-surface">Due Diligence Contingency</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "waived", label: "Waived" },
                        { id: "7days", label: "7 Days" },
                        { id: "14days", label: "14 Days" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setContingency(item.id)}
                          className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                            contingency === item.id
                              ? "bg-primary text-on-primary border-primary shadow-xs"
                              : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/30"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submitting Entity */}
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-xs font-bold text-on-surface">Submitting Principal</label>
                    <Input
                      readOnly
                      value="Alpha Crest Sovereign Capital AG"
                      className="bg-surface-container text-xs rounded-xl cursor-not-allowed font-semibold text-on-surface"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loiSubmitting}
                    className="w-full mt-2 py-3 h-auto rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <IconSend className="w-4 h-4" />
                    <span>{loiSubmitting ? "Dispatching Enclave LOI..." : "Transmit Formal LOI"}</span>
                  </Button>
                  <span className="text-[10px] text-center text-outline block">
                    Triggers cryptographic DocuSign envelope to registered principal email
                  </span>
                </form>
              )}
            </div>

            {/* MODULE 2: ESCROW & SETTLEMENT CHANNELS */}
            <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <IconBuildingBank className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <h4 className="font-label-md text-xs sm:text-sm font-bold text-on-surface">
                  Authorized Settlement Channels
                </h4>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-xs font-bold text-on-surface">1. Traditional Fedwire / SWIFT</span>
                    <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-mono">
                      USD Wire
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">First American Title Co. • National Commercial Services (Los Angeles HQ)</p>
                  <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold">
                    Escrow Officer: Cheryl Vance, VP Escrow
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-xs font-bold text-on-surface">2. Institutional Digital Custody</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold">
                      USDC / USDT
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">Anchorage Digital Bank (Qualified Custodian Settlement)</p>
                  <span className="text-[11px] text-outline">Instant programmatic closing available</span>
                </div>
              </div>
            </div>

            {/* MODULE 3: ASSIGNED PRIVATE WEALTH DIRECTOR */}
            <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 flex flex-col gap-3">
              <span className="font-caption text-[11px] uppercase tracking-wider text-outline font-bold">
                Assigned Private Wealth Director
              </span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-amber-500 shadow-sm">
                  <img
                    alt="Julian Vance-Moreau"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-sm font-bold text-on-surface truncate">Julian Vance-Moreau</span>
                  <span className="font-caption text-xs text-on-surface-variant truncate">Managing Partner • Ultra-Prime Division</span>
                  <span className="font-caption text-[11px] text-amber-700 dark:text-amber-400 font-mono">DRE #01928411</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="tel:+13105550199"
                  className="flex-1 text-center py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors border border-outline-variant/30"
                >
                  Direct Call
                </a>
                <a
                  href="mailto:julian@estatehub.com"
                  className="flex-1 text-center py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs"
                >
                  Send Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Exhibit Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl p-6 border border-outline-variant/30 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">{previewDoc.title}</h3>
                <p className="text-xs text-on-surface-variant">{previewDoc.source} • {previewDoc.date}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface"
              >
                ✕
              </button>
            </div>

            <div className="p-8 bg-surface-container-low rounded-xl text-center flex flex-col items-center gap-3">
              <IconFileText className="w-12 h-12 text-amber-600" />
              <div>
                <p className="font-bold text-sm text-on-surface">Unredacted Exhibit Watermarked for Session</p>
                <p className="text-xs text-on-surface-variant font-mono mt-1">{previewDoc.sha}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold">
                {previewDoc.badge}
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setPreviewDoc(null)}>
                Close Preview
              </Button>
              <Button size="sm" onClick={() => handleDownload(previewDoc.id)}>
                Download Full {previewDoc.size}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
