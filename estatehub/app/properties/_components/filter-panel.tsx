"use client"

import { useRouter } from "next/navigation"
import { IconAdjustmentsHorizontal, IconChevronDown, IconMapPin } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"

interface FilterPanelProps {
  filterPanelOpen: boolean
  onTogglePanel: () => void
  transactionType: "buy" | "rent" | "lease"
  onTransactionTypeChange: (type: "buy" | "rent" | "lease") => void
  searchLocation: string
  onSearchLocationChange: (value: string) => void
  selectedPropertyType: string
  onPropertyTypeChange: (value: string) => void
  minBeds: number | null
  onMinBedsChange: (value: number | null) => void
  selectedAmenities: string[]
  onToggleAmenity: (amenity: string) => void
  activeFilterCount: number
}

const AMENITIES_LIST = [
  "Swimming Pool",
  "Waterfront / Ocean View",
  "Private Gate",
  "Elevator",
  "Wine Cellar",
  "Helipad",
  "Yacht Dock",
  "Smart Home",
]

const TRANSACTION_TYPES = [
  { id: "buy", label: "Buy" },
  { id: "rent", label: "Rent" },
  { id: "lease", label: "Lease" },
] as const

const PROPERTY_TYPE_OPTIONS = [
  { value: "all", label: "All Asset Classes" },
  { value: "villa", label: "Luxury Villa" },
  { value: "penthouse", label: "Modern Penthouse" },
  { value: "waterfront", label: "Waterfront Estate" },
  { value: "chalet", label: "Ski Chalet" },
]

export function FilterPanel({
  filterPanelOpen,
  onTogglePanel,
  transactionType,
  onTransactionTypeChange,
  searchLocation,
  onSearchLocationChange,
  selectedPropertyType,
  onPropertyTypeChange,
  minBeds,
  onMinBedsChange,
  selectedAmenities,
  onToggleAmenity,
  activeFilterCount,
}: FilterPanelProps) {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  const handleRentClick = () => {
    if (!isLoggedIn) {
      router.push("/login?role=buyer&redirect=/properties?type=rent")
    } else {
      onTransactionTypeChange("rent")
    }
  }

  return (
    <Card className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 p-5 gap-0">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={onTogglePanel}
      >
        <div className="flex items-center gap-3">
          <IconAdjustmentsHorizontal size={22} className="text-secondary" />
          <span className="text-base font-bold text-on-surface">Refine Portfolio Filters</span>
          <Badge variant="gold" className="text-[10px] px-2 py-0">
            {activeFilterCount} Active
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
          <span>{filterPanelOpen ? "Collapse" : "Expand"}</span>
          <IconChevronDown
            size={18}
            className={`transition-transform duration-200 ${filterPanelOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {filterPanelOpen && (
        <CardContent className="p-0 pt-5 mt-5 border-t border-outline-variant/20 flex flex-col gap-5">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
                Transaction Type
              </label>
              <div className="grid grid-cols-3 gap-1 bg-surface-container p-1 rounded-xl">
                {TRANSACTION_TYPES.map((t) => (
                  <Button
                    key={t.id}
                    type="button"
                    variant={transactionType === t.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => (t.id === "rent" ? handleRentClick() : onTransactionTypeChange(t.id))}
                    className="rounded-lg text-xs font-semibold"
                  >
                    {t.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
                Location &amp; Radius
              </label>
              <div className="relative flex items-center">
                <IconMapPin size={18} className="absolute left-3 text-on-surface-variant pointer-events-none" />
                <Input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => onSearchLocationChange(e.target.value)}
                  size="md"
                  className="pl-9 pr-16 bg-surface-container border-none text-xs sm:text-sm font-medium focus-visible:ring-0"
                />
                <span className="absolute right-2 px-2 py-0.5 rounded-md bg-surface text-on-surface-variant text-[11px] font-bold">
                  +15 mi
                </span>
              </div>
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
                Property Type
              </label>
              <Select
                value={selectedPropertyType}
                onValueChange={(val) => { if (typeof val === "string") onPropertyTypeChange(val) }}
              >
                <SelectTrigger variant="luxury" size="md">
                  <SelectValue placeholder="All Asset Classes" />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
                Bedrooms
              </label>
              <div className="grid grid-cols-5 gap-1 bg-surface-container p-1 rounded-xl">
                {[null, 2, 3, 4, 5].map((bed) => (
                  <Button
                    key={bed === null ? "any" : bed}
                    type="button"
                    variant={minBeds === bed ? "default" : "ghost"}
                    size="xs"
                    onClick={() => onMinBedsChange(bed)}
                    className="rounded-lg text-xs font-semibold"
                  >
                    {bed === null ? "Any" : `${bed}+`}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          
          <div>
            <label className="text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
              Luxury Amenities &amp; Features
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {AMENITIES_LIST.map((amenity) => {
                const checked = selectedAmenities.includes(amenity)
                return (
                  <label
                    key={amenity}
                    className="flex items-center gap-2 text-xs font-medium text-on-surface cursor-pointer select-none"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => onToggleAmenity(amenity)}
                    />
                    <span>{amenity}</span>
                  </label>
                )
              })}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}