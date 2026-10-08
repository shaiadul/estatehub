"use client"

import * as React from "react"
import {
  INITIAL_ADMIN_AUDIT,
  INITIAL_ADMIN_ESCROW,
  INITIAL_ADMIN_PROPERTIES,
  INITIAL_ADMIN_USERS,
  type AdminAuditLogItem,
  type AdminEscrowDeal,
  type AdminNav,
  type AdminPropertyItem,
  type AdminUserItem,
  type PlatformPolicy,
} from "./types"

export function useAdminState() {
  const [activeNav, setActiveNav] = React.useState<AdminNav>("overview")
  const [searchQuery, setSearchQuery] = React.useState("")

  const [toastMessage, setToastMessage] = React.useState<string | null>(null)
  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Users State
  const [users, setUsers] = React.useState<AdminUserItem[]>(INITIAL_ADMIN_USERS)
  const [userRoleFilter, setUserRoleFilter] = React.useState<string>("All")

  const [isAddUserModalOpen, setIsAddUserModalOpen] = React.useState(false)
  const [newUserName, setNewUserName] = React.useState("")
  const [newUserEmail, setNewUserEmail] = React.useState("")
  const [newUserRole, setNewUserRole] =
    React.useState<AdminUserItem["role"]>("buyer")
  const [newUserTier, setNewUserTier] =
    React.useState<AdminUserItem["accreditationTier"]>(
      "Tier 1 - Sovereign ($25M+)"
    )

  // Properties State
  const [properties, setProperties] = React.useState<AdminPropertyItem[]>(
    INITIAL_ADMIN_PROPERTIES
  )
  const [propertyStatusFilter, setPropertyStatusFilter] =
    React.useState<string>("All")

  // Escrow State
  const [escrowDeals, setEscrowDeals] =
    React.useState<AdminEscrowDeal[]>(INITIAL_ADMIN_ESCROW)

  // Audit Logs State
  const [auditLogs, setAuditLogs] =
    React.useState<AdminAuditLogItem[]>(INITIAL_ADMIN_AUDIT)
  const [auditFilterSeverity, setAuditFilterSeverity] =
    React.useState<string>("All")

  // Policy & Global Settings State
  const [policy, setPolicy] = React.useState<PlatformPolicy>({
    platformFeeRate: 2.5,
    minEarnestPercent: 10,
    minAccreditationThreshold: 5000000,
    kycRigorLevel: "Tier 1 Multi-Sig Sovereign",
    emergencyFreeze: false,
    multiSigEnclave: true,
    maintenanceMode: false,
  })

  // Broadcast Modal State
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = React.useState(false)
  const [broadcastSubject, setBroadcastSubject] = React.useState("")
  const [broadcastMessage, setBroadcastMessage] = React.useState("")

  // User Actions
  const handleToggleUserKyc = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u
        const nextStatus: AdminUserItem["kycStatus"] =
          u.kycStatus === "Verified" ? "Action Required" : "Verified"
        const nextVerified = nextStatus === "Verified"
        return { ...u, kycStatus: nextStatus, verified: nextVerified }
      })
    )
    triggerToast("User KYC accreditation status updated")
  }

  const handleChangeUserRole = (id: string, newRole: AdminUserItem["role"]) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    )
    triggerToast(`User role updated to ${newRole.toUpperCase()}`)
  }

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
    triggerToast("User account revoked from platform enclave")
  }

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUserName || !newUserEmail) return

    const newUser: AdminUserItem = {
      id: `USR-${users.length + 101}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      roleTitle:
        newUserRole === "admin"
          ? "Platform Administrator"
          : newUserRole === "broker"
            ? "Licensed Broker Partner"
            : newUserRole === "seller"
              ? "Accredited Estate Seller"
              : "Accredited Sovereign Buyer",
      accreditationTier: newUserTier,
      kycStatus: "Verified",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      portfolioCount: 1,
      joinedDate: "Just now",
      lastActive: "Just now",
      verified: true,
    }

    setUsers([newUser, ...users])
    setIsAddUserModalOpen(false)
    setNewUserName("")
    setNewUserEmail("")
    triggerToast(`New enclave member "${newUser.name}" authorized`)
  }

  // Property Actions
  const handleApproveProperty = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Active" } : p))
    )
    triggerToast("Listing approved and synchronized to public radar index")
  }

  const handleToggleFeaturedProperty = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    )
    triggerToast("Featured showcase placement updated")
  }

  const handleDelistProperty = (id: string) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: p.status === "Delisted" ? "Active" : "Delisted",
            }
          : p
      )
    )
    triggerToast("Listing publication status modified")
  }

  // Escrow Actions
  const handleVerifyEarnestWire = (id: string) => {
    setEscrowDeals((prev) =>
      prev.map((d) => (d.id === id ? { ...d, earnestWired: true } : d))
    )
    triggerToast("Earnest deposit wire verified and locked in trust")
  }

  const handleAdvanceEscrowStage = (id: string) => {
    const stages: AdminEscrowDeal["stage"][] = [
      "Earnest Wire",
      "Diligence Audit",
      "Title Clearance",
      "Final Settlement",
      "Disbursed",
    ]
    setEscrowDeals((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d
        const currentIdx = stages.indexOf(d.stage)
        const nextIdx = Math.min(stages.length - 1, currentIdx + 1)
        return { ...d, stage: stages[nextIdx] }
      })
    )
    triggerToast("Escrow deal milestone advanced")
  }

  const handleReleaseFunds = (id: string) => {
    setEscrowDeals((prev) =>
      prev.map((d) => (d.id === id ? { ...d, stage: "Disbursed" } : d))
    )
    triggerToast("Final settlement funds disbursed to counterparties")
  }

  // Policy Actions
  const handleToggleEmergencyFreeze = () => {
    const nextState = !policy.emergencyFreeze
    setPolicy((prev) => ({ ...prev, emergencyFreeze: nextState }))
    triggerToast(
      nextState
        ? "🚨 Emergency Freeze ENGAGED: Escrow transfers halted"
        : "✅ Emergency Freeze LIFTED: Operations normal"
    )
  }

  const handleToggleMaintenanceMode = () => {
    const nextState = !policy.maintenanceMode
    setPolicy((prev) => ({ ...prev, maintenanceMode: nextState }))
    triggerToast(
      nextState
        ? "Maintenance Mode Active"
        : "Platform Live to Public Clients"
    )
  }

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault()
    if (!broadcastSubject || !broadcastMessage) return

    const newAudit: AdminAuditLogItem = {
      id: `AUD-${auditLogs.length + 991}`,
      timestamp: "Just now",
      eventType: "Role Privileges Modified",
      operator: "Alexander Vance (Admin)",
      ipAddress: "66.249.79.1",
      location: "Beverly Hills, CA",
      severity: "warning",
      details: `Broadcast sent to all enclave participants: "${broadcastSubject}"`,
    }

    setAuditLogs([newAudit, ...auditLogs])
    setIsBroadcastModalOpen(false)
    setBroadcastSubject("")
    setBroadcastMessage("")
    triggerToast("Platform broadcast transmitted to all accredited members")
  }

  // Filtered lists
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole =
      userRoleFilter === "All"
        ? true
        : userRoleFilter === "pending_kyc"
          ? u.kycStatus !== "Verified"
          : u.role === userRoleFilter
    return matchesSearch && matchesRole
  })

  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      propertyStatusFilter === "All" || p.status === propertyStatusFilter
    return matchesSearch && matchesStatus
  })

  const filteredAuditLogs = auditLogs.filter((a) => {
    const matchesSearch =
      a.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.eventType.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSeverity =
      auditFilterSeverity === "All" || a.severity === auditFilterSeverity
    return matchesSearch && matchesSeverity
  })

  // Aggregates & KPIs
  const totalEnclaveGmv = properties.reduce((acc, p) => acc + p.price, 0)
  const totalEscrowVolume = escrowDeals.reduce((acc, d) => acc + d.dealValue, 0)
  const totalEarnestInTrust = escrowDeals.reduce((acc, d) => acc + d.earnestAmount, 0)
  const totalPlatformFeesEarned = escrowDeals.reduce(
    (acc, d) => acc + d.platformFee,
    0
  )
  const pendingApprovalsCount = properties.filter(
    (p) => p.status === "Pending Review"
  ).length
  const pendingKycCount = users.filter((u) => u.kycStatus !== "Verified").length

  return {
    activeNav,
    setActiveNav,
    searchQuery,
    setSearchQuery,
    toastMessage,
    triggerToast,
    users,
    filteredUsers,
    userRoleFilter,
    setUserRoleFilter,
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
    handleToggleUserKyc,
    handleChangeUserRole,
    handleDeleteUser,
    handleCreateUser,
    properties,
    filteredProperties,
    propertyStatusFilter,
    setPropertyStatusFilter,
    handleApproveProperty,
    handleToggleFeaturedProperty,
    handleDelistProperty,
    escrowDeals,
    handleVerifyEarnestWire,
    handleAdvanceEscrowStage,
    handleReleaseFunds,
    auditLogs,
    filteredAuditLogs,
    auditFilterSeverity,
    setAuditFilterSeverity,
    policy,
    setPolicy,
    handleToggleEmergencyFreeze,
    handleToggleMaintenanceMode,
    isBroadcastModalOpen,
    setIsBroadcastModalOpen,
    broadcastSubject,
    setBroadcastSubject,
    broadcastMessage,
    setBroadcastMessage,
    handleSendBroadcast,
    totalEnclaveGmv,
    totalEscrowVolume,
    totalEarnestInTrust,
    totalPlatformFeesEarned,
    pendingApprovalsCount,
    pendingKycCount,
  }
}

export type AdminState = ReturnType<typeof useAdminState>
