"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { IconArrowRight, IconArrowLeft, IconDeviceFloppy } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n"
import {
  RegisterStepper,
  RegisterIdentityStep,
  RegisterAccreditationStep,
  RegisterKycStep,
  RegisterHardwareStep,
  RegisterSidebar,
} from "./_components"

export function RegisterView() {
  const { t } = useI18n()
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
  const [phone, setPhone] = React.useState("310 982 4410")
  const [email, setEmail] = React.useState(
    isSellerMode ? "marcus.sterling@belair-trust.com" : "h.stauffen@alphacrest.ch"
  )

  const [cbQualified, setCbQualified] = React.useState(true)
  const [cbNda, setCbNda] = React.useState(true)
  const [cbOfac, setCbOfac] = React.useState(true)

  const [netWorthTier, setNetWorthTier] = React.useState("25m-50m")
  const [liquidCapital, setLiquidCapital] = React.useState("10m-25m")
  const [sourceOfFunds, setSourceOfFunds] = React.useState("Operating Enterprise & Real Estate Divestment")

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setIsSubmitting(true)
      setTimeout(() => {
        login(email, roleParam)
        setIsSubmitting(false)
        router.push(redirectParam)
      }, 1000)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-surface">
      <SectionWrapper
        fullWidth
        innerClassName="py-8 md:py-12 flex flex-col gap-6 md:gap-8"
      >
        {/* Reusable Stepper Navigation */}
        <RegisterStepper
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        />

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Main Column */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            {/* Header Description Card */}
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

            {/* Reusable Step 1: Identity & Authorized Representative */}
            {currentStep === 1 && (
              <RegisterIdentityStep
                selectedEntityClass={selectedEntityClass}
                onEntityClassChange={setSelectedEntityClass}
                fullName={fullName}
                onFullNameChange={setFullName}
                title={title}
                onTitleChange={setTitle}
                entityName={entityName}
                onEntityNameChange={setEntityName}
                jurisdiction={jurisdiction}
                onJurisdictionChange={setJurisdiction}
                phonePrefix={phonePrefix}
                onPhonePrefixChange={setPhonePrefix}
                phone={phone}
                onPhoneChange={setPhone}
                email={email}
                onEmailChange={setEmail}
                cbQualified={cbQualified}
                onCbQualifiedChange={setCbQualified}
                cbNda={cbNda}
                onCbNdaChange={setCbNda}
                cbOfac={cbOfac}
                onCbOfacChange={setCbOfac}
              />
            )}

            {/* Reusable Step 2: Accreditation & Wealth */}
            {currentStep === 2 && (
              <RegisterAccreditationStep
                netWorthTier={netWorthTier}
                onNetWorthTierChange={setNetWorthTier}
                liquidCapital={liquidCapital}
                onLiquidCapitalChange={setLiquidCapital}
                sourceOfFunds={sourceOfFunds}
                onSourceOfFundsChange={setSourceOfFunds}
              />
            )}

            {/* Reusable Step 3: Bilateral KYC & Dossier */}
            {currentStep === 3 && <RegisterKycStep />}

            {/* Reusable Step 4: Hardware Pairing & Security */}
            {currentStep === 4 && <RegisterHardwareStep />}

            {/* Action Bar */}
            <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <IconArrowLeft className="w-4 h-4" />
                  <span>{t("reg.previousStep", "Previous Step")}</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <IconDeviceFloppy className="w-4 h-4" />
                  <span>{t("reg.saveDraft", "Save Application Draft")}</span>
                </button>
              )}

              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 h-auto rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-label-md text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>
                  {isSubmitting
                    ? t("reg.dispatchingDossier", "Dispatching Dossier & Clearance...")
                    : currentStep === 4
                    ? t("reg.submitMembership", "Submit Membership Application")
                    : `${t("reg.proceedToStep", "Proceed to Step")} 0${currentStep + 1}`}
                </span>
                <IconArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </section>

          {/* Reusable Right Sidebar */}
          <RegisterSidebar />
        </div>
      </SectionWrapper>
    </div>
  )
}