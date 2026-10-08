"use client"

import Link from "next/link"
import {
  IconShieldLock,
  IconAlertTriangle,
  IconSpeakerphone,
  IconUserPlus,
  IconArrowLeft,
  IconActivity,
  IconFlame,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import type { AdminState } from "./use-admin-state"

interface AdminHeaderProps {
  state: AdminState
}

export function AdminHeader({ state }: AdminHeaderProps) {
  const {
    policy,
    handleToggleEmergencyFreeze,
    setIsBroadcastModalOpen,
    setIsAddUserModalOpen,
    pendingApprovalsCount,
    pendingKycCount,
  } = state

  return (
    <SectionWrapper
      fullWidth
      className="border-b border-outline-variant/30 bg-surface-container-lowest shadow-xs"
      innerClassName="py-4"
    >
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        {/* Title & Enclave Security State */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/15 text-secondary shadow-inner">
            <IconShieldLock size={22} />
          </div>
          <div>
            <div className="mb-0.5 flex flex-wrap items-center gap-2">
              <Badge
                variant="gold"
                className="px-2.5 py-0.5 text-[10px] font-black tracking-widest uppercase"
              >
                Sovereign Master Authority
              </Badge>
              <div className="flex items-center gap-1.5 rounded-full bg-surface-container px-2.5 py-0.5 text-[11px] font-semibold text-on-surface-variant">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Enclave HSM Active</span>
              </div>
              {policy.emergencyFreeze && (
                <span className="flex items-center gap-1 rounded-full bg-destructive/20 px-2 py-0.5 text-[10px] font-black text-destructive animate-bounce">
                  <IconAlertTriangle size={12} />
                  <span>EMERGENCY FREEZE ENGAGED</span>
                </span>
              )}
            </div>
            <h1 className="text-xl font-black tracking-tight text-on-surface sm:text-2xl">
              Platform Administration &amp; Governance Center
            </h1>
          </div>
        </div>

        {/* Global Action CTAs & Emergency Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Back to Client Desk */}
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="flex h-10 items-center gap-1.5 rounded-xl border-outline-variant/40 px-3.5 text-xs font-bold hover:bg-surface-container"
            >
              <IconArrowLeft size={15} />
              <span>Client Dashboard</span>
            </Button>
          </Link>

          {/* Broadcast Announcement */}
          <Button
            variant="outline"
            onClick={() => setIsBroadcastModalOpen(true)}
            className="flex h-10 items-center gap-1.5 rounded-xl border-outline-variant/40 px-3.5 text-xs font-bold hover:bg-surface-container"
          >
            <IconSpeakerphone size={15} className="text-secondary" />
            <span>Broadcast</span>
          </Button>

          {/* Add User */}
          <Button
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex h-10 items-center gap-1.5 rounded-xl bg-primary px-3.5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
          >
            <IconUserPlus size={15} />
            <span>Authorize Member</span>
          </Button>

          {/* Emergency Freeze Toggle */}
          <button
            type="button"
            onClick={handleToggleEmergencyFreeze}
            className={`flex h-10 items-center gap-1.5 rounded-xl px-3.5 text-xs font-bold transition-all ${
              policy.emergencyFreeze
                ? "bg-destructive text-white shadow-lg animate-pulse"
                : "border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20"
            }`}
          >
            <IconAlertTriangle size={15} />
            <span>{policy.emergencyFreeze ? "Lift Freeze" : "Emergency Freeze"}</span>
          </button>
        </div>
      </div>

      {/* Alert Ribbon if pending items */}
      {(pendingApprovalsCount > 0 || pendingKycCount > 0) && (
        <div className="mt-3 flex flex-wrap items-center gap-3 rounded-2xl bg-secondary/10 px-3.5 py-2 text-xs text-on-secondary-container">
          <span className="flex items-center gap-1 font-bold">
            <IconActivity size={14} className="text-secondary" />
            <span>Operational Attention:</span>
          </span>
          {pendingApprovalsCount > 0 && (
            <span className="rounded-md bg-surface-container px-2 py-0.5 font-semibold">
              {pendingApprovalsCount} Listing{pendingApprovalsCount > 1 ? "s" : ""} Pending Audit
            </span>
          )}
          {pendingKycCount > 0 && (
            <span className="rounded-md bg-surface-container px-2 py-0.5 font-semibold">
              {pendingKycCount} User{pendingKycCount > 1 ? "s" : ""} Awaiting KYC Accreditation
            </span>
          )}
        </div>
      )}
    </SectionWrapper>
  )
}
