"use client"

import Image from "next/image"
import {
  IconX,
  IconSpeakerphone,
  IconUserPlus,
  IconBuildingEstate,
  IconScale,
  IconShieldLock,
  IconShieldCheck,
  IconCheck,
  IconStar,
  IconLock,
  IconCube,
  IconCopy,
  IconBuildingBank,
  IconMapPin,
  IconUserCheck,
  IconAlertTriangle,
  IconFileText,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { AdminState } from "./use-admin-state"
import type { AdminUserItem } from "./types"

interface AdminModalsProps {
  state: AdminState
}

export function AdminModals({ state }: AdminModalsProps) {
  const {
    // Add user modal
    isAddUserModalOpen,
    setIsAddUserModalOpen,
    newUserName,
    setNewUserName,
    newUserEmail,
    setNewUserEmail,
    newUserRole,
    setNewUserRole,
    newUserTier,
    setNewUserTier,
    handleCreateUser,

    // Broadcast modal
    isBroadcastModalOpen,
    setIsBroadcastModalOpen,
    broadcastSubject,
    setBroadcastSubject,
    broadcastMessage,
    setBroadcastMessage,
    handleSendBroadcast,

    // Inspection modals
    selectedProperty,
    setSelectedProperty,
    handleDirectPropertyStatus,
    handleToggleFeaturedProperty,
    handleDelistProperty,

    selectedUser,
    setSelectedUser,
    handleDirectKycUpdate,
    handleChangeUserRole,
    handleDeleteUser,

    selectedEscrow,
    setSelectedEscrow,
    handleVerifyEarnestWire,
    handleAdvanceEscrowStage,
    handleReleaseFunds,

    selectedAudit,
    setSelectedAudit,

    triggerToast,
  } = state

  return (
    <>
      {/* 1. ENROLL MEMBER MODAL */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IconUserPlus size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-on-surface">
                    Authorize New Enclave Member
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Provision credentials, accreditation tier, and role permissions
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddUserModalOpen(false)}
                className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container"
              >
                <IconX size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="mt-4 flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Full Name / Principal Officer *
                </label>
                <Input
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Baroness Evelyn Rothschild"
                  className="h-10 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Institutional / Family Office Email *
                </label>
                <Input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. e.rothschild@geneva-trust.ch"
                  className="h-10 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Platform Role
                  </label>
                  <select
                    value={newUserRole}
                    onChange={(e) =>
                      setNewUserRole(e.target.value as AdminUserItem["role"])
                    }
                    className="h-10 w-full rounded-xl border border-outline-variant/40 bg-surface-container-low px-3 text-xs font-semibold text-on-surface focus:outline-none"
                  >
                    <option value="buyer">Accredited Buyer</option>
                    <option value="seller">Estate Seller</option>
                    <option value="broker">Licensed Broker Partner</option>
                    <option value="admin">Platform Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Accreditation Tier
                  </label>
                  <select
                    value={newUserTier}
                    onChange={(e) =>
                      setNewUserTier(
                        e.target.value as AdminUserItem["accreditationTier"]
                      )
                    }
                    className="h-10 w-full rounded-xl border border-outline-variant/40 bg-surface-container-low px-3 text-xs font-semibold text-on-surface focus:outline-none"
                  >
                    <option value="Tier 1 - Sovereign ($25M+)">
                      Tier 1 - Sovereign ($25M+)
                    </option>
                    <option value="Tier 2 - Institutional ($10M+)">
                      Tier 2 - Institutional ($10M+)
                    </option>
                    <option value="Tier 3 - Accredited ($5M+)">
                      Tier 3 - Accredited ($5M+)
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2 border-t border-outline-variant/20 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="h-10 rounded-xl text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                >
                  Authorize &amp; Provision Member
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. BROADCAST MODAL */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                  <IconSpeakerphone size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-on-surface">
                    Platform Enclave Broadcast
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Transmit an urgent bulletin to all accredited participants
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsBroadcastModalOpen(false)}
                className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container"
              >
                <IconX size={18} />
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="mt-4 flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Broadcast Subject *
                </label>
                <Input
                  required
                  value={broadcastSubject}
                  onChange={(e) => setBroadcastSubject(e.target.value)}
                  placeholder="e.g. Scheduled Settlement Window Maintenance"
                  className="h-10 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Bulletin Notice Content *
                </label>
                <textarea
                  required
                  rows={4}
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="Enter notice details for syndicate partners and institutional buyers..."
                  className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low p-3 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="mt-4 flex items-center justify-end gap-2 border-t border-outline-variant/20 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="h-10 rounded-xl text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 rounded-xl bg-secondary px-5 text-xs font-bold text-primary hover:bg-secondary/90 shadow-sm"
                >
                  Transmit Bulletin
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. PROPERTY INSPECTION & DILIGENCE MODAL */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-y-auto rounded-3xl border border-outline-variant/30 bg-surface-container-lowest shadow-2xl">
            {/* Modal Image Header */}
            <div className="relative h-64 w-full overflow-hidden bg-surface-container">
              <Image
                src={selectedProperty.image}
                alt={selectedProperty.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

              <button
                type="button"
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 backdrop-blur-xs transition-colors"
              >
                <IconX size={18} />
              </button>

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge variant="outline" className="bg-black/60 text-white backdrop-blur-xs font-mono">
                  {selectedProperty.category}
                </Badge>
                <Badge
                  variant={selectedProperty.status === "Active" ? "gold" : "outline"}
                  className="bg-black/60 text-white backdrop-blur-xs font-bold"
                >
                  {selectedProperty.status}
                </Badge>
              </div>

              <div className="absolute right-4 bottom-4 left-4 text-white">
                <span className="font-mono text-2xl font-black">
                  ${(selectedProperty.price / 1000000).toFixed(2)}M USD
                </span>
                <h2 className="text-lg font-black tracking-tight">{selectedProperty.title}</h2>
                <p className="flex items-center gap-1 text-xs text-white/80">
                  <IconMapPin size={13} />
                  <span>{selectedProperty.location} • ID: {selectedProperty.id}</span>
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col gap-5 p-6">
              {/* Seller Information Card */}
              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                  Seller Principal &amp; Custody Entity
                </span>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-sm text-on-surface">{selectedProperty.sellerName}</p>
                    <p className="text-xs text-on-surface-variant font-mono">{selectedProperty.sellerEntity}</p>
                  </div>
                  <span className="font-mono text-[11px] text-on-surface-variant">
                    Submitted: {selectedProperty.submittedDate}
                  </span>
                </div>
              </div>

              {/* Diligence Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Diligence Audit Verification Checklist
                </h4>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-low p-3 text-xs">
                    <span className="flex items-center gap-2">
                      <IconCheck size={15} className="text-emerald-500" />
                      <span className="font-semibold text-on-surface">Title Deed Notary</span>
                    </span>
                    <span className="font-mono text-[10px] text-emerald-500 font-bold">VERIFIED</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-low p-3 text-xs">
                    <span className="flex items-center gap-2">
                      <IconLock size={15} className={selectedProperty.vdrAudited ? "text-emerald-500" : "text-amber-500"} />
                      <span className="font-semibold text-on-surface">VDR Encrypted Room</span>
                    </span>
                    <span className={`font-mono text-[10px] font-bold ${selectedProperty.vdrAudited ? "text-emerald-500" : "text-amber-500"}`}>
                      {selectedProperty.vdrAudited ? "ACTIVE" : "INCOMPLETE"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-low p-3 text-xs">
                    <span className="flex items-center gap-2">
                      <IconCube size={15} className={selectedProperty.lidarScanAvailable ? "text-secondary" : "text-on-surface-variant"} />
                      <span className="font-semibold text-on-surface">3D LiDAR Spatial Scan</span>
                    </span>
                    <span className={`font-mono text-[10px] font-bold ${selectedProperty.lidarScanAvailable ? "text-secondary" : "text-on-surface-variant"}`}>
                      {selectedProperty.lidarScanAvailable ? "MAPPED" : "STANDARD"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-low p-3 text-xs">
                    <span className="flex items-center gap-2">
                      <IconCheck size={15} className="text-emerald-500" />
                      <span className="font-semibold text-on-surface">AML / Sanctions Screening</span>
                    </span>
                    <span className="font-mono text-[10px] text-emerald-500 font-bold">CLEARED</span>
                  </div>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-outline-variant/20 pt-4">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleFeaturedProperty(selectedProperty.id)}
                    className="h-9 rounded-xl border-outline-variant/40 px-3 text-xs font-bold"
                  >
                    <IconStar size={14} className={selectedProperty.featured ? "fill-secondary text-secondary" : ""} />
                    <span>{selectedProperty.featured ? "Unfeature" : "Spotlight"}</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      handleDelistProperty(selectedProperty.id)
                      setSelectedProperty(null)
                    }}
                    className="h-9 rounded-xl px-3 text-xs font-bold text-destructive hover:bg-destructive/10"
                  >
                    {selectedProperty.status === "Delisted" ? "Restore Listing" : "Delist Property"}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedProperty(null)}
                    className="h-9 rounded-xl text-xs font-bold"
                  >
                    Close
                  </Button>

                  {selectedProperty.status === "Pending Review" && (
                    <Button
                      size="sm"
                      onClick={() => {
                        handleDirectPropertyStatus(selectedProperty.id, "Active")
                        setSelectedProperty(null)
                      }}
                      className="h-9 rounded-xl bg-emerald-500 px-4 text-xs font-bold text-white hover:bg-emerald-600 shadow-xs"
                    >
                      <IconCheck size={14} />
                      <span>Approve &amp; Push to Global Radar</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MEMBER DOSSIER & KYC MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container">
                  <Image
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-black text-on-surface">{selectedUser.name}</h3>
                    {selectedUser.verified && (
                      <IconShieldCheck size={16} className="text-secondary" />
                    )}
                  </div>
                  <p className="font-mono text-xs text-on-surface-variant">
                    {selectedUser.email} • ID: {selectedUser.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container"
              >
                <IconX size={18} />
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-3">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">Platform Role</span>
                  <select
                    value={selectedUser.role}
                    onChange={(e) =>
                      handleChangeUserRole(selectedUser.id, e.target.value as any)
                    }
                    className="mt-1 w-full font-bold text-on-surface bg-transparent focus:outline-none"
                  >
                    <option value="buyer">Accredited Buyer</option>
                    <option value="seller">Estate Seller</option>
                    <option value="broker">Licensed Broker</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-3">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">KYC Status</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-bold text-on-surface">{selectedUser.kycStatus}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleDirectKycUpdate(
                          selectedUser.id,
                          selectedUser.kycStatus === "Verified" ? "Pending Review" : "Verified"
                        )
                      }
                      className="h-6 px-2 text-[10px] font-bold"
                    >
                      {selectedUser.kycStatus === "Verified" ? "Revoke" : "Approve"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Accreditation Tier:</span>
                  <span className="font-bold text-on-surface">{selectedUser.accreditationTier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Active Portfolio Units:</span>
                  <span className="font-mono font-bold text-on-surface">{selectedUser.portfolioCount} Assets</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Joined Platform:</span>
                  <span className="font-mono text-on-surface">{selectedUser.joinedDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Last Session Active:</span>
                  <span className="font-mono text-on-surface">{selectedUser.lastActive}</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-2 flex items-center justify-between border-t border-outline-variant/20 pt-4">
                {selectedUser.role !== "admin" ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      handleDeleteUser(selectedUser.id)
                      setSelectedUser(null)
                    }}
                    className="h-9 px-3 text-xs font-bold text-destructive hover:bg-destructive/10"
                  >
                    Revoke Member Access
                  </Button>
                ) : (
                  <div />
                )}

                <Button
                  size="sm"
                  onClick={() => setSelectedUser(null)}
                  className="h-9 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. ESCROW TRANSACTION SUPERVISION MODAL */}
      {selectedEscrow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-y-auto rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                  <IconScale size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-on-surface">
                    Escrow Custody Dossier
                  </h3>
                  <p className="font-mono text-xs text-on-surface-variant">
                    {selectedEscrow.id} • {selectedEscrow.propertyTitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEscrow(null)}
                className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container"
              >
                <IconX size={18} />
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-4 text-xs">
              {/* Financial Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-3">
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase">Contract Value</span>
                  <p className="mt-1 font-mono text-base font-black text-on-surface">
                    ${(selectedEscrow.dealValue / 1000000).toFixed(2)}M
                  </p>
                </div>

                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-3">
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase">Earnest Wire</span>
                  <p className="mt-1 font-mono text-base font-black text-emerald-500">
                    ${(selectedEscrow.earnestAmount / 1000).toFixed(0)}k
                  </p>
                </div>

                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-3">
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase">2.5% Platform Take</span>
                  <p className="mt-1 font-mono text-base font-black text-secondary">
                    ${(selectedEscrow.platformFee / 1000).toFixed(0)}k
                  </p>
                </div>
              </div>

              {/* Counterparties */}
              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Buyer Principal:</span>
                  <span className="font-bold text-on-surface">{selectedEscrow.buyerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Seller Principal:</span>
                  <span className="font-bold text-on-surface">{selectedEscrow.sellerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Escrow Arbiter:</span>
                  <span className="font-mono font-bold text-on-secondary-container">{selectedEscrow.brokerName}</span>
                </div>
                <div className="flex items-center justify-between border-t border-outline-variant/20 pt-2">
                  <span className="text-on-surface-variant">Target Closing Date:</span>
                  <span className="font-mono font-semibold text-on-surface">{selectedEscrow.closingDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Active Pipeline Stage:</span>
                  <Badge variant="gold" className="font-bold">{selectedEscrow.stage}</Badge>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-outline-variant/20 pt-4">
                {!selectedEscrow.earnestWired ? (
                  <Button
                    size="sm"
                    onClick={() => {
                      handleVerifyEarnestWire(selectedEscrow.id)
                      setSelectedEscrow((prev) => (prev ? { ...prev, earnestWired: true } : null))
                    }}
                    className="h-9 rounded-xl bg-secondary px-4 text-xs font-bold text-primary hover:bg-secondary/90 shadow-xs"
                  >
                    <IconCheck size={14} />
                    <span>Verify Earnest Wire Now</span>
                  </Button>
                ) : selectedEscrow.stage === "Final Settlement" ? (
                  <Button
                    size="sm"
                    onClick={() => {
                      handleReleaseFunds(selectedEscrow.id)
                      setSelectedEscrow(null)
                    }}
                    className="h-9 rounded-xl bg-emerald-500 px-4 text-xs font-bold text-white hover:bg-emerald-600 shadow-xs"
                  >
                    <span>Authorize Final Settlement Release</span>
                  </Button>
                ) : selectedEscrow.stage !== "Disbursed" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      handleAdvanceEscrowStage(selectedEscrow.id)
                      setSelectedEscrow(null)
                    }}
                    className="h-9 rounded-xl text-xs font-bold"
                  >
                    <span>Advance Milestone Stage &rarr;</span>
                  </Button>
                ) : (
                  <span className="font-mono text-xs font-bold text-emerald-500">
                    Disbursed and Settled
                  </span>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedEscrow(null)}
                  className="h-9 rounded-xl text-xs font-bold"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. CRYPTOGRAPHIC TRACE MODAL */}
      {selectedAudit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IconShieldLock size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-on-surface">
                    Cryptographic Audit Event Trace
                  </h3>
                  <p className="font-mono text-xs text-on-surface-variant">
                    {selectedAudit.id} • {selectedAudit.timestamp}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAudit(null)}
                className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container"
              >
                <IconX size={18} />
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3 text-xs">
              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Event Classification:</span>
                  <span className="font-bold text-on-surface">{selectedAudit.eventType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Operator Principal:</span>
                  <span className="font-semibold text-on-surface">{selectedAudit.operator}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Network IP Address:</span>
                  <span className="font-mono text-on-surface">{selectedAudit.ipAddress}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Geolocation Node:</span>
                  <span className="font-semibold text-on-surface">{selectedAudit.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Telemetry Severity:</span>
                  <span className="font-mono font-bold uppercase text-emerald-500">{selectedAudit.severity}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                  Payload &amp; Operation Data
                </span>
                <div className="mt-1 rounded-xl bg-surface-container p-3 font-mono text-[11px] text-on-surface break-words">
                  {selectedAudit.details}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                  SHA-256 Digital Signature
                </span>
                <div className="mt-1 flex items-center justify-between rounded-xl bg-surface-container p-3 font-mono text-[10px] text-secondary break-all">
                  <span>9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08</span>
                  <button
                    type="button"
                    onClick={() => triggerToast("SHA-256 cryptographic signature copied")}
                    className="ml-2 text-on-surface-variant hover:text-on-surface"
                    title="Copy Signature"
                  >
                    <IconCopy size={13} />
                  </button>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-end border-t border-outline-variant/20 pt-4">
                <Button
                  size="sm"
                  onClick={() => setSelectedAudit(null)}
                  className="h-9 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground"
                >
                  Close Trace
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
