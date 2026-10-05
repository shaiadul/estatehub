"use client"

import { IconBuildingBank } from "@tabler/icons-react"

export function EscrowChannels() {
  const channels = [
    {
      title: "1. Traditional Fedwire / SWIFT",
      badge: "USD Wire",
      badgeClassName:
        "px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-mono",
      description: "First American Title Co. • National Commercial Services (Los Angeles HQ)",
      foot: "Escrow Officer: Cheryl Vance, VP Escrow",
      footClassName: "text-[11px] text-on-secondary-container font-semibold",
    },
    {
      title: "2. Institutional Digital Custody",
      badge: "USDC / USDT",
      badgeClassName:
        "px-2 py-0.5 rounded bg-tertiary/20 text-on-tertiary-container text-[10px] font-mono font-bold",
      description: "Anchorage Digital Bank (Qualified Custodian Settlement)",
      foot: "Instant programmatic closing available",
      footClassName: "text-[11px] text-outline",
    },
  ]
  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <IconBuildingBank className="w-4 h-4 text-on-secondary-container" />
        <h4 className="font-label-md text-xs sm:text-sm font-bold text-on-surface">
          Authorized Settlement Channels
        </h4>
      </div>

      <div className="space-y-2">
        {channels.map((channel) => (
          <div
            key={channel.title}
            className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-outline-variant/20"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-xs font-bold text-on-surface">{channel.title}</span>
              <span className={channel.badgeClassName}>{channel.badge}</span>
            </div>
            <p className="text-[11px] text-on-surface-variant">{channel.description}</p>
            <span className={channel.footClassName}>{channel.foot}</span>
          </div>
        ))}
      </div>
    </div>
  )
}