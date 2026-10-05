"use client"

import { IconShieldCheck } from "@tabler/icons-react"

export function RegisterHardwareStep() {
  return (
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
  )
}