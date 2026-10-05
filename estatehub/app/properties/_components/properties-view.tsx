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

export function PropertiesView() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [showMap, setShowMap] = React.useState(true)
  const [filterPanelOpen, setFilterPanelOpen] = React.useState(true)
  const [searchLocation, setSearchLocation] = React.useState("Los Angeles, CA")
  const [transactionType, setTransactionType] = React.useState<"buy" | "rent" | "lease">("buy")
  const [selectedPropertyType, setSelectedPropertyType] = React.useState("all")
  const [minBeds, setMinBeds] = React.useState<number | null>(null)
  const [priceSort, setPriceSort] = React.useState("high-to-low")
  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>([
    "Swimming Pool",
    "Waterfront / Ocean View",
  ])
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({
    "1": true,
  })
  const [activePin, setActivePin] = React.useState<PropertyData | null>(PROPERTIES[0])

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
  }

  // Filter properties
  const filteredProperties = React.useMemo(() => {
    let list = [...PROPERTIES]
    if (selectedPropertyType !== "all") {
      list = list.filter((p) => p.propertyType === selectedPropertyType)
    }
    if (minBeds !== null) {
      list = list.filter((p) => p.beds >= minBeds)
    }
    if (priceSort === "high-to-low") {
      list.sort((a, b) => b.price - a.price)
    } else if (priceSort === "low-to-high") {
      list.sort((a, b) => a.price - b.price)
    } else if (priceSort === "sqft") {
      list.sort((a, b) => b.sqft - a.sqft)
    }
    return list
  }, [selectedPropertyType, minBeds, priceSort])

  const activeFilterCount =
    selectedAmenities.length + (selectedPropertyType !== "all" ? 1 : 0) + (minBeds ? 1 : 0) + 1

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
            {/* Left Column: Filter Panel & Listings */}
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

            {/* Right Column: Interactive Map Panel */}
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
