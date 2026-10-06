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
import { useI18n } from "@/lib/i18n"

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
  { id: "Swimming Pool", labelKey: "amenity.swimmingPool", label: "Swimming Pool" },
  { id: "Waterfront / Ocean View", labelKey: "amenity.waterfront", label: "Waterfront / Ocean View" },
  { id: "Private Gate", labelKey: "amenity.privateGate", label: "Private Gate" },
  { id: "Elevator", labelKey: "amenity.elevator", label: "Elevator" },
  { id: "Wine Cellar", labelKey: "amenity.wineCellar", label: "Wine Cellar" },
  { id: "Helipad", labelKey: "amenity.helipad", label: "Helipad" },
  { id: "Yacht Dock", labelKey: "amenity.yachtDock", label: "Yacht Dock" },
  { id: "Smart Home", labelKey: "amenity.smartHome", label: "Smart Home" },
]

const TRANSACTION_TYPES = [
  { id: "buy", labelKey: "filter.buy", label: "Buy" },
  { id: "rent", labelKey: "filter.rent", label: "Rent" },
  { id: "lease", labelKey: "filter.lease", label: "Lease" },
] as const

const PROPERTY_TYPE_OPTIONS = [
  { value: "all", labelKey: "select.allAssetClasses", label: "All Asset Classes" },
  { value: "villa", labelKey: "select.luxuryVilla", label: "Luxury Villa" },
  { value: "penthouse", labelKey: "select.modernPenthouse", label: "Modern Penthouse" },
  { value: "waterfront", labelKey: "select.waterfrontEstate", label: "Waterfront Estate" },
  { value: "chalet", labelKey: "select.skiChalet", label: "Ski Chalet" },
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
  const { t } = useI18n()

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
          <span className="text-base font-bold text-on-surface">
            {t("properties.refineFilters", "Refine Portfolio Filters")}
          </span>
          <Badge variant="gold" className="text-[10px] px-2 py-0">
            {activeFilterCount} {t("properties.active", "Active")}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
          <span>
            {filterPanelOpen
              ? t("properties.collapse", "Collapse")
              : t("properties.expand", "Expand")}
          </span>
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
                {t("filter.transactionType", "Transaction Type")}
              </label>
              <div className="grid grid-cols-3 gap-1 bg-surface-container p-1 rounded-xl">
                {TRANSACTION_TYPES.map((item) => (
                  <Button
                    key={item.id}
                    type="button"
                    variant={transactionType === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => (item.id === "rent" ? handleRentClick() : onTransactionTypeChange(item.id))}
                    className="rounded-lg text-xs font-semibold"
                  >
                    {t(item.labelKey, item.label)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
                {t("filter.locationRadius", "Location & Radius")}
              </label>
              <div className="relative flex items-center">
                <IconMapPin size={18} className="absolute left-3 text-on-surface-variant pointer-events-none" />
                <Input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => onSearchLocationChange(e.target.value)}
                  placeholder={t("filter.locationPlaceholder", "Search city, state, enclave...")}
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
                {t("filter.propertyType", "Property Type")}
              </label>
              <Select
                value={selectedPropertyType}
                onValueChange={(val) => { if (typeof val === "string") onPropertyTypeChange(val) }}
              >
                <SelectTrigger variant="luxury" size="md">
                  <SelectValue placeholder={t("select.allAssetClasses", "All Asset Classes")} />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {t(opt.labelKey, opt.label)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
                {t("filter.bedrooms", "Bedrooms")}
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
                    {bed === null ? t("filter.any", "Any") : `${bed}+`}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          
          <div>
            <label className="text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
              {t("filter.luxuryAmenities", "Luxury Amenities & Features")}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {AMENITIES_LIST.map((amenity) => {
                const checked = selectedAmenities.includes(amenity.id)
                return (
                  <label
                    key={amenity.id}
                    className="flex items-center gap-2 text-xs font-medium text-on-surface cursor-pointer select-none"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => onToggleAmenity(amenity.id)}
                    />
                    <span>{t(amenity.labelKey, amenity.label)}</span>
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