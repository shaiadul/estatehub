"use client"

import Image from "next/image"
import { DIRECTOR } from "./vdr-data"
import type { VdrDirector } from "./types"

export function DirectorCard({ director = DIRECTOR }: { director?: VdrDirector }) {
  return (
    <section
      aria-label="Wealth director"
      className="w-full bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 flex flex-col gap-3"
    >
      <span className="text-[11px] uppercase tracking-wider text-outline font-bold">
        Assigned Private Wealth Director
      </span>
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-secondary shadow-sm">
          <Image
            alt={director.name}
            src={director.image}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-on-surface truncate">{director.name}</span>
          <span className="text-xs text-on-surface-variant truncate">{director.title}</span>
          <span className="text-[11px] text-on-secondary-container font-mono">
            {director.license}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <a
          href={director.phoneHref}
          className="flex-1 text-center py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors border border-outline-variant/30"
        >
          Direct Call
        </a>
        <a
          href={director.emailHref}
          className="flex-1 text-center py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs"
        >
          Send Inquiry
        </a>
      </div>
    </section>
  )
}
