"use client"

import type { PropertyData } from "@/lib/properties-data"
import { PropertyCard } from "./property-card"

interface PropertiesListProps {
  properties: PropertyData[]
  viewMode: "grid" | "list"
  favorites: Record<string, boolean>
  onToggleFavorite: (id: string) => void
}

export function PropertiesList({ properties, viewMode, favorites, onToggleFavorite }: PropertiesListProps) {
  return (
    <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 gap-6" : "grid-cols-1 gap-4"}`}>
      {properties.map((prop) => (
        <PropertyCard
          key={prop.id}
          property={prop}
          viewMode={viewMode}
          isFavorite={!!favorites[prop.id]}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
