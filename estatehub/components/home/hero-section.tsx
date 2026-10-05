"use client"

import * as React from "react"
import {
  IconRosetteDiscountCheckFilled,
  IconMapPin,
  IconHome,
  IconCurrencyDollar,
  IconBed,
  IconArrowRight,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export function HeroSection() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const [activeMode, setActiveMode] = React.useState<"buy" | "rent" | "commercial">("buy")
  const [location, setLocation] = React.useState("Bel Air, CA")
  const [propertyType, setPropertyType] = React.useState("villa")
  const [priceRange, setPriceRange] = React.useState("5-10")
  const [bedrooms, setBedrooms] = React.useState("3")
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])

  const trendingTags = [
    "Oceanfront",
    "New Construction",
    "Equestrian",
    "Private Gate",
    "Skyline Views",
  ]

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <section className="relative w-full overflow-hidden bg-primary-container pt-32 pb-20 lg:pt-36 lg:pb-28">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transform pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-container/85 via-primary-container/70 to-surface pointer-events-none" />

      <div className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-secondary-fixed/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-surface-container-highest/15 blur-3xl pointer-events-none" />

      <SectionWrapper as="div" className="relative z-10 flex flex-col items-center text-center">

      <Badge
        variant="verified"
        className="text-xs font-semibold tracking-wider uppercase px-4 py-1.5 h-auto mb-6 gap-2"
      >
        <IconRosetteDiscountCheckFilled size={18} className="text-secondary-fixed shrink-0" />
        <span>Premier Luxury Real Estate Syndicate</span>
      </Badge>

      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-surface max-w-4xl tracking-tight mb-4 drop-shadow-sm leading-tight">
        Exceptional Properties for{" "}
        <span className="text-secondary-fixed underline decoration-secondary-fixed/40 underline-offset-8">
          Discerning Lifestyles
        </span>
      </h1>

      <p className="text-sm sm:text-base lg:text-lg text-surface-container-high max-w-2xl font-light mb-8 lg:mb-10">
        Discover private estates, architectural residences, and luxury penthouses curated
        by premier certified brokers across North America.
      </p>

      <div className="w-full max-w-5xl bg-surface-container-lowest rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 text-left border border-outline-variant/30">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-5 border-b border-outline-variant/20">
            <div className="inline-flex p-1 bg-surface-container-low rounded-xl gap-1">
              <Button
                type="button"
                variant={activeMode === "buy" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveMode("buy")}
                className={`rounded-lg px-4 text-xs sm:text-sm font-semibold transition-all ${
                  activeMode === "buy"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Buy
              </Button>
              <Button
                type="button"
                variant={activeMode === "rent" ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  if (!isLoggedIn) {
                    router.push("/login?role=buyer&redirect=/properties?type=rent")
                  } else {
                    setActiveMode("rent")
                  }
                }}
                className={`rounded-lg px-4 text-xs sm:text-sm font-semibold transition-all ${
                  activeMode === "rent"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Rent
              </Button>
              <Button
                type="button"
                variant={activeMode === "commercial" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveMode("commercial")}
                className={`rounded-lg px-4 text-xs sm:text-sm font-semibold transition-all ${
                  activeMode === "commercial"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Commercial Holdings
              </Button>
            </div>

            <div className="flex items-center gap-2 text-on-surface-variant text-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-medium">Live MLS &amp; Off-Market Access</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
            <div className="flex flex-col gap-1.5 bg-surface-container-low/70 rounded-xl p-3 hover:bg-surface-container-low transition-colors border border-outline-variant/20">
              <label className="text-xs font-semibold text-on-surface-variant flex items-center gap-1.5">
                <IconMapPin size={16} className="text-secondary shrink-0" />
                Location
              </label>
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bel Air, CA"
                className="h-7 border-none bg-transparent p-0 text-sm text-on-surface font-medium placeholder:text-outline focus-visible:ring-0 shadow-none"
              />
            </div>

            <div className="flex flex-col gap-1.5 bg-surface-container-low/70 rounded-xl p-3 hover:bg-surface-container-low transition-colors border border-outline-variant/20">
              <label className="text-xs font-semibold text-on-surface-variant flex items-center gap-1.5">
                <IconHome size={16} className="text-secondary shrink-0" />
                Property Type
              </label>
              <Select
                value={propertyType}
                onValueChange={(val) => {
                  if (typeof val === "string") setPropertyType(val)
                }}
              >
                <SelectTrigger variant="borderless">
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

            {/* Price Spectrum using reusable Select */}
            <div className="flex flex-col gap-1.5 bg-surface-container-low/70 rounded-xl p-3 hover:bg-surface-container-low transition-colors border border-outline-variant/20">
              <label className="text-xs font-semibold text-on-surface-variant flex items-center gap-1.5">
                <IconCurrencyDollar size={16} className="text-secondary shrink-0" />
                Price Spectrum
              </label>
              <Select
                value={priceRange}
                onValueChange={(val) => {
                  if (typeof val === "string") setPriceRange(val)
                }}
              >
                <SelectTrigger variant="borderless">
                  <SelectValue placeholder="Select price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Price</SelectItem>
                  <SelectItem value="1-5">$1.5M - $5.0M</SelectItem>
                  <SelectItem value="5-10">$5.0M - $10.0M+</SelectItem>
                  <SelectItem value="10plus">$10.0M - $35.0M+</SelectItem>
                  <SelectItem value="trophy">$50M+ Trophy Asset</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bedrooms using reusable Select */}
            <div className="flex flex-col gap-1.5 bg-surface-container-low/70 rounded-xl p-3 hover:bg-surface-container-low transition-colors border border-outline-variant/20">
              <label className="text-xs font-semibold text-on-surface-variant flex items-center gap-1.5">
                <IconBed size={16} className="text-secondary shrink-0" />
                Bedrooms
              </label>
              <Select
                value={bedrooms}
                onValueChange={(val) => {
                  if (typeof val === "string") setBedrooms(val)
                }}
              >
                <SelectTrigger variant="borderless">
                  <SelectValue placeholder="Select bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Studio to 2+ Beds</SelectItem>
                  <SelectItem value="3">3+ Bedrooms</SelectItem>
                  <SelectItem value="5">5+ Bedrooms</SelectItem>
                  <SelectItem value="estate">Private Compound (8+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Tags & Search CTA Row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-4 mt-2">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-xs text-on-surface-variant font-medium">Trending:</span>
              {trendingTags.map((tag) => {
                const isSelected = selectedTags.includes(tag)
                return (
                  <Button
                    key={tag}
                    type="button"
                    variant={isSelected ? "gold" : "outline"}
                    size="xs"
                    onClick={() => toggleTag(tag)}
                    className="rounded-full text-xs"
                  >
                    {tag}
                  </Button>
                )
              })}
            </div>

            <Button
              type="button"
              variant="luxury"
              size="hero"
              onClick={() => {
                if (activeMode === "rent") {
                  if (!isLoggedIn) {
                    router.push("/login?role=buyer&redirect=/properties?type=rent")
                  } else {
                    router.push("/properties?type=rent")
                  }
                } else {
                  router.push("/properties")
                }
              }}
              className="gap-2 group shadow-md"
            >
              <span>Search Available Estates</span>
              <span className="w-2 h-2 rounded-full bg-secondary-fixed group-hover:scale-125 transition-transform" />
              <IconArrowRight size={18} />
            </Button>
          </div>
        </div>

        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-10">
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-sm border border-outline-variant/30">
            <span className="text-2xl lg:text-3xl font-bold text-secondary">$6.2B+</span>
            <span className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider mt-1">
              Volume Closed
            </span>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-sm border border-outline-variant/30">
            <span className="text-2xl lg:text-3xl font-bold text-secondary">99.6%</span>
            <span className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider mt-1">
              Title Verified
            </span>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-sm border border-outline-variant/30">
            <span className="text-2xl lg:text-3xl font-bold text-secondary">14,000+</span>
            <span className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider mt-1">
              HNW Buyers
            </span>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-sm border border-outline-variant/30">
            <span className="text-2xl lg:text-3xl font-bold text-secondary">Top 1%</span>
            <span className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider mt-1">
              Certified Brokers
            </span>
          </div>
        </div>
      </SectionWrapper>
    </section>
  )
}
