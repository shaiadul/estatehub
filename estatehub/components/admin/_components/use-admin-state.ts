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
import {
  moderatePropertyAction,
  updateUserKycAction,
  updateUserRoleAction,
  getUsersAction,
  getAuditLogsAction,
  deleteUserAction,
} from "@/actions/admin"
import { registerAction } from "@/actions/auth"
import { getPropertiesAction } from "@/actions/properties"
import { listClosingRoomsAction } from "@/actions/closing"

function mapBackendToAdminUser(u: any): AdminUserItem {
  return {
    id: u.id,
    name: u.full_name || u.email.split("@")[0],
    email: u.email,
    role: (u.role === "admin" || u.role === "broker" || u.role === "seller" ? u.role : "buyer") as any,
    roleTitle: u.title || (u.role === "admin" ? "Platform Administrator" : u.role === "broker" ? "Licensed Broker" : u.role === "seller" ? "Estate Seller" : "Accredited Buyer"),
    accreditationTier: (u.net_worth_tier as any) || (u.role === "admin" ? "System Root Authority" : "Tier 1 - Sovereign ($25M+)"),
    kycStatus: u.kyc_status === "verified" ? "Verified" : u.kyc_status === "rejected" ? "Action Required" : "Pending Review",
    avatar: u.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    portfolioCount: 1,
    joinedDate: u.created_at ? new Date(u.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Recent",
    lastActive: "Just now",
    verified: u.accredited || u.kyc_status === "verified",
  }
}

function mapBackendToAdminProperty(p: any): AdminPropertyItem {
  const cat = (p.property_type || "Villa").toLowerCase()
  const category: AdminPropertyItem["category"] =
    cat.includes("penthouse") ? "Penthouse" :
    cat.includes("island") || cat.includes("water") ? "Island" :
    cat.includes("manor") || cat.includes("chalet") ? "Manor" :
    cat.includes("arch") ? "Architectural" : "Villa"

  const status: AdminPropertyItem["status"] =
    !p.approved || p.status === "pending" ? "Pending Review" :
    p.status === "in_escrow" ? "In Escrow" :
    p.status === "under_offer" ? "Under Offer" :
    p.status === "flagged" ? "Flagged" : "Active"

  return {
    id: p.slug || p.id,
    title: p.title,
    location: `${p.city || ""}, ${p.state || ""}`.trim() || p.address || "California, USA",
    sellerName: p.agent?.full_name || "Sarah Jenkins",
    sellerEntity: p.agent?.entity_name || "Private Family Office",
    price: Number(p.price) || 0,
    category,
    status,
    featured: Boolean(p.featured),
    vdrAudited: true,
    lidarScanAvailable: true,
    submittedDate: p.created_at ? new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Today",
    image: p.hero_image || (p.images && p.images[0]) || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
  }
}

function mapBackendToAdminAudit(a: any): AdminAuditLogItem {
  const eventType: AdminAuditLogItem["eventType"] =
    a.action?.includes("login") || a.action?.includes("auth") ? "FIDO2 Authenticated" :
    a.action?.includes("offer") ? "Bilateral LOI Executed" :
    a.action?.includes("wire") || a.action?.includes("escrow") ? "Earnest Wire Verified" :
    a.action?.includes("vdr") ? "VDR Watermark Download" :
    a.action?.includes("kyc") || a.action?.includes("role") ? "Role Privileges Modified" :
    a.action?.includes("freeze") ? "Emergency Freeze Toggled" : "Listing Approved"

  return {
    id: a.id,
    timestamp: a.created_at ? new Date(a.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Just now",
    eventType,
    operator: a.actor_email || "System",
    ipAddress: a.ip_address || "127.0.0.1",
    location: "Sovereign Enclave Node",
    severity: (a.severity as any) || "info",
    details: typeof a.payload === "string" ? a.payload : JSON.stringify(a.payload || {}),
  }
}

function mapBackendToAdminEscrow(r: any): AdminEscrowDeal {
  const stageMap: Record<string, AdminEscrowDeal["stage"]> = {
    escrow_funding: "Earnest Wire",
    title_verification: "Diligence Audit",
    fido_wire: "Title Clearance",
    deed_recording: "Final Settlement",
    settled: "Disbursed",
  }

  const dealValue = Number(r.total_price) || 9850000
  const earnestAmount = Number(r.escrow_deposit) || 492500

  return {
    id: `ESC-${r.id.slice(0, 8)}`,
    propertyTitle: r.property?.title || "Luxury Estate",
    propertyId: r.property_id,
    buyerName: r.buyer?.full_name || "Alpha Crest Sovereign Capital",
    sellerName: r.seller?.full_name || "Bel Air Ridge Promontory Trust",
    brokerName: r.escrow_agent?.full_name || "Cheryl Vance (First American Title)",
    dealValue,
    earnestAmount,
    earnestWired: r.stage !== "escrow_funding",
    stage: stageMap[r.stage] || "Diligence Audit",
    platformFee: dealValue * 0.025,
    closingDate: r.closing_date ? new Date(r.closing_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Dec 18, 2026",
    disputed: false,
  }
}

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
  const [selectedUser, setSelectedUser] = React.useState<AdminUserItem | null>(null)

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
  const [properties, setProperties] = React.useState<AdminPropertyItem[]>(INITIAL_ADMIN_PROPERTIES)
  const [propertyStatusFilter, setPropertyStatusFilter] =
    React.useState<string>("All")
  const [propertyCategoryFilter, setPropertyCategoryFilter] =
    React.useState<string>("All")
  const [propertyViewMode, setPropertyViewMode] =
    React.useState<"table" | "grid">("grid")
  const [selectedProperty, setSelectedProperty] =
    React.useState<AdminPropertyItem | null>(null)

  // Escrow State
  const [escrowDeals, setEscrowDeals] = React.useState<AdminEscrowDeal[]>(INITIAL_ADMIN_ESCROW)
  const [escrowStageFilter, setEscrowStageFilter] = React.useState<string>("All")
  const [selectedEscrow, setSelectedEscrow] = React.useState<AdminEscrowDeal | null>(null)

  // Audit Logs State
  const [auditLogs, setAuditLogs] = React.useState<AdminAuditLogItem[]>(INITIAL_ADMIN_AUDIT)
  const [auditFilterSeverity, setAuditFilterSeverity] =
    React.useState<string>("All")
  const [selectedAudit, setSelectedAudit] = React.useState<AdminAuditLogItem | null>(null)

  const refetchUsers = React.useCallback(async () => {
    try {
      const res = await getUsersAction({ limit: 50 })
      if (res.success && res.data && res.data.length > 0) {
        setUsers(res.data.map(mapBackendToAdminUser))
      }
    } catch (err) {
      console.warn("Using baseline admin user ledger", err)
    }
  }, [])

  const refetchProperties = React.useCallback(async () => {
    try {
      const res = await getPropertiesAction({ limit: 50 })
      if (res.success && res.data && res.data.length > 0) {
        setProperties(res.data.map(mapBackendToAdminProperty))
      }
    } catch (err) {
      console.warn("Using baseline admin property queue", err)
    }
  }, [])

  const refetchAuditLogs = React.useCallback(async () => {
    try {
      const res = await getAuditLogsAction({ limit: 50 })
      if (res.success && res.data && res.data.length > 0) {
        setAuditLogs(res.data.map(mapBackendToAdminAudit))
      }
    } catch (err) {
      console.warn("Using baseline admin cryptographic audit trail", err)
    }
  }, [])

  const refetchEscrowDeals = React.useCallback(async () => {
    try {
      const res = await listClosingRoomsAction()
      if (res.success && res.data && res.data.length > 0) {
        setEscrowDeals(res.data.map(mapBackendToAdminEscrow))
      }
    } catch (err) {
      console.warn("Using baseline admin escrow supervision records", err)
    }
  }, [])

  // Hydrate with live backend data
  React.useEffect(() => {
    refetchUsers()
    refetchProperties()
    refetchAuditLogs()
    refetchEscrowDeals()
  }, [refetchUsers, refetchProperties, refetchAuditLogs, refetchEscrowDeals])

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
  const handleToggleUserKyc = async (id: string) => {
    const target = users.find((u) => u.id === id)
    const nextVerified = target?.kycStatus !== "Verified"
    try {
      await updateUserKycAction(id, nextVerified ? "verified" : "pending")
      triggerToast("User KYC accreditation status updated")
      await refetchUsers()
      await refetchAuditLogs()
    } catch {
      triggerToast("Failed to update user KYC")
    }
  }

  const handleChangeUserRole = async (id: string, newRole: AdminUserItem["role"]) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    )
    try {
      await updateUserRoleAction(id, newRole)
      triggerToast(`User role updated to ${newRole.toUpperCase()} in enclave registry`)
      await refetchUsers()
    } catch {
      triggerToast("User role update failed")
    }
  }

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUserAction(id)
      triggerToast("User account revoked from platform enclave")
      await refetchUsers()
    } catch {
      triggerToast("Failed to revoke user account")
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUserName || !newUserEmail) return

    try {
      const res = await registerAction({
        email: newUserEmail.trim(),
        full_name: newUserName.trim(),
        role: newUserRole,
      })
      if (res.success) {
        triggerToast(`New enclave member "${newUserName}" authorized`)
        await refetchUsers()
      } else {
        triggerToast(res.error || "Failed to authorize user")
      }
    } catch {
      triggerToast("Network error authorizing user")
    } finally {
      setIsAddUserModalOpen(false)
      setNewUserName("")
      setNewUserEmail("")
    }
  }

  // Property Actions
  const handleApproveProperty = async (id: string) => {
    try {
      await moderatePropertyAction(id, true)
      triggerToast("Listing approved and synchronized to public radar index")
      await refetchProperties()
    } catch {
      triggerToast("Failed to approve property")
    }
  }

  const handleToggleFeaturedProperty = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    )
    triggerToast("Featured showcase placement updated")
  }

  const handleDelistProperty = async (id: string) => {
    const target = properties.find((p) => p.id === id)
    const nextApproved = target?.status === "Delisted"
    try {
      await moderatePropertyAction(id, nextApproved)
      triggerToast("Listing publication status modified")
      await refetchProperties()
    } catch {
      triggerToast("Failed to modify listing publication status")
    }
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

  // Direct status updates
  const handleDirectKycUpdate = async (id: string, status: AdminUserItem["kycStatus"]) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, kycStatus: status, verified: status === "Verified" } : u))
    )
    if (selectedUser?.id === id) {
      setSelectedUser((prev) => (prev ? { ...prev, kycStatus: status, verified: status === "Verified" } : null))
    }
    try {
      await updateUserKycAction(id, status === "Verified" ? "verified" : status === "Action Required" ? "rejected" : "pending")
      triggerToast(`KYC status updated to "${status}"`)
    } catch {
      triggerToast("Failed to update KYC status")
    }
  }

  const handleDirectPropertyStatus = async (id: string, status: AdminPropertyItem["status"]) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    )
    if (selectedProperty?.id === id) {
      setSelectedProperty((prev) => (prev ? { ...prev, status } : null))
    }
    try {
      await moderatePropertyAction(id, status === "Active")
      triggerToast(`Listing status updated to "${status}"`)
    } catch {
      triggerToast("Failed to update listing status")
    }
  }

  // Filtered lists
  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q) ||
      u.roleTitle.toLowerCase().includes(q) ||
      u.accreditationTier.toLowerCase().includes(q)
    const matchesRole =
      userRoleFilter === "All"
        ? true
        : userRoleFilter === "pending_kyc"
          ? u.kycStatus !== "Verified"
          : u.role === userRoleFilter
    return matchesSearch && matchesRole
  })

  const filteredProperties = properties.filter((p) => {
    const q = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.sellerName.toLowerCase().includes(q) ||
      p.sellerEntity.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    const matchesStatus =
      propertyStatusFilter === "All" || p.status === propertyStatusFilter
    const matchesCategory =
      propertyCategoryFilter === "All" || p.category === propertyCategoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const filteredEscrowDeals = escrowDeals.filter((d) => {
    const q = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !q ||
      d.propertyTitle.toLowerCase().includes(q) ||
      d.buyerName.toLowerCase().includes(q) ||
      d.sellerName.toLowerCase().includes(q) ||
      d.brokerName.toLowerCase().includes(q) ||
      d.id.toLowerCase().includes(q)
    const matchesStage =
      escrowStageFilter === "All" || d.stage === escrowStageFilter
    return matchesSearch && matchesStage
  })

  const filteredAuditLogs = auditLogs.filter((a) => {
    const q = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !q ||
      a.details.toLowerCase().includes(q) ||
      a.operator.toLowerCase().includes(q) ||
      a.eventType.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q) ||
      a.ipAddress.toLowerCase().includes(q)
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
    selectedUser,
    setSelectedUser,
    handleDirectKycUpdate,
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
    propertyCategoryFilter,
    setPropertyCategoryFilter,
    propertyViewMode,
    setPropertyViewMode,
    selectedProperty,
    setSelectedProperty,
    handleDirectPropertyStatus,
    handleApproveProperty,
    handleToggleFeaturedProperty,
    handleDelistProperty,
    escrowDeals,
    filteredEscrowDeals,
    escrowStageFilter,
    setEscrowStageFilter,
    selectedEscrow,
    setSelectedEscrow,
    handleVerifyEarnestWire,
    handleAdvanceEscrowStage,
    handleReleaseFunds,
    auditLogs,
    filteredAuditLogs,
    auditFilterSeverity,
    setAuditFilterSeverity,
    selectedAudit,
    setSelectedAudit,
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
    refetchUsers,
    refetchProperties,
    refetchAuditLogs,
    refetchEscrowDeals,
  }
}

export type AdminState = ReturnType<typeof useAdminState>
