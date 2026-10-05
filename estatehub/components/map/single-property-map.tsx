"use client"

import * as React from "react"
import dynamic from "next/dynamic"

const SinglePropertyMapInner = dynamic(
  () => import("./single-property-map-inner"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-80 rounded-2xl bg-surface-container-low flex flex-col items-center justify-center p-6 text-center animate-pulse border border-outline-variant/30">
        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center mb-2">
          <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
        <span className="text-xs font-bold text-on-surface">
          Resolving Satellite Coordinates...
        </span>
        <span className="text-[11px] text-on-surface-variant mt-0.5">
          Loading perimeter telemetry &amp; high-res terrain
        </span>
      </div>
    ),
  }
)

interface SinglePropertyMapProps {
  coordinates: { lat: number; lng: number }
  title: string
  address: string
  city: string
  priceFormatted: string
}

export function SinglePropertyMap(props: SinglePropertyMapProps) {
  return <SinglePropertyMapInner {...props} />
}
