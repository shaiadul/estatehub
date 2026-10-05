"use client"

import { IconCheck } from "@tabler/icons-react"

interface ClosingStepperProps {
  wireDisbursed: boolean
}

export function ClosingStepper({ wireDisbursed }: ClosingStepperProps) {
  const completedPhases = [
    {
      key: "psa",
      status: "Executed",
      title: "1. Bilateral PSA Signed",
      desc: "DocuSign hash verified by buyer and seller principals.",
    },
    {
      key: "earnest",
      status: "Cleared",
      title: "2. Earnest Wire Lock",
      desc: "$492,500 USD held in sovereign escrow custody.",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {completedPhases.map(({ key, status, title, desc }) => (
        <div key={key} className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="w-7 h-7 rounded-full bg-tertiary text-primary-foreground flex items-center justify-center text-xs font-bold">
              <IconCheck className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-mono text-on-tertiary-container font-bold uppercase">
              {status}
            </span>
          </div>
          <div>
            <h4 className="font-label-md text-sm font-bold text-on-surface">{title}</h4>
            <p className="font-caption text-xs text-on-surface-variant mt-0.5">
              {desc}
            </p>
          </div>
        </div>
      ))}

      <div
        className={`p-4 rounded-xl border flex flex-col justify-between h-36 transition-all ${
          wireDisbursed
            ? "bg-surface-container-lowest border-tertiary shadow-sm"
            : "bg-primary text-on-primary border-primary shadow-md"
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              wireDisbursed
                ? "bg-tertiary text-primary-foreground"
                : "bg-secondary text-on-secondary animate-pulse"
            }`}
          >
            {wireDisbursed ? <IconCheck className="w-4 h-4" /> : "03"}
          </span>
          <span
            className={`text-[10px] font-mono font-bold uppercase ${
              wireDisbursed ? "text-on-tertiary-container" : "text-secondary"
            }`}
          >
            {wireDisbursed ? "Cleared" : "Action Required"}
          </span>
        </div>
        <div>
          <h4 className={`font-label-md text-sm font-bold ${wireDisbursed ? "text-on-surface" : "text-primary-foreground"}`}>
            3. Final Settlement Wire
          </h4>
          <p className={`font-caption text-xs mt-0.5 ${wireDisbursed ? "text-on-surface-variant" : "text-muted-foreground"}`}>
            {wireDisbursed
              ? "$9,357,500 Fedwire successfully cleared and audited."
              : "Execute balance wire authorization to title escrow."}
          </p>
        </div>
      </div>

      <div
        className={`p-4 rounded-xl border flex flex-col justify-between h-36 ${
          wireDisbursed
            ? "bg-primary text-on-primary border-primary shadow-md animate-fade-in"
            : "bg-surface-container-low text-on-surface-variant opacity-80 border-outline-variant/30"
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              wireDisbursed
                ? "bg-secondary text-on-secondary"
                : "bg-surface-container-highest text-on-surface-variant"
            }`}
          >
            04
          </span>
          <span
            className={`text-[10px] font-mono font-bold uppercase ${
              wireDisbursed ? "text-secondary" : "text-on-surface-variant"
            }`}
          >
            {wireDisbursed ? "Final Step" : "Pending Wire"}
          </span>
        </div>
        <div>
          <h4 className={`font-label-md text-sm font-bold ${wireDisbursed ? "text-primary-foreground" : "text-on-surface"}`}>
            4. Deed Recording &amp; Keys
          </h4>
          <p className={`font-caption text-xs mt-0.5 ${wireDisbursed ? "text-muted-foreground" : "text-on-surface-variant"}`}>
            Autonomous biometric smart locks &amp; grant deed transfer.
          </p>
        </div>
      </div>
    </div>
  )
}
