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
  IconBookmark,
  IconCalendarEvent,
  IconEye,
  IconReceipt2,
} from "@tabler/icons-react"
import { useAuth } from "@/lib/auth-context"
import {
  INITIAL_DEALS,
  INITIAL_DOCS,
  INITIAL_LEADS,
  INITIAL_OFFERS,
  INITIAL_PROPERTIES,
  INITIAL_SAVED_PROPERTIES,
  INITIAL_TOURS,
  type ActiveNav,
  type ActiveRole,
  type ClientLead,
  type DealItem,
  type DocumentItem,
  type OfferItem,
  type PropertyItem,
  type SavedPropertyItem,
  type TourBookingItem,
  type NavItem,
  type UrgentItem,
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
    else if (user?.role === "broker" || user?.role === "organizer") setActiveRole("organizer")
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
    
    // Automatically switch active tab if not relevant to new role
    if (role === "buyer" && (activeNav === "properties" || activeNav === "crm" || activeNav === "sentry")) {
      setActiveNav("overview")
    } else if (role === "seller" && (activeNav === "saved" || activeNav === "crm")) {
      setActiveNav("overview")
    } else if (role === "organizer" && (activeNav === "saved" || activeNav === "sentry")) {
      setActiveNav("overview")
    }
    
    triggerToast(`Switched to ${role.toUpperCase()} Management Portal`)
  }

  const [properties, setProperties] =
    React.useState<PropertyItem[]>(INITIAL_PROPERTIES)
  const [offers, setOffers] = React.useState<OfferItem[]>(INITIAL_OFFERS)
  const [leads, setLeads] = React.useState<ClientLead[]>(INITIAL_LEADS)
  const [deals, setDeals] = React.useState<DealItem[]>(INITIAL_DEALS)
  const [documents] = React.useState<DocumentItem[]>(INITIAL_DOCS)
  const [savedProperties, setSavedProperties] =
    React.useState<SavedPropertyItem[]>(INITIAL_SAVED_PROPERTIES)
  const [tours, setTours] = React.useState<TourBookingItem[]>(INITIAL_TOURS)

  const [securityArmed, setSecurityArmed] = React.useState(true)
  const [gateUnlocked, setGateUnlocked] = React.useState(false)
  const [salonTemp, setSalonTemp] = React.useState(70)

  // Add Property Modal State
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

  // Counter Offer Modal State
  const [counterModalOffer, setCounterModalOffer] =
    React.useState<OfferItem | null>(null)
  const [counterPriceInput, setCounterPriceInput] = React.useState("")

  // Add Client Modal State
  const [isAddClientModalOpen, setIsAddClientModalOpen] = React.useState(false)
  const [newClientName, setNewClientName] = React.useState("")
  const [newClientEntity, setNewClientEntity] = React.useState("")
  const [newClientEmail, setNewClientEmail] = React.useState("")
  const [newClientPhone, setNewClientPhone] = React.useState("")
  const [newClientBudget, setNewClientBudget] = React.useState("")
  const [newClientEnclave, setNewClientEnclave] = React.useState("")

  // Submit LOI Modal State (Buyer feature)
  const [isSubmitLoiModalOpen, setIsSubmitLoiModalOpen] = React.useState(false)
  const [loiTargetProperty, setLoiTargetProperty] = React.useState("EST-001")
  const [loiOfferPrice, setLoiOfferPrice] = React.useState("8750000")
  const [loiEarnestDeposit, setLoiEarnestDeposit] = React.useState("875000")
  const [loiFinancing, setLoiFinancing] = React.useState("Institutional All-Cash Wire")
  const [loiContingencyDays, setLoiContingencyDays] = React.useState("14")

  // Book Tour Modal State (Buyer & Organizer feature)
  const [isBookTourModalOpen, setIsBookTourModalOpen] = React.useState(false)
  const [tourPropertyId, setTourPropertyId] = React.useState("EST-001")
  const [tourDate, setTourDate] = React.useState("Tomorrow, 14:00 PST")
  const [tourTimeSlot, setTourTimeSlot] = React.useState("14:00 - 16:30")
  const [tourTransportType, setTourTransportType] =
    React.useState<TourBookingItem["transportType"]>("Chauffeured Maybach")
  const [tourSpecialRequests, setTourSpecialRequests] = React.useState("")

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

  const handleSubmitLoi = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loiOfferPrice) return

    const prop = properties.find((p) => p.id === loiTargetProperty) || properties[0]
    const newOffer: OfferItem = {
      id: `OFF-${offers.length + 905}`,
      propertyId: prop.id,
      propertyTitle: prop.title,
      buyerName: user?.name || "Julian Rossi",
      buyerEntity: "Rossi Family Office & Trust",
      offerPrice: Number(loiOfferPrice),
      earnestDeposit: Number(loiEarnestDeposit) || Number(loiOfferPrice) * 0.1,
      financing: loiFinancing,
      status: "Pending Review",
      submittedDate: "Just now",
      expiryDate: "48 Hours",
      proofOfFundsVerified: true,
    }

    setOffers([newOffer, ...offers])
    setIsSubmitLoiModalOpen(false)
    triggerToast(`Bilateral LOI for $${(newOffer.offerPrice / 1000000).toFixed(2)}M transmitted to Seller Trust`)
  }

  const handleBookTour = (e: React.FormEvent) => {
    e.preventDefault()
    const prop = properties.find((p) => p.id === tourPropertyId) || properties[0]
    const newTour: TourBookingItem = {
      id: `TR-${tours.length + 504}`,
      propertyId: prop.id,
      propertyTitle: prop.title,
      clientName: user?.name || "Julian Rossi",
      clientRole: activeRole === "organizer" ? "organizer" : "buyer",
      date: tourDate || "Scheduled Date",
      timeSlot: tourTimeSlot || "14:00 - 16:00",
      transportType: tourTransportType,
      assignedAgent: "Sarah Jenkins",
      status: "Confirmed",
      specialRequests: tourSpecialRequests || "Diplomatic VIP protocol requested.",
    }
    setTours([newTour, ...tours])
    setIsBookTourModalOpen(false)
    setTourSpecialRequests("")
    triggerToast(`Private showing confirmed for "${prop.title}"`)
  }

  const handleCancelTour = (id: string) => {
    setTours((prev) => prev.filter((t) => t.id !== id))
    triggerToast("Tour booking cancelled")
  }

  const handleRemoveSavedProperty = (id: string) => {
    setSavedProperties((prev) => prev.filter((p) => p.id !== id))
    triggerToast("Property removed from watchlist")
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

  // Role-specific Navigation Items
  const buyerNavItems: NavItem[] = [
    {
      id: "overview" as const,
      label: "Buyer Overview",
      icon: IconLayoutDashboard,
      badge: "Live",
    },
    {
      id: "saved" as const,
      label: "Saved Estates",
      icon: IconBookmark,
      count: savedProperties.length,
    },
    {
      id: "offers" as const,
      label: "My Purchase LOIs",
      icon: IconFileSpreadsheet,
      badge: `${offers.filter((o) => o.buyerName.toLowerCase().includes("julian") || o.buyerName.toLowerCase().includes("rossi")).length} bids`,
    },
    {
      id: "tours" as const,
      label: "Private Tours",
      icon: IconCalendarEvent,
      count: tours.filter((t) => t.clientRole === "buyer" || t.clientName.toLowerCase().includes("julian")).length,
    },
    {
      id: "financials" as const,
      label: "Liquidity & POF",
      icon: IconChartBar,
    },
    {
      id: "vault" as const,
      label: "Diligence VDR",
      icon: IconFolderCheck,
      count: documents.length,
    },
  ]

  const sellerNavItems: NavItem[] = [
    {
      id: "overview" as const,
      label: "Seller Command",
      icon: IconLayoutDashboard,
      badge: "Live",
    },
    {
      id: "properties" as const,
      label: "My Properties",
      icon: IconBuildingEstate,
      count: properties.length,
    },
    {
      id: "offers" as const,
      label: "Inbound Offers",
      icon: IconFileSpreadsheet,
      badge: newOffersCount > 0 ? `${newOffersCount} new` : undefined,
    },
    {
      id: "financials" as const,
      label: "Escrow & Proceeds",
      icon: IconChartBar,
    },
    {
      id: "vault" as const,
      label: "Title & Disclosures",
      icon: IconFolderCheck,
      count: documents.length,
    },
    {
      id: "sentry" as const,
      label: "Estate Sentry",
      icon: IconShieldLock,
      dot: true,
    },
  ]

  const organizerNavItems: NavItem[] = [
    {
      id: "overview" as const,
      label: "Broker Command",
      icon: IconLayoutDashboard,
      badge: "Live",
    },
    {
      id: "crm" as const,
      label: "Client CRM",
      icon: IconUsers,
      count: leads.length,
    },
    {
      id: "properties" as const,
      label: "Syndicate Inventory",
      icon: IconBuildingEstate,
      count: properties.length,
    },
    {
      id: "offers" as const,
      label: "Offer Mediation",
      icon: IconFileSpreadsheet,
      badge: newOffersCount > 0 ? `${newOffersCount} active` : undefined,
    },
    {
      id: "tours" as const,
      label: "Tour Dispatch",
      icon: IconCalendarEvent,
      count: tours.length,
    },
    {
      id: "financials" as const,
      label: "Commission Desk",
      icon: IconChartBar,
    },
    {
      id: "vault" as const,
      label: "Compliance Vault",
      icon: IconFolderCheck,
      count: documents.length,
    },
  ]

  const NAV_ITEMS =
    activeRole === "buyer"
      ? buyerNavItems
      : activeRole === "seller"
        ? sellerNavItems
        : organizerNavItems

  // Role-tailored Stats
  const buyerStats = [
    {
      label: "Allocated Acquisition Reserve",
      value: "$25.0M",
      trend: "+$5.0M Institutional POF Verified",
      trendPositive: true,
      icon: IconCurrencyDollar,
      color: "text-primary bg-primary/10",
    },
    {
      label: "Active Submitted LOIs",
      value: `${offers.filter((o) => o.buyerName.toLowerCase().includes("julian") || o.buyerName.toLowerCase().includes("rossi")).length} Bids`,
      trend: "Under Bilateral Diligence",
      icon: IconFileSpreadsheet,
      color: "text-secondary bg-secondary/15",
    },
    {
      label: "Saved Trophy Watchlist",
      value: `${savedProperties.length} Estates`,
      trend: "Real-time Comps & Repricing",
      icon: IconBookmark,
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      label: "Scheduled Private Tours",
      value: `${tours.filter((t) => t.clientRole === "buyer" || t.clientName.toLowerCase().includes("julian")).length} Showings`,
      trend: "Chauffeured Maybach Escort",
      trendPositive: true,
      icon: IconCalendarEvent,
      color: "text-emerald-500 bg-emerald-500/10",
    },
  ]

  const sellerStats = [
    {
      label: "Active Portfolio Valuation",
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
      label: "Total Unique Inquiries",
      value: "98 Inquiries",
      trend: "Ultra-HNW Verified Buyers Only",
      trendPositive: true,
      icon: IconEye,
      color: "text-emerald-500 bg-emerald-500/10",
    },
  ]

  const organizerStats = [
    {
      label: "Platform Managed Gross Volume",
      value: "$89.5M",
      trend: "+22.4% Syndicate Pipeline",
      trendPositive: true,
      icon: IconCurrencyDollar,
      color: "text-primary bg-primary/10",
    },
    {
      label: "Active Investor Mandates",
      value: `${leads.length} Leads`,
      trend: "Average $17.4M Liquid Budget",
      icon: IconUsers,
      color: "text-secondary bg-secondary/15",
    },
    {
      label: "VIP Showings Dispatched",
      value: `${tours.length} Tours`,
      trend: "Maybach & Helicopter Fleet",
      icon: IconCalendarEvent,
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      label: "Projected Broker Commission",
      value: `$${(totalCommissionPipeline / 1000).toFixed(0)}k`,
      trend: "Protected via Escrow Trust",
      trendPositive: true,
      icon: IconCash,
      color: "text-emerald-500 bg-emerald-500/10",
    },
  ]

  const STATS_DATA =
    activeRole === "buyer"
      ? buyerStats
      : activeRole === "seller"
        ? sellerStats
        : organizerStats

  // Role-tailored Urgent Items
  const buyerUrgentItems: UrgentItem[] = [
    {
      tag: "COUNTER RECEIVED",
      tagColor: "bg-secondary/15 text-secondary",
      meta: "18h remaining",
      title: "The Glass Horizon Villa",
      sub: "Seller countered at $8.70M with 14-day diligence",
      action: "Review Counter",
      btnClass: "bg-primary text-white hover:bg-primary/90",
      onClick: () => setActiveNav("offers"),
    },
    {
      tag: "PRIVATE SHOWING",
      tagColor: "bg-primary/15 text-primary",
      meta: "Tomorrow 14:00",
      title: "The Glass Horizon Villa",
      sub: "Chauffeured Maybach transfer confirmed from Beverly Hills",
      action: "View Itinerary",
      btnClass:
        "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
      onClick: () => setActiveNav("tours"),
    },
    {
      tag: "VDR UNLOCKED",
      tagColor: "bg-emerald-500/15 text-emerald-400",
      meta: "Full Diligence Access",
      title: "Biscayne Bay Deepwater",
      sub: "Title deeds & 5-year pro-forma unlocked for inspection",
      action: "Open VDR Room",
      btnClass: "bg-secondary text-primary hover:bg-secondary/90",
      href: "/vdr",
    },
  ]

  const sellerUrgentItems: UrgentItem[] = [
    {
      tag: "LOI REVIEW",
      tagColor: "bg-secondary/15 text-secondary",
      meta: "24h remaining",
      title: "Julian Rossi • $8.65M",
      sub: "The Glass Horizon Villa - All cash wire verified",
      action: "Review & Negotiate",
      btnClass: "bg-primary text-white hover:bg-primary/90",
      onClick: () => setActiveNav("offers"),
    },
    {
      tag: "PRE-FLIGHT AUDIT",
      tagColor: "bg-primary/15 text-primary",
      meta: "Tribeca NY",
      title: "One Greenwich Penthouse",
      sub: "Seismic & structural engineering verification required",
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
      sub: "$1.4M earnest deposit locked in trust",
      action: "Open Closing Desk",
      btnClass: "bg-secondary text-primary hover:bg-secondary/90",
      href: "/closing",
    },
  ]

  const organizerUrgentItems: UrgentItem[] = [
    {
      tag: "TOUR DISPATCH",
      tagColor: "bg-secondary/15 text-secondary",
      meta: "Today 16:00",
      title: "Lord Alistair Sterling",
      sub: "Confirm Maybach escort for Bel Air property viewing",
      action: "Dispatch Fleet",
      btnClass: "bg-primary text-white hover:bg-primary/90",
      onClick: () => setActiveNav("tours"),
    },
    {
      tag: "CRM FOLLOW-UP",
      tagColor: "bg-primary/15 text-primary",
      meta: "Monaco Office",
      title: "Claire Moreau • $20.0M",
      sub: "Review SoHo & Tribeca penthouse short-list package",
      action: "Open CRM Lead",
      btnClass:
        "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
      onClick: () => setActiveNav("crm"),
    },
    {
      tag: "COMMISSION RELEASE",
      tagColor: "bg-emerald-500/15 text-emerald-400",
      meta: "Closing in 7 Days",
      title: "$426k Commission Trust",
      sub: "Biscayne Bay escrow milestone nearing final wire",
      action: "Commission Desk",
      btnClass: "bg-secondary text-primary hover:bg-secondary/90",
      onClick: () => setActiveNav("financials"),
    },
  ]

  const URGENT_ITEMS =
    activeRole === "buyer"
      ? buyerUrgentItems
      : activeRole === "seller"
        ? sellerUrgentItems
        : organizerUrgentItems

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
    savedProperties,
    tours,
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
    isSubmitLoiModalOpen,
    setIsSubmitLoiModalOpen,
    loiTargetProperty,
    setLoiTargetProperty,
    loiOfferPrice,
    setLoiOfferPrice,
    loiEarnestDeposit,
    setLoiEarnestDeposit,
    loiFinancing,
    setLoiFinancing,
    loiContingencyDays,
    setLoiContingencyDays,
    isBookTourModalOpen,
    setIsBookTourModalOpen,
    tourPropertyId,
    setTourPropertyId,
    tourDate,
    setTourDate,
    tourTimeSlot,
    setTourTimeSlot,
    tourTransportType,
    setTourTransportType,
    tourSpecialRequests,
    setTourSpecialRequests,
    handleCreateProperty,
    handleCreateClient,
    handleSubmitLoi,
    handleBookTour,
    handleCancelTour,
    handleRemoveSavedProperty,
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
