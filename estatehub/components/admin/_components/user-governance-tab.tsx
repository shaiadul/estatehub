"use client"

import {
  IconUsers,
  IconUserPlus,
  IconShieldCheck,
  IconAlertCircle,
  IconTrash,
  IconEye,
  IconCheck,
  IconClock,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "@/components/ui/avatar"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
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
        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
          <CardContent className="flex flex-col justify-between p-4">
            <span className="text-xs text-on-surface-variant font-medium">Enrolled Members</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-on-surface">{users.length}</span>
              <span className="text-[10px] font-mono text-emerald-500 font-semibold">100% Accredited</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-secondary" />
          <CardContent className="flex flex-col justify-between p-4">
            <span className="text-xs text-on-surface-variant font-medium">Verified KYC</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-500">
                {users.filter((u) => u.kycStatus === "Verified").length}
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium">Cleared Notary</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-amber-500" />
          <CardContent className="flex flex-col justify-between p-4">
            <span className="text-xs text-on-surface-variant font-medium">Pending Diligence</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-2xl font-black ${pendingKycCount > 0 ? "text-amber-500" : "text-on-surface"}`}>
                {pendingKycCount}
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium">Requires Review</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-tertiary" />
          <CardContent className="flex flex-col justify-between p-4">
            <span className="text-xs text-on-surface-variant font-medium">Portfolio Assets</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-on-surface">
                {users.reduce((acc, u) => acc + (u.portfolioCount || 0), 0)}
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium">Managed Units</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Members Card */}
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardHeader className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconUsers size={16} />
              </span>
              <CardTitle className="text-base font-bold text-on-surface">
                User Governance &amp; KYC Accreditation Ledger
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-on-surface-variant">
              Manage cryptographic member identities, accreditation tiers, role privileges, and AML clearance
            </CardDescription>
          </div>

          <Button
            onClick={() => setIsAddUserModalOpen(true)}
            size="sm"
            className="flex h-9 items-center gap-1.5 rounded-xl bg-primary px-3.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 sm:self-auto"
          >
            <IconUserPlus size={15} />
            <span>Enroll Enclave Member</span>
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Filter Pills with Counts */}
          <div className="flex flex-wrap items-center gap-2 border-t border-outline-variant/20 pt-3">
            {ROLE_FILTERS.map((rf) => (
              <button
                key={rf.id}
                type="button"
                onClick={() => setUserRoleFilter(rf.id)}
                className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all ${
                  userRoleFilter === rf.id
                    ? "bg-primary text-primary-foreground shadow-xs ring-1 ring-primary/20"
                    : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                <span>{rf.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
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
          {filteredUsers.length === 0 ? (
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
          ) : (
            <div className="rounded-xl border border-outline-variant/20 overflow-hidden">
              <Table>
                <TableHeader className="bg-surface-container-low/70">
                  <TableRow>
                    <TableHead className="text-xs font-bold text-on-surface-variant">Member Dossier</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant">Platform Role</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant">Accreditation Tier</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant">KYC Notary Status</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant">Activity</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant text-right">Governance Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((member) => (
                    <TableRow
                      key={member.id}
                      className="transition-colors hover:bg-surface-container-high/30"
                    >
                      <TableCell className="py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar size="default" className="border border-outline-variant/30 bg-surface-container">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="text-xs font-bold">
                              {member.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                            {member.verified && (
                              <AvatarBadge className="bg-emerald-500 ring-background" />
                            )}
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setSelectedUser(member)}
                                className="font-bold text-xs text-on-surface hover:text-primary transition-colors text-left"
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
                      </TableCell>

                      <TableCell>
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
                      </TableCell>

                      <TableCell>
                        <span className="font-semibold text-xs text-on-surface">
                          {member.accreditationTier}
                        </span>
                        <p className="text-[10px] text-on-surface-variant">
                          {member.portfolioCount} Asset Holdings
                        </p>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            member.kycStatus === "Verified"
                              ? "gold"
                              : member.kycStatus === "Pending Review"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-[10px] font-bold gap-1"
                        >
                          {member.kycStatus === "Verified" ? (
                            <IconCheck size={11} />
                          ) : member.kycStatus === "Pending Review" ? (
                            <IconClock size={11} />
                          ) : (
                            <IconAlertCircle size={11} />
                          )}
                          <span>{member.kycStatus}</span>
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <p className="text-xs text-on-surface font-medium">{member.lastActive}</p>
                        <p className="font-mono text-[10px] text-on-surface-variant">
                          Joined {member.joinedDate}
                        </p>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedUser(member)}
                            className="h-8 rounded-lg border-outline-variant/40 px-2.5 text-xs font-semibold hover:bg-surface-container"
                            title="View Full Member Profile & Credentials"
                          >
                            <IconEye size={13} />
                            <span className="hidden sm:inline">Dossier</span>
                          </Button>

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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
