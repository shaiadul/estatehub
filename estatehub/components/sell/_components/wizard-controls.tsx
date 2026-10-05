"use client"

import {
  IconChevronRight,
  IconChevronLeft,
  IconSparkles,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

interface WizardControlsProps {
  currentStep: number
  stepsLength: number
  onPrev: () => void
  onNext: () => void
  onPublish: () => void
}

export function WizardControls({
  currentStep,
  stepsLength,
  onPrev,
  onNext,
  onPublish,
}: WizardControlsProps) {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
      <Button
        type="button"
        variant="outline"
        size="lg"
        disabled={currentStep === 1}
        onClick={onPrev}
        className="gap-2"
      >
        <IconChevronLeft size={18} />
        <span>Previous Phase</span>
      </Button>

      {currentStep < stepsLength ? (
        <Button
          type="button"
          variant="gold"
          size="lg"
          onClick={onNext}
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
          onClick={onPublish}
          className="gap-2 font-extrabold shadow-lg bg-tertiary hover:bg-tertiary text-primary-foreground"
        >
          <IconSparkles size={18} />
          <span>Confirm &amp; Broadcast Syndicate</span>
        </Button>
      )}
    </div>
  )
}
