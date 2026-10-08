"use client"

import * as React from "react"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { PROPERTIES, type PropertyData } from "@/lib/properties-data"
import { PropertiesHeader } from "./properties-header"
import { ActiveFilters } from "./active-filters"
import { FilterPanel } from "./filter-panel"
import { PropertiesList } from "./properties-list"
import { PropertiesMapPanel } from "./properties-map-panel"

import { useSearchParams } from "next/navigation"

export function PropertiesView() {
  const searchParams = useSearchParams()
  const urlType = searchParams.get("type") as "buy" | "rent" | "lease" | null
  const urlLocation = searchParams.get("location")
  const urlPropertyType = searchParams.get("propertyType")
  const urlBeds = searchParams.get("beds")

  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [showMap, setShowMap] = React.useState(true)
  const [filterPanelOpen, setFilterPanelOpen] = React.useState(true)
  const [searchLocation, setSearchLocation] = React.useState(urlLocation || "")
  const [transactionType, setTransactionType] = React.useState<"buy" | "rent" | "lease">(
    urlType === "rent" || urlType === "lease" ? urlType : "buy"
  )
  const [selectedPropertyType, setSelectedPropertyType] = React.useState(urlPropertyType || "all")
  const [minBeds, setMinBeds] = React.useState<number | null>(
    urlBeds ? (Number(urlBeds) ? Number(urlBeds) : null) : null
  )
  const [priceSort, setPriceSort] = React.useState("high-to-low")
  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>([])
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({
    "1": true,
  })
  const [activePin, setActivePin] = React.useState<PropertyData | null>(PROPERTIES[0])

  // Sync if query parameters change
  React.useEffect(() => {
    if (urlType && (urlType === "buy" || urlType === "rent" || urlType === "lease")) {
      setTransactionType(urlType)
    }
    if (urlLocation !== null && urlLocation !== undefined) {
      setSearchLocation(urlLocation)
    }
    if (urlPropertyType) {
      setSelectedPropertyType(urlPropertyType)
    }
    if (urlBeds) {
      const parsed = Number(urlBeds)
      if (!isNaN(parsed)) setMinBeds(parsed)
    }
  }, [urlType, urlLocation, urlPropertyType, urlBeds])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    )
  }

  const clearAllFilters = () => {
    setSelectedPropertyType("all")
    setMinBeds(null)
    setSelectedAmenities([])
    setSearchLocation("")
    setTransactionType("buy")
  }

  const filteredProperties = React.useMemo(() => {
    let list = [...PROPERTIES]

    // Transaction type filtering
    if (transactionType === "rent") {
      list = list.filter((p) => p.transactionType === "rent")
    } else if (transactionType === "lease") {
      list = list.filter((p) => p.transactionType === "lease")
    } else if (transactionType === "buy") {
      list = list.filter((p) => p.transactionType === "buy")
    }

    // Property asset class
    if (selectedPropertyType !== "all") {
      list = list.filter((p) => p.propertyType === selectedPropertyType)
    }

    // Minimum bedrooms
    if (minBeds !== null) {
      list = list.filter((p) => p.beds >= minBeds)
    }

    // Location search
    if (searchLocation.trim()) {
      const q = searchLocation.toLowerCase().trim()
      list = list.filter(
        (p) =>
          p.city.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q)
      )
    }

    // Amenities filter
    if (selectedAmenities.length > 0) {
      list = list.filter((p) => {
        const allAmenities = [
          ...p.interiorAmenities,
          ...p.exteriorAmenities,
          ...p.securityAmenities,
        ].map((a) => a.toLowerCase())
        return selectedAmenities.some((sa) => {
          const lowerSa = sa.toLowerCase()
          return allAmenities.some((am) => am.includes(lowerSa) || lowerSa.includes(am))
        })
      })
    }

    // Sorting
    if (priceSort === "high-to-low") {
      list.sort((a, b) => b.price - a.price)
    } else if (priceSort === "low-to-high") {
      list.sort((a, b) => a.price - b.price)
    } else if (priceSort === "sqft") {
      list.sort((a, b) => b.sqft - a.sqft)
    }

    return list
  }, [transactionType, selectedPropertyType, minBeds, searchLocation, selectedAmenities, priceSort])

  const activeFilterCount =
    selectedAmenities.length +
    (selectedPropertyType !== "all" ? 1 : 0) +
    (minBeds ? 1 : 0) +
    (searchLocation ? 1 : 0) +
    (transactionType !== "buy" ? 1 : 0)

  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Header />

      <main className="flex-1 pt-20">
        <SectionWrapper fullWidth className="bg-surface-container-lowest border-b border-outline-variant/30 shadow-xs" innerClassName="py-6">
          <PropertiesHeader
            filteredCount={filteredProperties.length}
            priceSort={priceSort}
            onPriceSortChange={setPriceSort}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            showMap={showMap}
            onToggleMap={() => setShowMap(!showMap)}
          />
          <ActiveFilters
            transactionType={transactionType}
            selectedPropertyType={selectedPropertyType}
            onClearPropertyType={() => setSelectedPropertyType("all")}
            minBeds={minBeds}
            onClearMinBeds={() => setMinBeds(null)}
            selectedAmenities={selectedAmenities}
            onToggleAmenity={toggleAmenity}
            onClearAll={clearAllFilters}
          />
        </SectionWrapper>

        <SectionWrapper className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className={`${showMap ? "lg:col-span-7 xl:col-span-7" : "lg:col-span-12"} flex flex-col gap-6 w-full`}>
              <FilterPanel
                filterPanelOpen={filterPanelOpen}
                onTogglePanel={() => setFilterPanelOpen(!filterPanelOpen)}
                transactionType={transactionType}
                onTransactionTypeChange={setTransactionType}
                searchLocation={searchLocation}
                onSearchLocationChange={setSearchLocation}
                selectedPropertyType={selectedPropertyType}
                onPropertyTypeChange={setSelectedPropertyType}
                minBeds={minBeds}
                onMinBedsChange={setMinBeds}
                selectedAmenities={selectedAmenities}
                onToggleAmenity={toggleAmenity}
                activeFilterCount={activeFilterCount}
              />
              <PropertiesList
                properties={filteredProperties}
                viewMode={viewMode}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            </div>

            
            {showMap && (
              <PropertiesMapPanel
                properties={filteredProperties}
                activeProperty={activePin}
                onSelectProperty={setActivePin}
              />
            )}
          </div>
        </SectionWrapper>
      </main>

      <Footer />
    </div>
  )
}