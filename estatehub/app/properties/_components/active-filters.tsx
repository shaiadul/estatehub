"use client"

import { IconX } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"

interface ActiveFiltersProps {
  transactionType: "buy" | "rent" | "lease"
  selectedPropertyType: string
  onClearPropertyType: () => void
  minBeds: number | null
  onClearMinBeds: () => void
  selectedAmenities: string[]
  onToggleAmenity: (amenity: string) => void
  onClearAll: () => void
}

export function ActiveFilters({
  transactionType,
  selectedPropertyType,
  onClearPropertyType,
  minBeds,
  onClearMinBeds,
  selectedAmenities,
  onToggleAmenity,
  onClearAll,
}: ActiveFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-outline-variant/20">
      <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold mr-1">Active:</span>
      <Badge variant="secondary" className="gap-1.5 py-1 px-3">
        <span className="capitalize">{transactionType}</span>
      </Badge>
      {selectedPropertyType !== "all" && (
        <Badge variant="secondary" className="gap-1.5 py-1 px-3">
          <span className="capitalize">{selectedPropertyType}</span>
          <button type="button" onClick={onClearPropertyType} className="hover:text-destructive">
            <IconX size={13} />
          </button>
        </Badge>
      )}
      {minBeds !== null && (
        <Badge variant="secondary" className="gap-1.5 py-1 px-3">
          <span>{minBeds}+ Beds</span>
          <button type="button" onClick={onClearMinBeds} className="hover:text-destructive">
            <IconX size={13} />
          </button>
        </Badge>
      )}
      {selectedAmenities.map((amenity) => (
        <Badge key={amenity} variant="secondary" className="gap-1.5 py-1 px-3">
          <span>{amenity}</span>
          <button type="button" onClick={() => onToggleAmenity(amenity)} className="hover:text-destructive">
            <IconX size={13} />
          </button>
        </Badge>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs font-semibold text-secondary hover:text-on-secondary-fixed transition-colors ml-2 underline underline-offset-4 cursor-pointer"
      >
        Clear All
      </button>
    </div>
  )
}
