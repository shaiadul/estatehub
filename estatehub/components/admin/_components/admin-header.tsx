"use client"

import Link from "next/link"
import {
  IconShieldLock,
  IconAlertTriangle,
  IconSpeakerphone,
  IconUserPlus,
  IconArrowLeft,
  IconBuildingEstate,
  IconUsers,
  IconChevronRight,
} from "@tabler/icons-react"
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
    activeNav,
    setActiveNav,
    setPropertyStatusFilter,
    setUserRoleFilter,
    triggerToast,
  } = state

  const navTitles: Record<string, string> = {
    overview: "Platform Analytics & Telemetry",
    users: "User Governance & KYC Accreditation",
    properties: "Listing Curation & Moderation Queue",
    escrow: "Bilateral Escrow Custody Supervision",
    audit: "Cryptographic Security & Audit Trail",
    settings: "Platform Policies & Economics",
  }

  const handleReviewPendingListings = () => {
    setActiveNav("properties")
    setPropertyStatusFilter("Pending Review")
    triggerToast("Filtered to listings awaiting review")
  }

  const handleReviewPendingKyc = () => {
    setActiveNav("users")
    setUserRoleFilter("pending_kyc")
    triggerToast("Filtered to members awaiting KYC accreditation")
  }

  return (
    <SectionWrapper
      fullWidth
      className="border-b border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-md shadow-xs"
      innerClassName="py-4"
    >
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        {/* Clean Title & Hierarchy without extra badge clutter */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-outline-variant/30 bg-surface-container text-primary shadow-xs">
            <IconShieldLock size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
              <span className="font-semibold text-secondary">Platform Governance</span>
              <span>/</span>
              <span>Enclave Administration</span>
              <span className="inline-flex items-center gap-1.5 ml-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Live
              </span>
            </div>

            <h1 className="mt-0.5 text-xl font-bold tracking-tight text-on-surface sm:text-2xl">
              {navTitles[activeNav] || "Platform Administration"}
            </h1>
            <p className="mt-0.5 text-xs text-on-surface-variant">
              Asset onboarding, bilateral settlement arbitrations, and member accreditation
            </p>
          </div>
        </div>

        {/* Global Action CTAs & Emergency Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Back to Client Desk */}
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="flex h-9 items-center gap-1.5 rounded-xl border-outline-variant/40 px-3.5 text-xs font-semibold hover:bg-surface-container"
            >
              <IconArrowLeft size={14} />
              <span className="hidden sm:inline">Client</span>
              <span>Dashboard</span>
            </Button>
          </Link>

          {/* Broadcast Announcement */}
          <Button
            variant="outline"
            onClick={() => setIsBroadcastModalOpen(true)}
            className="flex h-9 items-center gap-1.5 rounded-xl border-outline-variant/40 px-3.5 text-xs font-semibold hover:bg-surface-container"
          >
            <IconSpeakerphone size={14} className="text-secondary" />
            <span>Broadcast</span>
          </Button>

          {/* Authorize Member */}
          <Button
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex h-9 items-center gap-1.5 rounded-xl bg-primary px-3.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 shadow-xs"
          >
            <IconUserPlus size={14} />
            <span>Authorize Member</span>
          </Button>

          {/* Emergency Freeze Button */}
          <button
            type="button"
            onClick={handleToggleEmergencyFreeze}
            className={`flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold transition-all ${
              policy.emergencyFreeze
                ? "bg-destructive text-white shadow-sm animate-pulse"
                : "border border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/15"
            }`}
          >
            <IconAlertTriangle size={14} />
            <span>{policy.emergencyFreeze ? "Freeze Active" : "Emergency Freeze"}</span>
          </button>
        </div>
      </div>

      {/* Emergency Freeze Alert Banner (Clean, conditional) */}
      {policy.emergencyFreeze && (
        <div className="mt-3 flex items-center justify-between rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2 text-xs font-semibold text-destructive">
          <div className="flex items-center gap-2">
            <IconAlertTriangle size={16} className="shrink-0" />
            <span>
              <strong>Emergency Freeze Engaged:</strong> All active escrow disbursements, contract executions, and earnest wire locks are paused.
            </span>
          </div>
          <button
            type="button"
            onClick={handleToggleEmergencyFreeze}
            className="underline font-bold text-xs hover:opacity-80 ml-2 shrink-0"
          >
            Lift Freeze
          </button>
        </div>
      )}

      {/* Operational Attention Notification (Clean bar, no extra badge stack) */}
      {(pendingApprovalsCount > 0 || pendingKycCount > 0) && !policy.emergencyFreeze && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-low px-3.5 py-2 text-xs text-on-surface">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold text-on-surface-variant flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span>Pending Action:</span>
            </span>

            {pendingApprovalsCount > 0 && (
              <button
                type="button"
                onClick={handleReviewPendingListings}
                className="flex items-center gap-1 font-medium hover:text-primary transition-colors text-left"
              >
                <IconBuildingEstate size={14} className="text-secondary" />
                <span>
                  <strong>{pendingApprovalsCount}</strong> listing{pendingApprovalsCount > 1 ? "s" : ""} awaiting audit
                </span>
                <IconChevronRight size={13} className="text-on-surface-variant" />
              </button>
            )}

            {pendingKycCount > 0 && (
              <button
                type="button"
                onClick={handleReviewPendingKyc}
                className="flex items-center gap-1 font-medium hover:text-primary transition-colors text-left"
              >
                <IconUsers size={14} className="text-amber-500" />
                <span>
                  <strong>{pendingKycCount}</strong> member{pendingKycCount > 1 ? "s" : ""} awaiting KYC
                </span>
                <IconChevronRight size={13} className="text-on-surface-variant" />
              </button>
            )}
          </div>

          <span className="hidden sm:inline font-mono text-[11px] text-on-surface-variant">
            Batch settlement: 20:00 UTC
          </span>
        </div>
      )}
    </SectionWrapper>
  )
}
