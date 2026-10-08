"use client"

import {
  IconAdjustments,
  IconCheck,
  IconAlertTriangle,
  IconLock,
  IconShieldCheck,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

  const handleSavePolicies = (e: React.FormEvent) => {
    e.preventDefault()
    triggerToast("Platform governance policies updated and broadcast to enclave nodes")
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSavePolicies} className="flex flex-col gap-6">
        {/* Core Financial & Transaction Parameters */}
        <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <IconAdjustments size={16} />
                </span>
                <h2 className="text-lg font-black text-on-surface">
                  Financial Protocol &amp; Fee Parameters
                </h2>
              </div>
              <p className="mt-1 text-xs text-on-surface-variant">
                Global transaction economics, automated protocol take-rate, and earnest custody requirements
              </p>
            </div>
            <Badge variant="gold" className="text-xs font-bold">
              Protocol v2.4
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 border-t border-outline-variant/20 pt-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-on-surface">
                Platform Settlement Fee Rate (%)
              </label>
              <Input
                type="number"
                step="0.1"
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
                value={policy.minEarnestPercent}
                onChange={(e) =>
                  setPolicy({ ...policy, minEarnestPercent: Number(e.target.value) })
                }
                className="h-10 rounded-xl text-xs font-semibold"
              />
              <p className="mt-1 text-[11px] text-on-surface-variant">
                Mandatory wire lock required to execute bilateral LOI agreement
              </p>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-on-surface">
                Accreditation Asset Threshold ($ USD)
              </label>
              <Input
                type="number"
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
                Minimum verified net worth required for private enclave listing access
              </p>
            </div>
          </div>
        </div>

        {/* Security & KYC Rigor Mode */}
        <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                <IconShieldCheck size={16} />
              </span>
              <h2 className="text-lg font-black text-on-surface">
                Identity &amp; Cryptographic Diligence Rigor
              </h2>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">
              AML screening parameters, FIDO2 biometric authentication requirements, and multi-sig authorization
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 border-t border-outline-variant/20 pt-4">
            <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4">
              <div>
                <h3 className="text-xs font-bold text-on-surface">
                  KYC / AML Accreditation Protocol
                </h3>
                <p className="mt-1 text-[11px] text-on-surface-variant">
                  Enforces automated background checks via FINMA / SEC accredited verification providers.
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
                className="mt-3 h-10 w-full rounded-xl border border-outline-variant/40 bg-surface-container px-3 text-xs font-bold text-on-surface focus:outline-none"
              >
                <option value="Tier 1 Multi-Sig Sovereign">
                  Tier 1 Multi-Sig Sovereign (FinCEN / Swiss FINMA Strict)
                </option>
                <option value="Standard Institutional">
                  Standard Institutional (Rule 506(c) Qualified Purchaser)
                </option>
              </select>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4">
              <div>
                <h3 className="text-xs font-bold text-on-surface">
                  Hardware Multi-Sig Security (HSM)
                </h3>
                <p className="mt-1 text-[11px] text-on-surface-variant">
                  Requires 2 of 3 root authority signatures for escrow wire disbursements above $10M USD.
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-500">
                  {policy.multiSigEnclave ? "ENFORCED ON-CHAIN" : "STANDARD DUAL-KEY"}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setPolicy({ ...policy, multiSigEnclave: !policy.multiSigEnclave })
                  }
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    policy.multiSigEnclave
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-container text-on-surface"
                  }`}
                >
                  {policy.multiSigEnclave ? "Active" : "Disabled"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Emergency Toggles */}
        <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
          <div>
            <h2 className="text-base font-bold text-on-surface">
              Emergency &amp; Platform Status Toggles
            </h2>
            <p className="text-xs text-on-surface-variant">
              Immediate operational overrides affecting all platform trading and public access
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 border-t border-outline-variant/20 pt-4">
            <div className="flex items-center justify-between rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-destructive text-xs">
                  <IconAlertTriangle size={15} />
                  <span>Platform Emergency Freeze</span>
                </div>
                <p className="mt-1 text-[11px] text-on-surface-variant">
                  Immediately halts all active escrow disbursements and LOI submissions.
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleEmergencyFreeze}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  policy.emergencyFreeze
                    ? "bg-destructive text-white shadow-md"
                    : "border border-destructive/40 bg-surface-container-lowest text-destructive hover:bg-destructive/10"
                }`}
              >
                {policy.emergencyFreeze ? "Freeze Active" : "Disengaged"}
              </button>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4">
              <div>
                <h3 className="text-xs font-bold text-on-surface">
                  Maintenance Mode
                </h3>
                <p className="mt-1 text-[11px] text-on-surface-variant">
                  Restricts public access to authenticated root administrators only.
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleMaintenanceMode}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  policy.maintenanceMode
                    ? "bg-secondary text-primary shadow-md"
                    : "border border-outline-variant/40 bg-surface-container-lowest text-on-surface hover:bg-surface-container"
                }`}
              >
                {policy.maintenanceMode ? "Maintenance On" : "Normal Live"}
              </button>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-end border-t border-outline-variant/20 pt-3">
            <Button
              type="submit"
              className="h-10 rounded-xl bg-primary px-6 text-xs font-bold text-primary-foreground hover:bg-primary/90"
            >
              <IconCheck size={16} />
              <span>Save &amp; Synchronize Platform Policies</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
