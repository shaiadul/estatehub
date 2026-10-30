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
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import {
  acceptOfferAction,
  counterOfferAction,
  rejectOfferAction,
  getMyOffersAction,
  submitOfferAction,
} from "@/actions/offers"
import { bookTourAction, updateTourStatusAction, getMyToursAction } from "@/actions/tours"
import {
  toggleBookmarkAction,
  getPropertiesAction,
  getMyPropertiesAction,
  createPropertyAction,
  updatePropertyAction,
  deletePropertyAction,
  getBookmarkedPropertiesAction,
} from "@/actions/properties"
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

function mapBackendToDashboardProperty(p: any): PropertyItem {
  const cat = (p.property_type || "Villa").toLowerCase()
  const category: PropertyItem["category"] =
    cat.includes("penthouse") ? "Penthouse" :
    cat.includes("island") || cat.includes("water") ? "Island" :
    cat.includes("manor") || cat.includes("chalet") ? "Manor" :
    cat.includes("arch") ? "Architectural" : "Villa"

  const status: PropertyItem["status"] =
    p.status === "pending" || !p.approved ? "Draft" :
    p.status === "in_escrow" ? "In Escrow" :
    p.status === "under_offer" ? "Under Offer" :
    p.status === "sold" ? "Sold" : "Active"

  return {
    id: p.slug || p.id,
    title: p.title,
    location: `${p.city || ""}, ${p.state || ""}`.trim() || p.address || "California, USA",
    price: Number(p.price) || 0,
    category,
    status,
    beds: Number(p.beds) || 4,
    baths: Number(p.baths) || 4,
    sqft: Number(p.sqft) || 5000,
    inquiries: 12,
    viewsCount: Number(p.views_count) || 120,
    image: p.hero_image || (p.images && p.images[0]) || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    featured: Boolean(p.featured),
  }
}

function mapBackendToDashboardOffer(o: any): OfferItem {
  const statusMap: Record<string, OfferItem["status"]> = {
    submitted: "Pending Review",
    under_review: "Pending Review",
    countered: "Under Negotiation",
    accepted: "Escrow Opened",
    rejected: "Declined",
    closing: "Escrow Opened",
  }
  return {
    id: o.id,
    propertyId: o.property_id,
    propertyTitle: o.property_title || o.property?.title || "Luxury Estate",
    buyerName: o.buyer?.full_name || "Julian Rossi",
    buyerEntity: o.buyer?.entity_name || "Rossi Family Office & Trust",
    offerPrice: Number(o.offer_amount) || 0,
    earnestDeposit: Number(o.earnest_deposit) || Math.round((Number(o.offer_amount) || 0) * 0.1),
    financing: o.financing_type === "cash" ? "Institutional All-Cash Wire" :
               o.financing_type === "crypto" ? "Cryptographic Multi-Sig Wire" :
               o.financing_type === "sovereign_wire" ? "Sovereign Wire" : "Institutional Financing",
    status: statusMap[o.status] || "Pending Review",
    submittedDate: o.created_at ? new Date(o.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Today",
    expiryDate: "48 Hours",
    proofOfFundsVerified: true,
  }
}

function mapBackendToDashboardTour(t: any): TourBookingItem {
  return {
    id: t.id,
    propertyId: t.property_id,
    propertyTitle: t.property?.title || "Luxury Estate",
    clientName: t.visitor_name || "Julian Rossi",
    clientRole: "buyer",
    date: t.date || "Scheduled Date",
    timeSlot: t.time_slot || "14:00 - 16:00",
    transportType: t.tour_type === "virtual" ? "Virtual LiDAR 3D" : "Chauffeured Maybach",
    assignedAgent: "Sarah Jenkins",
    status: t.status === "completed" ? "Completed" : t.status === "pending" ? "Pending Concierge" : "Confirmed",
    specialRequests: t.notes || "Diplomatic VIP protocol requested.",
  }
}

export function useCommandState() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const roleQuery = searchParams.get("role") as ActiveRole | null
  const tabQuery = searchParams.get("tab") as ActiveNav | null
  const actionQuery = searchParams.get("action")
  const propertyQuery = searchParams.get("property")

  const [activeRole, setActiveRole] = React.useState<ActiveRole>(
    roleQuery && (roleQuery === "buyer" || roleQuery === "seller" || roleQuery === "organizer")
      ? roleQuery
      : user?.role === "buyer"
        ? "buyer"
        : user?.role === "seller"
          ? "seller"
          : "organizer"
  )

  React.useEffect(() => {
    if (roleQuery && (roleQuery === "buyer" || roleQuery === "seller" || roleQuery === "organizer")) {
      setActiveRole(roleQuery)
    } else if (user?.role === "buyer") setActiveRole("buyer")
    else if (user?.role === "seller") setActiveRole("seller")
    else if (user?.role === "broker" || user?.role === "organizer") setActiveRole("organizer")
  }, [user?.role, roleQuery])

  const [activeNav, setActiveNav] = React.useState<ActiveNav>(tabQuery || "overview")

  React.useEffect(() => {
    if (tabQuery) {
      setActiveNav(tabQuery)
    }
  }, [tabQuery])

  const errorQuery = searchParams.get("error")

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

  React.useEffect(() => {
    if (errorQuery === "unauthorized_admin") {
      triggerToast("Access Denied: Administrator role required for Enclave Governance")
    }
  }, [errorQuery])

  const handleRoleChange = (role: ActiveRole) => {
    setActiveRole(role)
    // Automatically switch active tab if not relevant to new role
    if (role === "buyer" && (activeNav === "properties" || activeNav === "crm" || activeNav === "sentry")) {
      setActiveNav("overview")
    } else if (role === "seller" && (activeNav === "saved" || activeNav === "crm")) {
      setActiveNav("overview")
    } else if (role === "organizer" && (activeNav === "saved" || activeNav === "sentry")) {
      setActiveNav("overview")
    }
    triggerToast(`Viewing ${role.toUpperCase()} Workspace`)
  }

  const [properties, setProperties] = React.useState<PropertyItem[]>([])
  const [offers, setOffers] = React.useState<OfferItem[]>([])
  const [leads, setLeads] = React.useState<ClientLead[]>(INITIAL_LEADS)
  const [deals, setDeals] = React.useState<DealItem[]>(INITIAL_DEALS)
  const [documents] = React.useState<DocumentItem[]>(INITIAL_DOCS)
  const [savedProperties, setSavedProperties] = React.useState<SavedPropertyItem[]>([])
  const [tours, setTours] = React.useState<TourBookingItem[]>([])
  const [isLoadingData, setIsLoadingData] = React.useState(true)

  const refetchProperties = React.useCallback(async () => {
    try {
      const propFetcher = activeRole === "seller" ? getMyPropertiesAction() : getPropertiesAction()
      const res = await propFetcher
      if (res.success && res.data) {
        setProperties(res.data.map(mapBackendToDashboardProperty))
      } else if (activeRole === "seller") {
        const fallbackRes = await getPropertiesAction()
        if (fallbackRes.success && fallbackRes.data) {
          setProperties(fallbackRes.data.map(mapBackendToDashboardProperty))
        }
      }
    } catch (err) {
      console.error("Error fetching properties", err)
    }
  }, [activeRole])

  const refetchOffers = React.useCallback(async () => {
    try {
      const res = await getMyOffersAction()
      if (res.success && res.data) {
        setOffers(res.data.map(mapBackendToDashboardOffer))
      }
    } catch (err) {
      console.error("Error fetching offers", err)
    }
  }, [])

  const refetchTours = React.useCallback(async () => {
    try {
      const res = await getMyToursAction()
      if (res.success && res.data) {
        setTours(res.data.map(mapBackendToDashboardTour))
      }
    } catch (err) {
      console.error("Error fetching tours", err)
    }
  }, [])

  const refetchSaved = React.useCallback(async () => {
    try {
      const res = await getBookmarkedPropertiesAction()
      if (res.success && res.data) {
        const mappedSaved: SavedPropertyItem[] = res.data.map((p) => ({
          id: `SAV-${p.id.slice(0, 8)}`,
          propertyId: p.slug || p.id,
          title: p.title,
          location: `${p.city || ""}, ${p.state || ""}`.trim() || p.address || "California, USA",
          price: Number(p.price) || 0,
          originalPrice: (Number(p.price) || 0) * 1.05,
          image: p.hero_image || (p.images && p.images[0]) || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
          category: (p.property_type?.includes("penthouse") ? "Penthouse" : "Villa") as any,
          beds: p.beds || 4,
          baths: p.baths || 4,
          sqft: p.sqft || 5000,
          notes: "Monitored via backend watchlist.",
          tourRequested: false,
          savedAt: "Recently Added",
        }))
        setSavedProperties(mappedSaved)
      }
    } catch (err) {
      console.error("Error fetching saved properties", err)
    }
  }, [])

  // Initial and reactive data fetch from backend Go API
  React.useEffect(() => {
    setIsLoadingData(true)
    Promise.allSettled([
      refetchProperties(),
      refetchOffers(),
      refetchTours(),
      refetchSaved(),
    ]).finally(() => {
      setIsLoadingData(false)
    })
  }, [refetchProperties, refetchOffers, refetchTours, refetchSaved, user?.role, activeRole])

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

  React.useEffect(() => {
    if (actionQuery === "loi") {
      setIsSubmitLoiModalOpen(true)
      if (propertyQuery) {
        setLoiTargetProperty(propertyQuery)
      }
    } else if (actionQuery === "tour") {
      setIsBookTourModalOpen(true)
      if (propertyQuery) {
        setTourPropertyId(propertyQuery)
      }
    }
  }, [actionQuery, propertyQuery])

  const handleCreateProperty = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPropertyTitle || !newPropertyPrice || !newPropertyLocation) return

    try {
      const res = await createPropertyAction({
        title: newPropertyTitle,
        address: newPropertyLocation,
        city: newPropertyLocation.split(",")[0]?.trim() || "Beverly Hills",
        state: "CA",
        price: Number(newPropertyPrice),
        beds: Number(newPropertyBeds) || 4,
        baths: Number(newPropertyBaths) || 4,
        sqft: Number(newPropertySqft) || 5000,
        property_type: newPropertyCategory.toLowerCase(),
        transaction_type: "buy",
        hero_image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
        description: `Exclusive ${newPropertyCategory} residence located in ${newPropertyLocation}.`,
        approved: true,
        featured: false,
        status: "Active Listing",
      })

      setIsAddPropertyModalOpen(false)
      setNewPropertyTitle("")
      setNewPropertyLocation("")
      setNewPropertyPrice("")

      if (res.success) {
        triggerToast(`Added listing "${newPropertyTitle}" to inventory`)
        await refetchProperties()
      } else {
        triggerToast(`Error adding listing: ${res.error || "Failed"}`)
      }
    } catch {
      triggerToast("Network error creating listing")
    }
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

  const handleSubmitLoi = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!loiOfferPrice) return

    const prop = properties.find((p) => p.id === loiTargetProperty) || properties[0]
    if (!prop) {
      triggerToast("No valid property selected for LOI")
      return
    }

    try {
      const res = await submitOfferAction({
        property_id: prop.id,
        offer_amount: Number(loiOfferPrice),
        earnest_deposit: Number(loiEarnestDeposit) || Number(loiOfferPrice) * 0.1,
        financing_type: "sovereign_wire",
        contingency_period_days: Number(loiContingencyDays) || 14,
        closing_timeline_days: 30,
        note: `Bilateral LOI transmitted with ${loiFinancing}`,
      })

      setIsSubmitLoiModalOpen(false)
      if (res.success) {
        triggerToast(`Bilateral LOI for $${(Number(loiOfferPrice) / 1000000).toFixed(2)}M transmitted`)
        await refetchOffers()
      } else {
        triggerToast(`LOI error: ${res.error || "Failed"}`)
      }
    } catch {
      triggerToast("Failed to transmit LOI")
    }
  }

  const handleBookTour = async (e: React.FormEvent) => {
    e.preventDefault()
    const prop = properties.find((p) => p.id === tourPropertyId) || properties[0]
    if (!prop) {
      triggerToast("Select property to book tour")
      return
    }

    try {
      const res = await bookTourAction({
        property_id: prop.id,
        tour_type: "in_person",
        date: tourDate || "Scheduled Date",
        time_slot: tourTimeSlot || "14:00 - 16:00",
        visitor_name: user?.name || "Julian Rossi",
        visitor_email: user?.email || "investor@estatehub.com",
      })

      setIsBookTourModalOpen(false)
      setTourSpecialRequests("")
      if (res.success) {
        triggerToast(`Private showing confirmed for "${prop.title}"`)
        await refetchTours()
      } else {
        triggerToast(`Tour error: ${res.error || "Failed"}`)
      }
    } catch {
      triggerToast("Failed to book private showing")
    }
  }

  const handleCancelTour = async (id: string) => {
    try {
      const res = await updateTourStatusAction(id, "cancelled")
      if (res.success) {
        triggerToast("Tour booking cancelled")
        await refetchTours()
      } else {
        triggerToast(`Error: ${res.error || "Failed to cancel"}`)
      }
    } catch {
      triggerToast("Failed to cancel tour")
    }
  }

  const handleRemoveSavedProperty = async (id: string) => {
    try {
      const res = await toggleBookmarkAction(id)
      if (res.success) {
        triggerToast("Property removed from watchlist")
        await refetchSaved()
      }
    } catch {
      triggerToast("Failed to remove from watchlist")
    }
  }

  const handleAcceptOffer = async (id: string) => {
    try {
      const res = await acceptOfferAction(id)
      if (res.success) {
        triggerToast("Offer accepted! Escrow desk initialized.")
        await refetchOffers()
      } else {
        triggerToast(`Error: ${res.error || "Failed to accept offer"}`)
      }
    } catch {
      triggerToast("Error accepting offer")
    }
  }

  const handleDeclineOffer = async (id: string) => {
    try {
      const res = await rejectOfferAction(id)
      if (res.success) {
        triggerToast("Offer declined.")
        await refetchOffers()
      } else {
        triggerToast(`Error: ${res.error || "Failed to decline offer"}`)
      }
    } catch {
      triggerToast("Error declining offer")
    }
  }

  const handleApplyCounterOffer = async () => {
    if (!counterModalOffer || !counterPriceInput) return
    const counterId = counterModalOffer.id
    const counterAmount = Number(counterPriceInput)

    try {
      const res = await counterOfferAction(counterId, counterAmount)
      setCounterModalOffer(null)
      setCounterPriceInput("")
      if (res.success) {
        triggerToast("Counter-offer transmitted.")
        await refetchOffers()
      } else {
        triggerToast(`Error: ${res.error || "Failed to counter offer"}`)
      }
    } catch {
      triggerToast("Failed to transmit counter-offer")
    }
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

  const handleTogglePropertyStatus = async (id: string) => {
    const targetProp = properties.find((p) => p.id === id)
    const nextStatus = targetProp?.status === "Active" ? "Draft" : "Active"

    try {
      await updatePropertyAction(id, {
        status: nextStatus === "Active" ? "Active Listing" : "Draft",
        approved: nextStatus === "Active",
      })
      triggerToast(`Property listing status updated to ${nextStatus}.`)
      await refetchProperties()
    } catch {
      triggerToast("Failed to update property status")
    }
  }

  const handleDeleteProperty = async (id: string) => {
    try {
      const res = await deletePropertyAction(id)
      if (res.success) {
        triggerToast("Property removed from inventory.")
        await refetchProperties()
      } else {
        triggerToast(`Error: ${res.error || "Failed to delete"}`)
      }
    } catch {
      triggerToast("Failed to delete property")
    }
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
    refetchProperties,
    refetchOffers,
    refetchTours,
    refetchSaved,
    isLoadingData,
    ROLES,
    NAV_ITEMS,
    STATS_DATA,
    URGENT_ITEMS,
    ASSET_BREAKDOWN,
  }
}

export type CommandState = ReturnType<typeof useCommandState>
