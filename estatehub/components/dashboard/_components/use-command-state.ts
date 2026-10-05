"use client"

import * as React from "react"
import {
  IconLayoutDashboard,
  IconBuildingEstate,
  IconUsers,
  IconChartBar,
  IconFolderCheck,
  IconShieldLock,
  IconFileSpreadsheet,
  IconBriefcase,
  IconCurrencyDollar,
  IconCash,
} from "@tabler/icons-react"
import { useAuth } from "@/lib/auth-context"
import {
  INITIAL_DEALS,
  INITIAL_DOCS,
  INITIAL_LEADS,
  INITIAL_OFFERS,
  INITIAL_PROPERTIES,
  type ActiveNav,
  type ActiveRole,
  type ClientLead,
  type DealItem,
  type DocumentItem,
  type OfferItem,
  type PropertyItem,
} from "./types"

export function useCommandState() {
  const { user, switchDemoUser } = useAuth()

  const [activeRole, setActiveRole] = React.useState<ActiveRole>(
    user?.role === "buyer"
      ? "buyer"
      : user?.role === "seller"
        ? "seller"
        : "organizer"
  )

  React.useEffect(() => {
    if (user?.role === "buyer") setActiveRole("buyer")
    else if (user?.role === "seller") setActiveRole("seller")
    else if (user?.role === "broker") setActiveRole("organizer")
  }, [user?.role])

  const [activeNav, setActiveNav] = React.useState<ActiveNav>("overview")

  const [searchQuery, setSearchQuery] = React.useState("")
  const [propertyFilterStatus, setPropertyFilterStatus] = React.useState("All")
  const [propertyFilterCategory, setPropertyFilterCategory] =
    React.useState("All")
  const [offerFilterStatus, setOfferFilterStatus] = React.useState("All")

  const [toastMessage, setToastMessage] = React.useState<string | null>(null)
  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleRoleChange = (role: ActiveRole) => {
    setActiveRole(role)
    const targetAuth = role === "organizer" ? "broker" : role
    switchDemoUser(targetAuth)
    triggerToast(`Switched to ${role.toUpperCase()} Management Portal`)
  }

  const [properties, setProperties] =
    React.useState<PropertyItem[]>(INITIAL_PROPERTIES)
  const [offers, setOffers] = React.useState<OfferItem[]>(INITIAL_OFFERS)
  const [leads, setLeads] = React.useState<ClientLead[]>(INITIAL_LEADS)
  const [deals, setDeals] = React.useState<DealItem[]>(INITIAL_DEALS)
  const [documents] = React.useState<DocumentItem[]>(INITIAL_DOCS)

  const [securityArmed, setSecurityArmed] = React.useState(true)
  const [gateUnlocked, setGateUnlocked] = React.useState(false)
  const [salonTemp, setSalonTemp] = React.useState(70)

  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] =
    React.useState(false)
  const [newPropertyTitle, setNewPropertyTitle] = React.useState("")
  const [newPropertyLocation, setNewPropertyLocation] = React.useState("")
  const [newPropertyPrice, setNewPropertyPrice] = React.useState("")
  const [newPropertyCategory, setNewPropertyCategory] =
    React.useState<PropertyItem["category"]>("Villa")
  const [newPropertyBeds, setNewPropertyBeds] = React.useState("5")
  const [newPropertyBaths, setNewPropertyBaths] = React.useState("6")
  const [newPropertySqft, setNewPropertySqft] = React.useState("7500")

  const [counterModalOffer, setCounterModalOffer] =
    React.useState<OfferItem | null>(null)
  const [counterPriceInput, setCounterPriceInput] = React.useState("")

  const [isAddClientModalOpen, setIsAddClientModalOpen] = React.useState(false)
  const [newClientName, setNewClientName] = React.useState("")
  const [newClientEntity, setNewClientEntity] = React.useState("")
  const [newClientEmail, setNewClientEmail] = React.useState("")
  const [newClientPhone, setNewClientPhone] = React.useState("")
  const [newClientBudget, setNewClientBudget] = React.useState("")
  const [newClientEnclave, setNewClientEnclave] = React.useState("")

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPropertyTitle || !newPropertyPrice || !newPropertyLocation) return

    const newProp: PropertyItem = {
      id: `EST-00${properties.length + 1}`,
      title: newPropertyTitle,
      location: newPropertyLocation,
      price: Number(newPropertyPrice),
      category: newPropertyCategory,
      status: "Active",
      beds: Number(newPropertyBeds) || 4,
      baths: Number(newPropertyBaths) || 4,
      sqft: Number(newPropertySqft) || 5000,
      inquiries: 0,
      viewsCount: 1,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
      featured: false,
    }

    setProperties([newProp, ...properties])
    setIsAddPropertyModalOpen(false)
    setNewPropertyTitle("")
    setNewPropertyLocation("")
    setNewPropertyPrice("")
    triggerToast(`Added listing "${newProp.title}" to inventory`)
  }

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newClientName || !newClientEmail) return

    const newLead: ClientLead = {
      id: `LED-${leads.length + 101}`,
      name: newClientName,
      entity: newClientEntity || "Private Client Office",
      email: newClientEmail,
      phone: newClientPhone || "+1 (555) 019-2834",
      budget: Number(newClientBudget) || 10000000,
      targetEnclave: newClientEnclave || "Global Luxury Enclaves",
      leadScore: "A+",
      status: "New Inquiry",
      assignedAgent: user?.name || "Senior Desk Director",
      lastContact: "Just now",
    }

    setLeads([newLead, ...leads])
    setIsAddClientModalOpen(false)
    setNewClientName("")
    setNewClientEntity("")
    setNewClientEmail("")
    setNewClientPhone("")
    setNewClientBudget("")
    setNewClientEnclave("")
    triggerToast(`New client "${newLead.name}" enrolled into CRM`)
  }

  const handleAcceptOffer = (id: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "Escrow Opened" } : o))
    )
    triggerToast("Offer accepted! Escrow desk initialized.")
  }

  const handleDeclineOffer = (id: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "Declined" } : o))
    )
    triggerToast("Offer declined.")
  }

  const handleApplyCounterOffer = () => {
    if (!counterModalOffer || !counterPriceInput) return
    setOffers((prev) =>
      prev.map((o) =>
        o.id === counterModalOffer.id
          ? {
              ...o,
              offerPrice: Number(counterPriceInput),
              status: "Under Negotiation",
            }
          : o
      )
    )
    setCounterModalOffer(null)
    setCounterPriceInput("")
    triggerToast("Counter-offer transmitted.")
  }

  const handleAdvanceDealStage = (id: string) => {
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id !== id) return deal
        const stages: DealItem["stage"][] = [
          "Inbound",
          "Pre-Flight Audit",
          "Active Syndicate",
          "In Escrow",
          "Closed",
        ]
        const currentIndex = stages.indexOf(deal.stage)
        const nextIndex = Math.min(stages.length - 1, currentIndex + 1)
        return { ...deal, stage: stages[nextIndex] }
      })
    )
    triggerToast("Deal milestone advanced.")
  }

  const handleTogglePropertyStatus = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        const nextStatus: PropertyItem["status"] =
          p.status === "Active"
            ? "Draft"
            : p.status === "Draft"
              ? "Active"
              : p.status
        return { ...p, status: nextStatus }
      })
    )
    triggerToast("Property listing status updated.")
  }

  const handleDeleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id))
    triggerToast("Property removed from inventory.")
  }

  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      propertyFilterStatus === "All" || p.status === propertyFilterStatus
    const matchesCategory =
      propertyFilterCategory === "All" || p.category === propertyFilterCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  const filteredOffers = offers.filter((o) => {
    const matchesSearch =
      o.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      offerFilterStatus === "All" || o.status === offerFilterStatus
    return matchesSearch && matchesStatus
  })

  const filteredLeads = leads.filter((l) => {
    return (
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.targetEnclave.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const totalPortfolioValue = properties.reduce((acc, p) => acc + p.price, 0)
  const totalOffersValue = offers.reduce((acc, o) => acc + o.offerPrice, 0)
  const activeEscrowDeals = deals.filter(
    (d) => d.stage === "In Escrow" || d.stage === "Active Syndicate"
  )
  const totalCommissionPipeline = deals.reduce(
    (acc, d) => acc + d.commission,
    0
  )
  const newOffersCount = offers.filter(
    (o) => o.status === "Pending Review"
  ).length

  const ROLES = [
    {
      id: "seller" as const,
      label: "Seller (Principal)",
      icon: IconBuildingEstate,
    },
    { id: "buyer" as const, label: "Buyer (Investor)", icon: IconBriefcase },
    { id: "organizer" as const, label: "Organizer (Broker)", icon: IconUsers },
  ]

  const NAV_ITEMS = [
    {
      id: "overview" as const,
      label: "Overview",
      icon: IconLayoutDashboard,
      badge: "Live",
    },
    {
      id: "properties" as const,
      label: "Properties",
      icon: IconBuildingEstate,
      count: properties.length,
    },
    {
      id: "offers" as const,
      label: "Offers",
      icon: IconFileSpreadsheet,
      badge: newOffersCount > 0 ? `${newOffersCount} new` : undefined,
    },
    { id: "crm" as const, label: "CRM", icon: IconUsers, count: leads.length },
    { id: "financials" as const, label: "Financials", icon: IconChartBar },
    {
      id: "vault" as const,
      label: "Vault",
      icon: IconFolderCheck,
      count: documents.length,
    },
    { id: "sentry" as const, label: "Sentry", icon: IconShieldLock, dot: true },
  ]

  const STATS_DATA = [
    {
      label:
        activeRole === "seller"
          ? "Active Portfolio Valuation"
          : activeRole === "buyer"
            ? "Capital Allocated / Committed"
            : "Platform Managed Gross Volume",
      value: `$${(totalPortfolioValue / 1000000).toFixed(1)}M`,
      trend: "+14.2% MoM Expansion",
      trendPositive: true,
      icon: IconCurrencyDollar,
      color: "text-primary bg-primary/10",
    },
    {
      label: "Inbound Purchase LOIs",
      value: `${offers.length} Offers`,
      trend: `$${(totalOffersValue / 1000000).toFixed(1)}M Total Value`,
      icon: IconFileSpreadsheet,
      color: "text-secondary bg-secondary/15",
    },
    {
      label: "Active In Escrow Deals",
      value: `${activeEscrowDeals.length} Deals`,
      trend: "Avg. 21 Days to Settlement",
      icon: IconBuildingEstate,
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      label: "Projected Commission Desk",
      value: `$${(totalCommissionPipeline / 1000).toFixed(0)}k`,
      trend: "Protected via Escrow Trust",
      trendPositive: true,
      icon: IconCash,
      color: "text-emerald-500 bg-emerald-500/10",
    },
  ]

  const URGENT_ITEMS = [
    {
      tag: "LOI REVIEW",
      tagColor: "bg-secondary/15 text-secondary",
      meta: "24h remaining",
      title: "Julian Rossi • $8.65M",
      sub: "The Glass Horizon Villa",
      action: "Review & Negotiate",
      btnClass: "bg-primary text-white hover:bg-primary/90",
      onClick: () => setActiveNav("offers"),
    },
    {
      tag: "PRE-FLIGHT AUDIT",
      tagColor: "bg-primary/15 text-primary",
      meta: "Tribeca NY",
      title: "One Greenwich Penthouse",
      sub: "Seismic & Structural verification",
      action: "Inspect Vault",
      btnClass:
        "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
      onClick: () => setActiveNav("vault"),
    },
    {
      tag: "ESCROW WIRE",
      tagColor: "bg-emerald-500/15 text-emerald-400",
      meta: "Earnest Locked",
      title: "Biscayne Bay Deepwater",
      sub: "$1.4M earnest deposited in trust",
      action: "Open Closing Desk",
      btnClass: "bg-secondary text-primary hover:bg-secondary/90",
      href: "/closing",
    },
  ]

  const ASSET_BREAKDOWN = [
    {
      label: "Ultra-Luxury Villas",
      value: "$37.2M (42%)",
      pct: "w-[42%]",
      color: "bg-primary",
    },
    {
      label: "Sky Penthouses",
      value: "$24.5M (28%)",
      pct: "w-[28%]",
      color: "bg-secondary",
    },
    {
      label: "Private Islands",
      value: "$18.9M (20%)",
      pct: "w-[20%]",
      color: "bg-emerald-500",
    },
    {
      label: "Historic Manors",
      value: "$8.8M (10%)",
      pct: "w-[10%]",
      color: "bg-amber-500",
    },
  ]

  return {
    user,
    activeRole,
    activeNav,
    setActiveNav,
    searchQuery,
    setSearchQuery,
    propertyFilterStatus,
    setPropertyFilterStatus,
    propertyFilterCategory,
    setPropertyFilterCategory,
    offerFilterStatus,
    setOfferFilterStatus,
    toastMessage,
    triggerToast,
    handleRoleChange,
    properties,
    offers,
    leads,
    deals,
    documents,
    securityArmed,
    setSecurityArmed,
    gateUnlocked,
    setGateUnlocked,
    salonTemp,
    setSalonTemp,
    isAddPropertyModalOpen,
    setIsAddPropertyModalOpen,
    newPropertyTitle,
    setNewPropertyTitle,
    newPropertyLocation,
    setNewPropertyLocation,
    newPropertyPrice,
    setNewPropertyPrice,
    newPropertyCategory,
    setNewPropertyCategory,
    newPropertyBeds,
    setNewPropertyBeds,
    newPropertyBaths,
    setNewPropertyBaths,
    newPropertySqft,
    setNewPropertySqft,
    counterModalOffer,
    setCounterModalOffer,
    counterPriceInput,
    setCounterPriceInput,
    isAddClientModalOpen,
    setIsAddClientModalOpen,
    newClientName,
    setNewClientName,
    newClientEntity,
    setNewClientEntity,
    newClientEmail,
    setNewClientEmail,
    newClientPhone,
    setNewClientPhone,
    newClientBudget,
    setNewClientBudget,
    newClientEnclave,
    setNewClientEnclave,
    handleCreateProperty,
    handleCreateClient,
    handleAcceptOffer,
    handleDeclineOffer,
    handleApplyCounterOffer,
    handleAdvanceDealStage,
    handleTogglePropertyStatus,
    handleDeleteProperty,
    filteredProperties,
    filteredOffers,
    filteredLeads,
    totalPortfolioValue,
    totalOffersValue,
    activeEscrowDeals,
    totalCommissionPipeline,
    newOffersCount,
    ROLES,
    NAV_ITEMS,
    STATS_DATA,
    URGENT_ITEMS,
    ASSET_BREAKDOWN,
  }
}

export type CommandState = ReturnType<typeof useCommandState>
