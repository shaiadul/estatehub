"use client"

import * as React from "react"
import {
  IconAdjustments,
  IconCheck,
  IconAlertTriangle,
  IconShieldCheck,
  IconCalculator,
  IconLock,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import type { AdminState } from "./use-admin-state"
import type { PlatformPolicy } from "./types"

interface PlatformSettingsTabProps {
  state: AdminState
}

export function PlatformSettingsTab({ state }: PlatformSettingsTabProps) {
  const {
    policy,
    setPolicy,
    handleToggleEmergencyFreeze,
    handleToggleMaintenanceMode,
    triggerToast,
  } = state

  const [sampleDealValue, setSampleDealValue] = React.useState(15000000)

  const handleSavePolicies = (e: React.FormEvent) => {
    e.preventDefault()
    triggerToast("Platform governance policies updated and broadcast to all enclave validator nodes")
  }

  const calculatedFee = (sampleDealValue * policy.platformFeeRate) / 100
  const calculatedEarnest = (sampleDealValue * policy.minEarnestPercent) / 100

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSavePolicies} className="flex flex-col gap-6">
        {/* Core Financial & Transaction Parameters */}
        <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <IconAdjustments size={16} />
                </span>
                <CardTitle className="text-base font-bold text-on-surface">
                  Financial Protocol &amp; Fee Parameters
                </CardTitle>
              </div>
              <CardDescription className="text-xs text-on-surface-variant">
                Global transaction economics, automated protocol take-rate, and earnest custody requirements
              </CardDescription>
            </div>
            <Badge variant="gold" className="text-xs font-bold font-mono">
              Protocol v2.4 (Active)
            </Badge>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 border-t border-outline-variant/20 pt-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-on-surface">
                  Platform Settlement Fee Rate (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="10"
                  value={policy.platformFeeRate}
                  onChange={(e) =>
                    setPolicy({ ...policy, platformFeeRate: Number(e.target.value) })
                  }
                  className="h-10 rounded-xl text-xs font-semibold"
                />
                <p className="mt-1 text-[11px] text-on-surface-variant">
                  Standard deduction applied at escrow closing disbursement (default: 2.50%)
                </p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-on-surface">
                  Minimum Earnest Deposit (%)
                </label>
                <Input
                  type="number"
                  step="1"
                  min="5"
                  max="50"
                  value={policy.minEarnestPercent}
                  onChange={(e) =>
                    setPolicy({ ...policy, minEarnestPercent: Number(e.target.value) })
                  }
                  className="h-10 rounded-xl text-xs font-semibold"
                />
                <p className="mt-1 text-[11px] text-on-surface-variant">
                  Minimum required lockup for bilateral LOI binding verification (default: 10%)
                </p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-on-surface">
                  Minimum Accreditation Threshold ($)
                </label>
                <Input
                  type="number"
                  step="500000"
                  min="1000000"
                  value={policy.minAccreditationThreshold}
                  onChange={(e) =>
                    setPolicy({
                      ...policy,
                      minAccreditationThreshold: Number(e.target.value),
                    })
                  }
                  className="h-10 rounded-xl text-xs font-semibold"
                />
                <p className="mt-1 text-[11px] text-on-surface-variant">
                  Proof-of-funds threshold required to unlock private viewing rooms
                </p>
              </div>
            </div>

            {/* Interactive Fee Simulator */}
            <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-4">
              <div className="flex items-center gap-2 mb-3">
                <IconCalculator size={16} className="text-secondary" />
                <span className="font-bold text-xs text-on-surface">
                  Real-Time Protocol Fee &amp; Earnest Simulator
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 items-center">
                <div>
                  <span className="text-[11px] font-semibold text-on-surface-variant">Sample Trophy Deal Value</span>
                  <Input
                    type="number"
                    step="1000000"
                    value={sampleDealValue}
                    onChange={(e) => setSampleDealValue(Number(e.target.value))}
                    className="mt-1 h-9 rounded-xl font-mono text-xs font-bold bg-surface-container-lowest"
                  />
                </div>

                <div className="rounded-xl bg-surface-container-lowest/80 p-3 border border-outline-variant/30">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">Protocol Fee Captured</span>
                  <p className="font-mono text-lg font-black text-on-surface">
                    ${(calculatedFee / 1000).toLocaleString()}k
                  </p>
                  <span className="text-[10px] text-emerald-500 font-semibold">{policy.platformFeeRate}% Take-Rate</span>
                </div>

                <div className="rounded-xl bg-surface-container-lowest/80 p-3 border border-outline-variant/30">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">Required Earnest Deposit</span>
                  <p className="font-mono text-lg font-black text-secondary">
                    ${(calculatedEarnest / 1000000).toFixed(2)}M
                  </p>
                  <span className="text-[10px] text-on-surface-variant font-semibold">{policy.minEarnestPercent}% POF Wire</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Access Policies */}
        <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconShieldCheck size={16} />
              </span>
              <CardTitle className="text-base font-bold text-on-surface">
                Access Security, KYC &amp; Diligence Policies
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-on-surface-variant">
              Rules governing member onboarding, proof of funds attestations, and enclave consensus
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 border-t border-outline-variant/20 pt-4">
              <div className="flex flex-col justify-between gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low/60 p-4">
                <div>
                  <h4 className="text-xs font-bold text-on-surface">
                    KYC Diligence Rigor Level
                  </h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    Select accreditation notary standard for incoming high-net-worth investors
                  </p>
                </div>
                <select
                  value={policy.kycRigorLevel}
                  onChange={(e) =>
                    setPolicy({
                      ...policy,
                      kycRigorLevel: e.target.value as PlatformPolicy["kycRigorLevel"],
                    })
                  }
                  className="h-9 rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-3 text-xs font-semibold text-on-surface focus:outline-none"
                >
                  <option value="Tier 1 Multi-Sig Sovereign">Tier 1 Multi-Sig Sovereign ($25M+)</option>
                  <option value="Standard Institutional">Standard Institutional ($10M+)</option>
                </select>
              </div>

              <div className="flex items-start justify-between gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low/60 p-4">
                <div>
                  <h4 className="text-xs font-bold text-on-surface">
                    Multi-Sig Enclave Custody Requirement
                  </h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    Require quorum of 2-of-3 institutional keys before releasing closing escrow
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={policy.multiSigEnclave}
                  onChange={(e) =>
                    setPolicy({ ...policy, multiSigEnclave: e.target.checked })
                  }
                  className="mt-1 h-5 w-5 accent-secondary rounded cursor-pointer"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Global Enclave Controls: Maintenance & Freeze */}
        <Card className="border-destructive/30 bg-destructive/5 shadow-xs">
          <CardHeader>
            <div className="flex items-center gap-2">
              <IconAlertTriangle size={18} className="text-destructive" />
              <CardTitle className="text-base font-bold text-destructive">
                Emergency Authority &amp; System Killswitches
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-on-surface-variant">
              Immediate operational overrides reserved for board emergency governance
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col justify-between gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
                <div>
                  <h4 className="text-xs font-bold text-on-surface">
                    Global Escrow Freeze
                  </h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    Instantly freeze all earnest fund disbursements and bilateral escrow wire releases.
                  </p>
                </div>
                <Button
                  type="button"
                  variant={policy.emergencyFreeze ? "destructive" : "outline"}
                  size="sm"
                  onClick={handleToggleEmergencyFreeze}
                  className="w-full text-xs font-bold rounded-xl"
                >
                  {policy.emergencyFreeze ? "Lift Emergency Freeze" : "Engage Emergency Freeze"}
                </Button>
              </div>

              <div className="flex flex-col justify-between gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
                <div>
                  <h4 className="text-xs font-bold text-on-surface">
                    Enclave Maintenance Lock
                  </h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    Place public radar in read-only mode for scheduled cryptographic audit upgrades.
                  </p>
                </div>
                <Button
                  type="button"
                  variant={policy.maintenanceMode ? "secondary" : "outline"}
                  size="sm"
                  onClick={handleToggleMaintenanceMode}
                  className="w-full text-xs font-bold rounded-xl"
                >
                  {policy.maintenanceMode ? "Exit Maintenance" : "Enable Maintenance Mode"}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <Button
                type="submit"
                className="h-10 rounded-xl bg-primary px-6 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90"
              >
                <IconCheck size={16} />
                <span>Save Platform Policies</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
