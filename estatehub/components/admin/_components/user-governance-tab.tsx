"use client"

import Image from "next/image"
import {
  IconUsers,
  IconUserPlus,
  IconShieldCheck,
  IconAlertCircle,
  IconTrash,
  IconEye,
  IconCheck,
  IconClock,
  IconRefresh,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NoDataState } from "@/components/ui/no-data-state"
import type { AdminState } from "./use-admin-state"
import type { AdminUserItem } from "./types"

interface UserGovernanceTabProps {
  state: AdminState
}

export function UserGovernanceTab({ state }: UserGovernanceTabProps) {
  const {
    users,
    filteredUsers,
    userRoleFilter,
    setUserRoleFilter,
    handleToggleUserKyc,
    handleChangeUserRole,
    handleDeleteUser,
    setIsAddUserModalOpen,
    setSelectedUser,
    pendingKycCount,
    setSearchQuery,
    searchQuery,
  } = state

  const ROLE_FILTERS = [
    { id: "All", label: "All Members", count: users.length },
    {
      id: "buyer",
      label: "Buyers",
      count: users.filter((u) => u.role === "buyer").length,
    },
    {
      id: "seller",
      label: "Sellers",
      count: users.filter((u) => u.role === "seller").length,
    },
    {
      id: "broker",
      label: "Brokers",
      count: users.filter((u) => u.role === "broker").length,
    },
    {
      id: "admin",
      label: "Admins",
      count: users.filter((u) => u.role === "admin").length,
    },
    {
      id: "pending_kyc",
      label: "Pending KYC",
      count: pendingKycCount,
      alert: pendingKycCount > 0,
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* User Governance Metrics Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs">
          <span className="text-xs text-on-surface-variant font-medium">Enrolled Members</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-on-surface">{users.length}</span>
            <span className="text-[10px] font-mono text-emerald-500 font-semibold">100% Accredited</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs">
          <span className="text-xs text-on-surface-variant font-medium">Verified KYC</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-500">
              {users.filter((u) => u.kycStatus === "Verified").length}
            </span>
            <span className="text-[10px] text-on-surface-variant">Cleared Notary</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs">
          <span className="text-xs text-on-surface-variant font-medium">Pending Diligence</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className={`text-2xl font-black ${pendingKycCount > 0 ? "text-amber-500" : "text-on-surface"}`}>
              {pendingKycCount}
            </span>
            <span className="text-[10px] text-on-surface-variant">Requires Review</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs">
          <span className="text-xs text-on-surface-variant font-medium">Portfolio Assets</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-on-surface">
              {users.reduce((acc, u) => acc + (u.portfolioCount || 0), 0)}
            </span>
            <span className="text-[10px] text-on-surface-variant">Managed Units</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconUsers size={16} />
              </span>
              <h2 className="text-lg font-black text-on-surface">
                User Governance &amp; KYC Accreditation Ledger
              </h2>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">
              Manage cryptographic member identities, accreditation tiers, role privileges, and AML clearance
            </p>
          </div>

          <Button
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground hover:bg-primary/90 sm:self-auto"
          >
            <IconUserPlus size={16} />
            <span>Enroll Enclave Member</span>
          </Button>
        </div>

        {/* Filter Pills with Counts */}
        <div className="flex flex-wrap items-center gap-2 border-t border-outline-variant/20 pt-3">
          {ROLE_FILTERS.map((rf) => (
            <button
              key={rf.id}
              type="button"
              onClick={() => setUserRoleFilter(rf.id)}
              className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition-all ${
                userRoleFilter === rf.id
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              <span>{rf.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                  userRoleFilter === rf.id
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : rf.alert
                      ? "bg-amber-500/20 text-amber-500 font-bold"
                      : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {rf.count}
              </span>
            </button>
          ))}
        </div>

        {/* Members Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                <th className="pb-3 font-semibold">Member Dossier</th>
                <th className="pb-3 font-semibold">Platform Role</th>
                <th className="pb-3 font-semibold">Accreditation Tier</th>
                <th className="pb-3 font-semibold">KYC Notary Status</th>
                <th className="pb-3 font-semibold">Activity</th>
                <th className="pb-3 text-right font-semibold">Governance Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredUsers.map((member) => (
                <tr
                  key={member.id}
                  className="transition-colors hover:bg-surface-container-high/30"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                        {member.verified && (
                          <div
                            className="absolute right-0.5 bottom-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-surface"
                            title="KYC Verified"
                          />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedUser(member)}
                            className="font-bold text-on-surface hover:text-primary transition-colors text-left"
                          >
                            {member.name}
                          </button>
                          {member.verified && (
                            <IconShieldCheck
                              size={14}
                              className="text-secondary"
                              title="Accreditation Verified"
                            />
                          )}
                        </div>
                        <p className="font-mono text-[11px] text-on-surface-variant">
                          {member.email} • <span className="text-[10px] font-semibold">{member.id}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4">
                    <select
                      value={member.role}
                      onChange={(e) =>
                        handleChangeUserRole(
                          member.id,
                          e.target.value as AdminUserItem["role"]
                        )
                      }
                      className="h-8 rounded-lg border border-outline-variant/40 bg-surface-container-low px-2 text-xs font-semibold text-on-surface focus:outline-none"
                    >
                      <option value="buyer">Buyer</option>
                      <option value="seller">Seller</option>
                      <option value="broker">Broker</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </td>

                  <td className="py-4">
                    <span className="font-semibold text-on-surface">
                      {member.accreditationTier}
                    </span>
                    <p className="text-[10px] text-on-surface-variant">
                      {member.portfolioCount} Asset Holdings
                    </p>
                  </td>

                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        member.kycStatus === "Verified"
                          ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                          : member.kycStatus === "Pending Review"
                            ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                            : "bg-destructive/15 text-destructive border border-destructive/30"
                      }`}
                    >
                      {member.kycStatus === "Verified" ? (
                        <IconCheck size={11} />
                      ) : member.kycStatus === "Pending Review" ? (
                        <IconClock size={11} />
                      ) : (
                        <IconAlertCircle size={11} />
                      )}
                      <span>{member.kycStatus}</span>
                    </span>
                  </td>

                  <td className="py-4">
                    <p className="text-on-surface font-medium">{member.lastActive}</p>
                    <p className="font-mono text-[10px] text-on-surface-variant">
                      Joined {member.joinedDate}
                    </p>
                  </td>

                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View Dossier Modal Trigger */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedUser(member)}
                        className="h-8 rounded-lg border-outline-variant/40 px-2.5 text-xs font-bold hover:bg-surface-container"
                        title="View Full Member Profile & Credentials"
                      >
                        <IconEye size={13} />
                        <span className="hidden sm:inline">Dossier</span>
                      </Button>

                      {/* 1-Click KYC Toggle */}
                      <Button
                        size="sm"
                        variant={member.kycStatus === "Verified" ? "outline" : "default"}
                        onClick={() => handleToggleUserKyc(member.id)}
                        className={`h-8 rounded-lg px-2.5 text-xs font-bold ${
                          member.kycStatus === "Verified"
                            ? "border-outline-variant/40 text-on-surface hover:bg-surface-container"
                            : "bg-secondary text-primary hover:bg-secondary/90 shadow-xs"
                        }`}
                      >
                        {member.kycStatus === "Verified" ? "Revoke KYC" : "Approve KYC"}
                      </Button>

                      {member.role !== "admin" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteUser(member.id)}
                          className="h-8 rounded-lg px-2 text-xs text-destructive hover:bg-destructive/10"
                          title="Revoke member enclave credentials"
                        >
                          <IconTrash size={14} />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <NoDataState
              icon={IconUsers}
              variant={searchQuery ? "search" : "filter"}
              searchTerm={searchQuery}
              title={searchQuery ? `No members match "${searchQuery}"` : "No members found in this role"}
              description={`No enclave members match the query or filter criteria under role "${userRoleFilter}".`}
              action={{
                label: "Reset Member Filters",
                onClick: () => {
                  setSearchQuery("")
                  setUserRoleFilter("All")
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
