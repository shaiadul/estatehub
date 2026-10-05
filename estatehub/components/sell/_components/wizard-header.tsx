"use client"

import Link from "next/link"
import {
  IconCheck,
  IconChevronRight,
  IconBookmark,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import type { WizardStep } from "./types"

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

      <div className="pt-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center min-w-[640px] justify-between pb-2">
          {steps.map((st) => {
            const isDone = st.num < currentStep
            const isActive = st.num === currentStep
            return (
              <div
                key={st.num}
                onClick={() => onStepClick(st.num)}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isDone
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : isActive
                      ? "bg-secondary-container text-on-secondary-fixed ring-2 ring-secondary shadow-md scale-105"
                      : "bg-surface-container text-on-surface-variant group-hover:bg-surface-container-high"
                  }`}
                >
                  {isDone ? <IconCheck size={16} className="text-tertiary" /> : st.num}
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
    </SectionWrapper>
  )
}
