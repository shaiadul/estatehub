"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  IconHome,
  IconMapPin,
  IconBed,
  IconBath,
  IconRulerMeasure,
  IconHeart,
  IconHeartFilled,
  IconArrowRight,
  IconMap,
  IconLayoutGrid,
  IconList,
  IconAdjustmentsHorizontal,
  IconChevronDown,
  IconX,
  IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
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
import { PROPERTIES, PropertyData } from "@/lib/properties-data"

export default function PropertiesPage() {
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

  const amenitiesList = [
    "Swimming Pool",
    "Waterfront / Ocean View",
    "Private Gate",
    "Elevator",
    "Wine Cellar",
    "Helipad",
    "Yacht Dock",
    "Smart Home",
  ]

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

  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Header />

      <main className="flex-1 pt-20">
        {/* Breadcrumb & Header Section */}
        <section className="w-full bg-surface-container-lowest border-b border-outline-variant/30 shadow-xs">
          <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-12 py-6">
            {/* Breadcrumb Trail */}
            <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-3">
              <Link href="/" className="hover:text-on-surface transition-colors flex items-center gap-1">
                <IconHome size={14} />
                <span>Home</span>
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface font-semibold">Properties</span>
              <span className="text-outline-variant">/</span>
              <span>California</span>
              <span className="text-outline-variant">/</span>
              <span className="text-secondary font-bold">Los Angeles</span>
            </nav>

            {/* Title & Utilities */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
                  Luxury Homes &amp; Estates for Sale in Los Angeles, CA
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm text-on-surface-variant">
                    Showing <strong className="text-on-surface">{filteredProperties.length}</strong> of 1,240 Private Portfolios
                  </span>
                  <Badge variant="secondary" className="text-xs px-2.5 py-0.5">
                    MLS Direct Feed
                  </Badge>
                </div>
              </div>

              {/* View & Sort Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Sort Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-on-surface-variant font-medium hidden sm:inline">Sort:</span>
                  <Select value={priceSort} onValueChange={(val) => { if (typeof val === "string") setPriceSort(val) }}>
                    <SelectTrigger variant="subtle" size="md" className="w-[170px] sm:w-[185px] gap-2">
                      <SelectValue placeholder="Sort price" />
                    </SelectTrigger>
                    <SelectContent align="end">
                      <SelectItem value="high-to-low">Price: High to Low</SelectItem>
                      <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                      <SelectItem value="sqft">Largest Footprint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Grid / List Switcher */}
                <div className="flex items-center bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
                  <Button
                    type="button"
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon-xs"
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid View"
                    className="rounded-lg"
                  >
                    <IconLayoutGrid size={16} />
                  </Button>
                  <Button
                    type="button"
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon-xs"
                    onClick={() => setViewMode("list")}
                    aria-label="List View"
                    className="rounded-lg"
                  >
                    <IconList size={16} />
                  </Button>
                </div>

                {/* Split Map Toggle */}
                <Button
                  type="button"
                  variant={showMap ? "luxury" : "outline"}
                  size="md"
                  onClick={() => setShowMap(!showMap)}
                  className="gap-2 rounded-xl"
                >
                  <IconMap size={17} />
                  <span className="hidden sm:inline">Split Map</span>
                  <span className={`w-2 h-2 rounded-full ${showMap ? "bg-secondary-fixed" : "bg-muted-foreground"}`} />
                </Button>
              </div>
            </div>

            {/* Active Filters Pill Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-outline-variant/20">
              <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold mr-1">Active:</span>
              <Badge variant="secondary" className="gap-1.5 py-1 px-3">
                <span className="capitalize">{transactionType}</span>
              </Badge>
              {selectedPropertyType !== "all" && (
                <Badge variant="secondary" className="gap-1.5 py-1 px-3">
                  <span className="capitalize">{selectedPropertyType}</span>
                  <button type="button" onClick={() => setSelectedPropertyType("all")} className="hover:text-destructive">
                    <IconX size={13} />
                  </button>
                </Badge>
              )}
              {minBeds !== null && (
                <Badge variant="secondary" className="gap-1.5 py-1 px-3">
                  <span>{minBeds}+ Beds</span>
                  <button type="button" onClick={() => setMinBeds(null)} className="hover:text-destructive">
                    <IconX size={13} />
                  </button>
                </Badge>
              )}
              {selectedAmenities.map((amenity) => (
                <Badge key={amenity} variant="secondary" className="gap-1.5 py-1 px-3">
                  <span>{amenity}</span>
                  <button type="button" onClick={() => toggleAmenity(amenity)} className="hover:text-destructive">
                    <IconX size={13} />
                  </button>
                </Badge>
              ))}
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-semibold text-secondary hover:text-on-secondary-fixed transition-colors ml-2 underline underline-offset-4 cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>
        </section>

        {/* Master Viewport (Filters & Listings Left, Interactive Map Right) */}
        <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-12 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Filter Panel & Listings */}
            <div className={`${showMap ? "lg:col-span-7 xl:col-span-7" : "lg:col-span-12"} flex flex-col gap-6 w-full`}>
              {/* Collapsible Refine Portfolio Filters Card */}
              <Card className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 p-5 gap-0">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setFilterPanelOpen(!filterPanelOpen)}
                >
                  <div className="flex items-center gap-3">
                    <IconAdjustmentsHorizontal size={22} className="text-secondary" />
                    <span className="text-base font-bold text-on-surface">Refine Portfolio Filters</span>
                    <Badge variant="gold" className="text-[10px] px-2 py-0">
                      {selectedAmenities.length + (selectedPropertyType !== "all" ? 1 : 0) + (minBeds ? 1 : 0) + 1} Active
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
                    {/* Row 1: Transaction Type & Location Radius */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
                          Transaction Type
                        </label>
                        <div className="grid grid-cols-3 gap-1 bg-surface-container p-1 rounded-xl">
                          <Button
                            type="button"
                            variant={transactionType === "buy" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setTransactionType("buy")}
                            className="rounded-lg text-xs font-semibold"
                          >
                            Buy
                          </Button>
                          <Button
                            type="button"
                            variant={transactionType === "rent" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setTransactionType("rent")}
                            className="rounded-lg text-xs font-semibold"
                          >
                            Rent
                          </Button>
                          <Button
                            type="button"
                            variant={transactionType === "lease" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setTransactionType("lease")}
                            className="rounded-lg text-xs font-semibold"
                          >
                            Lease
                          </Button>
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
                            onChange={(e) => setSearchLocation(e.target.value)}
                            size="md"
                            className="pl-9 pr-16 bg-surface-container border-none text-xs sm:text-sm font-medium focus-visible:ring-0"
                          />
                          <span className="absolute right-2 px-2 py-0.5 rounded-md bg-surface text-on-surface-variant text-[11px] font-bold">
                            +15 mi
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Property Type & Bedrooms */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
                          Property Type
                        </label>
                        <Select
                          value={selectedPropertyType}
                          onValueChange={(val) => { if (typeof val === "string") setSelectedPropertyType(val) }}
                        >
                          <SelectTrigger variant="luxury" size="md">
                            <SelectValue placeholder="All Asset Classes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Asset Classes</SelectItem>
                            <SelectItem value="villa">Luxury Villa</SelectItem>
                            <SelectItem value="penthouse">Modern Penthouse</SelectItem>
                            <SelectItem value="waterfront">Waterfront Estate</SelectItem>
                            <SelectItem value="chalet">Ski Chalet</SelectItem>
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
                              onClick={() => setMinBeds(bed)}
                              className="rounded-lg text-xs font-semibold"
                            >
                              {bed === null ? "Any" : `${bed}+`}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Luxury Amenities Checkboxes */}
                    <div>
                      <label className="text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
                        Luxury Amenities &amp; Features
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                        {amenitiesList.map((amenity) => {
                          const checked = selectedAmenities.includes(amenity)
                          return (
                            <label
                              key={amenity}
                              className="flex items-center gap-2 text-xs font-medium text-on-surface cursor-pointer select-none"
                            >
                              <Checkbox
                                checked={checked}
                                onCheckedChange={() => toggleAmenity(amenity)}
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

              {/* Property Listings Output */}
              <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 gap-6" : "grid-cols-1 gap-4"}`}>
                {filteredProperties.map((prop) => {
                  const isFav = !!favorites[prop.id]
                  return (
                    <Card
                      key={prop.id}
                      className={`bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/30 overflow-hidden group p-0 ${
                        viewMode === "list" ? "flex flex-col sm:flex-row" : "flex flex-col"
                      }`}
                    >
                      {/* Image Preview */}
                      <Link
                        href={`/properties/${prop.slug}`}
                        className={`relative block overflow-hidden bg-surface-container ${
                          viewMode === "list" ? "sm:w-72 aspect-16/10 sm:aspect-auto shrink-0" : "w-full aspect-16/10"
                        }`}
                      >
                        <Image
                          src={prop.heroImage}
                          alt={prop.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-primary-container/85 via-transparent to-transparent" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <Badge variant="verified" className="text-[11px] px-2.5 py-0.5 font-semibold gap-1">
                            <IconRosetteDiscountCheckFilled size={12} className="text-secondary-fixed shrink-0" />
                            <span>Title Verified</span>
                          </Badge>
                          <Badge variant="gold" className="text-[11px] px-2 py-0 font-bold">
                            {prop.badge}
                          </Badge>
                        </div>

                        {/* Favorite button */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Save Property"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleFavorite(prop.id)
                          }}
                          className="absolute top-3 right-3 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm"
                        >
                          {isFav ? (
                            <IconHeartFilled size={15} className="text-destructive" />
                          ) : (
                            <IconHeart size={15} />
                          )}
                        </Button>

                        {/* Price Tag over image */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                          <div>
                            <span className="text-[10px] text-surface-container-high uppercase tracking-wider block font-medium">
                              {prop.city}, {prop.state}
                            </span>
                            <h3 className="text-base font-bold text-surface leading-tight mt-0.5">
                              {prop.title}
                            </h3>
                          </div>
                          <span className="text-lg font-bold text-secondary-fixed">
                            {prop.priceFormatted}
                          </span>
                        </div>
                      </Link>

                      {/* Content */}
                      <CardContent className="p-4 flex flex-col justify-between flex-1 gap-4">
                        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                          {prop.description}
                        </p>

                        {/* Specs Row */}
                        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-surface-container-low text-center border border-outline-variant/20">
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-bold text-on-surface flex items-center gap-1">
                              <IconBed size={14} className="text-secondary" />
                              {prop.beds}
                            </span>
                            <span className="text-[10px] text-on-surface-variant">Beds</span>
                          </div>
                          <div className="flex flex-col items-center border-x border-outline-variant/30">
                            <span className="text-xs font-bold text-on-surface flex items-center gap-1">
                              <IconBath size={14} className="text-secondary" />
                              {prop.baths}
                            </span>
                            <span className="text-[10px] text-on-surface-variant">Baths</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-bold text-on-surface flex items-center gap-1">
                              <IconRulerMeasure size={14} className="text-secondary" />
                              {prop.sqftFormatted}
                            </span>
                            <span className="text-[10px] text-on-surface-variant">Sq Ft</span>
                          </div>
                        </div>

                        {/* Footer action */}
                        <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                          <div>
                            <span className="text-[10px] text-on-surface-variant block">Est. Mortgage</span>
                            <span className="text-xs font-bold text-on-surface">{prop.estMortgage}</span>
                          </div>
                          <Button
                            variant="luxury"
                            size="sm"
                            className="rounded-xl gap-1"
                            render={<Link href={`/properties/${prop.slug}`} />}
                          >
                            <span>Explore Details</span>
                            <IconArrowRight size={14} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Right Column: Interactive Map Panel */}
            {showMap && (
              <div className="lg:col-span-5 xl:col-span-5 sticky top-28 h-[calc(100vh-8.5rem)] rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30 bg-surface-container-low flex flex-col">
                {/* Simulated High-Res Map Viewport */}
                <div className="relative w-full flex-1 bg-cover bg-center overflow-hidden"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop')",
                  }}
                >
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-[0.5px]" />

                  {/* Top Map Controls */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface/90 backdrop-blur-md text-xs font-bold text-on-surface shadow-md">
                      <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping" />
                      <span>Bel Air &amp; Beverly Hills Cluster</span>
                    </div>

                    <div className="flex items-center gap-1 bg-surface/90 backdrop-blur-md p-1 rounded-xl shadow-md">
                      <Button variant="ghost" size="xs" className="font-bold text-[11px] rounded-lg">
                        Satellite
                      </Button>
                      <Button variant="default" size="xs" className="font-bold text-[11px] rounded-lg">
                        Street
                      </Button>
                    </div>
                  </div>

                  {/* Interactive Property Map Pins */}
                  {filteredProperties.map((prop, idx) => {
                    const isSelected = activePin?.id === prop.id
                    // distribute pins visually across the container
                    const positions = [
                      { top: "35%", left: "45%" },
                      { top: "55%", left: "60%" },
                      { top: "25%", left: "70%" },
                      { top: "65%", left: "30%" },
                      { top: "40%", left: "20%" },
                      { top: "75%", left: "65%" },
                    ]
                    const pos = positions[idx % positions.length]
                    return (
                      <button
                        key={prop.id}
                        type="button"
                        onClick={() => setActivePin(prop)}
                        style={{ top: pos.top, left: pos.left }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 cursor-pointer ${
                          isSelected
                            ? "scale-110 z-30"
                            : "hover:scale-105 opacity-95"
                        }`}
                      >
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 ${
                            isSelected
                              ? "bg-secondary text-primary ring-2 ring-white"
                              : "bg-primary text-on-primary border border-white/20"
                          }`}
                        >
                          <IconMapPin size={13} />
                          <span>{prop.priceFormatted}</span>
                        </div>
                      </button>
                    )
                  })}

                  {/* Selected Map Card Overlay */}
                  {activePin && (
                    <div className="absolute bottom-4 left-4 right-4 z-30">
                      <Card className="bg-surface-container-lowest/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-outline-variant/30 p-3 flex flex-row items-center gap-4">
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                          <Image
                            src={activePin.heroImage}
                            alt={activePin.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0 pr-2">
                          <Badge variant="gold" className="text-[10px] w-fit mb-1 py-0">
                            {activePin.badge}
                          </Badge>
                          <h4 className="text-sm font-bold text-on-surface truncate">
                            {activePin.title}
                          </h4>
                          <span className="text-xs text-secondary font-bold">
                            {activePin.priceFormatted}
                          </span>
                          <span className="text-[11px] text-on-surface-variant truncate mt-0.5">
                            {activePin.beds} Beds • {activePin.baths} Baths • {activePin.sqftFormatted} Sq Ft
                          </span>
                        </div>
                        <Button
                          variant="luxury"
                          size="sm"
                          className="rounded-xl shrink-0"
                          render={<Link href={`/properties/${activePin.slug}`} />}
                        >
                          View
                        </Button>
                      </Card>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
