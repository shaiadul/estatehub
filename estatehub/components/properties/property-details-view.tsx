"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  IconBed,
  IconBath,
  IconRuler,
  IconTree,
  IconCalendarEvent,
  IconCar,
  IconMapPin,
  IconCalculator,
  IconHeart,
  IconHeartFilled,
  IconShare,
  IconArrowsExchange,
  IconChevronRight,
  IconChevronLeft,
  IconX,
  IconCheck,
  IconCircleCheck,
  IconPool,
  IconGlassChampagne,
  IconDeviceTv,
  IconShieldCheck,
  IconArmchair,
  IconSun,
  IconLock,
  IconBolt,
  IconPhone,
  IconMail,
  IconSend,
  IconDownload,
  IconShieldLock,
  IconStarFilled,
  IconPhoto,
  IconArrowRight,
  IconFileText,
} from "@tabler/icons-react"
import { PropertyData } from "@/lib/properties-data"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { SinglePropertyMap } from "@/components/map/single-property-map"

interface PropertyDetailsViewProps {
  property: PropertyData
  similarProperties: PropertyData[]
}

export function PropertyDetailsView({ property, similarProperties }: PropertyDetailsViewProps) {
  // State for interaction
  const [isSaved, setIsSaved] = useState(false)
  const [shareToast, setShareToast] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Mortgage Calculator State
  const [calcPrice, setCalcPrice] = useState(property.price)
  const [downPercent, setDownPercent] = useState(20)

  // Floor Plan Switcher State
  const [activeFloor, setActiveFloor] = useState<"level1" | "level2" | "level3">("level1")

  // Tour Booking State
  const [tourType, setTourType] = useState<"inperson" | "video">("inperson")
  const [selectedDate, setSelectedDate] = useState("Today")
  const [selectedTime, setSelectedTime] = useState("10:00 AM")
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [isAccredited, setIsAccredited] = useState(true)
  const [bookingToast, setBookingToast] = useState(false)
  const [bookingSubmitting, setBookingSubmitting] = useState(false)

  // Direct Broker Message
  const [brokerMsg, setBrokerMsg] = useState("")
  const [brokerMsgSent, setBrokerMsgSent] = useState(false)

  // Calculated Mortgage Values
  const mortgageCalculations = useMemo(() => {
    const downAmount = calcPrice * (downPercent / 100)
    const loanAmount = Math.max(0, calcPrice - downAmount)
    const monthlyRate = 0.062 / 12 // 6.2% APR
    const totalPayments = 360 // 30 years
    const principalAndInterest =
      loanAmount > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
          (Math.pow(1 + monthlyRate, totalPayments) - 1)
        : 0
    const propertyTaxMonthly = (calcPrice * 0.012) / 12 // 1.2% annual
    const insuranceAndHoa = 2350
    const totalMonthly = principalAndInterest + propertyTaxMonthly + insuranceAndHoa

    return {
      downAmount,
      loanAmount,
      principalAndInterest,
      propertyTaxMonthly,
      insuranceAndHoa,
      totalMonthly,
    }
  }, [calcPrice, downPercent])

  // Gallery photos
  const allPhotos = useMemo(() => {
    if (property.images && property.images.length >= 5) {
      return property.images
    }
    const defaultList = [
      property.heroImage,
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    ]
    return defaultList
  }, [property])

  const photoLabels = [
    { title: "Primary Architectural Facade", sub: "Horizon panoramas & zero-edge pool" },
    { title: "Chef's Show Kitchen", sub: "Gaggenau suites & Calacatta marble" },
    { title: "Primary Master Suite", sub: "Cantilevered terrace & fireplace" },
    { title: "Spa Wellness Bath", sub: "Sculptural tub & bamboo garden view" },
    { title: "Wine Gallery & Lounge", sub: "600-bottle climate glass display" },
  ]

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href)
      setShareToast(true)
      setTimeout(() => setShareToast(false), 3000)
    }
  }

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSubmitting(true)
    setTimeout(() => {
      setBookingSubmitting(false)
      setBookingToast(true)
      setTimeout(() => setBookingToast(false), 5000)
    }, 600)
  }

  const handleSendBrokerMsg = (e: React.FormEvent) => {
    e.preventDefault()
    if (!brokerMsg.trim()) return
    setBrokerMsgSent(true)
    setBrokerMsg("")
    setTimeout(() => setBrokerMsgSent(false), 3000)
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      <Header />

      <main className="w-full pt-20 flex-1">
        {/* Breadcrumb Navigation Bar */}
        <div className="w-full bg-surface-container-lowest border-b border-outline-variant/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-on-surface-variant">
              <Link href="/properties" className="hover:text-on-surface transition-colors font-medium">
                Properties
              </Link>
              <IconChevronRight className="w-3.5 h-3.5 text-outline-variant" />
              <span className="hover:text-on-surface transition-colors">{property.state === "CA" ? "California" : property.state === "NY" ? "New York" : property.state === "FL" ? "Florida" : "Colorado"}</span>
              <IconChevronRight className="w-3.5 h-3.5 text-outline-variant" />
              <span className="hover:text-on-surface transition-colors">{property.city.split(",")[0]}</span>
              <IconChevronRight className="w-3.5 h-3.5 text-outline-variant" />
              <span className="text-on-surface font-semibold truncate max-w-[180px] sm:max-w-none">
                {property.title}
              </span>
            </nav>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-mono font-medium bg-surface-container-low border-outline-variant/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse inline-block" />
                MLS: {property.mlsId}
              </Badge>
              <Badge variant="gold" className="text-xs font-semibold">
                <IconShieldCheck className="w-3.5 h-3.5 mr-1" />
                {property.badge || "Verified Exclusive"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Title, Pricing & Action Bar */}
        <section className="w-full bg-surface border-b border-outline-variant/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              {/* Left Title & Status */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-black text-white">
                    {property.status}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-surface-container-high text-on-surface-variant">
                    Ultra Luxury Class
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    Listed {property.daysListed} days ago • {property.viewsCount.toLocaleString()} views
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight">
                  {property.title}
                </h1>

                <div className="flex items-center gap-1.5 text-on-surface-variant text-sm">
                  <IconMapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span>
                    {property.address}, {property.city}, {property.state} {property.zip}
                  </span>
                </div>
              </div>

              {/* Right Price & Quick Actions */}
              <div className="flex flex-col lg:items-end gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight">
                    {property.priceFormatted}
                  </span>
                  <span className="text-sm font-semibold text-on-surface-variant uppercase">USD</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <IconCalculator className="w-4 h-4 text-secondary" />
                  <span>
                    Est. Mortgage: <strong className="text-on-surface font-bold">{property.estMortgage}</strong> with 20% down
                  </span>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <Button
                    variant={isSaved ? "gold" : "outline"}
                    size="sm"
                    className="gap-1.5 h-9"
                    onClick={() => setIsSaved(!isSaved)}
                  >
                    {isSaved ? (
                      <IconHeartFilled className="w-4 h-4 text-red-500" />
                    ) : (
                      <IconHeart className="w-4 h-4" />
                    )}
                    <span>{isSaved ? "Saved" : "Save"}</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 h-9"
                    onClick={handleShare}
                  >
                    <IconShare className="w-4 h-4" />
                    <span>Share</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 h-9"
                    onClick={() => alert("Downloading encrypted property prospectus brochure (PDF)...")}
                  >
                    <IconFileText className="w-4 h-4" />
                    <span>Brochure</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 h-9"
                    onClick={() => alert("Property added to confidential comparison tray.")}
                  >
                    <IconArrowsExchange className="w-4 h-4" />
                    <span>Compare</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Photo Gallery Mosaic */}
        <section className="w-full bg-surface pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2.5 h-[420px] md:h-[560px] rounded-2xl overflow-hidden relative shadow-md">
              {/* Photo 1: Hero Facade (2x2 span) */}
              <div
                className="md:col-span-2 md:row-span-2 relative group overflow-hidden cursor-pointer"
                onClick={() => {
                  setLightboxIndex(0)
                  setLightboxOpen(true)
                }}
              >
                <Image
                  src={allPhotos[0]}
                  alt={property.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 text-white">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-xs font-semibold w-fit border border-white/20">
                    {photoLabels[0].title}
                  </span>
                  <p className="text-xs text-white/90 drop-shadow">
                    {photoLabels[0].sub}
                  </p>
                </div>
              </div>

              {/* Photo 2: Chef's Kitchen */}
              <div
                className="relative group overflow-hidden cursor-pointer hidden md:block"
                onClick={() => {
                  setLightboxIndex(1)
                  setLightboxOpen(true)
                }}
              >
                <Image
                  src={allPhotos[1]}
                  alt="Chef Kitchen"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors pointer-events-none" />
                <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-white text-xs font-medium">
                  {photoLabels[1].title}
                </span>
              </div>

              {/* Photo 3: Primary Master Suite */}
              <div
                className="relative group overflow-hidden cursor-pointer hidden md:block"
                onClick={() => {
                  setLightboxIndex(2)
                  setLightboxOpen(true)
                }}
              >
                <Image
                  src={allPhotos[2]}
                  alt="Primary Suite"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors pointer-events-none" />
                <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-white text-xs font-medium">
                  {photoLabels[2].title}
                </span>
              </div>

              {/* Photo 4: Spa Bath */}
              <div
                className="relative group overflow-hidden cursor-pointer hidden md:block"
                onClick={() => {
                  setLightboxIndex(3)
                  setLightboxOpen(true)
                }}
              >
                <Image
                  src={allPhotos[3]}
                  alt="Spa Bath"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors pointer-events-none" />
                <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-white text-xs font-medium">
                  {photoLabels[3].title}
                </span>
              </div>

              {/* Photo 5: Wine Cellar / Lounge + View All Button */}
              <div
                className="relative group overflow-hidden cursor-pointer hidden md:block"
                onClick={() => {
                  setLightboxIndex(4)
                  setLightboxOpen(true)
                }}
              >
                <Image
                  src={allPhotos[4]}
                  alt="Wine Cellar & Lounge"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors pointer-events-none" />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex(0)
                    setLightboxOpen(true)
                  }}
                  className="absolute inset-0 m-auto w-fit h-fit flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/90 text-white hover:bg-black backdrop-blur-md shadow-xl text-xs font-bold transition-transform group-hover:scale-105 border border-white/20"
                >
                  <IconPhoto className="w-4 h-4 text-amber-400" />
                  <span>View All 38 Photos &amp; 3D Tour</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Two-Column Layout: Left (8 Cols) / Right Sticky (4 Cols) */}
        <section className="w-full bg-surface pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT COLUMN: Deep Specifications & Architectural Details (8 Cols) */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                {/* 1. Key Metrics Spec Bar */}
                <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary mb-1">
                      <IconBed className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-on-surface">{property.beds}</span>
                    <span className="text-xs text-on-surface-variant">Bedrooms</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary mb-1">
                      <IconBath className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-on-surface">{property.baths}</span>
                    <span className="text-xs text-on-surface-variant">Bathrooms</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary mb-1">
                      <IconRuler className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-on-surface">{property.sqftFormatted}</span>
                    <span className="text-xs text-on-surface-variant">Interior Sq Ft</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary mb-1">
                      <IconTree className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-on-surface">{property.lotSize}</span>
                    <span className="text-xs text-on-surface-variant">Lot Size</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary mb-1">
                      <IconCalendarEvent className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-on-surface">{property.yearBuilt}</span>
                    <span className="text-xs text-on-surface-variant">Year Built</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary mb-1">
                      <IconCar className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-on-surface">{property.garage}</span>
                    <span className="text-xs text-on-surface-variant">Garage Spaces</span>
                  </div>
                </div>

                {/* 2. Architectural Narrative */}
                <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-on-surface">Architectural Narrative</h2>
                    <span className="px-3 py-1 rounded-full bg-surface-container text-xs font-semibold text-secondary">
                      Custom Masterwork
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    {property.description}
                  </p>

                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    Every facet reflects curatorial intent: book-matched marble hearths, custom Davide Groppi architectural lighting fixtures, and full Lutron HomeWorks intelligent automation orchestrating solar shading, security vaults, multizone climate, and acoustic soundscapes.
                  </p>

                  {/* Estate Highlights Grid */}
                  <div className="pt-2 flex flex-col gap-3">
                    <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                      Estate Highlights
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low">
                        <IconSun className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-on-surface font-medium">
                          180-degree unobstructed horizon panoramas and dramatic sunsets
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low">
                        <IconPool className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-on-surface font-medium">
                          60ft heated cantilevered negative-edge infinity pool &amp; spa
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low">
                        <IconGlassChampagne className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-on-surface font-medium">
                          Temperature-controlled 600-bottle glass display wine gallery
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low">
                        <IconDeviceTv className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-on-surface font-medium">
                          Dolby Atmos 12-seat acoustic private screening cinema
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low md:col-span-2">
                        <IconCar className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-on-surface font-medium">
                          Secured private motor court with accommodation for up to 8 collector vehicles
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Curated Amenities Matrix */}
                <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-6">
                  <h2 className="text-2xl font-bold text-on-surface">Curated Amenities &amp; Specifications</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Category 1: Comfort & Interior */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-on-surface font-bold text-sm">
                        <IconArmchair className="w-5 h-5 text-secondary" />
                        <span>Comfort &amp; Interior Finishings</span>
                      </div>
                      <ul className="flex flex-col gap-2 text-xs text-on-surface-variant">
                        {property.interiorAmenities.map((amenity, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                            <span>{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Category 2: Outdoor & Grounds */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-on-surface font-bold text-sm">
                        <IconTree className="w-5 h-5 text-secondary" />
                        <span>Outdoor &amp; Grounds</span>
                      </div>
                      <ul className="flex flex-col gap-2 text-xs text-on-surface-variant">
                        {property.exteriorAmenities.map((amenity, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                            <span>{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Category 3: Security & Smart Tech */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-on-surface font-bold text-sm">
                        <IconLock className="w-5 h-5 text-secondary" />
                        <span>Security &amp; Smart Technology</span>
                      </div>
                      <ul className="flex flex-col gap-2 text-xs text-on-surface-variant">
                        {property.securityAmenities.map((amenity, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                            <span>{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Category 4: Eco, Sustainability & Utilities */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-on-surface font-bold text-sm">
                        <IconBolt className="w-5 h-5 text-secondary" />
                        <span>Eco, Energy &amp; Utilities</span>
                      </div>
                      <ul className="flex flex-col gap-2 text-xs text-on-surface-variant">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                          <span>18.4 kW Hidden High-Yield Solar Array</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                          <span>3x Tesla Powerwall 3 Battery Backup Units</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                          <span>Dual Level-2 High-Power EV Charging Stations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                          <span>Low-E Acoustic Insulated Glass Glazing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                          <span>High-Efficiency Multi-Zone VRF HVAC Systems</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 4. Interactive Mortgage & Ownership Cost Calculator */}
                <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-2xl font-bold text-on-surface">Mortgage &amp; Ownership Cost Calculator</h2>
                      <p className="text-xs text-on-surface-variant">
                        Customize your acquisition model and review estimated monthly capital obligations.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-surface-container text-xs font-semibold text-on-surface w-fit">
                      30-Year Fixed • 6.2% APR
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Inputs & Sliders (7 Cols) */}
                    <div className="lg:col-span-7 flex flex-col gap-5">
                      {/* Price Slider */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-on-surface-variant">Purchase Price</span>
                          <span className="text-on-surface font-bold text-sm">
                            ${calcPrice.toLocaleString()}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={3000000}
                          max={30000000}
                          step={100000}
                          value={calcPrice}
                          onChange={(e) => setCalcPrice(Number(e.target.value))}
                          className="w-full h-2 bg-surface-container rounded-lg cursor-pointer accent-black"
                        />
                      </div>

                      {/* Down Payment Slider */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-on-surface-variant">
                            Down Payment ({downPercent}%)
                          </span>
                          <span className="text-on-surface font-bold text-sm">
                            ${Math.round(mortgageCalculations.downAmount).toLocaleString()}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={50}
                          step={5}
                          value={downPercent}
                          onChange={(e) => setDownPercent(Number(e.target.value))}
                          className="w-full h-2 bg-surface-container rounded-lg cursor-pointer accent-amber-600"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="p-3 rounded-xl bg-surface-container-low flex flex-col">
                          <span className="text-[11px] text-on-surface-variant">Interest Rate</span>
                          <span className="text-xs font-bold text-on-surface">6.20% Fixed</span>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-container-low flex flex-col">
                          <span className="text-[11px] text-on-surface-variant">Amortization</span>
                          <span className="text-xs font-bold text-on-surface">360 Months</span>
                        </div>
                      </div>
                    </div>

                    {/* Donut Chart & Monthly Breakdown (5 Cols) */}
                    <div className="lg:col-span-5 flex flex-col items-center bg-surface-container-low p-5 rounded-2xl border border-outline-variant/20">
                      {/* SVG Donut Chart */}
                      <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          {/* Background Track */}
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            stroke="#e5eeff"
                            strokeWidth="11"
                          />
                          {/* Principal & Interest */}
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            stroke="#000000"
                            strokeWidth="11"
                            strokeDasharray="238.76"
                            strokeDashoffset="60"
                            strokeLinecap="round"
                          />
                          {/* Property Tax */}
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            stroke="#d97706"
                            strokeWidth="11"
                            strokeDasharray="238.76"
                            strokeDashoffset="195"
                            strokeLinecap="round"
                          />
                          {/* Insurance & HOA */}
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            stroke="#64748b"
                            strokeWidth="11"
                            strokeDasharray="238.76"
                            strokeDashoffset="223"
                            strokeLinecap="round"
                          />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                            Estimated
                          </span>
                          <span className="text-lg font-extrabold text-on-surface leading-tight">
                            ${Math.round(mortgageCalculations.totalMonthly).toLocaleString()}
                          </span>
                          <span className="text-[10px] text-on-surface-variant">/ month</span>
                        </div>
                      </div>

                      {/* Legend Breakdown */}
                      <div className="w-full flex flex-col gap-2 mt-4 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-black flex-shrink-0" />
                            <span className="text-on-surface-variant">Principal &amp; Interest</span>
                          </div>
                          <span className="text-on-surface font-bold">
                            ${Math.round(mortgageCalculations.principalAndInterest).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 flex-shrink-0" />
                            <span className="text-on-surface-variant">Property Taxes (1.2%)</span>
                          </div>
                          <span className="text-on-surface font-bold">
                            ${Math.round(mortgageCalculations.propertyTaxMonthly).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-500 flex-shrink-0" />
                            <span className="text-on-surface-variant">Insurance &amp; HOA Fee</span>
                          </div>
                          <span className="text-on-surface font-bold">
                            ${mortgageCalculations.insuranceAndHoa.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Architectural Floor Plans Tabbed Section */}
                <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold text-on-surface">Floor Plans &amp; Architectural Layout</h2>
                      <p className="text-xs text-on-surface-variant">
                        Engineered 3-level vertical circulation and sightlines.
                      </p>
                    </div>

                    {/* Floor Plan Level Tabs */}
                    <div className="flex items-center gap-1 bg-surface-container p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setActiveFloor("level1")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          activeFloor === "level1"
                            ? "bg-surface-container-lowest text-on-surface shadow-sm"
                            : "text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        Level 1 (Main)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveFloor("level2")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          activeFloor === "level2"
                            ? "bg-surface-container-lowest text-on-surface shadow-sm"
                            : "text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        Level 2 (Suites)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveFloor("level3")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          activeFloor === "level3"
                            ? "bg-surface-container-lowest text-on-surface shadow-sm"
                            : "text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        Basement &amp; Media
                      </button>
                    </div>
                  </div>

                  <div className="relative bg-surface-container-low rounded-2xl p-6 overflow-hidden flex flex-col items-center justify-center min-h-[300px] border border-outline-variant/20">
                    <div className="w-full max-w-xl p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-2 text-left mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-on-surface">
                          {activeFloor === "level1"
                            ? "Main Living Level & Infinity Terrace"
                            : activeFloor === "level2"
                            ? "Upper Master Sanctuary & Guest Suites"
                            : "Subterranean Cinema, Cellar & Motor Vault"}
                        </span>
                        <span className="text-xs font-bold text-secondary">
                          {activeFloor === "level1"
                            ? "3,650 Sq Ft"
                            : activeFloor === "level2"
                            ? "2,950 Sq Ft"
                            : "1,800 Sq Ft"}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {activeFloor === "level1"
                          ? "Includes Grand Foyer, Great Room with 14ft ceilings, Chef's Show Kitchen, Butler's Pantry, Formal Dining, Powder Room, and seamless access to 2,400 sq ft exterior sun terrace."
                          : activeFloor === "level2"
                          ? "Features Primary Master Suite with dual showroom dressing rooms, private terrace, 3 junior en-suite bedrooms, and executive sky-office overlooking the pool courtyard."
                          : "Dedicated entertainment level housing the 600-bottle glass wine gallery, 12-seat Dolby Atmos screening room, wellness gym, safe vault, and 4-car showroom garage."}
                      </p>
                    </div>

                    {/* Floor Plan Blueprint SVG Illustration */}
                    <div className="w-full max-w-lg h-44 rounded-xl bg-surface-container flex items-center justify-center p-4 border border-outline-variant/30">
                      <svg
                        className="w-full h-full text-outline"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 400 120"
                      >
                        <rect x="10" y="10" width="380" height="100" rx="6" strokeDasharray="4 2" />
                        <rect
                          x="25"
                          y="25"
                          width="120"
                          height="70"
                          rx="4"
                          className="fill-surface-container-high"
                        />
                        <text
                          x="45"
                          y="65"
                          fill="currentColor"
                          fontSize="11"
                          fontWeight="bold"
                          className="text-on-surface"
                        >
                          {activeFloor === "level1" ? "Grand Salon" : activeFloor === "level2" ? "Master Suite" : "Cinema Lounge"}
                        </text>
                        <rect
                          x="155"
                          y="25"
                          width="110"
                          height="70"
                          rx="4"
                          className="fill-surface-container-high"
                        />
                        <text
                          x="175"
                          y="65"
                          fill="currentColor"
                          fontSize="11"
                          fontWeight="bold"
                          className="text-on-surface"
                        >
                          {activeFloor === "level1" ? "Chef Kitchen" : activeFloor === "level2" ? "En-suite II" : "Wine Gallery"}
                        </text>
                        <rect
                          x="275"
                          y="25"
                          width="100"
                          height="70"
                          rx="4"
                          className="fill-amber-100/60 stroke-amber-600"
                        />
                        <text
                          x="290"
                          y="65"
                          fill="#d97706"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          {activeFloor === "level1" ? "Pool Terrace" : activeFloor === "level2" ? "Sky Deck" : "Motor Court"}
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 6. Neighborhood, Vicinity & Schools */}
                <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-6">
                  <h2 className="text-2xl font-bold text-on-surface">Neighborhood, Vicinity &amp; Schools</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-surface-container-low flex flex-col items-center text-center gap-1">
                      <span className="text-3xl font-extrabold text-on-surface">72</span>
                      <span className="text-xs font-bold text-on-surface">Walk Score • Very Walkable</span>
                      <span className="text-[11px] text-on-surface-variant">
                        Private canyon trails and serene tree-canopied roads
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low flex flex-col items-center text-center gap-1">
                      <span className="text-3xl font-extrabold text-secondary">10/10</span>
                      <span className="text-xs font-bold text-on-surface">Harvard-Westlake School</span>
                      <span className="text-[11px] text-on-surface-variant">
                        Top-ranked independent college prep secondary school (2.4 mi)
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low flex flex-col items-center text-center gap-1">
                      <span className="text-3xl font-extrabold text-on-surface">0.4 <span className="text-xs font-normal">mi</span></span>
                      <span className="text-xs font-bold text-on-surface">Bel Air Country Club</span>
                      <span className="text-[11px] text-on-surface-variant">
                        Private championship golf &amp; equestrian facilities
                      </span>
                    </div>
                  </div>

                  {/* Integrated Interactive Map Container */}
                  <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30">
                    <SinglePropertyMap
                      coordinates={property.coordinates}
                      title={property.title}
                      address={property.address}
                      city={property.city}
                      priceFormatted={property.priceFormatted}
                    />
                  </div>
                </div>

                {/* 7. Similar Exclusive Properties */}
                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-on-surface">Similar Exclusive Estates</h2>
                    <Link
                      href="/properties"
                      className="text-xs font-bold text-secondary hover:underline flex items-center gap-1"
                    >
                      <span>View Full Portfolio</span>
                      <IconArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {similarProperties.map((simProp) => (
                      <Link
                        key={simProp.id}
                        href={`/properties/${simProp.slug}`}
                        className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-outline-variant/20 block"
                      >
                        <div className="relative h-52 overflow-hidden bg-surface-container">
                          <Image
                            src={simProp.heroImage}
                            alt={simProp.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur text-white text-xs font-bold">
                            {simProp.priceFormatted}
                          </span>
                        </div>

                        <div className="p-4 flex flex-col gap-1.5">
                          <h3 className="text-sm font-bold text-on-surface truncate group-hover:text-secondary transition-colors">
                            {simProp.title}
                          </h3>
                          <p className="text-xs text-on-surface-variant truncate">
                            {simProp.address}, {simProp.city}
                          </p>
                          <div className="flex items-center gap-3 text-on-surface-variant text-[11px] pt-2 border-t border-outline-variant/20 mt-1">
                            <span>{simProp.beds} Beds</span>
                            <span>•</span>
                            <span>{simProp.baths} Baths</span>
                            <span>•</span>
                            <span>{simProp.sqftFormatted} Sq Ft</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Sticky Agent Booking Card & Private Tour Protocol (4 Cols) */}
              <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
                {/* Agent Card & Tour Booking Module */}
                <div className="bg-surface-container-lowest rounded-2xl shadow-lg border border-outline-variant/30 p-5 sm:p-6 flex flex-col gap-5">
                  {/* Agent Attribution Strip */}
                  <div className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-surface-container-lowest shadow-sm">
                      <Image
                        src={property.agent.image}
                        alt={property.agent.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-on-surface truncate">
                          {property.agent.name}
                        </h3>
                        <IconShieldCheck className="w-4 h-4 text-secondary flex-shrink-0" />
                      </div>
                      <span className="text-[11px] text-on-surface-variant truncate">
                        {property.agent.title}
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="flex items-center text-amber-500 text-xs font-bold gap-0.5">
                          <IconStarFilled className="w-3.5 h-3.5" />
                          {property.agent.rating}
                        </span>
                        <span className="text-[11px] text-on-surface-variant">
                          ({property.agent.reviews} reviews • $180M+ Closed)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Agent Quick Contact Info */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface font-semibold flex items-center justify-center gap-1.5 border border-outline-variant/30"
                    >
                      <IconPhone className="w-4 h-4 text-secondary" />
                      <span>{property.agent.phone.split(" ")[0]}</span>
                    </a>
                    <a
                      href={`mailto:${property.agent.email}`}
                      className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface font-semibold flex items-center justify-center gap-1.5 border border-outline-variant/30"
                    >
                      <IconMail className="w-4 h-4 text-secondary" />
                      <span>Email Broker</span>
                    </a>
                  </div>

                  {/* Schedule a Private Viewing Component */}
                  <div className="flex flex-col gap-3 pt-1">
                    <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                      Schedule Private Viewing
                    </span>

                    {/* Viewing Mode Tabs */}
                    <div className="grid grid-cols-2 p-1 bg-surface-container rounded-xl text-center text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setTourType("inperson")}
                        className={`py-1.5 rounded-lg transition-all ${
                          tourType === "inperson"
                            ? "bg-surface-container-lowest text-on-surface shadow-sm font-bold"
                            : "text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        In-Person Tour
                      </button>
                      <button
                        type="button"
                        onClick={() => setTourType("video")}
                        className={`py-1.5 rounded-lg transition-all ${
                          tourType === "video"
                            ? "bg-surface-container-lowest text-on-surface shadow-sm font-bold"
                            : "text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        Live Walkthrough
                      </button>
                    </div>

                    {/* Date Picker Pills */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-on-surface-variant font-semibold">
                        Select Viewing Date
                      </label>
                      <div className="grid grid-cols-4 gap-1 text-center text-xs font-semibold">
                        {["Today", "Tomorrow", "Fri, Nov 14", "Sat, Nov 15"].map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setSelectedDate(d)}
                            className={`py-2 rounded-lg transition-all text-xs ${
                              selectedDate === d
                                ? "bg-black text-white font-bold shadow-sm"
                                : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Slot Pills */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-on-surface-variant font-semibold">
                        Preferred Time
                      </label>
                      <div className="grid grid-cols-4 gap-1 text-center text-xs">
                        {["10:00 AM", "1:30 PM", "4:00 PM", "5:30 PM"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setSelectedTime(t)}
                            className={`py-1.5 rounded-md transition-all font-semibold ${
                              selectedTime === t
                                ? "bg-secondary-container text-on-secondary-fixed font-bold border border-secondary/40"
                                : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleTourSubmit} className="flex flex-col gap-2.5 mt-1">
                      <Input
                        placeholder="Full Legal Name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-10 text-xs"
                      />
                      <Input
                        placeholder="Mobile Phone (+1)"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-10 text-xs"
                      />
                      <Input
                        placeholder="Private Email Address"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-10 text-xs"
                      />

                      <div className="flex items-start gap-2 py-1">
                        <Checkbox
                          id="investor-accredited"
                          checked={isAccredited}
                          onCheckedChange={(checked) => setIsAccredited(Boolean(checked))}
                          className="mt-0.5"
                        />
                        <label
                          htmlFor="investor-accredited"
                          className="text-[11px] text-on-surface-variant leading-tight cursor-pointer"
                        >
                          I am a pre-approved buyer or represent an institutional family office
                        </label>
                      </div>

                      {/* Primary CTA Button */}
                      <Button
                        type="submit"
                        variant="gold"
                        size="md"
                        disabled={bookingSubmitting}
                        className="w-full font-bold shadow-md mt-1 h-11"
                      >
                        {bookingSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            <span>Confirming Access...</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <IconCalendarEvent className="w-4 h-4" />
                            <span>Request Private Tour</span>
                          </span>
                        )}
                      </Button>
                    </form>
                  </div>

                  {/* Direct Question Quick Box */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
                    <span className="text-xs font-semibold text-on-surface">
                      Have a Question for {property.agent.name.split(" ")[0]}?
                    </span>
                    <form onSubmit={handleSendBrokerMsg} className="flex items-center gap-1.5 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/30">
                      <input
                        type="text"
                        placeholder="Inquire about escrow terms, deed..."
                        value={brokerMsg}
                        onChange={(e) => setBrokerMsg(e.target.value)}
                        className="w-full bg-transparent px-2 text-xs text-on-surface placeholder:text-outline focus:outline-none"
                      />
                      <button
                        type="submit"
                        aria-label="Send message to broker"
                        className="p-2 rounded-lg bg-black text-white hover:bg-neutral-800 transition-colors flex items-center justify-center"
                      >
                        <IconSend className="w-3.5 h-3.5" />
                      </button>
                    </form>
                    {brokerMsgSent && (
                      <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <IconCheck className="w-3.5 h-3.5" /> Direct inquiry routed to broker.
                      </span>
                    )}
                  </div>

                  {/* Document Download Button */}
                  <button
                    type="button"
                    onClick={() => alert("Access granted: Downloading official MLS disclosures & geotechnical report.")}
                    className="w-full py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-between text-on-surface text-xs font-semibold border border-outline-variant/30"
                  >
                    <div className="flex items-center gap-2">
                      <IconFileText className="w-4 h-4 text-secondary" />
                      <span>Official Property Disclosures &amp; Inspection</span>
                    </div>
                    <IconDownload className="w-4 h-4" />
                  </button>

                  {/* Discretion Guarantee */}
                  <div className="flex items-center gap-2 text-on-surface-variant text-[11px]">
                    <IconShieldLock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Encrypted confidential transmission. Licensed Broker #DRE 01928475</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal Lightbox Gallery */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
            {/* Lightbox Header */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-medium text-white/70">
                  {lightboxIndex + 1} / {allPhotos.length}
                </span>
                <span className="text-sm font-semibold truncate max-w-[260px] sm:max-w-none">
                  {property.title} — {photoLabels[lightboxIndex]?.title || "Property Gallery"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Main Image & Navigation */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
                <Image
                  src={allPhotos[lightboxIndex]}
                  alt="Gallery Preview"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Prev Button */}
              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : allPhotos.length - 1))}
                className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors border border-white/20"
              >
                <IconChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev < allPhotos.length - 1 ? prev + 1 : 0))}
                className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors border border-white/20"
              >
                <IconChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
              {allPhotos.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                    lightboxIndex === idx ? "ring-2 ring-amber-400 scale-105" : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Floating Notification Toast for Booking */}
        {bookingToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3.5 border border-white/20 animate-in slide-in-from-bottom duration-300">
            <IconCircleCheck className="w-7 h-7 text-amber-400 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold">Tour Request Received</span>
              <span className="text-[11px] text-neutral-300">
                {property.agent.name}&apos;s executive concierge will confirm within 60 minutes.
              </span>
            </div>
          </div>
        )}

        {/* Floating Toast for Share */}
        {shareToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-white/20 animate-in slide-in-from-bottom duration-300">
            <IconCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-xs font-semibold">Direct property link copied to clipboard</span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
