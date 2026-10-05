"use client"

import Link from "next/link"
import { IconShieldLock } from "@tabler/icons-react"

export function ClosingStatusRibbon() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-surface-container">
      <nav className="flex items-center gap-2 text-on-surface-variant text-xs flex-wrap font-mono">
        <Link href="/vdr" className="hover:text-on-surface transition-colors">
          Virtual Data Room
        </Link>
        <span>/</span>
        <span className="text-on-surface font-semibold">The Glass Promontory Sanctuary</span>
        <span>/</span>
        <span className="px-2 py-0.5 bg-surface-container-high rounded text-on-surface font-bold">
          PSA-BELAIR-2025-FINAL-098
        </span>
      </nav>

      <div className="flex items-center gap-2 self-start sm:self-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface shadow-xs text-xs font-semibold border border-outline-variant/30">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          Escrow Window: <strong className="font-mono">47h 58m remaining</strong>
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-mono">
          <IconShieldLock className="w-3.5 h-3.5 text-on-tertiary-container" /> Audit #EH-88912-VDR
        </span>
      </div>
    </div>
  )
}
