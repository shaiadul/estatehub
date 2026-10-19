"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import type { PropertyData } from "@/lib/properties-data"
import { Spinner } from "@/components/ui/spinner"

const PropertiesMapInner = dynamic(
  () => import("./properties-map-inner"),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full h-full min-h-100 bg-surface-container-low rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-pulse border border-outline-variant/30">
        <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center mb-3">
          <Spinner className="size-6 text-primary" />
        </div>
        <span className="text-xs font-bold text-on-surface">
          Initializing Geospatial Cartography...
        </span>
        <span className="text-[11px] text-on-surface-variant mt-1">
          Loading live estate coordinates &amp; perimeter nodes
        </span>
      </div>
    ),
  }
)

interface PropertiesMapProps {
  properties: PropertyData[]
  activeProperty: PropertyData | null
  onSelectProperty: (property: PropertyData) => void
}

export function PropertiesMap(props: PropertiesMapProps) {
  return <PropertiesMapInner {...props} />
}
