"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  IconCheck,
  IconChevronRight,
  IconChevronLeft,
  IconBuildingEstate,
  IconBuildingSkyscraper,
  IconSailboat,
  IconMountain,
  IconShieldLock,
  IconMapPin,
  IconBed,
  IconBath,
  IconRuler,
  IconTree,
  IconCar,
  IconCalendarEvent,
  IconSparkles,
  IconCircleCheck,
  IconArrowRight,
  IconBookmark,
  IconEye,
  IconUpload,
  IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

interface FormState {
  propertyType: "villa" | "penthouse" | "waterfront" | "chalet" | "compound"
  title: string
  address: string
  city: string
  state: string
  zip: string
  gatedCommunity: boolean
  mlsSync: boolean
  beds: number
  baths: number
  sqft: number
  lotSize: string
  yearBuilt: number
  garage: number
  price: number
  hoaFee: number
  commission: number
  ndaRequired: boolean
  virtualTourUrl: string
  selectedAmenities: string[]
  heroImage: string
}

export function SellPropertyWizard() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const [currentStep, setCurrentStep] = React.useState<number>(1)
  const [isPublished, setIsPublished] = React.useState<boolean>(false)
  const [saveDraftToast, setSaveDraftToast] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/register?role=seller&redirect=/sell")
    }
  }, [isLoggedIn, router])

  const [form, setForm] = React.useState<FormState>({
    propertyType: "villa",
    title: "The Bel Air Horizon Compound",
    address: "10480 Bellagio Road",
    city: "Bel Air, Los Angeles",
    state: "CA",
    zip: "90077",
    gatedCommunity: true,
    mlsSync: true,
    beds: 5,
    baths: 7,
    sqft: 8500,
    lotSize: "0.85 Acres",
    yearBuilt: 2024,
    garage: 4,
    price: 9850000,
    hoaFee: 650,
    commission: 2.5,
    ndaRequired: true,
    virtualTourUrl: "https://matterport.com/discover/space/estatehub-sample",
    selectedAmenities: [
      "Zero-Edge Infinity Pool",
      "600-Bottle Glass Wine Cellar",
      "Dolby Atmos Cinema",
      "Gaggenau 400 Kitchen Suite",
      "Subterranean Motor Vault",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
  })

  const steps = [
    { num: 1, name: "Asset Category" },
    { num: 2, name: "Location & Parcel" },
    { num: 3, name: "Specs & Architecture" },
    { num: 4, name: "Imagery & Media" },
    { num: 5, name: "Pricing & Terms" },
    { num: 6, name: "Amenities & Finishes" },
    { num: 7, name: "Syndicate & Audit" },
  ]

  const propertyTypes = [
    {
      id: "villa",
      name: "Ultra Luxury Villa",
      desc: "Architectural estates with perimeter grounds, pool terraces, and horizon views.",
      icon: IconBuildingEstate,
    },
    {
      id: "penthouse",
      name: "Trophy Penthouse",
      desc: "Skyline crowned high-floor towers with wraparound terraces and keyed elevators.",
      icon: IconBuildingSkyscraper,
    },
    {
      id: "waterfront",
      name: "Waterfront Palazzo",
      desc: "Direct oceanfront or deepwater mooring frontage accommodating mega-yachts.",
      icon: IconSailboat,
    },
    {
      id: "chalet",
      name: "Alpine Chalet",
      desc: "Ski-in/ski-out mountain compounds with timber engineering and heated courts.",
      icon: IconMountain,
    },
    {
      id: "compound",
      name: "Private Compound",
      desc: "Multi-structure acreage properties with private guest houses and security gates.",
      icon: IconShieldLock,
    },
  ]

  const luxuryAmenitiesList = [
    "Zero-Edge Infinity Pool",
    "600-Bottle Glass Wine Cellar",
    "Dolby Atmos Cinema",
    "Gaggenau 400 Kitchen Suite",
    "Subterranean Motor Vault",
    "Private Heli-Drop Landing Pad",
    "Deepwater Yacht Mooring (100ft+)",
    "Lutron HomeWorks Automation",
    "Tesla Powerwall 3 Battery Bank",
    "Thermal Night-Vision Perimeter Sentry",
    "Biometric Safe Room & Vault",
    "Finnish Wellness Sauna & Cold Plunge",
  ]

  const completionPercentage = Math.round((currentStep / steps.length) * 100)

  const toggleAmenity = (item: string) => {
    setForm((prev) => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(item)
        ? prev.selectedAmenities.filter((a) => a !== item)
        : [...prev.selectedAmenities, item],
    }))
  }

  const handlePublish = () => {
    setIsPublished(true)
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      <Header />

      <main className="w-full pt-20 flex-1">
        {/* Progress & Context Master Bar */}
        <section className="w-full bg-surface-container-lowest border-b border-outline-variant/30 shadow-xs">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-5">
            {/* Breadcrumb + Autosave meta row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-xs">
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-on-surface-variant font-medium">
                <Link href="/" className="hover:text-on-surface transition-colors">Home</Link>
                <IconChevronRight size={14} className="text-outline-variant" />
                <span className="text-on-surface font-semibold">Sell &amp; Syndicate Estate</span>
              </nav>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1 rounded-full text-on-surface-variant font-medium text-xs">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span>Autosaved live</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSaveDraftToast(true)
                    setTimeout(() => setSaveDraftToast(false), 3000)
                  }}
                  className="gap-1.5 text-xs"
                >
                  <IconBookmark size={15} />
                  <span>Save Draft</span>
                </Button>
              </div>
            </div>

            {/* Main Headline & Stepper Dial */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
              <div>
                <Badge variant="gold" className="mb-2 text-xs font-bold uppercase tracking-wider">
                  Private Syndicate Listing Protocol
                </Badge>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                  List Your Trophy Asset
                </h1>
                <p className="text-sm text-on-surface-variant mt-1 max-w-2xl">
                  Direct access to 14,000+ vetted family offices, sovereign syndicates, and accredited high-net-worth investors across 42 jurisdictions.
                </p>
              </div>

              {/* Completion Dial Indicator */}
              <div className="flex items-center gap-4 bg-surface-container-low px-5 py-3 rounded-2xl border border-outline-variant/30 shrink-0">
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                    Listing Progress
                  </span>
                  <span className="text-lg font-extrabold text-on-surface">
                    Step {currentStep} of {steps.length} <span className="text-secondary font-bold text-sm">• {completionPercentage}%</span>
                  </span>
                </div>
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container-high"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-secondary"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray={`${completionPercentage}, 100`}
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute text-xs font-extrabold text-on-surface">
                    {completionPercentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* Horizontal Multi-Step Bar */}
            <div className="pt-6 overflow-x-auto no-scrollbar">
              <div className="flex items-center min-w-[780px] justify-between pb-2">
                {steps.map((st) => {
                  const isDone = st.num < currentStep
                  const isActive = st.num === currentStep
                  return (
                    <div
                      key={st.num}
                      onClick={() => setCurrentStep(st.num)}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                          isDone
                            ? "bg-primary text-white shadow-xs"
                            : isActive
                            ? "bg-secondary-container text-on-secondary-fixed ring-2 ring-secondary shadow-md scale-105"
                            : "bg-surface-container text-on-surface-variant group-hover:bg-surface-container-high"
                        }`}
                      >
                        {isDone ? <IconCheck size={16} className="text-emerald-400" /> : st.num}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-on-surface-variant font-mono leading-none">
                          PHASE 0{st.num}
                        </span>
                        <span
                          className={`text-xs font-bold whitespace-nowrap ${
                            isActive ? "text-on-surface" : "text-on-surface-variant"
                          }`}
                        >
                          {st.name}
                        </span>
                      </div>
                      {st.num < steps.length && (
                        <div
                          className={`w-8 xl:w-12 h-0.5 mx-2 transition-colors ${
                            isDone ? "bg-primary" : "bg-surface-container-high"
                          }`}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Wizard Main Grid (Form Left, Live Preview Right) */}
        <section className="w-full py-10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            {isPublished ? (
              /* Success / Live Syndicate Tracking State */
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col items-center text-center max-w-3xl mx-auto animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-fixed mb-6 shadow-md">
                  <IconRosetteDiscountCheckFilled size={44} className="text-secondary" />
                </div>
                <Badge variant="gold" className="mb-3 text-xs font-bold uppercase tracking-wider">
                  Syndicate Verified &amp; Active
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
                  Listing Successfully Transmitted
                </h2>
                <p className="text-sm text-on-surface-variant max-w-xl mb-6 leading-relaxed">
                  <strong className="text-on-surface">{form.title}</strong> has been encrypted and broadcast to the EstateHub Private Investor Syndicate. MLS ID <strong className="text-secondary font-mono">#EH-77894</strong> is officially reserved.
                </p>

                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
                  <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                    <span className="text-xs text-on-surface-variant font-medium">Syndicate Status</span>
                    <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Live Broadcasting
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                    <span className="text-xs text-on-surface-variant font-medium">Target Valuation</span>
                    <span className="text-sm font-bold text-on-surface mt-1">
                      ${form.price.toLocaleString()} USD
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                    <span className="text-xs text-on-surface-variant font-medium">Investor Reach</span>
                    <span className="text-sm font-bold text-secondary mt-1">
                      14,280+ High Net Worth
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    variant="gold"
                    size="lg"
                    render={<Link href="/properties" />}
                    className="gap-2"
                  >
                    <span>View in Portfolio</span>
                    <IconArrowRight size={18} />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setIsPublished(false)
                      setCurrentStep(1)
                    }}
                  >
                    Submit Another Estate
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Form Column (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                  {/* Step 1: Asset Category */}
                  {currentStep === 1 && (
                    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
                      <div>
                        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
                          Select Asset Category
                        </h2>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                          Choose the architectural archetype that defines this luxury holding.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {propertyTypes.map((pt) => {
                          const Icon = pt.icon
                          const isSelected = form.propertyType === pt.id
                          return (
                            <div
                              key={pt.id}
                              onClick={() =>
                                setForm((prev) => ({ ...prev, propertyType: pt.id as FormState["propertyType"] }))
                              }
                              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-3 ${
                                isSelected
                                  ? "border-secondary bg-secondary-container/20 shadow-md"
                                  : "border-outline-variant/30 hover:border-outline-variant/70 bg-surface-container-low"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                  isSelected ? "bg-secondary text-white" : "bg-surface-container text-secondary"
                                }`}>
                                  <Icon size={22} />
                                </div>
                                {isSelected && (
                                  <Badge variant="gold" className="text-[10px]">Selected</Badge>
                                )}
                              </div>
                              <div>
                                <h3 className="text-sm font-bold text-on-surface">{pt.name}</h3>
                                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                                  {pt.desc}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      <div className="flex flex-col gap-2 pt-2">
                        <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                          Estate Listing Title
                        </label>
                        <Input
                          value={form.title}
                          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. The Glass Horizon Villa"
                          className="h-11"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Location & Parcel */}
                  {currentStep === 2 && (
                    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
                      <div>
                        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
                          Location &amp; Parcel Data
                        </h2>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                          Enter geographical positioning and jurisdictional boundary information.
                        </p>
                      </div>

                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                            Street Address
                          </label>
                          <Input
                            value={form.address}
                            onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
                            placeholder="10480 Bellagio Road"
                            className="h-11"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                              City / Enclave
                            </label>
                            <Input
                              value={form.city}
                              onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                              placeholder="Bel Air, Los Angeles"
                              className="h-11"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                              State
                            </label>
                            <Input
                              value={form.state}
                              onChange={(e) => setForm((prev) => ({ ...prev, state: e.target.value }))}
                              placeholder="CA"
                              className="h-11"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                              ZIP Code
                            </label>
                            <Input
                              value={form.zip}
                              onChange={(e) => setForm((prev) => ({ ...prev, zip: e.target.value }))}
                              placeholder="90077"
                              className="h-11"
                            />
                          </div>
                        </div>

                        <div className="pt-3 flex flex-col gap-3 border-t border-outline-variant/30">
                          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-low">
                            <Checkbox
                              id="gated"
                              checked={form.gatedCommunity}
                              onCheckedChange={(checked) =>
                                setForm((prev) => ({ ...prev, gatedCommunity: Boolean(checked) }))
                              }
                              className="mt-0.5"
                            />
                            <label htmlFor="gated" className="cursor-pointer flex flex-col">
                              <span className="text-xs font-bold text-on-surface">
                                Guarded Gate &amp; 24/7 Security Patrol Zone
                              </span>
                              <span className="text-[11px] text-on-surface-variant">
                                Property resides within private verified gated jurisdiction.
                              </span>
                            </label>
                          </div>

                          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-low">
                            <Checkbox
                              id="mls-sync"
                              checked={form.mlsSync}
                              onCheckedChange={(checked) =>
                                setForm((prev) => ({ ...prev, mlsSync: Boolean(checked) }))
                              }
                              className="mt-0.5"
                            />
                            <label htmlFor="mls-sync" className="cursor-pointer flex flex-col">
                              <span className="text-xs font-bold text-on-surface">
                                Real-Time MLS &amp; National Luxury IDX Syndication
                              </span>
                              <span className="text-[11px] text-on-surface-variant">
                                Auto-sync listing details to certified brokerage exchanges.
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Specs & Architecture */}
                  {currentStep === 3 && (
                    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
                      <div>
                        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
                          Architectural Specifications
                        </h2>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                          Detail the scale, interior square footage, and structural metrics.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-surface-container-low">
                          <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                            <IconBed size={16} className="text-secondary" /> Bedrooms
                          </label>
                          <Input
                            type="number"
                            value={form.beds}
                            onChange={(e) => setForm((prev) => ({ ...prev, beds: Number(e.target.value) }))}
                            className="h-10 text-base font-bold"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-surface-container-low">
                          <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                            <IconBath size={16} className="text-secondary" /> Bathrooms
                          </label>
                          <Input
                            type="number"
                            value={form.baths}
                            onChange={(e) => setForm((prev) => ({ ...prev, baths: Number(e.target.value) }))}
                            className="h-10 text-base font-bold"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-surface-container-low">
                          <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                            <IconRuler size={16} className="text-secondary" /> Interior Sq Ft
                          </label>
                          <Input
                            type="number"
                            value={form.sqft}
                            onChange={(e) => setForm((prev) => ({ ...prev, sqft: Number(e.target.value) }))}
                            className="h-10 text-base font-bold"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-surface-container-low">
                          <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                            <IconTree size={16} className="text-secondary" /> Lot Acreage
                          </label>
                          <Input
                            value={form.lotSize}
                            onChange={(e) => setForm((prev) => ({ ...prev, lotSize: e.target.value }))}
                            className="h-10 text-base font-bold"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-surface-container-low">
                          <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                            <IconCalendarEvent size={16} className="text-secondary" /> Year Built
                          </label>
                          <Input
                            type="number"
                            value={form.yearBuilt}
                            onChange={(e) => setForm((prev) => ({ ...prev, yearBuilt: Number(e.target.value) }))}
                            className="h-10 text-base font-bold"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-surface-container-low">
                          <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                            <IconCar size={16} className="text-secondary" /> Garage Bays
                          </label>
                          <Input
                            type="number"
                            value={form.garage}
                            onChange={(e) => setForm((prev) => ({ ...prev, garage: Number(e.target.value) }))}
                            className="h-10 text-base font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Imagery & Media */}
                  {currentStep === 4 && (
                    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
                      <div>
                        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
                          High-Resolution Media &amp; 3D Walkthrough
                        </h2>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                          Upload 4K architectural photography, drone footage, and 3D spatial scans.
                        </p>
                      </div>

                      {/* Dropzone Container */}
                      <div className="border-2 border-dashed border-outline-variant/40 rounded-3xl p-8 flex flex-col items-center justify-center text-center bg-surface-container-low hover:border-secondary transition-colors cursor-pointer group">
                        <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-secondary mb-3 group-hover:scale-110 transition-transform">
                          <IconUpload size={28} />
                        </div>
                        <h3 className="text-sm font-bold text-on-surface">
                          Drag &amp; drop architectural photography
                        </h3>
                        <p className="text-xs text-on-surface-variant mt-1">
                          Supports RAW, TIFF, PNG, or JPG up to 100MB per asset.
                        </p>
                        <Button variant="outline" size="sm" className="mt-4 text-xs font-semibold">
                          Browse Media Files
                        </Button>
                      </div>

                      {/* Current Hero Photo Preview */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                          Primary Facade Hero Image URL
                        </label>
                        <Input
                          value={form.heroImage}
                          onChange={(e) => setForm((prev) => ({ ...prev, heroImage: e.target.value }))}
                          placeholder="https://..."
                          className="h-11"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                          Matterport 3D / Unreal Engine Tour URL
                        </label>
                        <Input
                          value={form.virtualTourUrl}
                          onChange={(e) => setForm((prev) => ({ ...prev, virtualTourUrl: e.target.value }))}
                          placeholder="https://matterport.com/..."
                          className="h-11"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 5: Pricing & Terms */}
                  {currentStep === 5 && (
                    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
                      <div>
                        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
                          Valuation &amp; Syndicate Terms
                        </h2>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                          Establish asking price, escrow conditions, and buyer verification rules.
                        </p>
                      </div>

                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                            Asking Price (USD)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">$</span>
                            <Input
                              type="number"
                              value={form.price}
                              onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
                              className="h-12 pl-8 text-lg font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                              Monthly HOA / Maintenance ($)
                            </label>
                            <Input
                              type="number"
                              value={form.hoaFee}
                              onChange={(e) => setForm((prev) => ({ ...prev, hoaFee: Number(e.target.value) }))}
                              className="h-11 font-bold"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                              Buyer Broker Commission (%)
                            </label>
                            <Input
                              type="number"
                              step="0.1"
                              value={form.commission}
                              onChange={(e) => setForm((prev) => ({ ...prev, commission: Number(e.target.value) }))}
                              className="h-11 font-bold"
                            />
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3 mt-2">
                          <Checkbox
                            id="nda"
                            checked={form.ndaRequired}
                            onCheckedChange={(checked) =>
                              setForm((prev) => ({ ...prev, ndaRequired: Boolean(checked) }))
                            }
                            className="mt-0.5"
                          />
                          <label htmlFor="nda" className="cursor-pointer flex flex-col">
                            <span className="text-xs font-bold text-on-surface">
                              Confidential NDA Required for Financial Disclosures
                            </span>
                            <span className="text-[11px] text-on-surface-variant">
                              Prospective buyers must execute institutional non-disclosure agreement prior to viewing escrow &amp; title data.
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 6: Amenities & Finishes */}
                  {currentStep === 6 && (
                    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
                      <div>
                        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
                          Luxury Finishes &amp; Amenities
                        </h2>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                          Highlight distinguishing estate assets for high-net-worth filter indexing.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {luxuryAmenitiesList.map((amenity) => {
                          const isChecked = form.selectedAmenities.includes(amenity)
                          return (
                            <div
                              key={amenity}
                              onClick={() => toggleAmenity(amenity)}
                              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                                isChecked
                                  ? "border-secondary bg-secondary-container/20 text-on-surface font-semibold"
                                  : "border-outline-variant/30 bg-surface-container-low text-on-surface-variant hover:border-outline-variant/60"
                              }`}
                            >
                              <span className="text-xs">{amenity}</span>
                              <Checkbox checked={isChecked} onCheckedChange={() => toggleAmenity(amenity)} />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 7: Syndicate & Audit Review */}
                  {currentStep === 7 && (
                    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
                      <div>
                        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
                          Final Syndicate Audit &amp; Verification
                        </h2>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                          Pre-flight verification checks before live global syndicate broadcast.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                          <IconCircleCheck className="text-emerald-600 size-5 shrink-0" />
                          <div className="flex flex-col text-xs">
                            <span className="font-bold text-emerald-900 dark:text-emerald-300">
                              MLS &amp; Legal Title Verification Passed
                            </span>
                            <span className="text-emerald-700 dark:text-emerald-400">
                              Jurisdiction records validate fee-simple ownership.
                            </span>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                          <IconCircleCheck className="text-emerald-600 size-5 shrink-0" />
                          <div className="flex flex-col text-xs">
                            <span className="font-bold text-emerald-900 dark:text-emerald-300">
                              4K Media Assets Compressed &amp; CDN Cached
                            </span>
                            <span className="text-emerald-700 dark:text-emerald-400">
                              High-resolution imagery prepared for private virtual data rooms.
                            </span>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                          <IconCircleCheck className="text-emerald-600 size-5 shrink-0" />
                          <div className="flex flex-col text-xs">
                            <span className="font-bold text-emerald-900 dark:text-emerald-300">
                              Sovereign Syndicate Broadcast Network Ready
                            </span>
                            <span className="text-emerald-700 dark:text-emerald-400">
                              Broadcasting to 14,000+ verified investors upon confirmation.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Wizard Step Controls (Next / Prev) */}
                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      disabled={currentStep === 1}
                      onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                      className="gap-2"
                    >
                      <IconChevronLeft size={18} />
                      <span>Previous Phase</span>
                    </Button>

                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        variant="gold"
                        size="lg"
                        onClick={() => setCurrentStep((prev) => Math.min(steps.length, prev + 1))}
                        className="gap-2 font-bold shadow-md"
                      >
                        <span>Continue to Phase 0{currentStep + 1}</span>
                        <IconChevronRight size={18} />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="gold"
                        size="lg"
                        onClick={handlePublish}
                        className="gap-2 font-extrabold shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <IconSparkles size={18} />
                        <span>Confirm &amp; Broadcast Syndicate</span>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right Column: Sticky Live Listing Preview (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
                  <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 shadow-xl flex flex-col gap-5">
                    <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                      <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                        <IconEye size={16} className="text-secondary" />
                        Live Investor Preview
                      </span>
                      <Badge variant="gold" className="text-[10px]">Real-time IDX</Badge>
                    </div>

                    {/* Live Card */}
                    <div className="rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-low shadow-sm">
                      <div className="relative h-56 w-full overflow-hidden">
                        <Image
                          src={form.heroImage}
                          alt={form.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-black/80 text-white font-bold text-xs">
                            ${form.price.toLocaleString()}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed text-[10px] font-bold">
                            {form.propertyType.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col gap-2">
                        <h3 className="text-base font-bold text-on-surface truncate">
                          {form.title || "Untitled Estate"}
                        </h3>
                        <p className="text-xs text-on-surface-variant flex items-center gap-1 truncate">
                          <IconMapPin size={14} className="text-secondary shrink-0" />
                          <span>{form.address}, {form.city}, {form.state} {form.zip}</span>
                        </p>

                        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-outline-variant/20 text-center text-xs text-on-surface-variant mt-1">
                          <div>
                            <span className="block font-bold text-on-surface text-sm">{form.beds}</span>
                            <span className="text-[10px]">Beds</span>
                          </div>
                          <div>
                            <span className="block font-bold text-on-surface text-sm">{form.baths}</span>
                            <span className="text-[10px]">Baths</span>
                          </div>
                          <div>
                            <span className="block font-bold text-on-surface text-sm">{form.sqft.toLocaleString()}</span>
                            <span className="text-[10px]">Sq Ft</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Syndication Insights Meter */}
                    <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-2.5 text-xs">
                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-on-surface-variant">Estimated Velocity</span>
                        <span className="text-emerald-600 font-bold">Top 8% Tier</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                        <div className="h-full bg-secondary rounded-full w-[92%]" />
                      </div>
                      <span className="text-[11px] text-on-surface-variant">
                        Valuation aligns with recent Bel Air knoll comps within $1,150/sq ft.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Save Draft Floating Toast */}
        {saveDraftToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 animate-in slide-in-from-bottom duration-300">
            <IconCheck size={20} className="text-emerald-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold">Draft Saved Successfully</span>
              <span className="text-[11px] text-neutral-300">
                Listing state cached locally and synced with your advisor vault.
              </span>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
