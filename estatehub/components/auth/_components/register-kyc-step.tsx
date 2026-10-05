"use client"

import { IconShieldCheck, IconCertificate, IconDeviceFloppy } from "@tabler/icons-react"

export function RegisterKycStep() {
  return (
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
  )
}