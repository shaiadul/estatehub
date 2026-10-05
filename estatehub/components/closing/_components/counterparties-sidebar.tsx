"use client"

import Link from "next/link"

export function CounterpartiesSidebar() {
  const counterparties = [
    {
      key: "buyer",
      role: "Buyer Principal",
      name: "Alpha Crest Sovereign Capital AG",
      badge: "Accredited",
    },
    {
      key: "seller",
      role: "Seller Estate",
      name: "Bel Air Ridge Promontory Trust",
      badge: "Title Verified",
    },
  ]

  return (
    <div className="lg:col-span-4 flex flex-col gap-6">
      <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-4">
        <span className="font-caption text-xs uppercase tracking-wider text-outline font-bold">
          Bilateral Counterparties
        </span>
        <div className="space-y-3 text-xs">
          {counterparties.map(({ key, role, name, badge }) => (
            <div key={key} className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-on-surface-variant block font-bold uppercase">{role}</span>
                <span className="font-bold text-on-surface">{name}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-on-tertiary-container text-[10px] font-bold">
                {badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-surface-container-low shadow-xs border border-outline-variant/30 flex flex-col gap-3">
        <span className="font-caption text-xs uppercase tracking-wider text-on-surface-variant font-bold">
          Escrow Support Concierge
        </span>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Direct encrypted line to Escrow Officer Cheryl Vance and Lead Broker Julian Vance-Moreau.
        </p>
        <div className="flex flex-col gap-2 pt-1">
          <a
            href="tel:+13105550199"
            className="w-full text-center py-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface text-on-surface font-semibold text-xs transition-colors border border-outline-variant/30 shadow-xs"
          >
            Call Escrow Officer: (310) 555-0199
          </a>
          <Link
            href="/vdr"
            className="w-full text-center py-2.5 rounded-xl bg-surface-container-highest hover:bg-surface-container text-on-surface font-semibold text-xs transition-colors"
          >
            Return to Virtual Data Room
          </Link>
        </div>
      </div>
    </div>
  )
}
