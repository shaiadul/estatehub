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
import type { VdrProperty } from "./types"
import { formatUSD } from "./vdr-utils"

interface HeroBannerProps {
  property: VdrProperty
  vdrHash: string
  vaultSizeMb: number
  vaultDownloading: boolean
  onRefreshHash: () => void
  onDownloadVault: () => void
}

export function HeroBanner({
  property,
  vdrHash,
  vaultSizeMb,
  vaultDownloading,
  onRefreshHash,
  onDownloadVault,
}: HeroBannerProps) {
  return (
    <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-primary-container text-primary-foreground shadow-xl border border-outline-variant/30">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{ backgroundImage: `url('${property.heroImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/80 to-primary-container/40" />

      <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/15">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
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
              title="Refresh session watermark"
              aria-label="Refresh session watermark"
            >
              <IconRefresh className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2 text-secondary text-xs uppercase font-bold tracking-wider">
              <IconMapPin className="w-4 h-4" />
              <span>
                {property.location} • {property.enclave}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {property.name}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">{property.description}</p>
          </div>

          <div className="lg:text-right flex flex-col lg:items-end">
            <span className="text-xs uppercase text-muted-foreground font-bold tracking-wider">
              Sovereign Offering Valuation
            </span>
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-secondary">
              {formatUSD(property.price)}
            </span>
            <span className="text-xs text-tertiary font-semibold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> Bilateral Escrow Ready • 21-Day
              Close
            </span>
          </div>
        </div>

        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
          {property.specs.map((spec) => (
            <div
              key={spec.label}
              className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-3"
            >
              <dt className="text-[11px] text-muted-foreground block">{spec.label}</dt>
              <dd className={`text-sm font-bold text-primary-foreground${spec.mono ? " font-mono" : ""}`}>
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-primary-foreground/10">
          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={onDownloadVault}
              disabled={vaultDownloading}
              className="bg-secondary hover:bg-secondary-fixed-dim text-on-secondary font-bold text-xs sm:text-sm rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-md"
            >
              <IconFolder className="w-4 h-4" />
              <span>
                {vaultDownloading
                  ? "Encrypting vault..."
                  : `Download Full Vault (.ZIP ${Math.round(vaultSizeMb)} MB)`}
              </span>
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
