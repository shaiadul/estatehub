"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
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
  const NET_WORTH_TIERS = [
    { id: "10m-25m", label: "$10M – $25M USD" },
    { id: "25m-50m", label: "$25M – $50M USD" },
    { id: "50m-plus", label: "$50M+ Sovereign" },
  ]
  const LIQUID_TIERS = [
    { id: "5m-10m", label: "$5,000,000" },
    { id: "10m-25m", label: "$10,000,000+" },
    { id: "full-wire", label: "Full All-Cash Wire" },
  ]
  const steps = [
    { num: 1, code: "01", title: "Identity & Entity", sub: "Entity Dossier" },
    { num: 2, code: "02", title: "Accreditation", sub: "Tier Classification" },
    { num: 3, code: "03", title: "Jurisdiction & KYC", sub: "Bilateral Vault" },
    { num: 4, code: "04", title: "Hardware Pairing", sub: "FIDO2 / U2F Enclave" },
  ]
  const safeguards = [
    { Icon: IconLock, title: "$10M–$150M Non-Public Inventory", desc: "Off-market trophies with high privacy mandates are shielded from public aggregator indexing." },
    { Icon: IconBuildingBank, title: "Wire Escrow Integration", desc: "Real-time synchronization with institutional escrow desks in Switzerland, Luxembourg, and New York." },
    { Icon: IconShieldCheck, title: "Encrypted LOI Signatures", desc: "Quantum-resistant cryptographic signatures protect your entity from unauthorized purchase leaks." },
  ]
  const jurisdictions = [
    { value: "CH-ZH", label: "Switzerland (Kanton Zürich)" },
    { value: "US-DE", label: "United States (Delaware LLC / C-Corp)" },
    { value: "SG", label: "Singapore (ACRA Registered)" },
    { value: "UK", label: "United Kingdom (Companies House)" },
    { value: "AE-DIFC", label: "United Arab Emirates (DIFC Sovereign)" },
    { value: "LU", label: "Luxembourg (SCSp / SICAV)" },
    { value: "KY", label: "Cayman Islands (Exempted Enterprise)" },
  ]
  const phonePrefixes = [
    { value: "+41", label: "+41 (CH)" },
    { value: "+1", label: "+1 (US)" },
    { value: "+44", label: "+44 (UK)" },
    { value: "+65", label: "+65 (SG)" },
    { value: "+971", label: "+971 (UAE)" },
  ]
  const [, setSuccessComplete] = React.useState(false)

  const [netWorthTier, setNetWorthTier] = React.useState("25m-50m")
  const [liquidCapital, setLiquidCapital] = React.useState("10m-25m")
  const [sourceOfFunds, setSourceOfFunds] = React.useState("Operating Enterprise & Real Estate Divestment")

  const [cbQualified, setCbQualified] = React.useState(true)
  const [cbNda, setCbNda] = React.useState(true)
  const [cbOfac, setCbOfac] = React.useState(true)
  const disclosures = [
    {
      key: "qualified",
      checked: cbQualified,
      onChange: setCbQualified,
      title: "Qualified Purchaser Certification (Sec. 2(a)(51) Investment Company Act)",
      desc: "I certify that the applicant meets the legal definition under Section 2(a)(51) of the U.S. Investment Company Act or equivalent international sovereign thresholds (>$5M liquid investment threshold).",
    },
    {
      key: "nda",
      checked: cbNda,
      onChange: setCbNda,
      title: "Master Bilateral Non-Disclosure & Virtual Data Room (VDR) Protocol",
      desc: "I agree to keep all disclosed architectural floorplans, title deeds, owner entities, and structural valuations rigorously confidential without unauthorized third-party dispersal.",
    },
    {
      key: "ofac",
      checked: cbOfac,
      onChange: setCbOfac,
      title: "Automated FinCEN, OFAC, & Sanctions Clearance Authorization",
      desc: "Authorize automated cross-referencing against OFAC, FATF, and Interpol PEP watchlists to validate entity status prior to opening escrow gateways.",
    },
  ]

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
        
        <section className="w-full bg-surface-container-lowest p-4 md:p-6 rounded-2xl shadow-xs border border-outline-variant/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-surface-container">
            <div className="flex items-center gap-2">
              <span className="font-caption text-xs uppercase tracking-wider text-on-secondary-container font-bold">
                Terminal Tier: S-506(c)
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
              <span className="font-caption text-xs text-on-tertiary-container font-semibold">
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
            {steps.map((step) => {
              const isActive = currentStep === step.num
              const isDone = currentStep > step.num
              return (
                <div
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-on-primary shadow-sm"
                      : isDone
                      ? "bg-surface-container text-on-surface"
                      : "bg-surface-container-low text-on-surface-variant opacity-80"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-xs font-bold shrink-0 ${
                      isActive
                        ? "bg-surface-container-lowest text-primary"
                        : isDone
                        ? "bg-tertiary text-primary-foreground"
                        : "bg-surface-container-highest text-on-surface-variant"
                    }`}
                  >
                    {isDone ? <IconCheck className="w-4 h-4" /> : step.code}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-md text-xs sm:text-sm font-semibold truncate">{step.title}</span>
                    <span
                      className={`font-caption text-[11px] truncate ${
                        isActive ? "text-muted-foreground" : "text-on-surface-variant"
                      }`}
                    >
                      {step.sub}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <section className="lg:col-span-8 flex flex-col gap-6">
            
            <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-2 relative overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-on-secondary-container font-caption text-xs font-bold uppercase tracking-wider">
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

            
            {currentStep === 1 && (
              <div className="flex flex-col gap-6">
                
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
                                isSelected ? "bg-primary-foreground/10" : "bg-surface-container"
                              }`}
                            >
                              <Icon className={`w-5 h-5 ${isSelected ? "text-secondary" : "text-on-surface-variant"}`} />
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                isSelected
                                  ? "bg-secondary text-on-secondary"
                                  : "border border-outline-variant"
                              }`}
                            >
                              {isSelected && <IconCheck className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                          <div>
                            <h4
                              className={`font-label-md text-sm font-bold tracking-tight ${
                                isSelected ? "text-primary-foreground" : "text-on-surface"
                              }`}
                            >
                              {item.title}
                            </h4>
                            <p
                              className={`font-caption text-xs mt-1 ${
                                isSelected ? "text-muted-foreground" : "text-on-surface-variant"
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

                
                <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-5">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                    <span className="font-label-md text-xs sm:text-sm text-on-surface uppercase tracking-wider font-bold">
                      02. Entity &amp; Authorized Representative Mandate
                    </span>
                    <span className="font-caption text-xs text-on-surface-variant font-mono">AES-256 In-Flight Encryption</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
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

                    
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-xs text-on-surface font-semibold">Jurisdiction of Incorporation</label>
                      <Select value={jurisdiction} onValueChange={(val) => { if (val) setJurisdiction(val) }}>
                        <SelectTrigger className="w-full bg-surface-container-low rounded-xl">
                          <SelectValue placeholder="Select jurisdiction" />
                        </SelectTrigger>
                        <SelectContent>
                      {jurisdictions.map((j) => (
                        <SelectItem key={j.value} value={j.value}>
                          {j.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                      </Select>
                      <span className="font-caption text-[11px] text-on-surface-variant">Primary legal headquarters for bilateral jurisdiction.</span>
                    </div>

                    
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-xs text-on-surface font-semibold">Direct Signal-Verified Phone</label>
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-4">
                          <Select value={phonePrefix} onValueChange={(val) => { if (val) setPhonePrefix(val) }}>
                            <SelectTrigger className="w-full bg-surface-container-low rounded-xl text-xs">
                              <SelectValue placeholder="+41" />
                            </SelectTrigger>
                            <SelectContent>
                        {phonePrefixes.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
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

                
                <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <IconGavel className="w-5 h-5 text-primary" />
                    <span className="font-label-md text-xs sm:text-sm text-on-surface uppercase tracking-wider font-bold">
                      03. Preliminary Disclosures &amp; Enclave Mandates
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {disclosures.map((item) => (
                      <label
                        key={item.key}
                        className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low cursor-pointer transition-colors border border-outline-variant/20"
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={(e) => item.onChange(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-outline text-primary accent-primary cursor-pointer shrink-0"
                        />
                        <div className="flex flex-col">
                          <span className="font-body-md text-xs sm:text-sm text-on-surface font-semibold leading-snug">
                            {item.title}
                          </span>
                          <span className="font-caption text-xs text-on-surface-variant mt-0.5">{item.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            
            {currentStep === 2 && (
              <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-6 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <span className="font-label-md text-xs sm:text-sm text-on-surface uppercase tracking-wider font-bold">
                    Accreditation &amp; Liquidity Classification
                  </span>
                  <span className="font-caption text-xs text-on-secondary-container font-bold">Rule 506(c) Protocol</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="font-label-sm text-xs font-semibold text-on-surface block mb-2">
                      Verifiable Net Worth Tier
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {NET_WORTH_TIERS.map((tier) => (
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
                      {LIQUID_TIERS.map((liq) => (
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

            
            {currentStep === 3 && (
              <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-6 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <span className="font-label-md text-xs sm:text-sm text-on-surface uppercase tracking-wider font-bold">
                    Bilateral KYC &amp; Anti-Money Laundering Dossier
                  </span>
                  <span className="font-caption text-xs text-on-tertiary-container font-bold flex items-center gap-1">
                    <IconShieldCheck className="w-3.5 h-3.5" /> FINMA / FinCEN Standard
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
                    <IconCertificate className="w-5 h-5 text-on-secondary-container shrink-0 mt-0.5" />
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

            
            {currentStep === 4 && (
              <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-6 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <span className="font-label-md text-xs sm:text-sm text-on-surface uppercase tracking-wider font-bold">
                    Hardware Key Pairing &amp; Terminal Activation
                  </span>
                  <span className="font-caption text-xs text-on-tertiary-container font-bold">FIPS 140-3 Active</span>
                </div>

                <div className="text-center py-6 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xl">
                    <IconShieldCheck className="w-8 h-8 text-secondary" />
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

            
            <div className="text-center py-2">
              <p className="font-caption text-xs sm:text-sm text-on-surface-variant">
                Already have an approved institutional dossier?{" "}
                <Link
                  href="/login"
                  className="text-on-surface font-bold underline underline-offset-4 hover:text-on-secondary-container transition-colors"
                >
                  Return to Terminal Sign-In
                </Link>
              </p>
            </div>
          </section>

          
          <aside className="lg:col-span-4 flex flex-col gap-6">
            
            <div className="rounded-2xl overflow-hidden bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col">
              <div className="relative h-44 w-full">
                <Image
                  className="object-cover"
                  alt="Ultra-luxury private architectural modern villa overlooking Lake Zurich"
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/30 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-primary-container/80 backdrop-blur-md text-primary-foreground font-caption text-[11px] font-semibold flex items-center gap-1 border border-outline-variant">
                  <IconShieldCheck className="w-3.5 h-3.5 text-tertiary" />
                  <span>Private Off-Market Listing</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-primary-foreground">
                  <span className="font-caption text-[10px] text-secondary uppercase tracking-wider font-bold">
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
                  <span className="font-bold text-on-tertiary-container flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                    3 Qualified Bids Pending
                  </span>
                </div>
                <p className="font-caption text-[11px] text-on-surface-variant pt-1 leading-relaxed">
                  Complete Steps 1 through 4 to decrypt structural blueprints, tax pass-through memos, and direct ownership deeds.
                </p>
              </div>
            </div>

            
            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <IconShield className="w-5 h-5 text-on-secondary-container" />
                <h3 className="font-headline-sm text-base text-on-surface font-bold">Institutional Safeguards</h3>
              </div>
              <div className="flex flex-col gap-3.5">
                {safeguards.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center shrink-0 mt-0.5">
                      <item.Icon className="w-3.5 h-3.5 text-on-surface" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-xs font-bold text-on-surface">{item.title}</span>
                      <span className="font-caption text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="p-6 rounded-2xl bg-surface-container-low shadow-xs border border-outline-variant/30 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-caption text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Dedicated Syndicate Lead
                </span>
                <span className="px-2 py-0.5 rounded-full bg-tertiary/20 text-on-tertiary-container font-caption text-[10px] font-bold">
                  On Call
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm border border-outline-variant/50">
                  <Image
                    className="object-cover"
                    alt="Julian Vance-Moreau"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                    fill
                    sizes="48px"
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
                  <IconPhoneCall className="w-3.5 h-3.5 text-on-tertiary-container" />
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