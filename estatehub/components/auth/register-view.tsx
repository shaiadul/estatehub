"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  IconBuildingBank,
  IconBuildingSkyscraper,
  IconBriefcase,
  IconBuildingCommunity,
  IconCheck,
  IconLock,
  IconShield,
  IconShieldCheck,
  IconPhoneCall,
  IconVideo,
  IconArrowRight,
  IconArrowLeft,
  IconDeviceFloppy,
  IconBadge,
  IconGavel,
  IconCertificate,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"

export function RegisterView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roleParam = (searchParams.get("role") as "buyer" | "seller" | "broker") || "buyer"
  const redirectParam = searchParams.get("redirect") || (roleParam === "seller" ? "/sell" : "/dashboard")
  const isSellerMode = roleParam === "seller" || redirectParam.includes("/sell")

  const { login } = useAuth()
  const [currentStep, setCurrentStep] = React.useState<number>(1)
  const [selectedEntityClass, setSelectedEntityClass] = React.useState(
    isSellerMode ? "hnw-principal" : "family-office"
  )
  const [fullName, setFullName] = React.useState(
    isSellerMode ? "Marcus Sterling" : "Baron Henrik Von Stauffen"
  )
  const [title, setTitle] = React.useState(
    isSellerMode ? "Family Office Estate Principal" : "Managing General Partner"
  )
  const [entityName, setEntityName] = React.useState(
    isSellerMode ? "Bel Air Trust Holdings LLC" : "Alpha Crest Sovereign Capital AG"
  )
  const [jurisdiction, setJurisdiction] = React.useState("US-CA")
  const [phonePrefix, setPhonePrefix] = React.useState("+1")
  const [phone, setPhone] = React.useState("310 882 1904")
  const [email, setEmail] = React.useState(
    isSellerMode ? "sterling@belair-trust.com" : "h.vonstauffen@alphacrest.ch"
  )
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [, setSuccessComplete] = React.useState(false)

  // Step 2 Accreditation state
  const [netWorthTier, setNetWorthTier] = React.useState("25m-50m")
  const [liquidCapital, setLiquidCapital] = React.useState("10m-25m")
  const [sourceOfFunds, setSourceOfFunds] = React.useState("Operating Enterprise & Real Estate Divestment")

  // Disclosures
  const [cbQualified, setCbQualified] = React.useState(true)
  const [cbNda, setCbNda] = React.useState(true)
  const [cbOfac, setCbOfac] = React.useState(true)

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setIsSubmitting(true)
      setTimeout(() => {
        setIsSubmitting(false)
        setSuccessComplete(true)
        login(email, roleParam)
        setTimeout(() => {
          router.push(redirectParam)
        }, 1200)
      }, 1000)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const ENTITY_CLASSES = [
    {
      id: "family-office",
      icon: IconBuildingBank,
      title: "Qualified Purchaser / Family Office",
      desc: "Liquid verifiable assets > $5,000,000 USD",
    },
    {
      id: "hnw-principal",
      icon: IconBuildingSkyscraper,
      title: "Private Collector & HNW Principal",
      desc: "Verified net worth exceeding $10,000,000 USD",
    },
    {
      id: "prime-brokerage",
      icon: IconBriefcase,
      title: "Licensed Prime Brokerage / Advisory",
      desc: "Representing mandates for accredited sovereign clients",
    },
    {
      id: "sovereign-wealth",
      icon: IconBuildingCommunity,
      title: "Sovereign Wealth / Syndicate",
      desc: "Government fund, institutional REIT, or consortium",
    },
  ]

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-surface py-8 md:py-12 px-4 md:px-8">
      <div className="w-full max-w-[1360px] mx-auto flex flex-col gap-6 md:gap-8">
        {/* Multi-Step Progress Stepper Ribbon */}
        <section className="w-full bg-surface-container-lowest p-4 md:p-6 rounded-2xl shadow-xs border border-outline-variant/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-surface-container">
            <div className="flex items-center gap-2">
              <span className="font-caption text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold">
                Terminal Tier: S-506(c)
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="font-caption text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                Active Secure Onboarding Enclave
              </span>
            </div>
            <div className="font-caption text-xs text-on-surface-variant font-mono">
              Step {currentStep} of 4:{" "}
              {currentStep === 1
                ? "Profile Registration Phase"
                : currentStep === 2
                ? "Accreditation & Wealth"
                : currentStep === 3
                ? "Jurisdiction & KYC Dossier"
                : "Hardware Pairing & Clearance"}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
            {/* Step 1 */}
            <div
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                currentStep === 1
                  ? "bg-primary text-on-primary shadow-sm"
                  : currentStep > 1
                  ? "bg-surface-container text-on-surface"
                  : "bg-surface-container-low text-on-surface-variant opacity-80"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-xs font-bold shrink-0 ${
                  currentStep === 1
                    ? "bg-surface-container-lowest text-primary"
                    : currentStep > 1
                    ? "bg-emerald-600 text-white"
                    : "bg-surface-container-highest text-on-surface-variant"
                }`}
              >
                {currentStep > 1 ? <IconCheck className="w-4 h-4" /> : "01"}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-xs sm:text-sm font-semibold truncate">Identity &amp; Entity</span>
                <span
                  className={`font-caption text-[11px] truncate ${
                    currentStep === 1 ? "text-slate-300" : "text-on-surface-variant"
                  }`}
                >
                  Entity Dossier
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => setCurrentStep(2)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                currentStep === 2
                  ? "bg-primary text-on-primary shadow-sm"
                  : currentStep > 2
                  ? "bg-surface-container text-on-surface"
                  : "bg-surface-container-low text-on-surface-variant opacity-80"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-xs font-bold shrink-0 ${
                  currentStep === 2
                    ? "bg-surface-container-lowest text-primary"
                    : currentStep > 2
                    ? "bg-emerald-600 text-white"
                    : "bg-surface-container-highest text-on-surface-variant"
                }`}
              >
                {currentStep > 2 ? <IconCheck className="w-4 h-4" /> : "02"}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-xs sm:text-sm font-semibold truncate">Accreditation</span>
                <span
                  className={`font-caption text-[11px] truncate ${
                    currentStep === 2 ? "text-slate-300" : "text-on-surface-variant"
                  }`}
                >
                  Tier Classification
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => setCurrentStep(3)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                currentStep === 3
                  ? "bg-primary text-on-primary shadow-sm"
                  : currentStep > 3
                  ? "bg-surface-container text-on-surface"
                  : "bg-surface-container-low text-on-surface-variant opacity-80"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-xs font-bold shrink-0 ${
                  currentStep === 3
                    ? "bg-surface-container-lowest text-primary"
                    : currentStep > 3
                    ? "bg-emerald-600 text-white"
                    : "bg-surface-container-highest text-on-surface-variant"
                }`}
              >
                {currentStep > 3 ? <IconCheck className="w-4 h-4" /> : "03"}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-xs sm:text-sm font-semibold truncate">Jurisdiction &amp; KYC</span>
                <span
                  className={`font-caption text-[11px] truncate ${
                    currentStep === 3 ? "text-slate-300" : "text-on-surface-variant"
                  }`}
                >
                  Bilateral Vault
                </span>
              </div>
            </div>

            {/* Step 4 */}
            <div
              onClick={() => setCurrentStep(4)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                currentStep === 4
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-low text-on-surface-variant opacity-80"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-xs font-bold shrink-0 ${
                  currentStep === 4
                    ? "bg-surface-container-lowest text-primary"
                    : "bg-surface-container-highest text-on-surface-variant"
                }`}
              >
                04
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-xs sm:text-sm font-semibold truncate">Hardware Pairing</span>
                <span
                  className={`font-caption text-[11px] truncate ${
                    currentStep === 4 ? "text-slate-300" : "text-on-surface-variant"
                  }`}
                >
                  FIDO2 / U2F Enclave
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Workspace (Split Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Primary Onboarding Form (8 Cols) */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            {/* Header Banner Block */}
            <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-2 relative overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 font-caption text-xs font-bold uppercase tracking-wider">
                  {isSellerMode ? "Seller Desk // Listing Intake" : "Confidential Desk"}
                </span>
                <span className="font-caption text-xs text-on-surface-variant font-mono">Form Reg-D-506C</span>
              </div>
              <h1 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
                {isSellerMode
                  ? "Seller Registration & Property Syndication"
                  : "Institutional Membership Application"}
              </h1>
              <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
                {isSellerMode
                  ? "Register as an accredited property owner or seller to list, syndicate, and manage your luxury properties directly on the private exchange."
                  : "EstateHub maintains strict accreditation thresholds to guarantee confidential off-market dealrooms and frictionless multi-million dollar bilateral closings."}
              </p>
            </div>

            {/* STEP 1: Identity & Entity */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-6">
                {/* Entity Type Selector */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-xs sm:text-sm text-on-surface uppercase tracking-wider font-bold">
                      01. Select Principal or Institutional Class
                    </label>
                    <span className="font-caption text-xs text-on-surface-variant">Single Selection Required</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {ENTITY_CLASSES.map((item) => {
                      const Icon = item.icon
                      const isSelected = selectedEntityClass === item.id
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedEntityClass(item.id)}
                          className={`cursor-pointer p-5 rounded-2xl transition-all border flex flex-col justify-between h-36 ${
                            isSelected
                              ? "bg-primary text-on-primary border-primary shadow-md"
                              : "bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:border-primary/50 shadow-xs"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                                isSelected ? "bg-white/10" : "bg-surface-container"
                              }`}
                            >
                              <Icon className={`w-5 h-5 ${isSelected ? "text-amber-400" : "text-on-surface-variant"}`} />
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                isSelected
                                  ? "bg-amber-400 text-slate-950"
                                  : "border border-outline-variant"
                              }`}
                            >
                              {isSelected && <IconCheck className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                          <div>
                            <h4
                              className={`font-label-md text-sm font-bold tracking-tight ${
                                isSelected ? "text-white" : "text-on-surface"
                              }`}
                            >
                              {item.title}
                            </h4>
                            <p
                              className={`font-caption text-xs mt-1 ${
                                isSelected ? "text-slate-300" : "text-on-surface-variant"
                              }`}
                            >
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Legal Entity Form Inputs */}
                <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-5">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                    <span className="font-label-md text-xs sm:text-sm text-on-surface uppercase tracking-wider font-bold">
                      02. Entity &amp; Authorized Representative Mandate
                    </span>
                    <span className="font-caption text-xs text-on-surface-variant font-mono">AES-256 In-Flight Encryption</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Legal Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-xs text-on-surface font-semibold">Full Legal Name</label>
                      <div className="relative">
                        <Input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Henrik Von Stauffen"
                          className="w-full bg-surface-container-low pl-3 pr-10 py-2.5 rounded-xl text-on-surface focus:bg-surface-container-lowest"
                        />
                        <IconBadge className="w-4 h-4 text-on-surface-variant absolute right-3 top-3.5 pointer-events-none" />
                      </div>
                      <span className="font-caption text-[11px] text-on-surface-variant">Matches official passport or biometric identity ledger.</span>
                    </div>

                    {/* Title */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-xs text-on-surface font-semibold">Institutional / Entity Title</label>
                      <div className="relative">
                        <Input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g. Managing General Partner"
                          className="w-full bg-surface-container-low pl-3 pr-10 py-2.5 rounded-xl text-on-surface focus:bg-surface-container-lowest"
                        />
                        <IconBriefcase className="w-4 h-4 text-on-surface-variant absolute right-3 top-3.5 pointer-events-none" />
                      </div>
                      <span className="font-caption text-[11px] text-on-surface-variant">Authorized signatory status required for binding LOIs.</span>
                    </div>

                    {/* Entity Legal Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-xs text-on-surface font-semibold">Entity Legal Name</label>
                      <div className="relative">
                        <Input
                          value={entityName}
                          onChange={(e) => setEntityName(e.target.value)}
                          placeholder="e.g. Crestview Capital LLC"
                          className="w-full bg-surface-container-low pl-3 pr-10 py-2.5 rounded-xl text-on-surface focus:bg-surface-container-lowest"
                        />
                        <IconBuildingBank className="w-4 h-4 text-on-surface-variant absolute right-3 top-3.5 pointer-events-none" />
                      </div>
                      <span className="font-caption text-[11px] text-on-surface-variant">Registered legal entity entering dealroom escrow.</span>
                    </div>

                    {/* Jurisdiction */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-xs text-on-surface font-semibold">Jurisdiction of Incorporation</label>
                      <Select value={jurisdiction} onValueChange={(val) => { if (val) setJurisdiction(val) }}>
                        <SelectTrigger className="w-full bg-surface-container-low rounded-xl">
                          <SelectValue placeholder="Select jurisdiction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CH-ZH">Switzerland (Kanton Zürich)</SelectItem>
                          <SelectItem value="US-DE">United States (Delaware LLC / C-Corp)</SelectItem>
                          <SelectItem value="SG">Singapore (ACRA Registered)</SelectItem>
                          <SelectItem value="UK">United Kingdom (Companies House)</SelectItem>
                          <SelectItem value="AE-DIFC">United Arab Emirates (DIFC Sovereign)</SelectItem>
                          <SelectItem value="LU">Luxembourg (SCSp / SICAV)</SelectItem>
                          <SelectItem value="KY">Cayman Islands (Exempted Enterprise)</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="font-caption text-[11px] text-on-surface-variant">Primary legal headquarters for bilateral jurisdiction.</span>
                    </div>

                    {/* Phone with country prefix */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-xs text-on-surface font-semibold">Direct Signal-Verified Phone</label>
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-4">
                          <Select value={phonePrefix} onValueChange={(val) => { if (val) setPhonePrefix(val) }}>
                            <SelectTrigger className="w-full bg-surface-container-low rounded-xl text-xs">
                              <SelectValue placeholder="+41" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+41">+41 (CH)</SelectItem>
                              <SelectItem value="+1">+1 (US)</SelectItem>
                              <SelectItem value="+44">+44 (UK)</SelectItem>
                              <SelectItem value="+65">+65 (SG)</SelectItem>
                              <SelectItem value="+971">+971 (UAE)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-8">
                          <Input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-surface-container-low py-2.5 rounded-xl text-on-surface focus:bg-surface-container-lowest"
                          />
                        </div>
                      </div>
                      <span className="font-caption text-[11px] text-on-surface-variant">Used exclusively for 2FA tokenization and closing sign-off.</span>
                    </div>

                    {/* Confidential Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-xs text-on-surface font-semibold">Confidential Institutional Email</label>
                      <div className="relative">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="principal@familyoffice.com"
                          className="w-full bg-surface-container-low pl-3 pr-10 py-2.5 rounded-xl text-on-surface focus:bg-surface-container-lowest"
                        />
                        <IconLock className="w-4 h-4 text-on-surface-variant absolute right-3 top-3.5 pointer-events-none" />
                      </div>
                      <span className="font-caption text-[11px] text-on-surface-variant">Whitelisted domain; generic webmail addresses are rejected.</span>
                    </div>
                  </div>
                </div>

                {/* Compliance & Regulatory Disclosures */}
                <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <IconGavel className="w-5 h-5 text-primary" />
                    <span className="font-label-md text-xs sm:text-sm text-on-surface uppercase tracking-wider font-bold">
                      03. Preliminary Disclosures &amp; Enclave Mandates
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low cursor-pointer transition-colors border border-outline-variant/20">
                      <input
                        type="checkbox"
                        checked={cbQualified}
                        onChange={(e) => setCbQualified(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-outline text-primary accent-primary cursor-pointer shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="font-body-md text-xs sm:text-sm text-on-surface font-semibold leading-snug">
                          Qualified Purchaser Certification (Sec. 2(a)(51) Investment Company Act)
                        </span>
                        <span className="font-caption text-xs text-on-surface-variant mt-0.5">
                          I certify that the applicant meets the legal definition under Section 2(a)(51) of the U.S. Investment Company Act or equivalent international sovereign thresholds (&gt;$5M liquid investment threshold).
                        </span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low cursor-pointer transition-colors border border-outline-variant/20">
                      <input
                        type="checkbox"
                        checked={cbNda}
                        onChange={(e) => setCbNda(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-outline text-primary accent-primary cursor-pointer shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="font-body-md text-xs sm:text-sm text-on-surface font-semibold leading-snug">
                          Master Bilateral Non-Disclosure &amp; Virtual Data Room (VDR) Protocol
                        </span>
                        <span className="font-caption text-xs text-on-surface-variant mt-0.5">
                          I agree to keep all disclosed architectural floorplans, title deeds, owner entities, and structural valuations rigorously confidential without unauthorized third-party dispersal.
                        </span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low cursor-pointer transition-colors border border-outline-variant/20">
                      <input
                        type="checkbox"
                        checked={cbOfac}
                        onChange={(e) => setCbOfac(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-outline text-primary accent-primary cursor-pointer shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="font-body-md text-xs sm:text-sm text-on-surface font-semibold leading-snug">
                          Automated FinCEN, OFAC, &amp; Sanctions Clearance Authorization
                        </span>
                        <span className="font-caption text-xs text-on-surface-variant mt-0.5">
                          Authorize automated cross-referencing against OFAC, FATF, and Interpol PEP watchlists to validate entity status prior to opening escrow gateways.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Accreditation & Wealth */}
            {currentStep === 2 && (
              <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-6 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <span className="font-label-md text-xs sm:text-sm text-on-surface uppercase tracking-wider font-bold">
                    Accreditation &amp; Liquidity Classification
                  </span>
                  <span className="font-caption text-xs text-amber-700 dark:text-amber-400 font-bold">Rule 506(c) Protocol</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="font-label-sm text-xs font-semibold text-on-surface block mb-2">
                      Verifiable Net Worth Tier
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "10m-25m", label: "$10M – $25M USD" },
                        { id: "25m-50m", label: "$25M – $50M USD" },
                        { id: "50m-plus", label: "$50M+ Sovereign" },
                      ].map((tier) => (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setNetWorthTier(tier.id)}
                          className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center ${
                            netWorthTier === tier.id
                              ? "bg-primary text-on-primary border-primary shadow-sm"
                              : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/40"
                          }`}
                        >
                          {tier.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-label-sm text-xs font-semibold text-on-surface block mb-2">
                      Immediate Liquid Escrow Allocation
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "5m-10m", label: "$5,000,000" },
                        { id: "10m-25m", label: "$10,000,000+" },
                        { id: "full-wire", label: "Full All-Cash Wire" },
                      ].map((liq) => (
                        <button
                          key={liq.id}
                          type="button"
                          onClick={() => setLiquidCapital(liq.id)}
                          className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center ${
                            liquidCapital === liq.id
                              ? "bg-primary text-on-primary border-primary shadow-sm"
                              : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/40"
                          }`}
                        >
                          {liq.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-label-sm text-xs font-semibold text-on-surface">Primary Source of Funds</label>
                    <Input
                      value={sourceOfFunds}
                      onChange={(e) => setSourceOfFunds(e.target.value)}
                      className="w-full bg-surface-container-low py-2.5 rounded-xl text-on-surface focus:bg-surface-container-lowest"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Jurisdiction & KYC */}
            {currentStep === 3 && (
              <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-6 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <span className="font-label-md text-xs sm:text-sm text-on-surface uppercase tracking-wider font-bold">
                    Bilateral KYC &amp; Anti-Money Laundering Dossier
                  </span>
                  <span className="font-caption text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <IconShieldCheck className="w-3.5 h-3.5" /> FINMA / FinCEN Standard
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
                    <IconCertificate className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-label-md text-sm font-bold text-on-surface">Digital Escrow Clearance</h4>
                      <p className="font-caption text-xs text-on-surface-variant mt-1 leading-relaxed">
                        Uploaded company articles, certificate of incumbency, and passport will be encrypted with your local keypair before transmission.
                      </p>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-outline-variant/50 rounded-2xl p-6 text-center bg-surface-container-low/40 hover:bg-surface-container-low transition-colors cursor-pointer">
                    <IconDeviceFloppy className="w-8 h-8 text-on-surface-variant mx-auto mb-2" />
                    <p className="font-label-md text-sm font-bold text-on-surface">Drag &amp; Drop Articles of Incorporation or Trust Agreement</p>
                    <p className="font-caption text-xs text-on-surface-variant mt-1">PDF or TIFF format up to 50 MB (AES-256 local client encryption)</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Hardware Pairing */}
            {currentStep === 4 && (
              <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-6 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <span className="font-label-md text-xs sm:text-sm text-on-surface uppercase tracking-wider font-bold">
                    Hardware Key Pairing &amp; Terminal Activation
                  </span>
                  <span className="font-caption text-xs text-emerald-700 dark:text-emerald-400 font-bold">FIPS 140-3 Active</span>
                </div>

                <div className="text-center py-6 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xl">
                    <IconShieldCheck className="w-8 h-8 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-xl font-bold text-on-surface">Ready to Finalize Accreditation</h3>
                    <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant max-w-md mt-1">
                      Your institutional profile will receive preliminary approval within 15 minutes, unlocking unredacted VDR data and bilateral closing rooms.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Row */}
            <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <IconArrowLeft className="w-4 h-4" />
                  <span>Previous Step</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <IconDeviceFloppy className="w-4 h-4" />
                  <span>Save Application Draft</span>
                </button>
              )}

              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 h-auto rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-label-md text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>
                  {isSubmitting
                    ? "Dispatching Dossier..."
                    : currentStep === 4
                    ? "Submit Membership & Enter Terminal"
                    : `Proceed to Step ${currentStep + 1}`}
                </span>
                <IconArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Bottom Helper */}
            <div className="text-center py-2">
              <p className="font-caption text-xs sm:text-sm text-on-surface-variant">
                Already have an approved institutional dossier?{" "}
                <Link
                  href="/login"
                  className="text-on-surface font-bold underline underline-offset-4 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Return to Terminal Sign-In
                </Link>
              </p>
            </div>
          </section>

          {/* Contextual Sidebar: Institutional Guarantees & Concierge (4 Cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Private Inventory Preview Card */}
            <div className="rounded-2xl overflow-hidden bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col">
              <div className="relative h-44 w-full">
                <img
                  className="w-full h-full object-cover"
                  alt="Ultra-luxury private architectural modern villa overlooking Lake Zurich"
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-white font-caption text-[11px] font-semibold flex items-center gap-1 border border-slate-700">
                  <IconShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Private Off-Market Listing</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="font-caption text-[10px] text-amber-400 uppercase tracking-wider font-bold">
                    Restricted Access Preview
                  </span>
                  <div className="font-headline-sm text-base font-bold tracking-tight">
                    The Zürichsee Sovereign Estate
                  </div>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between text-on-surface text-xs">
                  <span className="text-on-surface-variant">Target Valuation</span>
                  <span className="font-bold text-on-surface font-mono">CHF 84,500,000</span>
                </div>
                <div className="flex items-center justify-between text-on-surface text-xs">
                  <span className="text-on-surface-variant">Dealroom Capacity</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    3 Qualified Bids Pending
                  </span>
                </div>
                <p className="font-caption text-[11px] text-on-surface-variant pt-1 leading-relaxed">
                  Complete Steps 1 through 4 to decrypt structural blueprints, tax pass-through memos, and direct ownership deeds.
                </p>
              </div>
            </div>

            {/* Why Accreditation is Mandatory Card */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <IconShield className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                <h3 className="font-headline-sm text-base text-on-surface font-bold">Institutional Safeguards</h3>
              </div>
              <div className="flex flex-col gap-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center shrink-0 mt-0.5">
                    <IconLock className="w-3.5 h-3.5 text-on-surface" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-xs font-bold text-on-surface">$10M–$150M Non-Public Inventory</span>
                    <span className="font-caption text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                      Off-market trophies with high privacy mandates are shielded from public aggregator indexing.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center shrink-0 mt-0.5">
                    <IconBuildingBank className="w-3.5 h-3.5 text-on-surface" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-xs font-bold text-on-surface">Wire Escrow Integration</span>
                    <span className="font-caption text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                      Real-time synchronization with institutional escrow desks in Switzerland, Luxembourg, and New York.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center shrink-0 mt-0.5">
                    <IconShieldCheck className="w-3.5 h-3.5 text-on-surface" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-xs font-bold text-on-surface">Encrypted LOI Signatures</span>
                    <span className="font-caption text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                      Quantum-resistant cryptographic signatures protect your entity from unauthorized purchase leaks.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dedicated Relationship Director Concierge Card */}
            <div className="p-6 rounded-2xl bg-surface-container-low shadow-xs border border-outline-variant/30 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-caption text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Dedicated Syndicate Lead
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-caption text-[10px] font-bold">
                  On Call
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm border border-outline-variant/50">
                  <img
                    className="w-full h-full object-cover"
                    alt="Julian Vance-Moreau"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="font-label-md text-sm text-on-surface font-bold truncate">Julian Vance-Moreau</h4>
                  <span className="font-caption text-xs text-on-surface-variant truncate">Executive Director, UHNW Desk</span>
                  <span className="font-caption text-[11px] text-on-surface-variant font-medium">EstateHub Geneva &amp; Zürich</span>
                </div>
              </div>
              <p className="font-caption text-xs text-on-surface-variant leading-relaxed">
                Need bespoke onboarding through legal counsel, power of attorney, or specialized Swiss trust structuring?
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <a
                  href="tel:+41228190400"
                  className="w-full py-2 px-3 rounded-xl bg-surface-container-lowest hover:bg-surface text-on-surface transition-all font-label-sm text-xs font-semibold flex items-center justify-center gap-2 shadow-xs border border-outline-variant/30"
                >
                  <IconPhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct Signal: +41 22 819 0400</span>
                </a>
                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-xl bg-surface-container-highest hover:bg-surface-container text-on-surface transition-all font-label-sm text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <IconVideo className="w-3.5 h-3.5" />
                  <span>Book Secure Video Concierge</span>
                </button>
              </div>
            </div>

            {/* Compliance Mini-Seal */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
                <IconShield className="w-5 h-5 text-on-surface" />
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-xs font-bold text-on-surface">Zero-Knowledge Ledger</span>
                <span className="font-caption text-[11px] text-on-surface-variant">
                  Dossier documents are decrypted only by your verified private key.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
