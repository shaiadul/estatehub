"use client"

import Link from "next/link"
import {
  IconBuildingBank,
  IconCheck,
  IconClock,
  IconShieldCheck,
  IconUsb,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface EscrowWorkstationProps {
  wireDisbursed: boolean
  isSigning: boolean
  onDisburseWire: () => void
}

export function EscrowWorkstation({ wireDisbursed, isSigning, onDisburseWire }: EscrowWorkstationProps) {
  const wireDetails = [
    {
      key: "beneficiary",
      label: "Beneficiary Name",
      value: "First American Title Co. Escrow Trust",
      valueClassName: "text-sm font-bold text-on-surface font-mono",
    },
    {
      key: "file",
      label: "Escrow File Number",
      value: "#FATCO-LA-88192-ZH",
      valueClassName: "text-sm font-bold text-on-surface font-mono",
    },
    {
      key: "depository",
      label: "Depository Institution",
      value: "JPMorgan Chase Bank, N.A.",
      valueClassName: "text-sm font-bold text-on-surface font-mono",
    },
    {
      key: "amount",
      label: "Amount to Disburse",
      value: "$9,357,500.00 USD",
      valueClassName: "text-sm font-bold text-on-secondary-container font-mono",
    },
  ]

  const ledgerRows = [
    {
      key: "title",
      label: "CLTA Preliminary Title Guarantee Endorsement",
      status: "Validated (First American Title)",
    },
    {
      key: "earnest",
      label: "Buyer Earnest Escrow Wire ($492,500.00)",
      status: "Confirmed Fedwire #4819",
    },
    {
      key: "tax",
      label: "California Mansion Tax (Measure ULA) Assessment",
      status: "Escrow Calculated ($541,750)",
    },
  ]

  return (
    <div className="lg:col-span-8 flex flex-col gap-6">
      <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <IconBuildingBank className="w-5 h-5 text-on-secondary-container" />
            <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
              Escrow Wire Settlement Instructions
            </h3>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            Routing: Fedwire #122000496
          </Badge>
        </div>

        {wireDisbursed ? (
          <div className="p-6 rounded-2xl bg-tertiary/10 border border-tertiary/30 text-on-tertiary-container flex flex-col gap-3 animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-base">
              <IconShieldCheck className="w-6 h-6" />
              <span>Balance Wire Disbursement Complete ($9,357,500.00 USD)</span>
            </div>
            <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
              Settlement transaction #FED-2025-081829 has been locked into escrow custody. County Recorder Title Grant Deed issuance in progress.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Link href="/dashboard">
                <Button className="bg-tertiary hover:bg-tertiary text-primary-foreground font-bold text-xs rounded-xl px-4 py-2 h-auto">
                  Access Facility Command &amp; Smart Keys
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {wireDetails.map(({ key, label, value, valueClassName }) => (
                <div key={key} className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <span className="text-[11px] text-on-surface-variant block font-medium">{label}</span>
                  <span className={valueClassName}>{value}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Button
                onClick={onDisburseWire}
                disabled={isSigning}
                className="w-full sm:w-auto px-6 py-3.5 h-auto rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <IconUsb className="w-4 h-4 text-secondary" />
                <span>{isSigning ? "Signing Multisig Nonce..." : "Authorize Wire with FIDO2 Hardware Key"}</span>
              </Button>
              <span className="text-xs text-on-surface-variant font-mono">
                Requires FIDO2 biometric or PIN elevation
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-4">
        <h3 className="font-headline-sm text-base font-bold text-on-surface">
          Bilateral Ledger &amp; Title Verification Audit
        </h3>
        <div className="divide-y divide-surface-container text-xs">
          {ledgerRows.map(({ key, label, status }) => (
            <div key={key} className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconCheck className="w-4 h-4 text-on-tertiary-container" />
                <span className="font-semibold text-on-surface">{label}</span>
              </div>
              <span className="font-mono text-on-surface-variant">{status}</span>
            </div>
          ))}
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {wireDisbursed ? (
                <IconCheck className="w-4 h-4 text-on-tertiary-container" />
              ) : (
                <IconClock className="w-4 h-4 text-on-secondary-container" />
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
  )
}
