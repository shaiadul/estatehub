"use client"

import Link from "next/link"
import {
  IconFolder,
  IconPhoneCall,
  IconRefresh,
  IconMapPin,
  IconShieldCheck,
  IconReceipt2,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

interface HeroBannerProps {
  vdrHash: string
  onRefreshHash: () => void
}

export function HeroBanner({ vdrHash, onRefreshHash }: HeroBannerProps) {
  const specs = [
    { label: "Interior Living", value: "12,400 sq ft", mono: true },
    { label: "Private Lot", value: "1.82 Acres", mono: true },
    { label: "Bedrooms / Baths", value: "6 Beds • 9 Baths", mono: false },
    { label: "Year Completed", value: "2024 New Build", mono: false },
    { label: "Automotive Gallery", value: "8 Vehicles (EV)", mono: false },
    { label: "Energy Autonomy", value: "Tesla 4x Powerwall", mono: false },
  ]
  return (
    <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-primary-container text-primary-foreground shadow-xl border border-outline-variant/30">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-primary-container via-primary-container/80 to-primary-container/40" />

      <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/15">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="font-caption text-xs uppercase tracking-wider text-muted-foreground font-bold">
              Level 4 Sovereign Diligence • Unredacted Access Active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">Watermark:</span>
            <code className="px-2 py-0.5 rounded bg-primary-container text-secondary font-mono text-xs border border-outline-variant">
              {vdrHash}
            </code>
            <button
              type="button"
              onClick={onRefreshHash}
              className="p-1 rounded bg-primary-foreground/10 hover:bg-primary-foreground/20 text-muted-foreground transition-colors"
              title="Refresh Hash"
            >
              <IconRefresh className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2 text-secondary font-caption text-xs uppercase font-bold tracking-wider">
              <IconMapPin className="w-4 h-4" />
              <span>Bel Air, Los Angeles, CA • Promontory Enclave</span>
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              The Glass Promontory Sanctuary
            </h1>
            <p className="font-body-sm text-xs sm:text-sm text-muted-foreground">
              Private single-family trophy compound perched on a monolithic private ridge with 270° panoramic ocean and city lights skyline views.
            </p>
          </div>

          <div className="lg:text-right flex flex-col lg:items-end">
            <span className="font-caption text-xs uppercase text-muted-foreground font-bold tracking-wider">
              Sovereign Offering Valuation
            </span>
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-secondary">$9,850,000</span>
            <span className="text-xs text-tertiary font-semibold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> Bilateral Escrow Ready • 21-Day Close
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
          {specs.map((spec) => (
            <div key={spec.label} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-3">
              <span className="text-[11px] text-muted-foreground block">{spec.label}</span>
              <span className={`text-sm font-bold text-primary-foreground${spec.mono ? " font-mono" : ""}`}>{spec.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-primary-foreground/10">
          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={() => alert("Downloading full encrypted vault archive (412 MB)...")}
              className="bg-secondary hover:bg-secondary-fixed-dim text-on-secondary font-bold text-xs sm:text-sm rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-md"
            >
              <IconFolder className="w-4 h-4" />
              <span>Download Full Vault (.ZIP 412 MB)</span>
            </Button>
            <Link href="/closing">
              <Button
                variant="outline"
                className="border-primary-foreground/20 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground font-semibold text-xs sm:text-sm rounded-xl px-4 py-2.5 flex items-center gap-2"
              >
                <IconReceipt2 className="w-4 h-4 text-tertiary" />
                <span>Enter Digital Closing Room</span>
              </Button>
            </Link>
            <a
              href="tel:+13105550199"
              className="px-3.5 py-2 rounded-xl bg-primary-foreground/5 hover:bg-primary-foreground/10 text-muted-foreground font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors border border-primary-foreground/10"
            >
              <IconPhoneCall className="w-4 h-4 text-secondary" />
              <span>Advisor Hotline</span>
            </a>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <IconShieldCheck className="w-4 h-4 text-tertiary" />
            <span>Encrypted with SHA-256 Ledger Verification</span>
          </div>
        </div>
      </div>
    </div>
  )
}