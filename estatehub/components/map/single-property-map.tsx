"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { Spinner } from "@/components/ui/spinner"

const SinglePropertyMapInner = dynamic(
  () => import("./single-property-map-inner"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-80 rounded-2xl bg-surface-container-low flex flex-col items-center justify-center p-6 text-center animate-pulse border border-outline-variant/30">
        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center mb-2">
          <Spinner className="size-5 text-primary" />
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
