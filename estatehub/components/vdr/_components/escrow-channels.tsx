"use client"

import { IconBuildingBank } from "@tabler/icons-react"
import { ESCROW_CHANNELS } from "./vdr-data"

export function EscrowChannels() {
  return (
    <section
      aria-label="Settlement channels"
      className="w-full bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2">
        <IconBuildingBank className="w-4 h-4 text-on-secondary-container" />
        <h4 className="text-xs sm:text-sm font-bold text-on-surface">
          Authorized Settlement Channels
        </h4>
      </div>

      <div className="space-y-2">
        {ESCROW_CHANNELS.map((channel) => (
          <div
            key={channel.title}
            className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-outline-variant/20"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-on-surface">{channel.title}</span>
              <span className={channel.badgeClassName}>{channel.badge}</span>
            </div>
            <p className="text-[11px] text-on-surface-variant">{channel.description}</p>
            <span className={channel.footClassName}>{channel.foot}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
