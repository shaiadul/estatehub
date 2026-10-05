"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  IconLayoutDashboard,
  IconBuildingEstate,
  IconFileText,
  IconUsers,
  IconChartBar,
  IconFolderCheck,
  IconShieldLock,
  IconSearch,
  IconPlus,
  IconCheck,
  IconX,
  IconTrash,
  IconEye,
  IconDownload,
  IconUpload,
  IconPhone,
  IconMail,
  IconArrowRight,
  IconTrendingUp,
  IconCurrencyDollar,
  IconChevronRight,
  IconLock,
  IconLockOpen,
  IconTemperature,
  IconSparkles,
  IconRefresh,
  IconMapPin,
  IconExternalLink,
  IconBriefcase,
  IconCash,
  IconFileSpreadsheet,
} from "@tabler/icons-react"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useAuth } from "@/lib/auth-context"

interface PropertyItem {
  id: string
  title: string
  location: string
  price: number
  category: "Villa" | "Penthouse" | "Island" | "Manor" | "Architectural"
  status: "Active" | "Under Offer" | "In Escrow" | "Draft" | "Sold"
  beds: number
  baths: number
  sqft: number
  inquiries: number
  viewsCount: number
  image: string
  featured?: boolean
}

interface OfferItem {
  id: string
  propertyId: string
  propertyTitle: string
  buyerName: string
  buyerEntity: string
  offerPrice: number
  earnestDeposit: number
  financing: string
  status: "Pending Review" | "Under Negotiation" | "Escrow Opened" | "Declined"
  submittedDate: string
  expiryDate: string
  proofOfFundsVerified: boolean
}

interface ClientLead {
  id: string
  name: string
  entity: string
  email: string
  phone: string
  budget: number
  targetEnclave: string
  leadScore: "A+" | "A" | "B" | "VIP"
  status: "New Inquiry" | "Showing Booked" | "Under Negotiation" | "Closed"
  assignedAgent: string
  lastContact: string
}

interface DealItem {
  id: string
  estate: string
  location: string
  price: number
  seller: string
  buyer: string
  stage:
    "Inbound" | "Pre-Flight Audit" | "Active Syndicate" | "In Escrow" | "Closed"
  commission: number
  closingDate: string
}

interface DocumentItem {
  id: string
  title: string
  category:
    "Title Deed" | "Contract" | "Audit Report" | "KYC / AML" | "Tax Disclosure"
  fileSize: string
  uploadedDate: string
  status: "Verified & Encrypted" | "Pending Signature" | "Draft"
  securityTier: "Tier 1 - Sovereign" | "Tier 2 - Institutional"
}

const INITIAL_PROPERTIES: PropertyItem[] = [
  {
    id: "EST-001",
    title: "The Glass Horizon Villa",
    location: "Bel Air, Los Angeles, CA",
    price: 8750000,
    category: "Architectural",
    status: "Active",
    beds: 6,
    baths: 8,
    sqft: 9400,
    inquiries: 19,
    viewsCount: 1420,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "EST-002",
    title: "One Greenwich Penthouse",
    location: "Tribeca, New York, NY",
    price: 18900000,
    category: "Penthouse",
    status: "Under Offer",
    beds: 4,
    baths: 5,
    sqft: 6800,
    inquiries: 34,
    viewsCount: 3120,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "EST-003",
    title: "Biscayne Bay Deepwater Palazzo",
    location: "Miami Beach, FL",
    price: 14200000,
    category: "Villa",
    status: "In Escrow",
    beds: 7,
    baths: 9,
    sqft: 11200,
    inquiries: 28,
    viewsCount: 2840,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "EST-004",
    title: "Aspen Alpine Sanctuary",
    location: "Red Mountain, Aspen, CO",
    price: 12500000,
    category: "Manor",
    status: "Active",
    beds: 5,
    baths: 6,
    sqft: 8100,
    inquiries: 12,
    viewsCount: 980,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    id: "EST-005",
    title: "Exuma Cays Private Atoll",
    location: "Exuma, Bahamas",
    price: 24500000,
    category: "Island",
    status: "Draft",
    beds: 10,
    baths: 12,
    sqft: 16000,
    inquiries: 5,
    viewsCount: 420,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
]

const INITIAL_OFFERS: OfferItem[] = [
  {
    id: "OFF-901",
    propertyId: "EST-001",
    propertyTitle: "The Glass Horizon Villa",
    buyerName: "Julian Rossi",
    buyerEntity: "Swiss Heritage Trust / Rossi Family Office",
    offerPrice: 8650000,
    earnestDeposit: 865000,
    financing: "Institutional All-Cash Wire",
    status: "Pending Review",
    submittedDate: "Oct 05, 2026",
    expiryDate: "48 Hours",
    proofOfFundsVerified: true,
  },
  {
    id: "OFF-902",
    propertyId: "EST-001",
    propertyTitle: "The Glass Horizon Villa",
    buyerName: "Geneva Capital Lux S.A.",
    buyerEntity: "Geneva Sovereign Portfolio",
    offerPrice: 8500000,
    earnestDeposit: 850000,
    financing: "Private Escrow Settlement",
    status: "Under Negotiation",
    submittedDate: "Oct 04, 2026",
    expiryDate: "24 Hours",
    proofOfFundsVerified: true,
  },
  {
    id: "OFF-903",
    propertyId: "EST-003",
    propertyTitle: "Biscayne Bay Deepwater Palazzo",
    buyerName: "Vanderbilt Partners",
    buyerEntity: "Vanderbilt Multi-Family Office",
    offerPrice: 14000000,
    earnestDeposit: 1400000,
    financing: "Escrow Deposit Wired",
    status: "Escrow Opened",
    submittedDate: "Oct 02, 2026",
    expiryDate: "Under Contract",
    proofOfFundsVerified: true,
  },
  {
    id: "OFF-904",
    propertyId: "EST-002",
    propertyTitle: "One Greenwich Penthouse",
    buyerName: "Nordic Apex Holdings",
    buyerEntity: "Stockholm Private Trust",
    offerPrice: 17500000,
    earnestDeposit: 1750000,
    financing: "All-Cash Settlement",
    status: "Declined",
    submittedDate: "Sep 28, 2026",
    expiryDate: "Expired",
    proofOfFundsVerified: true,
  },
]

const INITIAL_LEADS: ClientLead[] = [
  {
    id: "LED-101",
    name: "Lord Alistair Sterling",
    entity: "Kensington Family Office",
    email: "sterling.a@kensingtontrust.co.uk",
    phone: "+44 20 7946 0912",
    budget: 15000000,
    targetEnclave: "Bel Air & Holmby Hills",
    leadScore: "VIP",
    status: "Showing Booked",
    assignedAgent: "Elena Rostova",
    lastContact: "2 hours ago",
  },
  {
    id: "LED-102",
    name: "Claire Moreau",
    entity: "Moreau Holdings Monaco",
    email: "c.moreau@monaco-invest.mc",
    phone: "+377 98 06 20 00",
    budget: 20000000,
    targetEnclave: "Tribeca & SoHo NYC",
    leadScore: "A+",
    status: "Under Negotiation",
    assignedAgent: "David Vance",
    lastContact: "Yesterday",
  },
  {
    id: "LED-103",
    name: "Henrik Lindqvist",
    entity: "Nordic Venture Assets",
    email: "henrik@nordicventure.se",
    phone: "+46 8 123 4567",
    budget: 9500000,
    targetEnclave: "Miami Waterfront",
    leadScore: "A",
    status: "New Inquiry",
    assignedAgent: "Elena Rostova",
    lastContact: "3 days ago",
  },
  {
    id: "LED-104",
    name: "Daisuke Tanaka",
    entity: "Shibuya Global Real Estate",
    email: "tanaka@shibuyare.co.jp",
    phone: "+81 3 5555 0143",
    budget: 25000000,
    targetEnclave: "Aspen & Vail Valley",
    leadScore: "VIP",
    status: "Showing Booked",
    assignedAgent: "Marcus Sterling",
    lastContact: "4 hours ago",
  },
]

const INITIAL_DEALS: DealItem[] = [
  {
    id: "DL-100",
    estate: "The Glass Horizon Villa",
    location: "Bel Air, Los Angeles",
    price: 8750000,
    seller: "Marcus Sterling (Trust)",
    buyer: "Julian Rossi (Family Office)",
    stage: "Active Syndicate",
    commission: 262500,
    closingDate: "Nov 15, 2026",
  },
  {
    id: "DL-101",
    estate: "Biscayne Bay Deepwater Palazzo",
    location: "Miami Beach, FL",
    price: 14200000,
    seller: "Star Island Holdings",
    buyer: "Vanderbilt Partners",
    stage: "In Escrow",
    commission: 426000,
    closingDate: "Oct 28, 2026",
  },
  {
    id: "DL-102",
    estate: "One Greenwich Penthouse",
    location: "Tribeca, New York",
    price: 18900000,
    seller: "Hudson Yards Capital",
    buyer: "Geneva Capital Lux",
    stage: "Pre-Flight Audit",
    commission: 567000,
    closingDate: "Dec 01, 2026",
  },
  {
    id: "DL-103",
    estate: "Aspen Alpine Sanctuary",
    location: "Vail Valley, CO",
    price: 12500000,
    seller: "Rocky Mountain LLC",
    buyer: "Private Syndicate 04",
    stage: "Inbound",
    commission: 375000,
    closingDate: "Dec 18, 2026",
  },
]

const INITIAL_DOCS: DocumentItem[] = [
  {
    id: "DOC-01",
    title: "Certified Title Deed & Encumbrance Certificate",
    category: "Title Deed",
    fileSize: "14.2 MB",
    uploadedDate: "Oct 01, 2026",
    status: "Verified & Encrypted",
    securityTier: "Tier 1 - Sovereign",
  },
  {
    id: "DOC-02",
    title: "Master Purchase Agreement & Escrow Instructions",
    category: "Contract",
    fileSize: "8.6 MB",
    uploadedDate: "Oct 03, 2026",
    status: "Pending Signature",
    securityTier: "Tier 1 - Sovereign",
  },
  {
    id: "DOC-03",
    title: "Structural Seismic Survey & Architectural Blueprints",
    category: "Audit Report",
    fileSize: "42.8 MB",
    uploadedDate: "Sep 25, 2026",
    status: "Verified & Encrypted",
    securityTier: "Tier 2 - Institutional",
  },
  {
    id: "DOC-04",
    title: "Sovereign Entity Proof-of-Funds & AML Audit",
    category: "KYC / AML",
    fileSize: "5.1 MB",
    uploadedDate: "Oct 04, 2026",
    status: "Verified & Encrypted",
    securityTier: "Tier 1 - Sovereign",
  },
]

export function SmartEstateCommandView() {
  const { user, switchDemoUser } = useAuth()

  const [activeRole, setActiveRole] = React.useState<
    "seller" | "buyer" | "organizer"
  >(
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

  const [activeNav, setActiveNav] = React.useState<
    | "overview"
    | "properties"
    | "offers"
    | "crm"
    | "financials"
    | "vault"
    | "sentry"
  >("overview")

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

  const handleRoleChange = (role: "seller" | "buyer" | "organizer") => {
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

  return (
    <div className="flex min-h-screen flex-col bg-surface font-sans text-on-surface">
      <Header />

      {toastMessage && (
        <div className="fixed right-6 bottom-6 z-50 flex animate-in items-center gap-3 rounded-2xl border border-primary/30 bg-surface-container-highest/95 px-5 py-3 text-white shadow-2xl backdrop-blur-xl slide-in-from-bottom-5 fade-in">
          <IconSparkles size={18} className="shrink-0 text-secondary" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <main className="flex w-full flex-1 flex-col pt-20">
        <SectionWrapper
          fullWidth
          className="border-b border-outline-variant/30 bg-surface-container-lowest shadow-xs"
          innerClassName="py-4"
        >
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-inner">
                <IconLayoutDashboard size={22} />
              </div>
              <div>
                <div className="mb-0.5 flex items-center gap-2">
                  <Badge
                    variant="gold"
                    className="px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                  >
                    Enterprise ERP &amp; Asset Management
                  </Badge>
                </div>
                <h1 className="text-xl font-black tracking-tight text-on-surface sm:text-2xl">
                  Real Estate Management Console
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center rounded-2xl border border-outline-variant/40 bg-surface-container-low p-1 shadow-inner">
                {ROLES.map((r) => {
                  const Icon = r.icon
                  const active = activeRole === r.id
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleRoleChange(r.id)}
                      className={`flex h-10 items-center gap-2 rounded-xl px-4 text-xs font-bold transition-all ${
                        active
                          ? "bg-primary text-white shadow-md"
                          : "text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      <Icon size={16} />
                      <span>{r.label}</span>
                    </button>
                  )
                })}
              </div>

              {activeRole === "seller" || activeRole === "organizer" ? (
                <Button
                  onClick={() => setIsAddPropertyModalOpen(true)}
                  className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-white shadow-sm hover:bg-primary/90"
                >
                  <IconPlus size={16} />
                  <span>Add Property Listing</span>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setActiveNav("offers")
                    triggerToast("Opening LOI Submission Desk")
                  }}
                  className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-white shadow-sm hover:bg-primary/90"
                >
                  <IconPlus size={16} />
                  <span>Submit Purchase LOI</span>
                </Button>
              )}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper fullWidth className="flex-1 py-6">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <aside className="flex flex-col gap-4 lg:col-span-3 xl:col-span-2">
              <div className="flex flex-col gap-1.5 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-3 shadow-xs">
                <div className="px-3 py-2 text-[11px] font-bold tracking-wider text-on-surface-variant/80 uppercase">
                  Management
                </div>

                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon
                  const active = activeNav === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveNav(item.id)}
                      className={`flex h-10 w-full items-center justify-between rounded-2xl px-3.5 text-xs font-bold transition-all ${
                        active
                          ? "bg-primary text-white shadow-sm"
                          : "text-on-surface-variant hover:bg-surface-container-high/40 hover:text-on-surface"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={17} />
                        <span>{item.label}</span>
                      </div>
                      {item.dot && (
                        <span
                          className={`h-2 w-2 rounded-full ${
                            securityArmed
                              ? "animate-pulse bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="flex flex-col gap-3 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs">
                <div className="text-[11px] font-bold tracking-wider text-on-surface-variant/80 uppercase">
                  Active Operator
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/15 text-sm font-bold text-secondary">
                    {user?.name ? user.name.slice(0, 2).toUpperCase() : "MD"}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-on-surface">
                      {user?.name || "Marcus Sterling"}
                    </p>
                    <p className="truncate text-[10px] text-on-surface-variant capitalize">
                      {activeRole} • Accredited
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 border-t border-outline-variant/20 pt-2">
                  <Link
                    href="/closing"
                    className="flex h-9 w-full items-center gap-2 rounded-xl px-3 text-xs font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high/40 hover:text-primary"
                  >
                    <IconExternalLink size={14} />
                    <span>Open Escrow Desk</span>
                  </Link>
                  <Link
                    href="/vdr"
                    className="flex h-9 w-full items-center gap-2 rounded-xl px-3 text-xs font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high/40 hover:text-primary"
                  >
                    <IconExternalLink size={14} />
                    <span>Virtual Data Room (VDR)</span>
                  </Link>
                </div>
              </div>
            </aside>

            <div className="flex flex-col gap-6 lg:col-span-9 xl:col-span-10">
              <div className="flex flex-col justify-between gap-3 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs md:flex-row md:items-center">
                <div className="relative max-w-md flex-1">
                  <IconSearch
                    size={16}
                    className="absolute top-1/2 left-3.5 -translate-y-1/2 text-on-surface-variant"
                  />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by estate name, buyer, ID or enclave..."
                    className="h-10 rounded-xl border-outline-variant/40 bg-surface-container-low pr-4 pl-9 text-xs"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setPropertyFilterStatus("All")
                      setPropertyFilterCategory("All")
                      setOfferFilterStatus("All")
                      triggerToast("Management filters reset")
                    }}
                    className="h-10 rounded-xl border-outline-variant/40 px-3.5 text-xs font-bold hover:bg-surface-container-high/40"
                  >
                    <IconRefresh size={15} />
                    <span className="hidden sm:inline">Reset</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() =>
                      triggerToast("Generating CSV management export ledger...")
                    }
                    className="h-10 rounded-xl border-outline-variant/40 px-3.5 text-xs font-bold hover:bg-surface-container-high/40"
                  >
                    <IconDownload size={15} />
                    <span className="hidden sm:inline">Export Ledger</span>
                  </Button>
                </div>
              </div>

              {activeNav === "overview" && (
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {STATS_DATA.map((st, idx) => {
                      const Icon = st.icon
                      return (
                        <div
                          key={idx}
                          className="flex flex-col justify-between rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs"
                        >
                          <div className="mb-2 flex items-center justify-between text-on-surface-variant">
                            <span className="text-xs font-medium">
                              {st.label}
                            </span>
                            <div className={`rounded-xl p-2 ${st.color}`}>
                              <Icon size={18} />
                            </div>
                          </div>
                          <div className="text-2xl font-black tracking-tight text-on-surface">
                            {st.value}
                          </div>
                          <div
                            className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${
                              st.trendPositive
                                ? "text-emerald-500"
                                : "text-on-surface-variant"
                            }`}
                          >
                            {st.trendPositive && <IconTrendingUp size={14} />}
                            <span>{st.trend}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-bold text-on-surface">
                          Urgent Operational Items
                        </h2>
                        <p className="text-xs text-on-surface-variant">
                          Critical milestones requiring managerial authorization
                        </p>
                      </div>
                      <Badge variant="gold" className="px-2.5 py-1 text-xs">
                        Action Required
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      {URGENT_ITEMS.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col justify-between gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4"
                        >
                          <div className="flex items-start justify-between">
                            <span
                              className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${item.tagColor}`}
                            >
                              {item.tag}
                            </span>
                            <span className="text-xs text-on-surface-variant">
                              {item.meta}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-on-surface">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-on-surface-variant">
                              {item.sub}
                            </p>
                          </div>
                          {item.href ? (
                            <Link
                              href={item.href}
                              className={`flex h-9 w-full items-center justify-center rounded-xl text-xs font-bold transition-colors ${item.btnClass}`}
                            >
                              {item.action}
                            </Link>
                          ) : (
                            <Button
                              onClick={item.onClick}
                              className={`h-9 w-full rounded-xl text-xs font-bold ${item.btnClass}`}
                            >
                              {item.action}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div>
                        <h2 className="text-base font-bold text-on-surface">
                          Property Inventory Snapshot
                        </h2>
                        <p className="text-xs text-on-surface-variant">
                          Live status of actively managed prime estates
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setActiveNav("properties")}
                        className="h-9 rounded-xl border-outline-variant/40 px-3 text-xs font-bold"
                      >
                        <span>View All Properties ({properties.length})</span>
                        <IconChevronRight size={15} />
                      </Button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                            <th className="pb-3 font-semibold">Estate</th>
                            <th className="pb-3 font-semibold">Category</th>
                            <th className="pb-3 font-semibold">
                              Asking Valuation
                            </th>
                            <th className="pb-3 font-semibold">Status</th>
                            <th className="pb-3 font-semibold">Inquiries</th>
                            <th className="pb-3 text-right font-semibold">
                              Quick Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20">
                          {properties.slice(0, 4).map((prop) => (
                            <tr
                              key={prop.id}
                              className="transition-colors hover:bg-surface-container-high/30"
                            >
                              <td className="py-3">
                                <div className="flex items-center gap-3">
                                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl">
                                    <Image
                                      src={prop.image}
                                      alt={prop.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-bold text-on-surface">
                                      {prop.title}
                                    </p>
                                    <p className="text-[11px] text-on-surface-variant">
                                      {prop.location}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 text-on-surface-variant">
                                {prop.category}
                              </td>
                              <td className="py-3 font-bold text-on-surface">
                                ${(prop.price / 1000000).toFixed(2)}M
                              </td>
                              <td className="py-3">
                                <Badge
                                  variant={
                                    prop.status === "Active"
                                      ? "gold"
                                      : prop.status === "In Escrow"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className="text-[10px] font-bold"
                                >
                                  {prop.status}
                                </Badge>
                              </td>
                              <td className="py-3 text-on-surface-variant">
                                {prop.inquiries} leads
                              </td>
                              <td className="py-3 text-right">
                                <Button
                                  variant="ghost"
                                  onClick={() =>
                                    handleTogglePropertyStatus(prop.id)
                                  }
                                  className="h-8 rounded-lg px-2.5 text-xs font-semibold text-primary hover:bg-primary/10"
                                >
                                  Toggle Status
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeNav === "properties" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <h2 className="text-lg font-black text-on-surface">
                          Estate Inventory Management
                        </h2>
                        <p className="text-xs text-on-surface-variant">
                          Full management table for listings, pricing controls,
                          and status changes
                        </p>
                      </div>

                      <Button
                        onClick={() => setIsAddPropertyModalOpen(true)}
                        className="flex h-10 items-center gap-2 self-start rounded-xl bg-primary px-4 text-xs font-bold text-white hover:bg-primary/90 sm:self-auto"
                      >
                        <IconPlus size={16} />
                        <span>Add New Listing</span>
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 border-t border-outline-variant/20 pt-2">
                      <span className="mr-1 text-xs font-semibold text-on-surface-variant">
                        Status:
                      </span>
                      {[
                        "All",
                        "Active",
                        "Under Offer",
                        "In Escrow",
                        "Draft",
                      ].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setPropertyFilterStatus(st)}
                          className={`h-8 rounded-lg px-3 text-xs font-bold transition-all ${
                            propertyFilterStatus === st
                              ? "bg-primary text-white"
                              : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                          }`}
                        >
                          {st}
                        </button>
                      ))}

                      <div className="mx-2 hidden h-4 w-px bg-outline-variant/40 sm:block" />

                      <span className="mr-1 text-xs font-semibold text-on-surface-variant">
                        Type:
                      </span>
                      {[
                        "All",
                        "Villa",
                        "Penthouse",
                        "Island",
                        "Manor",
                        "Architectural",
                      ].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setPropertyFilterCategory(cat)}
                          className={`h-8 rounded-lg px-3 text-xs font-bold transition-all ${
                            propertyFilterCategory === cat
                              ? "bg-secondary font-black text-primary"
                              : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <div className="mt-2 overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                            <th className="pb-3 font-semibold">Ref ID</th>
                            <th className="pb-3 font-semibold">Property</th>
                            <th className="pb-3 font-semibold">
                              Specifications
                            </th>
                            <th className="pb-3 font-semibold">Valuation</th>
                            <th className="pb-3 font-semibold">Status</th>
                            <th className="pb-3 font-semibold">Analytics</th>
                            <th className="pb-3 text-right font-semibold">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20">
                          {filteredProperties.map((prop) => (
                            <tr
                              key={prop.id}
                              className="transition-colors hover:bg-surface-container-high/30"
                            >
                              <td className="py-4 font-mono text-[11px] text-on-surface-variant">
                                {prop.id}
                              </td>
                              <td className="py-4">
                                <div className="flex items-center gap-3">
                                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                                    <Image
                                      src={prop.image}
                                      alt={prop.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-bold text-on-surface">
                                      {prop.title}
                                    </p>
                                    <p className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                                      <IconMapPin size={12} />
                                      <span>{prop.location}</span>
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 text-on-surface-variant">
                                <div className="flex flex-col">
                                  <span>
                                    {prop.beds} Beds • {prop.baths} Baths
                                  </span>
                                  <span className="text-[11px]">
                                    {prop.sqft.toLocaleString()} SqFt
                                  </span>
                                </div>
                              </td>
                              <td className="py-4">
                                <p className="text-sm font-extrabold text-on-surface">
                                  ${(prop.price / 1000000).toFixed(2)}M
                                </p>
                                <span className="text-[10px] text-on-surface-variant">
                                  ${Math.round(prop.price / prop.sqft)}/sqft
                                </span>
                              </td>
                              <td className="py-4">
                                <Badge
                                  variant={
                                    prop.status === "Active"
                                      ? "gold"
                                      : prop.status === "In Escrow"
                                        ? "secondary"
                                        : prop.status === "Under Offer"
                                          ? "default"
                                          : "outline"
                                  }
                                  className="text-[10px] font-bold"
                                >
                                  {prop.status}
                                </Badge>
                              </td>
                              <td className="py-4 text-on-surface-variant">
                                <div className="flex flex-col text-[11px]">
                                  <span>{prop.inquiries} Inquiries</span>
                                  <span>
                                    {prop.viewsCount.toLocaleString()} Views
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <Button
                                    variant="outline"
                                    onClick={() =>
                                      handleTogglePropertyStatus(prop.id)
                                    }
                                    className="h-8 rounded-lg border-outline-variant/40 px-2.5 text-xs font-semibold"
                                  >
                                    {prop.status === "Active"
                                      ? "Draft"
                                      : "Publish"}
                                  </Button>

                                  <Link
                                    href="/properties"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/40 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                                  >
                                    <IconEye size={15} />
                                  </Link>

                                  <Button
                                    variant="ghost"
                                    onClick={() =>
                                      handleDeleteProperty(prop.id)
                                    }
                                    className="h-8 w-8 rounded-lg p-0 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                  >
                                    <IconTrash size={15} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeNav === "offers" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <h2 className="text-lg font-black text-on-surface">
                          Purchase Offers &amp; LOI Ledger
                        </h2>
                        <p className="text-xs text-on-surface-variant">
                          Inbound sovereign offers, earnest deposits, and legal
                          negotiation controls
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {[
                          "All",
                          "Pending Review",
                          "Under Negotiation",
                          "Escrow Opened",
                          "Declined",
                        ].map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setOfferFilterStatus(st)}
                            className={`h-8 rounded-lg px-3 text-xs font-bold transition-all ${
                              offerFilterStatus === st
                                ? "bg-primary text-white"
                                : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2 overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                            <th className="pb-3 font-semibold">Offer ID</th>
                            <th className="pb-3 font-semibold">
                              Target Estate
                            </th>
                            <th className="pb-3 font-semibold">
                              Prospective Buyer
                            </th>
                            <th className="pb-3 font-semibold">
                              Offer Valuation
                            </th>
                            <th className="pb-3 font-semibold">Earnest Wire</th>
                            <th className="pb-3 font-semibold">Status</th>
                            <th className="pb-3 text-right font-semibold">
                              Negotiation Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20">
                          {filteredOffers.map((offer) => (
                            <tr
                              key={offer.id}
                              className="transition-colors hover:bg-surface-container-high/30"
                            >
                              <td className="py-4 font-mono text-[11px] text-on-surface-variant">
                                {offer.id}
                              </td>
                              <td className="py-4 font-bold text-on-surface">
                                {offer.propertyTitle}
                              </td>
                              <td className="py-4">
                                <p className="font-bold text-on-surface">
                                  {offer.buyerName}
                                </p>
                                <p className="text-[11px] text-on-surface-variant">
                                  {offer.buyerEntity}
                                </p>
                              </td>
                              <td className="py-4">
                                <p className="text-sm font-extrabold text-on-surface">
                                  ${(offer.offerPrice / 1000000).toFixed(2)}M
                                </p>
                                <span className="font-mono text-[10px] text-on-surface-variant">
                                  {offer.financing}
                                </span>
                              </td>
                              <td className="py-4">
                                <p className="font-bold text-emerald-400">
                                  ${(offer.earnestDeposit / 1000).toFixed(0)}k
                                  (10%)
                                </p>
                                <span className="text-[10px] text-on-surface-variant">
                                  POF Verified
                                </span>
                              </td>
                              <td className="py-4">
                                <Badge
                                  variant={
                                    offer.status === "Pending Review"
                                      ? "gold"
                                      : offer.status === "Escrow Opened"
                                        ? "secondary"
                                        : offer.status === "Under Negotiation"
                                          ? "default"
                                          : "outline"
                                  }
                                  className="text-[10px] font-bold"
                                >
                                  {offer.status}
                                </Badge>
                              </td>
                              <td className="py-4 text-right">
                                {offer.status !== "Escrow Opened" &&
                                offer.status !== "Declined" ? (
                                  <div className="flex items-center justify-end gap-1.5">
                                    <Button
                                      onClick={() =>
                                        handleAcceptOffer(offer.id)
                                      }
                                      className="h-8 rounded-lg bg-emerald-600 px-2.5 text-xs font-bold text-white hover:bg-emerald-700"
                                    >
                                      Accept
                                    </Button>

                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        setCounterModalOffer(offer)
                                        setCounterPriceInput(
                                          String(offer.offerPrice + 250000)
                                        )
                                      }}
                                      className="h-8 rounded-lg border-outline-variant/40 px-2.5 text-xs font-bold"
                                    >
                                      Counter
                                    </Button>

                                    <Button
                                      variant="ghost"
                                      onClick={() =>
                                        handleDeclineOffer(offer.id)
                                      }
                                      className="h-8 rounded-lg px-2 text-xs text-red-400 hover:bg-red-500/10"
                                    >
                                      Decline
                                    </Button>
                                  </div>
                                ) : (
                                  <Link
                                    href="/closing"
                                    className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-secondary px-3 text-xs font-bold text-primary transition-colors hover:bg-secondary/90"
                                  >
                                    <span>Closing Desk</span>
                                    <IconArrowRight size={13} />
                                  </Link>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-on-surface">
                          Syndicate Deal Pipeline &amp; Escrow Milestones
                        </h3>
                        <p className="text-xs text-on-surface-variant">
                          Real-time status tracking from Inbound to Closed
                          Settlement
                        </p>
                      </div>
                      <Badge variant="outline" className="font-mono text-xs">
                        {deals.length} Active Deals
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                      {deals.map((deal) => (
                        <div
                          key={deal.id}
                          className="flex flex-col justify-between gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4"
                        >
                          <div>
                            <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                              <span>{deal.id}</span>
                              <span className="font-bold text-secondary">
                                {deal.stage}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-on-surface">
                              {deal.estate}
                            </h4>
                            <p className="text-[11px] text-on-surface-variant">
                              {deal.location}
                            </p>
                          </div>

                          <div className="flex items-center justify-between border-y border-outline-variant/20 py-2 text-xs">
                            <span className="text-on-surface-variant">
                              Commission
                            </span>
                            <span className="font-mono font-bold text-emerald-400">
                              ${(deal.commission / 1000).toFixed(0)}k
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[11px] text-on-surface-variant">
                              Close: {deal.closingDate}
                            </span>
                            <Button
                              onClick={() => handleAdvanceDealStage(deal.id)}
                              className="h-8 rounded-lg bg-primary px-2.5 text-xs font-bold text-white hover:bg-primary/90"
                            >
                              Advance Stage
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeNav === "crm" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <h2 className="text-lg font-black text-on-surface">
                          Client &amp; Investor CRM Directory
                        </h2>
                        <p className="text-xs text-on-surface-variant">
                          High-net-worth investor profiles, lead scoring, and
                          tour expedition dispatches
                        </p>
                      </div>

                      <Button
                        onClick={() => setIsAddClientModalOpen(true)}
                        className="flex h-10 items-center gap-2 self-start rounded-xl bg-primary px-4 text-xs font-bold text-white hover:bg-primary/90 sm:self-auto"
                      >
                        <IconPlus size={16} />
                        <span>Enroll New Client</span>
                      </Button>
                    </div>

                    <div className="mt-2 overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                            <th className="pb-3 font-semibold">
                              Client Dossier
                            </th>
                            <th className="pb-3 font-semibold">
                              Entity / Family Office
                            </th>
                            <th className="pb-3 font-semibold">
                              Target Budget
                            </th>
                            <th className="pb-3 font-semibold">Lead Tier</th>
                            <th className="pb-3 font-semibold">
                              Pipeline Status
                            </th>
                            <th className="pb-3 font-semibold">
                              Assigned Desk
                            </th>
                            <th className="pb-3 text-right font-semibold">
                              Direct Outreach
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20">
                          {filteredLeads.map((lead) => (
                            <tr
                              key={lead.id}
                              className="transition-colors hover:bg-surface-container-high/30"
                            >
                              <td className="py-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                                    {lead.name.slice(0, 2).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="font-bold text-on-surface">
                                      {lead.name}
                                    </p>
                                    <p className="text-[11px] text-on-surface-variant">
                                      {lead.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 font-medium text-on-surface-variant">
                                {lead.entity}
                              </td>
                              <td className="py-4 text-sm font-bold text-on-surface">
                                ${(lead.budget / 1000000).toFixed(1)}M
                              </td>
                              <td className="py-4">
                                <Badge
                                  variant={
                                    lead.leadScore === "VIP"
                                      ? "gold"
                                      : "secondary"
                                  }
                                  className="text-[10px] font-bold"
                                >
                                  {lead.leadScore}
                                </Badge>
                              </td>
                              <td className="py-4">
                                <span className="text-[11px] font-semibold text-secondary">
                                  {lead.status}
                                </span>
                              </td>
                              <td className="py-4 text-[11px] text-on-surface-variant">
                                {lead.assignedAgent}
                              </td>
                              <td className="py-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <a
                                    href={`tel:${lead.phone}`}
                                    onClick={() =>
                                      triggerToast(
                                        `Dialing client: ${lead.phone}`
                                      )
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/40 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
                                  >
                                    <IconPhone size={14} />
                                  </a>
                                  <a
                                    href={`mailto:${lead.email}`}
                                    onClick={() =>
                                      triggerToast(
                                        `Opening dispatch email to ${lead.email}`
                                      )
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/40 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
                                  >
                                    <IconMail size={14} />
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeNav === "financials" && (
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[
                      {
                        label: "Closed Deals Volume (YTD)",
                        val: "$74,200,000",
                        sub: "+28.5% over previous fiscal year",
                        subColor: "text-emerald-500",
                      },
                      {
                        label: "Brokerage Earned Commissions",
                        val: "$2,226,000",
                        sub: "Avg 3.0% Syndicate Fee Rate",
                        subColor: "text-secondary",
                      },
                      {
                        label: "Active Escrow Retainers",
                        val: "$4,115,000",
                        sub: "Secured in First American Trust",
                        subColor: "text-on-surface-variant font-mono",
                      },
                    ].map((fin, i) => (
                      <div
                        key={i}
                        className="flex flex-col justify-between rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs"
                      >
                        <span className="text-xs font-medium text-on-surface-variant">
                          {fin.label}
                        </span>
                        <div className="mt-1 text-2xl font-black tracking-tight text-on-surface">
                          {fin.val}
                        </div>
                        <span
                          className={`mt-2 text-xs font-semibold ${fin.subColor}`}
                        >
                          {fin.sub}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-on-surface">
                          Capital Allocation by Asset Category
                        </h3>
                        <p className="text-xs text-on-surface-variant">
                          Breakdown across our sovereign portfolio
                        </p>
                      </div>
                      <Badge variant="gold" className="text-xs font-bold">
                        2026 Fiscal
                      </Badge>
                    </div>

                    <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {ASSET_BREAKDOWN.map((asset, i) => (
                        <div
                          key={i}
                          className="flex flex-col gap-2 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4"
                        >
                          <span className="text-xs text-on-surface-variant">
                            {asset.label}
                          </span>
                          <div className="text-lg font-black text-on-surface">
                            {asset.value}
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                            <div
                              className={`${asset.color} h-full ${asset.pct}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeNav === "vault" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <h2 className="text-lg font-black text-on-surface">
                          Legal Documents &amp; Due Diligence Vault
                        </h2>
                        <p className="text-xs text-on-surface-variant">
                          Encrypted title deeds, purchase agreements, and
                          verified architectural surveys
                        </p>
                      </div>

                      <Button
                        onClick={() =>
                          triggerToast(
                            "Initializing secure file upload tunnel..."
                          )
                        }
                        className="flex h-10 items-center gap-2 self-start rounded-xl bg-primary px-4 text-xs font-bold text-white hover:bg-primary/90 sm:self-auto"
                      >
                        <IconUpload size={16} />
                        <span>Upload Document</span>
                      </Button>
                    </div>

                    <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex flex-col justify-between gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <IconFileText size={18} />
                              </div>
                              <div>
                                <h4 className="text-xs leading-snug font-bold text-on-surface">
                                  {doc.title}
                                </h4>
                                <span className="font-mono text-[10px] text-on-surface-variant">
                                  {doc.fileSize} • {doc.uploadedDate}
                                </span>
                              </div>
                            </div>
                            <Badge
                              variant="gold"
                              className="shrink-0 text-[10px]"
                            >
                              {doc.category}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between border-t border-outline-variant/20 pt-2">
                            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                              <IconCheck size={13} />
                              <span>{doc.status}</span>
                            </span>

                            <Button
                              variant="outline"
                              onClick={() =>
                                triggerToast(
                                  `Downloading verified packet: ${doc.title}`
                                )
                              }
                              className="flex h-8 items-center gap-1.5 rounded-lg border-outline-variant/40 px-3 text-xs font-bold hover:bg-surface-container-high/40"
                            >
                              <IconDownload size={14} />
                              <span>Download</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeNav === "sentry" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
                    <div>
                      <h2 className="text-lg font-black text-on-surface">
                        IoT Smart Estate Sentry &amp; Facility Controls
                      </h2>
                      <p className="text-xs text-on-surface-variant">
                        Remote management for estate access perimeter, biometric
                        entries, and smart environmental systems
                      </p>
                    </div>

                    <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <IconShieldLock size={18} />
                            </div>
                            <span className="text-xs font-bold text-on-surface">
                              Perimeter Sentry
                            </span>
                          </div>
                          <Badge
                            variant={securityArmed ? "gold" : "outline"}
                            className="text-[10px]"
                          >
                            {securityArmed ? "ARMED" : "STANDBY"}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-on-surface-variant">
                          Radar motion barriers and thermal fence sensors across
                          grounds.
                        </p>
                        <Button
                          onClick={() => {
                            setSecurityArmed(!securityArmed)
                            triggerToast(
                              securityArmed
                                ? "Perimeter disarmed"
                                : "Perimeter locked down & armed"
                            )
                          }}
                          className={`h-10 w-full rounded-xl text-xs font-bold ${
                            securityArmed
                              ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                              : "bg-emerald-600 text-white"
                          }`}
                        >
                          {securityArmed
                            ? "Disarm Perimeter"
                            : "Arm Perimeter Sentry"}
                        </Button>
                      </div>

                      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                              {gateUnlocked ? (
                                <IconLockOpen size={18} />
                              ) : (
                                <IconLock size={18} />
                              )}
                            </div>
                            <span className="text-xs font-bold text-on-surface">
                              Motorized Security Gate
                            </span>
                          </div>
                          <Badge
                            variant={gateUnlocked ? "secondary" : "outline"}
                            className="text-[10px]"
                          >
                            {gateUnlocked ? "UNLOCKED" : "LOCKED"}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-on-surface-variant">
                          Automated license plate recognition and biometric
                          intercom gate.
                        </p>
                        <Button
                          onClick={() => {
                            setGateUnlocked(!gateUnlocked)
                            triggerToast(
                              gateUnlocked
                                ? "Gate locked"
                                : "Gate opened for guest dispatch"
                            )
                          }}
                          className="h-10 w-full rounded-xl bg-primary text-xs font-bold text-white hover:bg-primary/90"
                        >
                          {gateUnlocked
                            ? "Lock Motor Gate"
                            : "Open Security Gate"}
                        </Button>
                      </div>

                      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                              <IconTemperature size={18} />
                            </div>
                            <span className="text-xs font-bold text-on-surface">
                              Main Salon Climate
                            </span>
                          </div>
                          <span className="font-mono text-sm font-bold text-secondary">
                            {salonTemp}°F
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setSalonTemp((t) => t - 1)}
                            className="h-10 flex-1 rounded-xl border-outline-variant/40 font-bold"
                          >
                            -1°F
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setSalonTemp((t) => t + 1)}
                            className="h-10 flex-1 rounded-xl border-outline-variant/40 font-bold"
                          >
                            +1°F
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SectionWrapper>
      </main>

      {isAddPropertyModalOpen && (
        <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/70 p-4 backdrop-blur-md fade-in">
          <div className="flex w-full max-w-lg flex-col gap-4 rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div>
                <h3 className="text-base font-bold text-on-surface">
                  Add New Property to Inventory
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Enroll listing into the management database
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddPropertyModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              >
                <IconX size={16} />
              </button>
            </div>

            <form
              onSubmit={handleCreateProperty}
              className="flex flex-col gap-3"
            >
              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Property Title
                </label>
                <Input
                  required
                  placeholder="e.g. The Bel Air Hilltop Manor"
                  value={newPropertyTitle}
                  onChange={(e) => setNewPropertyTitle(e.target.value)}
                  className="h-10 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Location
                  </label>
                  <Input
                    required
                    placeholder="e.g. Bel Air, CA"
                    value={newPropertyLocation}
                    onChange={(e) => setNewPropertyLocation(e.target.value)}
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Price ($ USD)
                  </label>
                  <Input
                    required
                    type="number"
                    placeholder="e.g. 12500000"
                    value={newPropertyPrice}
                    onChange={(e) => setNewPropertyPrice(e.target.value)}
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Category
                  </label>
                  <select
                    value={newPropertyCategory}
                    onChange={(e) =>
                      setNewPropertyCategory(
                        e.target.value as PropertyItem["category"]
                      )
                    }
                    className="h-10 w-full rounded-xl border border-outline-variant/40 bg-surface-container-low px-3 text-xs text-on-surface"
                  >
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Island">Island</option>
                    <option value="Manor">Manor</option>
                    <option value="Architectural">Architectural</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Bedrooms
                  </label>
                  <Input
                    type="number"
                    value={newPropertyBeds}
                    onChange={(e) => setNewPropertyBeds(e.target.value)}
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Bathrooms
                  </label>
                  <Input
                    type="number"
                    value={newPropertyBaths}
                    onChange={(e) => setNewPropertyBaths(e.target.value)}
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="mt-2 flex items-center justify-end gap-2 border-t border-outline-variant/30 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddPropertyModalOpen(false)}
                  className="h-10 rounded-xl border-outline-variant/40 px-4 text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-white hover:bg-primary/90"
                >
                  Save Listing
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {counterModalOffer && (
        <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/70 p-4 backdrop-blur-md fade-in">
          <div className="flex w-full max-w-md flex-col gap-4 rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div>
                <h3 className="text-base font-bold text-on-surface">
                  Submit Counter-Offer
                </h3>
                <p className="text-xs text-on-surface-variant">
                  {counterModalOffer.propertyTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCounterModalOffer(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              >
                <IconX size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-3 text-xs">
                <span className="text-on-surface-variant">
                  Buyer's Submitted Price:
                </span>
                <p className="text-base font-extrabold text-on-surface">
                  ${(counterModalOffer.offerPrice / 1000000).toFixed(2)}M
                </p>
                <span className="text-[11px] text-on-surface-variant">
                  {counterModalOffer.buyerName}
                </span>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Proposed Counter Valuation ($ USD)
                </label>
                <Input
                  type="number"
                  value={counterPriceInput}
                  onChange={(e) => setCounterPriceInput(e.target.value)}
                  className="h-10 rounded-xl font-mono text-xs"
                  placeholder="e.g. 8900000"
                />
              </div>

              <div className="mt-2 flex items-center justify-end gap-2 border-t border-outline-variant/30 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCounterModalOffer(null)}
                  className="h-10 rounded-xl border-outline-variant/40 px-4 text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleApplyCounterOffer}
                  className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-white hover:bg-primary/90"
                >
                  Transmit Counter-Offer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddClientModalOpen && (
        <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/70 p-4 backdrop-blur-md fade-in">
          <div className="flex w-full max-w-md flex-col gap-4 rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div>
                <h3 className="text-base font-bold text-on-surface">
                  Enroll Client Dossier
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Create accredited investor profile in CRM
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddClientModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              >
                <IconX size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Full Name
                </label>
                <Input
                  required
                  placeholder="e.g. Lord Alistair Sterling"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="h-10 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Corporate Entity / Trust
                </label>
                <Input
                  placeholder="e.g. Sterling Heritage S.A."
                  value={newClientEntity}
                  onChange={(e) => setNewClientEntity(e.target.value)}
                  className="h-10 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Email
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="client@familyoffice.com"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Phone
                  </label>
                  <Input
                    placeholder="+1 555-0192"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Target Budget ($)
                  </label>
                  <Input
                    type="number"
                    placeholder="15000000"
                    value={newClientBudget}
                    onChange={(e) => setNewClientBudget(e.target.value)}
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Target Enclave
                  </label>
                  <Input
                    placeholder="Bel Air, Miami"
                    value={newClientEnclave}
                    onChange={(e) => setNewClientEnclave(e.target.value)}
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="mt-2 flex items-center justify-end gap-2 border-t border-outline-variant/30 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddClientModalOpen(false)}
                  className="h-10 rounded-xl border-outline-variant/40 px-4 text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-white hover:bg-primary/90"
                >
                  Save Client
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
