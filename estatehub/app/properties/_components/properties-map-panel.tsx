"use client"

import { PropertiesMap } from "@/components/map/properties-map"
import type { PropertyData } from "@/lib/properties-data"

interface PropertiesMapPanelProps {
  properties: PropertyData[]
  activeProperty: PropertyData | null
  onSelectProperty: (property: PropertyData) => void
}

export function PropertiesMapPanel({ properties, activeProperty, onSelectProperty }: PropertiesMapPanelProps) {
  return (
    <div className="lg:col-span-5 xl:col-span-5 sticky top-28 h-[calc(100vh-8.5rem)] rounded-2xl overflow-hidden shadow-xl border border-outline-variant/30 bg-surface-container-low flex flex-col">
      <PropertiesMap
        properties={properties}
        activeProperty={activeProperty}
        onSelectProperty={onSelectProperty}
      />
    </div>
  )
}
