"use client"

import { IconCheck } from "@tabler/icons-react"

interface RegisterStepperProps {
  currentStep: number
  onStepClick: (step: number) => void
}

export function RegisterStepper({ currentStep, onStepClick }: RegisterStepperProps) {
  const steps = [
    { num: 1, code: "01", title: "Identity & Entity", sub: "Entity Dossier" },
    { num: 2, code: "02", title: "Accreditation", sub: "Tier Classification" },
    { num: 3, code: "03", title: "Jurisdiction & KYC", sub: "Bilateral Vault" },
    { num: 4, code: "04", title: "Hardware Pairing", sub: "FIDO2 / U2F Enclave" },
  ]
  return (
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
              onClick={() => onStepClick(step.num)}
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
  )
}