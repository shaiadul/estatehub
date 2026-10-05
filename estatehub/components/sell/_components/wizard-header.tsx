"use client"

import Link from "next/link"
import {
  IconCheck,
  IconChevronRight,
  IconBookmark,
  IconMapPin,
  IconBed,
  IconUpload,
  IconCurrencyDollar,
  IconShieldCheck,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import type { WizardStep } from "./types"

const STEP_META: Record<number, { Icon: typeof IconMapPin; blurb: string }> = {
  1: { Icon: IconMapPin, blurb: "Type, title & parcel" },
  2: { Icon: IconBed, blurb: "Scale & finishes" },
  3: { Icon: IconUpload, blurb: "Photos & 3D tour" },
  4: { Icon: IconCurrencyDollar, blurb: "Price & escrow" },
  5: { Icon: IconShieldCheck, blurb: "Verify & broadcast" },
}

interface WizardHeaderProps {
  currentStep: number
  steps: WizardStep[]
  completionPercentage: number
  onStepClick: (step: number) => void
  onSaveDraft: () => void
}

export function WizardHeader({
  currentStep,
  steps,
  completionPercentage,
  onStepClick,
  onSaveDraft,
}: WizardHeaderProps) {
  return (
    <SectionWrapper fullWidth className="bg-surface-container-lowest border-b border-outline-variant/30 shadow-xs" innerClassName="py-5">
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
            onClick={onSaveDraft}
            className="gap-1.5 text-xs"
          >
            <IconBookmark size={15} />
            <span>Save Draft</span>
          </Button>
        </div>
      </div>

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

        <div className="flex items-center gap-4 bg-surface-container-low px-5 py-3 rounded-2xl border border-outline-variant/30 shrink-0">
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
              Listing Progress
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
                  onClick={() => onStepClick(st.num)}
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
  )
}
