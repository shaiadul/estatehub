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
  IconSettings,
  IconSearch,
  IconFilter,
  IconPlus,
  IconCheck,
  IconX,
  IconEdit,
  IconTrash,
  IconEye,
  IconDownload,
  IconUpload,
  IconCalendarEvent,
  IconClock,
  IconPhone,
  IconMail,
  IconArrowUpRight,
  IconArrowRight,
  IconTrendingUp,
  IconCurrencyDollar,
  IconChevronDown,
  IconChevronRight,
  IconLock,
  IconLockOpen,
  IconTemperature,
  IconPool,
  IconBolt,
  IconSparkles,
  IconRefresh,
  IconBell,
  IconMenu2,
  IconUserCheck,
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
  stage: "Inbound" | "Pre-Flight Audit" | "Active Syndicate" | "In Escrow" | "Closed"
  commission: number
  closingDate: string
}

interface DocumentItem {
  id: string
  title: string
  category: "Title Deed" | "Contract" | "Audit Report" | "KYC / AML" | "Tax Disclosure"
  fileSize: string
  uploadedDate: string
  status: "Verified & Encrypted" | "Pending Signature" | "Draft"
  securityTier: "Tier 1 - Sovereign" | "Tier 2 - Institutional"
}

export function SmartEstateCommandView() {
  const { user, switchDemoUser } = useAuth()

  const [activeRole, setActiveRole] = React.useState<"seller" | "buyer" | "organizer">(
    user?.role === "buyer" ? "buyer" : user?.role === "seller" ? "seller" : "organizer"
  )

  React.useEffect(() => {
    if (user?.role === "buyer") setActiveRole("buyer")
    else if (user?.role === "seller") setActiveRole("seller")
    else if (user?.role === "broker") setActiveRole("organizer")
  }, [user?.role])

  const [activeNav, setActiveNav] = React.useState<
    "overview" | "properties" | "offers" | "crm" | "financials" | "vault" | "iot"
  >("overview")

  const [searchQuery, setSearchQuery] = React.useState("")
  const [propertyFilterStatus, setPropertyFilterStatus] = React.useState<string>("All")
  const [propertyFilterCategory, setPropertyFilterCategory] = React.useState<string>("All")
  const [offerFilterStatus, setOfferFilterStatus] = React.useState<string>("All")

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

  const [properties, setProperties] = React.useState<PropertyItem[]>([
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
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
      featured: false,
    },
  ])

  const [offers, setOffers] = React.useState<OfferItem[]>([
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
  ])

  const [leads, setLeads] = React.useState<ClientLead[]>([
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
  ])

  const [deals, setDeals] = React.useState<DealItem[]>([
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
  ])

  const [documents, setDocuments] = React.useState<DocumentItem[]>([
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
  ])

  const [securityArmed, setSecurityArmed] = React.useState(true)
  const [gateUnlocked, setGateUnlocked] = React.useState(false)
  const [salonTemp, setSalonTemp] = React.useState(70)
  const [poolTemp, setPoolTemp] = React.useState(82)
  const [wineTemp, setWineTemp] = React.useState(55)

  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = React.useState(false)
  const [newPropertyTitle, setNewPropertyTitle] = React.useState("")
  const [newPropertyLocation, setNewPropertyLocation] = React.useState("")
  const [newPropertyPrice, setNewPropertyPrice] = React.useState("")
  const [newPropertyCategory, setNewPropertyCategory] = React.useState<PropertyItem["category"]>("Villa")
  const [newPropertyBeds, setNewPropertyBeds] = React.useState("5")
  const [newPropertyBaths, setNewPropertyBaths] = React.useState("6")
  const [newPropertySqft, setNewPropertySqft] = React.useState("7500")

  const [counterModalOffer, setCounterModalOffer] = React.useState<OfferItem | null>(null)
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
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
      featured: false,
    }

    setProperties([newProp, ...properties])
    setIsAddPropertyModalOpen(false)
    setNewPropertyTitle("")
    setNewPropertyLocation("")
    setNewPropertyPrice("")
    triggerToast(`Added listing "${newProp.title}" to property management inventory!`)
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
    triggerToast(`New client "${newLead.name}" enrolled into CRM database!`)
  }

  const handleAcceptOffer = (id: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "Escrow Opened" } : o))
    )
    triggerToast("Offer accepted! Escrow desk initialized and legal closing vault unlocked.")
  }

  const handleDeclineOffer = (id: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "Declined" } : o))
    )
    triggerToast("Offer declined. Notification transmitted to prospective buyer.")
  }

  const handleApplyCounterOffer = () => {
    if (!counterModalOffer || !counterPriceInput) return
    setOffers((prev) =>
      prev.map((o) =>
        o.id === counterModalOffer.id
          ? { ...o, offerPrice: Number(counterPriceInput), status: "Under Negotiation" }
          : o
      )
    )
    setCounterModalOffer(null)
    setCounterPriceInput("")
    triggerToast("Counter-offer transmitted with updated valuation and escrow milestones.")
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
    triggerToast("Deal milestone advanced in syndication ledger.")
  }

  const handleTogglePropertyStatus = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        const nextStatus: PropertyItem["status"] =
          p.status === "Active" ? "Draft" : p.status === "Draft" ? "Active" : p.status
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
  const activeEscrowDeals = deals.filter((d) => d.stage === "In Escrow" || d.stage === "Active Syndicate")
  const totalCommissionPipeline = deals.reduce((acc, d) => acc + d.commission, 0)

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans text-on-surface">
      <Header />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-surface-container-highest/95 border border-primary/30 text-white shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5">
          <IconSparkles size={18} className="text-secondary shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <main className="w-full pt-20 flex-1 flex flex-col">
        <SectionWrapper
          fullWidth
          className="bg-surface-container-lowest border-b border-outline-variant/30 shadow-xs"
          innerClassName="py-4"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-inner shrink-0">
                <IconLayoutDashboard size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <Badge variant="gold" className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5">
                    Enterprise ERP &amp; Asset Management
                  </Badge>
                  <span className="text-xs text-on-surface-variant font-mono">
                    ID: MGT-{user?.id ? user.id.toUpperCase().slice(0, 8) : "SEC-01"}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight">
                  Real Estate Management Console
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center p-1 rounded-2xl bg-surface-container-low border border-outline-variant/40 shadow-inner">
                <button
                  type="button"
                  onClick={() => handleRoleChange("seller")}
                  className={`h-10 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeRole === "seller"
                      ? "bg-primary text-white shadow-md"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <IconBuildingEstate size={16} />
                  <span>Seller (Principal)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange("buyer")}
                  className={`h-10 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeRole === "buyer"
                      ? "bg-primary text-white shadow-md"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <IconBriefcase size={16} />
                  <span>Buyer (Investor)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange("organizer")}
                  className={`h-10 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeRole === "organizer"
                      ? "bg-primary text-white shadow-md"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <IconUsers size={16} />
                  <span>Organizer (Broker)</span>
                </button>
              </div>

              {activeRole === "seller" || activeRole === "organizer" ? (
                <Button
                  onClick={() => setIsAddPropertyModalOpen(true)}
                  className="h-10 px-4 rounded-xl font-bold text-xs bg-primary text-white hover:bg-primary/90 flex items-center gap-2 shadow-sm"
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
                  className="h-10 px-4 rounded-xl font-bold text-xs bg-primary text-white hover:bg-primary/90 flex items-center gap-2 shadow-sm"
                >
                  <IconPlus size={16} />
                  <span>Submit Purchase LOI</span>
                </Button>
              )}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper fullWidth className="flex-1 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <aside className="lg:col-span-3 xl:col-span-2 flex flex-col gap-4">
              <div className="p-3 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col gap-1.5">
                <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/80">
                  Management Navigation
                </div>

                <button
                  type="button"
                  onClick={() => setActiveNav("overview")}
                  className={`w-full h-10 px-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                    activeNav === "overview"
                      ? "bg-primary text-white shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconLayoutDashboard size={17} />
                    <span>Overview</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-current">
                    Live
                  </Badge>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveNav("properties")}
                  className={`w-full h-10 px-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                    activeNav === "properties"
                      ? "bg-primary text-white shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconBuildingEstate size={17} />
                    <span>Properties</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-surface-container-high">
                    {properties.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveNav("offers")}
                  className={`w-full h-10 px-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                    activeNav === "offers"
                      ? "bg-primary text-white shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconFileSpreadsheet size={17} />
                    <span>Offers</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-secondary/20 text-secondary font-bold">
                    {offers.filter((o) => o.status === "Pending Review").length} new
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveNav("crm")}
                  className={`w-full h-10 px-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                    activeNav === "crm"
                      ? "bg-primary text-white shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconUsers size={17} />
                    <span>CRM</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-surface-container-high">
                    {leads.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveNav("financials")}
                  className={`w-full h-10 px-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                    activeNav === "financials"
                      ? "bg-primary text-white shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconChartBar size={17} />
                    <span>Financials</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveNav("vault")}
                  className={`w-full h-10 px-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                    activeNav === "vault"
                      ? "bg-primary text-white shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconFolderCheck size={17} />
                    <span>Vault</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-surface-container-high">
                    {documents.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveNav("iot")}
                  className={`w-full h-10 px-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                    activeNav === "iot"
                      ? "bg-primary text-white shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconShieldLock size={17} />
                    <span>Sentry</span>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      securityArmed ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col gap-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/80">
                  Active Operator
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-sm shrink-0 border border-secondary/30">
                    {user?.name ? user.name.slice(0, 2).toUpperCase() : "MD"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-on-surface truncate">{user?.name || "Marcus Sterling"}</p>
                    <p className="text-[10px] text-on-surface-variant truncate capitalize">
                      {activeRole} • Accredited
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-outline-variant/20 flex flex-col gap-1.5">
                  <Link
                    href="/closing"
                    className="w-full h-9 px-3 rounded-xl text-xs font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container-high/40 flex items-center gap-2 transition-colors"
                  >
                    <IconExternalLink size={14} />
                    <span>Open Escrow Desk</span>
                  </Link>
                  <Link
                    href="/vdr"
                    className="w-full h-9 px-3 rounded-xl text-xs font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container-high/40 flex items-center gap-2 transition-colors"
                  >
                    <IconExternalLink size={14} />
                    <span>Virtual Data Room (VDR)</span>
                  </Link>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9 xl:col-span-10 flex flex-col gap-6">
              <div className="p-4 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <IconSearch
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by estate name, buyer, ID or enclave..."
                    className="h-10 pl-9 pr-4 rounded-xl text-xs bg-surface-container-low border-outline-variant/40"
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
                    className="h-10 px-3.5 rounded-xl text-xs font-bold border-outline-variant/40 hover:bg-surface-container-high/40"
                  >
                    <IconRefresh size={15} />
                    <span className="hidden sm:inline">Reset</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => triggerToast("Generating CSV management export ledger...")}
                    className="h-10 px-3.5 rounded-xl text-xs font-bold border-outline-variant/40 hover:bg-surface-container-high/40"
                  >
                    <IconDownload size={15} />
                    <span className="hidden sm:inline">Export Ledger</span>
                  </Button>
                </div>
              </div>

              {activeNav === "overview" && (
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center justify-between text-on-surface-variant mb-2">
                        <span className="text-xs font-medium">
                          {activeRole === "seller"
                            ? "Active Portfolio Valuation"
                            : activeRole === "buyer"
                            ? "Capital Allocated / Committed"
                            : "Platform Managed Gross Volume"}
                        </span>
                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                          <IconCurrencyDollar size={18} />
                        </div>
                      </div>
                      <div className="text-2xl font-black text-on-surface tracking-tight">
                        ${(totalPortfolioValue / 1000000).toFixed(1)}M
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
                        <IconTrendingUp size={14} />
                        <span>+14.2% MoM Expansion</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center justify-between text-on-surface-variant mb-2">
                        <span className="text-xs font-medium">Inbound Purchase LOIs</span>
                        <div className="p-2 rounded-xl bg-secondary/15 text-secondary">
                          <IconFileSpreadsheet size={18} />
                        </div>
                      </div>
                      <div className="text-2xl font-black text-on-surface tracking-tight">
                        {offers.length} Offers
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-secondary font-semibold">
                        <span>${(totalOffersValue / 1000000).toFixed(1)}M Total Value</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center justify-between text-on-surface-variant mb-2">
                        <span className="text-xs font-medium">Active In Escrow Deals</span>
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                          <IconBuildingEstate size={18} />
                        </div>
                      </div>
                      <div className="text-2xl font-black text-on-surface tracking-tight">
                        {activeEscrowDeals.length} Deals
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-on-surface-variant">
                        <span>Avg. 21 Days to Settlement</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center justify-between text-on-surface-variant mb-2">
                        <span className="text-xs font-medium">Projected Commission Desk</span>
                        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                          <IconCash size={18} />
                        </div>
                      </div>
                      <div className="text-2xl font-black text-on-surface tracking-tight">
                        ${(totalCommissionPipeline / 1000).toFixed(0)}k
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
                        <IconCheck size={14} />
                        <span>Protected via Escrow Trust</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-bold text-on-surface">Urgent Operational Items</h2>
                        <p className="text-xs text-on-surface-variant">Critical milestones requiring managerial authorization</p>
                      </div>
                      <Badge variant="gold" className="text-xs px-2.5 py-1">Action Required</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-3">
                        <div className="flex items-start justify-between">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary/15 text-secondary font-bold">
                            LOI REVIEW
                          </span>
                          <span className="text-xs text-on-surface-variant">24h remaining</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-on-surface">Julian Rossi • $8.65M</p>
                          <p className="text-[11px] text-on-surface-variant">The Glass Horizon Villa</p>
                        </div>
                        <Button
                          onClick={() => setActiveNav("offers")}
                          className="w-full h-9 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90"
                        >
                          Review &amp; Negotiate
                        </Button>
                      </div>

                      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-3">
                        <div className="flex items-start justify-between">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-primary/15 text-primary font-bold">
                            PRE-FLIGHT AUDIT
                          </span>
                          <span className="text-xs text-on-surface-variant">Tribeca NY</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-on-surface">One Greenwich Penthouse</p>
                          <p className="text-[11px] text-on-surface-variant">Seismic &amp; Structural verification</p>
                        </div>
                        <Button
                          onClick={() => setActiveNav("vault")}
                          className="w-full h-9 rounded-xl text-xs font-bold bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                        >
                          Inspect Vault
                        </Button>
                      </div>

                      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-3">
                        <div className="flex items-start justify-between">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 font-bold">
                            ESCROW WIRE
                          </span>
                          <span className="text-xs text-on-surface-variant">Earnest Locked</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-on-surface">Biscayne Bay Deepwater</p>
                          <p className="text-[11px] text-on-surface-variant">$1.4M earnest deposited in trust</p>
                        </div>
                        <Link
                          href="/closing"
                          className="w-full h-9 rounded-xl text-xs font-bold bg-secondary text-primary hover:bg-secondary/90 flex items-center justify-center transition-colors"
                        >
                          Open Closing Desk
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h2 className="text-base font-bold text-on-surface">Property Inventory Snapshot</h2>
                        <p className="text-xs text-on-surface-variant">Live status of actively managed prime estates</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setActiveNav("properties")}
                        className="h-9 px-3 rounded-xl text-xs font-bold border-outline-variant/40"
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
                            <th className="pb-3 font-semibold">Asking Valuation</th>
                            <th className="pb-3 font-semibold">Status</th>
                            <th className="pb-3 font-semibold">Inquiries</th>
                            <th className="pb-3 font-semibold text-right">Quick Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20">
                          {properties.slice(0, 4).map((prop) => (
                            <tr key={prop.id} className="hover:bg-surface-container-high/30 transition-colors">
                              <td className="py-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl overflow-hidden relative shrink-0">
                                    <Image src={prop.image} alt={prop.title} fill className="object-cover" />
                                  </div>
                                  <div>
                                    <p className="font-bold text-on-surface">{prop.title}</p>
                                    <p className="text-[11px] text-on-surface-variant">{prop.location}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 text-on-surface-variant">{prop.category}</td>
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
                              <td className="py-3 text-on-surface-variant">{prop.inquiries} leads</td>
                              <td className="py-3 text-right">
                                <Button
                                  variant="ghost"
                                  onClick={() => handleTogglePropertyStatus(prop.id)}
                                  className="h-8 px-2.5 rounded-lg text-xs font-semibold text-primary hover:bg-primary/10"
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
                  <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-black text-on-surface">Estate Inventory Management</h2>
                        <p className="text-xs text-on-surface-variant">
                          Full management table for listings, pricing controls, and status changes
                        </p>
                      </div>

                      <Button
                        onClick={() => setIsAddPropertyModalOpen(true)}
                        className="h-10 px-4 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90 flex items-center gap-2 self-start sm:self-auto"
                      >
                        <IconPlus size={16} />
                        <span>Add New Listing</span>
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-outline-variant/20">
                      <span className="text-xs font-semibold text-on-surface-variant mr-1">Status:</span>
                      {["All", "Active", "Under Offer", "In Escrow", "Draft"].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setPropertyFilterStatus(st)}
                          className={`h-8 px-3 rounded-lg text-xs font-bold transition-all ${
                            propertyFilterStatus === st
                              ? "bg-primary text-white"
                              : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                          }`}
                        >
                          {st}
                        </button>
                      ))}

                      <div className="h-4 w-px bg-outline-variant/40 mx-2 hidden sm:block" />

                      <span className="text-xs font-semibold text-on-surface-variant mr-1">Type:</span>
                      {["All", "Villa", "Penthouse", "Island", "Manor", "Architectural"].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setPropertyFilterCategory(cat)}
                          className={`h-8 px-3 rounded-lg text-xs font-bold transition-all ${
                            propertyFilterCategory === cat
                              ? "bg-secondary text-primary font-black"
                              : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <div className="overflow-x-auto mt-2">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                            <th className="pb-3 font-semibold">Ref ID</th>
                            <th className="pb-3 font-semibold">Property</th>
                            <th className="pb-3 font-semibold">Specifications</th>
                            <th className="pb-3 font-semibold">Valuation</th>
                            <th className="pb-3 font-semibold">Status</th>
                            <th className="pb-3 font-semibold">Analytics</th>
                            <th className="pb-3 font-semibold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20">
                          {filteredProperties.map((prop) => (
                            <tr key={prop.id} className="hover:bg-surface-container-high/30 transition-colors">
                              <td className="py-4 font-mono text-[11px] text-on-surface-variant">
                                {prop.id}
                              </td>
                              <td className="py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0">
                                    <Image src={prop.image} alt={prop.title} fill className="object-cover" />
                                  </div>
                                  <div>
                                    <p className="font-bold text-on-surface">{prop.title}</p>
                                    <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
                                      <IconMapPin size={12} />
                                      <span>{prop.location}</span>
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 text-on-surface-variant">
                                <div className="flex flex-col">
                                  <span>{prop.beds} Beds • {prop.baths} Baths</span>
                                  <span className="text-[11px]">{prop.sqft.toLocaleString()} SqFt</span>
                                </div>
                              </td>
                              <td className="py-4">
                                <p className="font-extrabold text-on-surface text-sm">
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
                                  <span>{prop.viewsCount.toLocaleString()} Views</span>
                                </div>
                              </td>
                              <td className="py-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <Button
                                    variant="outline"
                                    onClick={() => handleTogglePropertyStatus(prop.id)}
                                    className="h-8 px-2.5 rounded-lg text-xs font-semibold border-outline-variant/40"
                                  >
                                    {prop.status === "Active" ? "Draft" : "Publish"}
                                  </Button>

                                  <Link
                                    href="/properties"
                                    className="h-8 w-8 rounded-lg border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                                  >
                                    <IconEye size={15} />
                                  </Link>

                                  <Button
                                    variant="ghost"
                                    onClick={() => handleDeleteProperty(prop.id)}
                                    className="h-8 w-8 p-0 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300"
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
                  <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-black text-on-surface">Purchase Offers &amp; LOI Ledger</h2>
                        <p className="text-xs text-on-surface-variant">
                          Inbound sovereign offers, earnest deposits, and legal negotiation controls
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {["All", "Pending Review", "Under Negotiation", "Escrow Opened", "Declined"].map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setOfferFilterStatus(st)}
                            className={`h-8 px-3 rounded-lg text-xs font-bold transition-all ${
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

                    <div className="overflow-x-auto mt-2">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                            <th className="pb-3 font-semibold">Offer ID</th>
                            <th className="pb-3 font-semibold">Target Estate</th>
                            <th className="pb-3 font-semibold">Prospective Buyer</th>
                            <th className="pb-3 font-semibold">Offer Valuation</th>
                            <th className="pb-3 font-semibold">Earnest Wire</th>
                            <th className="pb-3 font-semibold">Status</th>
                            <th className="pb-3 font-semibold text-right">Negotiation Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20">
                          {filteredOffers.map((offer) => (
                            <tr key={offer.id} className="hover:bg-surface-container-high/30 transition-colors">
                              <td className="py-4 font-mono text-[11px] text-on-surface-variant">
                                {offer.id}
                              </td>
                              <td className="py-4 font-bold text-on-surface">
                                {offer.propertyTitle}
                              </td>
                              <td className="py-4">
                                <p className="font-bold text-on-surface">{offer.buyerName}</p>
                                <p className="text-[11px] text-on-surface-variant">{offer.buyerEntity}</p>
                              </td>
                              <td className="py-4">
                                <p className="font-extrabold text-on-surface text-sm">
                                  ${(offer.offerPrice / 1000000).toFixed(2)}M
                                </p>
                                <span className="text-[10px] text-on-surface-variant font-mono">
                                  {offer.financing}
                                </span>
                              </td>
                              <td className="py-4">
                                <p className="font-bold text-emerald-400">
                                  ${(offer.earnestDeposit / 1000).toFixed(0)}k (10%)
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
                                {offer.status !== "Escrow Opened" && offer.status !== "Declined" ? (
                                  <div className="flex items-center justify-end gap-1.5">
                                    <Button
                                      onClick={() => handleAcceptOffer(offer.id)}
                                      className="h-8 px-2.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700"
                                    >
                                      Accept
                                    </Button>

                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        setCounterModalOffer(offer)
                                        setCounterPriceInput(String(offer.offerPrice + 250000))
                                      }}
                                      className="h-8 px-2.5 rounded-lg text-xs font-bold border-outline-variant/40"
                                    >
                                      Counter
                                    </Button>

                                    <Button
                                      variant="ghost"
                                      onClick={() => handleDeclineOffer(offer.id)}
                                      className="h-8 px-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10"
                                    >
                                      Decline
                                    </Button>
                                  </div>
                                ) : (
                                  <Link
                                    href="/closing"
                                    className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-bold bg-secondary text-primary hover:bg-secondary/90 transition-colors"
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

                  <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-on-surface">Syndicate Deal Pipeline &amp; Escrow Milestones</h3>
                        <p className="text-xs text-on-surface-variant">Real-time status tracking from Inbound to Closed Settlement</p>
                      </div>
                      <Badge variant="outline" className="text-xs font-mono">
                        {deals.length} Active Deals
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {deals.map((deal) => (
                        <div
                          key={deal.id}
                          className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant mb-1">
                              <span>{deal.id}</span>
                              <span className="font-bold text-secondary">{deal.stage}</span>
                            </div>
                            <h4 className="font-bold text-on-surface text-sm">{deal.estate}</h4>
                            <p className="text-[11px] text-on-surface-variant">{deal.location}</p>
                          </div>

                          <div className="py-2 border-y border-outline-variant/20 flex items-center justify-between text-xs">
                            <span className="text-on-surface-variant">Commission</span>
                            <span className="font-mono font-bold text-emerald-400">
                              ${(deal.commission / 1000).toFixed(0)}k
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] text-on-surface-variant font-mono">
                              Close: {deal.closingDate}
                            </span>
                            <Button
                              onClick={() => handleAdvanceDealStage(deal.id)}
                              className="h-8 px-2.5 rounded-lg text-xs font-bold bg-primary text-white hover:bg-primary/90"
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
                  <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-black text-on-surface">Client &amp; Investor CRM Directory</h2>
                        <p className="text-xs text-on-surface-variant">
                          High-net-worth investor profiles, lead scoring, and tour expedition dispatches
                        </p>
                      </div>

                      <Button
                        onClick={() => setIsAddClientModalOpen(true)}
                        className="h-10 px-4 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90 flex items-center gap-2 self-start sm:self-auto"
                      >
                        <IconPlus size={16} />
                        <span>Enroll New Client</span>
                      </Button>
                    </div>

                    <div className="overflow-x-auto mt-2">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                            <th className="pb-3 font-semibold">Client Dossier</th>
                            <th className="pb-3 font-semibold">Entity / Family Office</th>
                            <th className="pb-3 font-semibold">Target Budget</th>
                            <th className="pb-3 font-semibold">Lead Tier</th>
                            <th className="pb-3 font-semibold">Pipeline Status</th>
                            <th className="pb-3 font-semibold">Assigned Desk</th>
                            <th className="pb-3 font-semibold text-right">Direct Outreach</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/20">
                          {filteredLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-surface-container-high/30 transition-colors">
                              <td className="py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                                    {lead.name.slice(0, 2).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="font-bold text-on-surface">{lead.name}</p>
                                    <p className="text-[11px] text-on-surface-variant">{lead.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 text-on-surface-variant font-medium">
                                {lead.entity}
                              </td>
                              <td className="py-4 font-bold text-on-surface text-sm">
                                ${(lead.budget / 1000000).toFixed(1)}M
                              </td>
                              <td className="py-4">
                                <Badge
                                  variant={lead.leadScore === "VIP" ? "gold" : "secondary"}
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
                              <td className="py-4 text-on-surface-variant text-[11px]">
                                {lead.assignedAgent}
                              </td>
                              <td className="py-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <a
                                    href={`tel:${lead.phone}`}
                                    onClick={() => triggerToast(`Dialing client: ${lead.phone}`)}
                                    className="h-8 w-8 rounded-lg border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
                                  >
                                    <IconPhone size={14} />
                                  </a>
                                  <a
                                    href={`mailto:${lead.email}`}
                                    onClick={() => triggerToast(`Opening dispatch email to ${lead.email}`)}
                                    className="h-8 w-8 rounded-lg border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between">
                      <span className="text-xs font-medium text-on-surface-variant">Closed Deals Volume (YTD)</span>
                      <div className="text-2xl font-black text-on-surface tracking-tight mt-1">
                        $74,200,000
                      </div>
                      <span className="text-xs text-emerald-500 font-semibold mt-2">
                        +28.5% over previous fiscal year
                      </span>
                    </div>

                    <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between">
                      <span className="text-xs font-medium text-on-surface-variant">Brokerage Earned Commissions</span>
                      <div className="text-2xl font-black text-on-surface tracking-tight mt-1">
                        $2,226,000
                      </div>
                      <span className="text-xs text-secondary font-semibold mt-2">
                        Avg 3.0% Syndicate Fee Rate
                      </span>
                    </div>

                    <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between">
                      <span className="text-xs font-medium text-on-surface-variant">Active Escrow Retainers</span>
                      <div className="text-2xl font-black text-on-surface tracking-tight mt-1">
                        $4,115,000
                      </div>
                      <span className="text-xs text-on-surface-variant mt-2 font-mono">
                        Secured in First American Trust
                      </span>
                    </div>
                  </div>

                  <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-on-surface">Capital Allocation by Asset Category</h3>
                        <p className="text-xs text-on-surface-variant">Breakdown across our sovereign portfolio</p>
                      </div>
                      <Badge variant="gold" className="text-xs font-bold">2026 Fiscal</Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
                        <span className="text-xs text-on-surface-variant">Ultra-Luxury Villas</span>
                        <div className="text-lg font-black text-on-surface">$37.2M (42%)</div>
                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                          <div className="bg-primary h-full w-[42%]" />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
                        <span className="text-xs text-on-surface-variant">Sky Penthouses</span>
                        <div className="text-lg font-black text-on-surface">$24.5M (28%)</div>
                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                          <div className="bg-secondary h-full w-[28%]" />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
                        <span className="text-xs text-on-surface-variant">Private Islands</span>
                        <div className="p-4 rounded-2xl p-0 bg-transparent text-lg font-black text-on-surface">$18.9M (20%)</div>
                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full w-[20%]" />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
                        <span className="text-xs text-on-surface-variant">Historic Manors</span>
                        <div className="text-lg font-black text-on-surface">$8.8M (10%)</div>
                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full w-[10%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeNav === "vault" && (
                <div className="flex flex-col gap-6">
                  <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-black text-on-surface">Legal Documents &amp; Due Diligence Vault</h2>
                        <p className="text-xs text-on-surface-variant">
                          Encrypted title deeds, purchase agreements, and verified architectural surveys
                        </p>
                      </div>

                      <Button
                        onClick={() => triggerToast("Initializing secure file upload tunnel...")}
                        className="h-10 px-4 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90 flex items-center gap-2 self-start sm:self-auto"
                      >
                        <IconUpload size={16} />
                        <span>Upload Document</span>
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconFileText size={18} />
                              </div>
                              <div>
                                <h4 className="font-bold text-on-surface text-xs leading-snug">{doc.title}</h4>
                                <span className="text-[10px] text-on-surface-variant font-mono">{doc.fileSize} • {doc.uploadedDate}</span>
                              </div>
                            </div>
                            <Badge variant="gold" className="text-[10px] shrink-0">{doc.category}</Badge>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                              <IconCheck size={13} />
                              <span>{doc.status}</span>
                            </span>

                            <Button
                              variant="outline"
                              onClick={() => triggerToast(`Downloading verified packet: ${doc.title}`)}
                              className="h-8 px-3 rounded-lg text-xs font-bold border-outline-variant/40 hover:bg-surface-container-high/40 flex items-center gap-1.5"
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

              {activeNav === "iot" && (
                <div className="flex flex-col gap-6">
                  <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col gap-4">
                    <div>
                      <h2 className="text-lg font-black text-on-surface">IoT Smart Estate Sentry &amp; Facility Controls</h2>
                      <p className="text-xs text-on-surface-variant">
                        Remote management for estate access perimeter, biometric entries, and smart environmental systems
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                      <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                              <IconShieldLock size={18} />
                            </div>
                            <span className="font-bold text-xs text-on-surface">Perimeter Sentry</span>
                          </div>
                          <Badge variant={securityArmed ? "gold" : "outline"} className="text-[10px]">
                            {securityArmed ? "ARMED" : "STANDBY"}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-on-surface-variant">
                          Radar motion barriers and thermal fence sensors across grounds.
                        </p>
                        <Button
                          onClick={() => {
                            setSecurityArmed(!securityArmed)
                            triggerToast(securityArmed ? "Perimeter disarmed" : "Perimeter locked down & armed")
                          }}
                          className={`w-full h-10 rounded-xl text-xs font-bold ${
                            securityArmed ? "bg-red-500/20 text-red-300 hover:bg-red-500/30" : "bg-emerald-600 text-white"
                          }`}
                        >
                          {securityArmed ? "Disarm Perimeter" : "Arm Perimeter Sentry"}
                        </Button>
                      </div>

                      <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                              {gateUnlocked ? <IconLockOpen size={18} /> : <IconLock size={18} />}
                            </div>
                            <span className="font-bold text-xs text-on-surface">Motorized Security Gate</span>
                          </div>
                          <Badge variant={gateUnlocked ? "secondary" : "outline"} className="text-[10px]">
                            {gateUnlocked ? "UNLOCKED" : "LOCKED"}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-on-surface-variant">
                          Automated license plate recognition and biometric intercom gate.
                        </p>
                        <Button
                          onClick={() => {
                            setGateUnlocked(!gateUnlocked)
                            triggerToast(gateUnlocked ? "Gate locked" : "Gate opened for guest dispatch")
                          }}
                          className="w-full h-10 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90"
                        >
                          {gateUnlocked ? "Lock Motor Gate" : "Open Security Gate"}
                        </Button>
                      </div>

                      <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                              <IconTemperature size={18} />
                            </div>
                            <span className="font-bold text-xs text-on-surface">Main Salon Climate</span>
                          </div>
                          <span className="font-mono font-bold text-sm text-secondary">{salonTemp}°F</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setSalonTemp((t) => t - 1)}
                            className="h-10 flex-1 rounded-xl font-bold border-outline-variant/40"
                          >
                            -1°F
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setSalonTemp((t) => t + 1)}
                            className="h-10 flex-1 rounded-xl font-bold border-outline-variant/40"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-surface-container-lowest border border-outline-variant/40 p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div>
                <h3 className="text-base font-bold text-on-surface">Add New Property to Inventory</h3>
                <p className="text-xs text-on-surface-variant">Enroll listing into the management database</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddPropertyModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
              >
                <IconX size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateProperty} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-on-surface-variant mb-1 block">Property Title</label>
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
                  <label className="text-xs font-semibold text-on-surface-variant mb-1 block">Location</label>
                  <Input
                    required
                    placeholder="e.g. Bel Air, CA"
                    value={newPropertyLocation}
                    onChange={(e) => setNewPropertyLocation(e.target.value)}
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant mb-1 block">Price ($ USD)</label>
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
                  <label className="text-xs font-semibold text-on-surface-variant mb-1 block">Category</label>
                  <select
                    value={newPropertyCategory}
                    onChange={(e) => setNewPropertyCategory(e.target.value as PropertyItem["category"])}
                    className="h-10 w-full rounded-xl text-xs bg-surface-container-low border border-outline-variant/40 px-3 text-on-surface"
                  >
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Island">Island</option>
                    <option value="Manor">Manor</option>
                    <option value="Architectural">Architectural</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant mb-1 block">Bedrooms</label>
                  <Input
                    type="number"
                    value={newPropertyBeds}
                    onChange={(e) => setNewPropertyBeds(e.target.value)}
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant mb-1 block">Bathrooms</label>
                  <Input
                    type="number"
                    value={newPropertyBaths}
                    onChange={(e) => setNewPropertyBaths(e.target.value)}
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/30 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddPropertyModalOpen(false)}
                  className="h-10 px-4 rounded-xl text-xs font-bold border-outline-variant/40"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 px-5 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90"
                >
                  Save Listing
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {counterModalOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-surface-container-lowest border border-outline-variant/40 p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div>
                <h3 className="text-base font-bold text-on-surface">Submit Counter-Offer</h3>
                <p className="text-xs text-on-surface-variant">{counterModalOffer.propertyTitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setCounterModalOffer(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
              >
                <IconX size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/30 text-xs">
                <span className="text-on-surface-variant">Buyer's Submitted Price:</span>
                <p className="font-extrabold text-on-surface text-base">
                  ${(counterModalOffer.offerPrice / 1000000).toFixed(2)}M
                </p>
                <span className="text-[11px] text-on-surface-variant">{counterModalOffer.buyerName}</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-on-surface-variant mb-1 block">
                  Proposed Counter Valuation ($ USD)
                </label>
                <Input
                  type="number"
                  value={counterPriceInput}
                  onChange={(e) => setCounterPriceInput(e.target.value)}
                  className="h-10 rounded-xl text-xs font-mono"
                  placeholder="e.g. 8900000"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/30 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCounterModalOffer(null)}
                  className="h-10 px-4 rounded-xl text-xs font-bold border-outline-variant/40"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleApplyCounterOffer}
                  className="h-10 px-5 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90"
                >
                  Transmit Counter-Offer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-surface-container-lowest border border-outline-variant/40 p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div>
                <h3 className="text-base font-bold text-on-surface">Enroll Client Dossier</h3>
                <p className="text-xs text-on-surface-variant">Create accredited investor profile in CRM</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddClientModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
              >
                <IconX size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-on-surface-variant mb-1 block">Full Name</label>
                <Input
                  required
                  placeholder="e.g. Lord Alistair Sterling"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="h-10 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-on-surface-variant mb-1 block">Corporate Entity / Trust</label>
                <Input
                  placeholder="e.g. Sterling Heritage S.A."
                  value={newClientEntity}
                  onChange={(e) => setNewClientEntity(e.target.value)}
                  className="h-10 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant mb-1 block">Email</label>
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
                  <label className="text-xs font-semibold text-on-surface-variant mb-1 block">Phone</label>
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
                  <label className="text-xs font-semibold text-on-surface-variant mb-1 block">Target Budget ($)</label>
                  <Input
                    type="number"
                    placeholder="15000000"
                    value={newClientBudget}
                    onChange={(e) => setNewClientBudget(e.target.value)}
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant mb-1 block">Target Enclave</label>
                  <Input
                    placeholder="Bel Air, Miami"
                    value={newClientEnclave}
                    onChange={(e) => setNewClientEnclave(e.target.value)}
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/30 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddClientModalOpen(false)}
                  className="h-10 px-4 rounded-xl text-xs font-bold border-outline-variant/40"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 px-5 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90"
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
