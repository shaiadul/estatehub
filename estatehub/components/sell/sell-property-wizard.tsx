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
  IconCurrencyDollar,
  IconShieldCheck,
  IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n"

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

const STEP_META: Record<number, { Icon: typeof IconMapPin; blurb: string }> = {
  1: { Icon: IconMapPin, blurb: "Type, title & parcel" },
  2: { Icon: IconBed, blurb: "Scale & finishes" },
  3: { Icon: IconUpload, blurb: "Photos & 3D tour" },
  4: { Icon: IconCurrencyDollar, blurb: "Price & escrow" },
  5: { Icon: IconShieldCheck, blurb: "Verify & broadcast" },
}

export function SellPropertyWizard() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const { t } = useI18n()
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
    { num: 1, name: "Asset & Location" },
    { num: 2, name: "Specs & Amenities" },
    { num: 3, name: "Imagery & Media" },
    { num: 4, name: "Pricing & Terms" },
    { num: 5, name: "Syndicate & Audit" },
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

  const locationFields = [
    {
      key: "city",
      label: "City / Enclave",
      value: form.city,
      placeholder: "Bel Air, Los Angeles",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, city: e.target.value })),
    },
    {
      key: "state",
      label: "State",
      value: form.state,
      placeholder: "CA",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, state: e.target.value })),
    },
    {
      key: "zip",
      label: "ZIP Code",
      value: form.zip,
      placeholder: "90077",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, zip: e.target.value })),
    },
  ]

  const locationToggles = [
    {
      id: "gated",
      title: "Guarded Gate & 24/7 Security Patrol Zone",
      desc: "Property resides within private verified gated jurisdiction.",
      checked: form.gatedCommunity,
      setChecked: (checked: boolean) =>
        setForm((prev) => ({ ...prev, gatedCommunity: checked })),
    },
    {
      id: "mls-sync",
      title: "Real-Time MLS & National Luxury IDX Syndication",
      desc: "Auto-sync listing details to certified brokerage exchanges.",
      checked: form.mlsSync,
      setChecked: (checked: boolean) =>
        setForm((prev) => ({ ...prev, mlsSync: checked })),
    },
  ]

  const specFields = [
    {
      key: "beds",
      label: "Bedrooms",
      Icon: IconBed,
      type: "number" as const,
      value: form.beds,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, beds: Number(e.target.value) })),
    },
    {
      key: "baths",
      label: "Bathrooms",
      Icon: IconBath,
      type: "number" as const,
      value: form.baths,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, baths: Number(e.target.value) })),
    },
    {
      key: "sqft",
      label: "Interior Sq Ft",
      Icon: IconRuler,
      type: "number" as const,
      value: form.sqft,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, sqft: Number(e.target.value) })),
    },
    {
      key: "lotSize",
      label: "Lot Acreage",
      Icon: IconTree,
      type: undefined as undefined,
      value: form.lotSize,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, lotSize: e.target.value })),
    },
    {
      key: "yearBuilt",
      label: "Year Built",
      Icon: IconCalendarEvent,
      type: "number" as const,
      value: form.yearBuilt,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, yearBuilt: Number(e.target.value) })),
    },
    {
      key: "garage",
      label: "Garage Bays",
      Icon: IconCar,
      type: "number" as const,
      value: form.garage,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, garage: Number(e.target.value) })),
    },
  ]

  const mediaFields = [
    {
      key: "heroImage",
      label: "Primary Facade Hero Image URL",
      value: form.heroImage,
      placeholder: "https://...",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, heroImage: e.target.value })),
    },
    {
      key: "virtualTourUrl",
      label: "Matterport 3D / Unreal Engine Tour URL",
      value: form.virtualTourUrl,
      placeholder: "https://matterport.com/...",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, virtualTourUrl: e.target.value })),
    },
  ]

  const pricingSecondaryFields = [
    {
      key: "hoaFee",
      label: "Monthly HOA / Maintenance ($)",
      value: form.hoaFee,
      step: undefined as string | undefined,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, hoaFee: Number(e.target.value) })),
    },
    {
      key: "commission",
      label: "Buyer Broker Commission (%)",
      value: form.commission,
      step: "0.1" as string | undefined,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, commission: Number(e.target.value) })),
    },
  ]

  const auditChecks = [
    {
      title: "MLS & Legal Title Verification Passed",
      desc: "Jurisdiction records validate fee-simple ownership.",
    },
    {
      title: "4K Media Assets Compressed & CDN Cached",
      desc: "High-resolution imagery prepared for private virtual data rooms.",
    },
    {
      title: "Sovereign Syndicate Broadcast Network Ready",
      desc: "Broadcasting to 14,000+ verified investors upon confirmation.",
    },
  ]

  const previewStats = [
    { key: "beds", value: String(form.beds), label: "Beds" },
    { key: "baths", value: String(form.baths), label: "Baths" },
    { key: "sqft", value: form.sqft.toLocaleString(), label: "Sq Ft" },
  ]

  const successStats: { key: string; label: string; valueClassName: string; value: React.ReactNode }[] = [
    {
      key: "status",
      label: "Syndicate Status",
      valueClassName: "text-sm font-bold text-on-tertiary-container flex items-center gap-1.5 mt-1",
      value: (
        <>
          <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" /> Live Broadcasting
        </>
      ),
    },
    {
      key: "valuation",
      label: "Target Valuation",
      valueClassName: "text-sm font-bold text-on-surface mt-1",
      value: <>${form.price.toLocaleString()} USD</>,
    },
    {
      key: "reach",
      label: "Investor Reach",
      valueClassName: "text-sm font-bold text-secondary mt-1",
      value: <>14,280+ High Net Worth</>,
    },
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
        <SectionWrapper fullWidth className="bg-surface-container-lowest border-b border-outline-variant/30 shadow-xs" innerClassName="py-5">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-xs">
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-on-surface-variant font-medium">
                <Link href="/" className="hover:text-on-surface transition-colors">{t("properties.home", "Home")}</Link>
                <IconChevronRight size={14} className="text-outline-variant" />
                <span className="text-on-surface font-semibold">{t("sell.breadcrumb", "Sell & Syndicate Estate")}</span>
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
                  <span>{t("sell.saveDraft", "Save Draft")}</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
              <div>
                <Badge variant="gold" className="mb-2 text-xs font-bold uppercase tracking-wider">
                  {t("sell.badge", "Private Syndicate Listing Protocol")}
                </Badge>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                  {t("sell.title", "List Your Trophy Asset")}
                </h1>
                <p className="text-sm text-on-surface-variant mt-1 max-w-2xl">
                  {t("sell.description", "Direct access to 14,000+ vetted family offices, sovereign syndicates, and accredited high-net-worth investors across 42 jurisdictions.")}
                </p>
              </div>

              <div className="flex items-center gap-4 bg-surface-container-low px-5 py-3 rounded-2xl border border-outline-variant/30 shrink-0">
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                    {t("sell.progress", "Listing Progress")}
                  </span>
                  <span className="text-lg font-extrabold text-on-surface">
                    Step {currentStep} of {steps.length} <span className="text-secondary font-bold text-sm">• {completionPercentage}</span>
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

            <div className="pt-6">
              {(() => {
                const currentMeta = STEP_META[currentStep] ?? { Icon: IconMapPin, blurb: "" }
                const CurrentIcon = currentMeta.Icon
                return (
                  <div className="sm:hidden rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary text-on-secondary shrink-0">
                        <CurrentIcon size={20} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono text-on-surface-variant">
                          STEP {currentStep} OF {steps.length}
                        </span>
                        <p className="text-sm font-bold text-on-surface truncate">
                          {steps[currentStep - 1]?.name}
                        </p>
                      </div>
                      <span className="text-xs font-extrabold text-secondary shrink-0">
                        {completionPercentage}%
                      </span>
                    </div>
                    <div
                      className="mt-3 h-1.5 rounded-full bg-surface-container-high overflow-hidden"
                      role="progressbar"
                      aria-valuenow={completionPercentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Listing progress"
                    >
                      <div
                        className="h-full rounded-full bg-secondary transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>
                )
              })()}

              <ol className="hidden sm:flex items-start gap-1">
                {steps.map((st) => {
                  const meta = STEP_META[st.num] ?? { Icon: IconCheck, blurb: "" }
                  const StepIcon = meta.Icon
                  const isDone = st.num < currentStep
                  const isActive = st.num === currentStep
                  return (
                    <li
                      key={st.num}
                      className={`flex items-start min-w-0 ${st.num < steps.length ? "flex-1" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => setCurrentStep(st.num)}
                        aria-current={isActive ? "step" : undefined}
                        aria-label={`Go to phase ${st.num}: ${st.name}`}
                        className="flex items-start gap-3 text-left rounded-xl p-1 -m-1 focus-visible:outline-2 focus-visible:outline-secondary group shrink-0"
                      >
                        <span className="relative shrink-0">
                          <span
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all ${
                              isDone
                                ? "bg-tertiary/15 text-on-tertiary-container border-tertiary/40"
                                : isActive
                                ? "bg-secondary text-on-secondary border-secondary shadow-md ring-2 ring-secondary/40 scale-105"
                                : "bg-surface-container text-on-surface-variant border-transparent group-hover:bg-surface-container-high"
                            }`}
                          >
                            <StepIcon size={18} />
                          </span>
                          {isDone && (
                            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-tertiary text-primary-foreground flex items-center justify-center border-2 border-surface-container-lowest">
                              <IconCheck size={12} />
                            </span>
                          )}
                        </span>
                        <span className="flex flex-col pt-0.5 min-w-0">
                          <span className={`text-[10px] font-mono leading-none ${isActive ? "text-secondary" : "text-on-surface-variant"}`}>
                            PHASE 0{st.num}
                          </span>
                          <span
                            className={`text-xs font-bold whitespace-nowrap mt-1 ${
                              isActive ? "text-on-surface" : "text-on-surface-variant"
                            }`}
                          >
                            {st.name}
                          </span>
                          <span className="text-[11px] text-on-surface-variant whitespace-nowrap">
                            {meta.blurb}
                          </span>
                        </span>
                      </button>
                      {st.num < steps.length && (
                        <span
                          aria-hidden="true"
                          className="flex-1 h-1 mt-5 mx-2 rounded-full bg-surface-container-high overflow-hidden min-w-6"
                        >
                          <span
                            className={`block h-full rounded-full transition-all duration-500 ${
                              st.num < currentStep ? "w-full bg-tertiary" : "w-0"
                            }`}
                          />
                        </span>
                      )}
                    </li>
                  )
                })}
              </ol>
            </div>
        </SectionWrapper>

        <SectionWrapper className="py-10">
            {isPublished ? (
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
                  {successStats.map(({ key, label, valueClassName, value }) => (
                    <div key={key} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                      <span className="text-xs text-on-surface-variant font-medium">{label}</span>
                      <span className={valueClassName}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    variant="gold"
                    size="lg"
                    render={<Link href="/dashboard?role=seller" />}
                    className="gap-2 font-bold shadow-md"
                  >
                    <IconBuildingEstate size={18} />
                    <span>Manage in Seller Dashboard</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    render={<Link href="/properties" />}
                    className="gap-2"
                  >
                    <span>{t("wizard.viewInPortfolio", "View in Portfolio")}</span>
                    <IconArrowRight size={18} />
                  </Button>
                  <Button
                    variant="subtle"
                    size="lg"
                    onClick={() => {
                      setIsPublished(false)
                      setCurrentStep(1)
                    }}
                  >
                    {t("wizard.submitAnother", "Submit Another Estate")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 flex flex-col gap-8">
                  {currentStep === 1 && (
                    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
                      <div>
                        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
                          Asset Category &amp; Location
                        </h2>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                          Choose the architectural archetype and geographical positioning for this luxury holding.
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
                                  isSelected ? "bg-secondary text-primary-foreground" : "bg-surface-container text-secondary"
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

                      <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-4">
                        <h3 className="text-base font-bold text-on-surface">Location &amp; Parcel Data</h3>
                        
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
                          {locationFields.map(({ key, label, value, placeholder, onChange }) => (
                            <div key={key} className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                                {label}
                              </label>
                              <Input
                                value={value}
                                onChange={onChange}
                                placeholder={placeholder}
                                className="h-11"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 flex flex-col gap-3">
                          {locationToggles.map(({ id, title, desc, checked, setChecked }) => (
                            <div key={id} className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-low">
                              <Checkbox
                                id={id}
                                checked={checked}
                                onCheckedChange={(checked) => setChecked(Boolean(checked))}
                                className="mt-0.5"
                              />
                              <label htmlFor={id} className="cursor-pointer flex flex-col">
                                <span className="text-xs font-bold text-on-surface">
                                  {title}
                                </span>
                                <span className="text-[11px] text-on-surface-variant">
                                  {desc}
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
                      <div>
                        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
                          Architectural Specifications &amp; Amenities
                        </h2>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                          Detail the scale, interior metrics, and signature luxury features of this estate.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {specFields.map(({ key, label, Icon, type, value, onChange }) => (
                          <div key={key} className="flex flex-col gap-1.5 p-4 rounded-2xl bg-surface-container-low">
                            <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                              <Icon size={16} className="text-secondary" /> {label}
                            </label>
                            <Input
                              type={type}
                              value={value}
                              onChange={onChange}
                              className="h-10 text-base font-bold"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-3">
                        <div>
                          <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
                            Luxury Finishes &amp; Amenities
                          </h3>
                          <p className="text-xs text-on-surface-variant mt-0.5">
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
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
                      <div>
                        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
                          High-Resolution Media &amp; 3D Walkthrough
                        </h2>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                          Upload 4K architectural photography, drone footage, and 3D spatial scans.
                        </p>
                      </div>

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

                      {mediaFields.map(({ key, label, value, placeholder, onChange }) => (
                        <div key={key} className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                            {label}
                          </label>
                          <Input
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder}
                            className="h-11"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {currentStep === 4 && (
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
                          {pricingSecondaryFields.map(({ key, label, value, step, onChange }) => (
                            <div key={key} className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                                {label}
                              </label>
                              <Input
                                type="number"
                                step={step}
                                value={value}
                                onChange={onChange}
                                className="h-11 font-bold"
                              />
                            </div>
                          ))}
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

                  {currentStep === 5 && (
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
                        {auditChecks.map(({ title, desc }) => (
                          <div key={title} className="p-4 rounded-2xl bg-tertiary/10 border border-tertiary/30 flex items-center gap-3">
                            <IconCircleCheck className="text-on-tertiary-container size-5 shrink-0" />
                            <div className="flex flex-col text-xs">
                              <span className="font-bold text-on-tertiary-container">
                                {title}
                              </span>
                              <span className="text-on-tertiary-container">
                                {desc}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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
                      <span>{t("wizard.previousPhase", "Previous Phase")}</span>
                    </Button>

                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        variant="gold"
                        size="lg"
                        onClick={() => setCurrentStep((prev) => Math.min(steps.length, prev + 1))}
                        className="gap-2 font-bold shadow-md"
                      >
                        <span>{t("wizard.continueToPhase", "Continue to Phase")} 0{currentStep + 1}</span>
                        <IconChevronRight size={18} />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="gold"
                        size="lg"
                        onClick={handlePublish}
                        className="gap-2 font-extrabold shadow-lg bg-tertiary hover:bg-tertiary text-primary-foreground"
                      >
                        <IconSparkles size={18} />
                        <span>{t("wizard.confirmBroadcast", "Confirm & Broadcast Syndicate")}</span>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
                  <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 shadow-xl flex flex-col gap-5">
                    <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                      <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                        <IconEye size={16} className="text-secondary" />
                        {t("wizard.livePreview", "Live Investor Preview")}
                      </span>
                      <Badge variant="gold" className="text-[10px]">Real-time IDX</Badge>
                    </div>

                    <div className="rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-low shadow-sm">
                      <div className="relative h-56 w-full overflow-hidden">
                        <Image
                          src={form.heroImage}
                          alt={form.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-primary-container/80 text-primary-foreground font-bold text-xs">
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
                          {previewStats.map(({ key, value, label }) => (
                            <div key={key}>
                              <span className="block font-bold text-on-surface text-sm">{value}</span>
                              <span className="text-[10px]">{label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-2.5 text-xs">
                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-on-surface-variant">Estimated Velocity</span>
                        <span className="text-on-tertiary-container font-bold">Top 8% Tier</span>
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
        </SectionWrapper>

        {saveDraftToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-primary-container text-primary-foreground px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-primary-foreground/20 animate-in slide-in-from-bottom duration-300">
            <IconCheck size={20} className="text-tertiary shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold">{t("wizard.draftSaved", "Draft Saved Successfully")}</span>
              <span className="text-[11px] text-muted-foreground">
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
