"use client"

import Image from "next/image"

export function DirectorCard() {
  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 flex flex-col gap-3">
      <span className="font-caption text-[11px] uppercase tracking-wider text-outline font-bold">
        Assigned Private Wealth Director
      </span>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-secondary shadow-sm">
          <Image
            width={100}
            height={100}
            alt="Julian Vance-Moreau"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-label-md text-sm font-bold text-on-surface truncate">Julian Vance-Moreau</span>
          <span className="font-caption text-xs text-on-surface-variant truncate">Managing Partner • Ultra-Prime Division</span>
          <span className="font-caption text-[11px] text-on-secondary-container font-mono">DRE #01928411</span>
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
  )
}