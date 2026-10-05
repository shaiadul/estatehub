"use client"

import {
  IconBuildingBank,
  IconLock,
  IconShield,
  IconShieldCheck,
  IconPhoneCall,
  IconVideo,
} from "@tabler/icons-react"
import Image from "next/image"

export function RegisterSidebar() {
  const safeguards = [
    {
      Icon: IconLock,
      title: "$10M–$150M Non-Public Inventory",
      desc: "Off-market trophies with high privacy mandates are shielded from public aggregator indexing.",
    },
    {
      Icon: IconBuildingBank,
      title: "Wire Escrow Integration",
      desc: "Real-time synchronization with institutional escrow desks in Switzerland, Luxembourg, and New York.",
    },
    {
      Icon: IconShieldCheck,
      title: "Encrypted LOI Signatures",
      desc: "Quantum-resistant cryptographic signatures protect your entity from unauthorized purchase leaks.",
    },
  ]
  return (
    <aside className="lg:col-span-4 flex flex-col gap-6">
      
      <div className="rounded-2xl overflow-hidden bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col">
        <div className="relative h-44 w-full">
          <Image
            className="object-cover"
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            alt="Ultra-luxury private architectural modern villa overlooking Lake Zurich"
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/30 to-transparent" />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-primary-container/80 backdrop-blur-md text-primary-foreground font-caption text-[11px] font-semibold flex items-center gap-1 border border-outline-variant">
            <IconShieldCheck className="w-3.5 h-3.5 text-tertiary" />
            <span>Private Off-Market Listing</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-primary-foreground">
            <span className="font-caption text-[10px] text-secondary uppercase tracking-wider font-bold">
              Restricted Access Preview
            </span>
            <div className="font-headline-sm text-base font-bold tracking-tight">
              The Zürichsee Sovereign Estate
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between text-on-surface text-xs">
            <span className="text-on-surface-variant">Target Valuation</span>
            <span className="font-bold text-on-surface font-mono">CHF 84,500,000</span>
          </div>
          <div className="flex items-center justify-between text-on-surface text-xs">
            <span className="text-on-surface-variant">Dealroom Capacity</span>
            <span className="font-bold text-on-tertiary-container flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
              3 Qualified Bids Pending
            </span>
          </div>
          <p className="font-caption text-[11px] text-on-surface-variant pt-1 leading-relaxed">
            Complete Steps 1 through 4 to decrypt structural blueprints, tax pass-through memos, and direct ownership deeds.
          </p>
        </div>
      </div>

      
      <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <IconShield className="w-5 h-5 text-on-secondary-container" />
          <h3 className="font-headline-sm text-base text-on-surface font-bold">Institutional Safeguards</h3>
        </div>
        <div className="flex flex-col gap-3.5">
          {safeguards.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center shrink-0 mt-0.5">
                <item.Icon className="w-3.5 h-3.5 text-on-surface" />
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-xs font-bold text-on-surface">{item.title}</span>
                <span className="font-caption text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="p-6 rounded-2xl bg-surface-container-low shadow-xs border border-outline-variant/30 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-caption text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
            Dedicated Syndicate Lead
          </span>
          <span className="px-2 py-0.5 rounded-full bg-tertiary/20 text-on-tertiary-container font-caption text-[10px] font-bold">
            On Call
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm border border-outline-variant/50">
            <Image
              className="object-cover"
            fill
            sizes="48px"
              alt="Julian Vance-Moreau"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="font-label-md text-sm text-on-surface font-bold truncate">Julian Vance-Moreau</h4>
            <span className="font-caption text-xs text-on-surface-variant truncate">Executive Director, UHNW Desk</span>
            <span className="font-caption text-[11px] text-on-surface-variant font-medium">EstateHub Geneva &amp; Zürich</span>
          </div>
        </div>
        <p className="font-caption text-xs text-on-surface-variant leading-relaxed">
          Need bespoke onboarding through legal counsel, power of attorney, or specialized Swiss trust structuring?
        </p>
        <div className="flex flex-col gap-2 pt-1">
          <a
            href="tel:+41228190400"
            className="w-full py-2 px-3 rounded-xl bg-surface-container-lowest hover:bg-surface text-on-surface transition-all font-label-sm text-xs font-semibold flex items-center justify-center gap-2 shadow-xs border border-outline-variant/30"
          >
            <IconPhoneCall className="w-3.5 h-3.5 text-on-tertiary-container" />
            <span>Direct Signal: +41 22 819 0400</span>
          </a>
          <button
            type="button"
            className="w-full py-2 px-3 rounded-xl bg-surface-container-highest hover:bg-surface-container text-on-surface transition-all font-label-sm text-xs font-semibold flex items-center justify-center gap-2"
          >
            <IconVideo className="w-3.5 h-3.5" />
            <span>Book Secure Video Concierge</span>
          </button>
        </div>
      </div>

      
      <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
          <IconShield className="w-5 h-5 text-on-surface" />
        </div>
        <div className="flex flex-col">
          <span className="font-label-md text-xs font-bold text-on-surface">Zero-Knowledge Ledger</span>
          <span className="font-caption text-[11px] text-on-surface-variant">
            Dossier documents are decrypted only by your verified private key.
          </span>
        </div>
      </div>
    </aside>
  )
}