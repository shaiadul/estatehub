"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconShieldLock,
  IconCheck,
  IconClock,
  IconBuildingBank,
  IconShieldCheck,
  IconUsb,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Fido2Modal } from "@/components/auth/fido2-modal"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export function ClosingDeskView() {
  const [wireDisbursed, setWireDisbursed] = React.useState(false)
  const [isFidoModalOpen, setIsFidoModalOpen] = React.useState(false)
  const [isSigning, setIsSigning] = React.useState(false)

  const handleDisburseWire = () => {
    setIsFidoModalOpen(true)
  }

  const handleFidoSuccess = () => {
    setIsFidoModalOpen(false)
    setIsSigning(true)
    setTimeout(() => {
      setIsSigning(false)
      setWireDisbursed(true)
    }, 1200)
  }

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-surface">
      <SectionWrapper fullWidth innerClassName="py-6 md:py-10 flex flex-col gap-6 md:gap-8">
        {/* Deal Command & Status Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-surface-container">
          <nav className="flex items-center gap-2 text-on-surface-variant text-xs flex-wrap font-mono">
            <Link href="/vdr" className="hover:text-on-surface transition-colors">
              Virtual Data Room
            </Link>
            <span>/</span>
            <span className="text-on-surface font-semibold">The Glass Promontory Sanctuary</span>
            <span>/</span>
            <span className="px-2 py-0.5 bg-surface-container-high rounded text-on-surface font-bold">
              PSA-BELAIR-2025-FINAL-098
            </span>
          </nav>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface shadow-xs text-xs font-semibold border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Escrow Window: <strong className="font-mono">47h 58m remaining</strong>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-mono">
              <IconShieldLock className="w-3.5 h-3.5 text-emerald-500" /> Audit #EH-88912-VDR
            </span>
          </div>
        </div>

        {/* Active Settlement Banner */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-xs border border-outline-variant/30 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 font-label-sm text-xs font-bold">
                Bilateral Digital Closing Active
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                Escrow Agent: First American Title • Cheryl Vance
              </span>
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Bilateral PSA Digital Closing &amp; Execution Room
            </h1>
            <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Cryptographic multisig settlement room for binding contract execution, earnest wire escrow lock, and final deed tokenization.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 shrink-0">
            <div>
              <span className="font-caption text-[11px] text-on-surface-variant block font-medium">Contract Price</span>
              <span className="font-headline-sm text-lg sm:text-xl font-extrabold text-on-surface font-mono">
                $9,850,000
              </span>
            </div>
            <div>
              <span className="font-caption text-[11px] text-on-surface-variant block font-medium">Earnest Wire (5%)</span>
              <span className="font-headline-sm text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                $492,500 <IconCheck className="w-3.5 h-3.5 inline stroke-[3]" />
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="font-caption text-[11px] text-on-surface-variant block font-medium">Balance to Close</span>
              <span className="font-headline-sm text-lg sm:text-xl font-extrabold text-amber-700 dark:text-amber-400 font-mono">
                $9,357,500
              </span>
            </div>
          </div>
        </div>

        {/* 4-Phase Bilateral Closing Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between h-36">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                <IconCheck className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase">
                Executed
              </span>
            </div>
            <div>
              <h4 className="font-label-md text-sm font-bold text-on-surface">1. Bilateral PSA Signed</h4>
              <p className="font-caption text-xs text-on-surface-variant mt-0.5">
                DocuSign hash verified by buyer and seller principals.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between h-36">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                <IconCheck className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase">
                Cleared
              </span>
            </div>
            <div>
              <h4 className="font-label-md text-sm font-bold text-on-surface">2. Earnest Wire Lock</h4>
              <p className="font-caption text-xs text-on-surface-variant mt-0.5">
                $492,500 USD held in sovereign escrow custody.
              </p>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border flex flex-col justify-between h-36 transition-all ${
              wireDisbursed
                ? "bg-surface-container-lowest border-emerald-500 shadow-sm"
                : "bg-primary text-on-primary border-primary shadow-md"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  wireDisbursed
                    ? "bg-emerald-600 text-white"
                    : "bg-amber-400 text-slate-950 animate-pulse"
                }`}
              >
                {wireDisbursed ? <IconCheck className="w-4 h-4" /> : "03"}
              </span>
              <span
                className={`text-[10px] font-mono font-bold uppercase ${
                  wireDisbursed ? "text-emerald-600" : "text-amber-400"
                }`}
              >
                {wireDisbursed ? "Cleared" : "Action Required"}
              </span>
            </div>
            <div>
              <h4 className={`font-label-md text-sm font-bold ${wireDisbursed ? "text-on-surface" : "text-white"}`}>
                3. Final Settlement Wire
              </h4>
              <p className={`font-caption text-xs mt-0.5 ${wireDisbursed ? "text-on-surface-variant" : "text-slate-300"}`}>
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
                    ? "bg-amber-400 text-slate-950"
                    : "bg-surface-container-highest text-on-surface-variant"
                }`}
              >
                04
              </span>
              <span
                className={`text-[10px] font-mono font-bold uppercase ${
                  wireDisbursed ? "text-amber-400" : "text-on-surface-variant"
                }`}
              >
                {wireDisbursed ? "Final Step" : "Pending Wire"}
              </span>
            </div>
            <div>
              <h4 className={`font-label-md text-sm font-bold ${wireDisbursed ? "text-white" : "text-on-surface"}`}>
                4. Deed Recording &amp; Keys
              </h4>
              <p className={`font-caption text-xs mt-0.5 ${wireDisbursed ? "text-slate-300" : "text-on-surface-variant"}`}>
                Autonomous biometric smart locks &amp; grant deed transfer.
              </p>
            </div>
          </div>
        </div>

        {/* Main Two-Column Execution Workstation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Escrow Wire Instructions & Signature Audit (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Wire Settlement Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <IconBuildingBank className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                  <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
                    Escrow Wire Settlement Instructions
                  </h3>
                </div>
                <Badge variant="outline" className="font-mono text-xs">
                  Routing: Fedwire #122000496
                </Badge>
              </div>

              {wireDisbursed ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex flex-col gap-3 animate-fade-in">
                  <div className="flex items-center gap-2 font-bold text-base">
                    <IconShieldCheck className="w-6 h-6" />
                    <span>Balance Wire Disbursement Complete ($9,357,500.00 USD)</span>
                  </div>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
                    Settlement transaction #FED-2025-081829 has been locked into escrow custody. County Recorder Title Grant Deed issuance in progress.
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <Link href="/dashboard">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl px-4 py-2 h-auto">
                        Access Facility Command &amp; Smart Keys
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                      <span className="text-[11px] text-on-surface-variant block font-medium">Beneficiary Name</span>
                      <span className="text-sm font-bold text-on-surface font-mono">First American Title Co. Escrow Trust</span>
                    </div>
                    <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                      <span className="text-[11px] text-on-surface-variant block font-medium">Escrow File Number</span>
                      <span className="text-sm font-bold text-on-surface font-mono">#FATCO-LA-88192-ZH</span>
                    </div>
                    <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                      <span className="text-[11px] text-on-surface-variant block font-medium">Depository Institution</span>
                      <span className="text-sm font-bold text-on-surface font-mono">JPMorgan Chase Bank, N.A.</span>
                    </div>
                    <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                      <span className="text-[11px] text-on-surface-variant block font-medium">Amount to Disburse</span>
                      <span className="text-sm font-bold text-amber-700 dark:text-amber-400 font-mono">
                        $9,357,500.00 USD
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <Button
                      onClick={handleDisburseWire}
                      disabled={isSigning}
                      className="w-full sm:w-auto px-6 py-3.5 h-auto rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold text-sm flex items-center justify-center gap-2 shadow-md"
                    >
                      <IconUsb className="w-4 h-4 text-amber-400" />
                      <span>{isSigning ? "Signing Multisig Nonce..." : "Authorize Wire with FIDO2 Hardware Key"}</span>
                    </Button>
                    <span className="text-xs text-on-surface-variant font-mono">
                      Requires FIDO2 biometric or PIN elevation
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bilateral Settlement Transaction Ledger */}
            <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-4">
              <h3 className="font-headline-sm text-base font-bold text-on-surface">
                Bilateral Ledger &amp; Title Verification Audit
              </h3>
              <div className="divide-y divide-surface-container text-xs">
                <div className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconCheck className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-on-surface">CLTA Preliminary Title Guarantee Endorsement</span>
                  </div>
                  <span className="font-mono text-on-surface-variant">Validated (First American Title)</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconCheck className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-on-surface">Buyer Earnest Escrow Wire ($492,500.00)</span>
                  </div>
                  <span className="font-mono text-on-surface-variant">Confirmed Fedwire #4819</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconCheck className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-on-surface">California Mansion Tax (Measure ULA) Assessment</span>
                  </div>
                  <span className="font-mono text-on-surface-variant">Escrow Calculated ($541,750)</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {wireDisbursed ? (
                      <IconCheck className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <IconClock className="w-4 h-4 text-amber-600" />
                    )}
                    <span className="font-semibold text-on-surface">Final Deed Transfer Recording</span>
                  </div>
                  <span className="font-mono text-on-surface-variant">
                    {wireDisbursed ? "Recorded: #CA-LA-2025-09912" : "Awaiting Wire Release"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Escrow Team & Counterparty (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-4">
              <span className="font-caption text-xs uppercase tracking-wider text-outline font-bold">
                Bilateral Counterparties
              </span>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-on-surface-variant block font-bold uppercase">Buyer Principal</span>
                    <span className="font-bold text-on-surface">Alpha Crest Sovereign Capital AG</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-bold">
                    Accredited
                  </span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-on-surface-variant block font-bold uppercase">Seller Estate</span>
                    <span className="font-bold text-on-surface">Bel Air Ridge Promontory Trust</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-bold">
                    Title Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-low shadow-xs border border-outline-variant/30 flex flex-col gap-3">
              <span className="font-caption text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                Escrow Support Concierge
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Direct encrypted line to Escrow Officer Cheryl Vance and Lead Broker Julian Vance-Moreau.
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <a
                  href="tel:+13105550199"
                  className="w-full text-center py-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface text-on-surface font-semibold text-xs transition-colors border border-outline-variant/30 shadow-xs"
                >
                  Call Escrow Officer: (310) 555-0199
                </a>
                <Link
                  href="/vdr"
                  className="w-full text-center py-2.5 rounded-xl bg-surface-container-highest hover:bg-surface-container text-on-surface font-semibold text-xs transition-colors"
                >
                  Return to Virtual Data Room
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* FIDO2 Modal */}
      <Fido2Modal
        isOpen={isFidoModalOpen}
        onClose={() => setIsFidoModalOpen(false)}
        onSuccess={handleFidoSuccess}
        entityName="Alpha Crest Sovereign Capital AG"
        tokenId="#AC-9842"
      />
    </div>
  )
}
