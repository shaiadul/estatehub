"use client"

export interface PropertyItem {
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

export interface OfferItem {
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

export interface ClientLead {
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

export interface DealItem {
  id: string
  estate: string
  location: string
  price: number
  seller: string
  buyer: string
  stage:
    | "Inbound"
    | "Pre-Flight Audit"
    | "Active Syndicate"
    | "In Escrow"
    | "Closed"
  commission: number
  closingDate: string
}

export interface DocumentItem {
  id: string
  title: string
  category:
    | "Title Deed"
    | "Contract"
    | "Audit Report"
    | "KYC / AML"
    | "Tax Disclosure"
  fileSize: string
  uploadedDate: string
  status: "Verified & Encrypted" | "Pending Signature" | "Draft"
  securityTier: "Tier 1 - Sovereign" | "Tier 2 - Institutional"
}

export interface SavedPropertyItem {
  id: string
  propertyId: string
  title: string
  location: string
  price: number
  originalPrice: number
  image: string
  category: "Villa" | "Penthouse" | "Island" | "Manor" | "Architectural"
  beds: number
  baths: number
  sqft: number
  notes: string
  tourRequested: boolean
  savedAt: string
}

export interface TourBookingItem {
  id: string
  propertyId: string
  propertyTitle: string
  clientName: string
  clientRole: "buyer" | "organizer"
  date: string
  timeSlot: string
  transportType: "Chauffeured Maybach" | "Private Helicopter" | "Discreet Chauffeur" | "Virtual LiDAR 3D"
  assignedAgent: string
  status: "Confirmed" | "Pending Concierge" | "Completed"
  specialRequests: string
}

export interface NavItem {
  id: ActiveNav
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  badge?: string
  count?: number
  dot?: boolean
}

export interface UrgentItem {
  tag: string
  tagColor: string
  meta: string
  title: string
  sub: string
  action: string
  btnClass: string
  onClick?: () => void
  href?: string
}

export type ActiveRole = "seller" | "buyer" | "organizer"

export type ActiveNav =
  | "overview"
  | "properties"
  | "offers"
  | "crm"
  | "financials"
  | "vault"
  | "sentry"
  | "saved"
  | "tours"

export const INITIAL_PROPERTIES: PropertyItem[] = [
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

export const INITIAL_OFFERS: OfferItem[] = [
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

export const INITIAL_LEADS: ClientLead[] = [
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

export const INITIAL_DEALS: DealItem[] = [
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

export const INITIAL_DOCS: DocumentItem[] = [
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

export const INITIAL_SAVED_PROPERTIES: SavedPropertyItem[] = [
  {
    id: "SAV-01",
    propertyId: "EST-001",
    title: "The Glass Horizon Villa",
    location: "Bel Air, Los Angeles, CA",
    price: 8750000,
    originalPrice: 9200000,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    category: "Architectural",
    beds: 6,
    baths: 8,
    sqft: 9400,
    notes: "Primary target for family office relocation. Private heliport diligence pending.",
    tourRequested: true,
    savedAt: "Oct 02, 2026",
  },
  {
    id: "SAV-02",
    propertyId: "EST-002",
    title: "One Greenwich Penthouse",
    location: "Tribeca, New York, NY",
    price: 18900000,
    originalPrice: 18900000,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    category: "Penthouse",
    beds: 4,
    baths: 5,
    sqft: 6800,
    notes: "Under offer by third party, monitoring for contingency fallout.",
    tourRequested: false,
    savedAt: "Sep 28, 2026",
  },
  {
    id: "SAV-03",
    propertyId: "EST-004",
    title: "Aspen Alpine Sanctuary",
    location: "Red Mountain, Aspen, CO",
    price: 12500000,
    originalPrice: 13200000,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
    category: "Manor",
    beds: 5,
    baths: 6,
    sqft: 8100,
    notes: "Winter retreat candidate with heated driveway and direct ski trail access.",
    tourRequested: false,
    savedAt: "Oct 04, 2026",
  },
]

export const INITIAL_TOURS: TourBookingItem[] = [
  {
    id: "TR-501",
    propertyId: "EST-001",
    propertyTitle: "The Glass Horizon Villa",
    clientName: "Julian Rossi",
    clientRole: "buyer",
    date: "Tomorrow, 14:00 PST",
    timeSlot: "14:00 - 16:30",
    transportType: "Chauffeured Maybach",
    assignedAgent: "Sarah Jenkins",
    status: "Confirmed",
    specialRequests: "NDAs signed for 4 personal security escorts; LiDAR presentation requested.",
  },
  {
    id: "TR-502",
    propertyId: "EST-003",
    propertyTitle: "Biscayne Bay Deepwater Palazzo",
    clientName: "Claire Moreau",
    clientRole: "organizer",
    date: "Oct 12, 2026, 10:00 EST",
    timeSlot: "10:00 - 12:00",
    transportType: "Private Helicopter",
    assignedAgent: "David Vance",
    status: "Confirmed",
    specialRequests: "Helipad landing clearance coordinated with Miami Port Authority.",
  },
  {
    id: "TR-503",
    propertyId: "EST-004",
    propertyTitle: "Aspen Alpine Sanctuary",
    clientName: "Daisuke Tanaka",
    clientRole: "organizer",
    date: "Oct 15, 2026, 11:30 MST",
    timeSlot: "11:30 - 13:30",
    transportType: "Discreet Chauffeur",
    assignedAgent: "Elena Rostova",
    status: "Pending Concierge",
    specialRequests: "Japanese translator required for legal pro-forma review.",
  },
]
