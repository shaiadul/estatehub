"use client"

import Image from "next/image"
import {
  IconUsers,
  IconUserPlus,
  IconShieldCheck,
  IconAlertCircle,
  IconTrash,
  IconShield,
  IconBriefcase,
  IconBuildingEstate,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { AdminState } from "./use-admin-state"
import type { AdminUserItem } from "./types"

interface UserGovernanceTabProps {
  state: AdminState
}

const ROLE_FILTERS = [
  { id: "All", label: "All Members" },
  { id: "buyer", label: "Buyers" },
  { id: "seller", label: "Sellers" },
  { id: "broker", label: "Brokers" },
  { id: "admin", label: "Admins" },
  { id: "pending_kyc", label: "Pending KYC" },
]

export function UserGovernanceTab({ state }: UserGovernanceTabProps) {
  const {
    filteredUsers,
    userRoleFilter,
    setUserRoleFilter,
    handleToggleUserKyc,
    handleChangeUserRole,
    handleDeleteUser,
    setIsAddUserModalOpen,
  } = state

  return (
    <div className="flex flex-col gap-6">
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

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-outline-variant/20 pt-3">
          {ROLE_FILTERS.map((rf) => (
            <button
              key={rf.id}
              type="button"
              onClick={() => setUserRoleFilter(rf.id)}
              className={`h-8 rounded-lg px-3 text-xs font-bold transition-all ${
                userRoleFilter === rf.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {rf.label}
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
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-outline-variant/30">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-on-surface">{member.name}</p>
                          {member.verified && (
                            <IconShieldCheck
                              size={14}
                              className="text-secondary"
                              title="Accreditation Verified"
                            />
                          )}
                        </div>
                        <p className="font-mono text-[11px] text-on-surface-variant">
                          {member.email} • {member.id}
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
                      {member.portfolioCount} Holdings Attached
                    </p>
                  </td>

                  <td className="py-4">
                    <Badge
                      variant={
                        member.kycStatus === "Verified"
                          ? "gold"
                          : member.kycStatus === "Pending Review"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-[10px] font-bold"
                    >
                      {member.kycStatus}
                    </Badge>
                  </td>

                  <td className="py-4">
                    <p className="text-on-surface font-medium">{member.lastActive}</p>
                    <p className="font-mono text-[10px] text-on-surface-variant">
                      Joined {member.joinedDate}
                    </p>
                  </td>

                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant={member.kycStatus === "Verified" ? "outline" : "default"}
                        onClick={() => handleToggleUserKyc(member.id)}
                        className={`h-8 rounded-lg px-2.5 text-xs font-bold ${
                          member.kycStatus === "Verified"
                            ? "border-outline-variant/40 text-on-surface hover:bg-surface-container"
                            : "bg-secondary text-primary hover:bg-secondary/90"
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
        </div>
      </div>
    </div>
  )
}
