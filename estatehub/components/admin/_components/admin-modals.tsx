"use client"

import { IconX, IconSpeakerphone, IconUserPlus } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { AdminState } from "./use-admin-state"
import type { AdminUserItem } from "./types"

interface AdminModalsProps {
  state: AdminState
}

export function AdminModals({ state }: AdminModalsProps) {
  const {
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
    isBroadcastModalOpen,
    setIsBroadcastModalOpen,
    broadcastSubject,
    setBroadcastSubject,
    broadcastMessage,
    setBroadcastMessage,
    handleSendBroadcast,
  } = state

  return (
    <>
      {/* Enroll Member Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
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
                    <option value="seller">Estate Principal Seller</option>
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
                    <option value="System Root Authority">
                      System Root Authority
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-end gap-2 border-t border-outline-variant/30 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="h-10 rounded-xl border-outline-variant/40 px-4 text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                >
                  Authorize Member
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Broadcast Announcement Modal */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                  <IconSpeakerphone size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-on-surface">
                    Broadcast Announcement to Enclave
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Transmit an authenticated bulletin to all accredited buyers, sellers, and brokers
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
                  Announcement Subject *
                </label>
                <Input
                  required
                  value={broadcastSubject}
                  onChange={(e) => setBroadcastSubject(e.target.value)}
                  placeholder="e.g. Schedule Maintenance: Escrow Ledger Verification Window"
                  className="h-10 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Message Content *
                </label>
                <textarea
                  required
                  rows={4}
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="Enter bulletin text dispatched with cryptographic PGP signature..."
                  className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low p-3 text-xs text-on-surface focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-3 text-xs text-on-surface-variant">
                <span className="font-bold text-on-secondary-container">PGP Notarization: </span>
                This broadcast will be timestamped and recorded immutably in the master audit log.
              </div>

              <div className="mt-2 flex items-center justify-end gap-2 border-t border-outline-variant/30 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="h-10 rounded-xl border-outline-variant/40 px-4 text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                >
                  Transmit Broadcast
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
