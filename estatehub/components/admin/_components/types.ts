"use client"

export interface AdminUserItem {
  id: string
  name: string
  email: string
  role: "buyer" | "seller" | "broker" | "admin"
  roleTitle: string
  accreditationTier:
    | "Tier 1 - Sovereign ($25M+)"
    | "Tier 2 - Institutional ($10M+)"
    | "Tier 3 - Accredited ($5M+)"
    | "System Root Authority"
  kycStatus: "Verified" | "Pending Review" | "Action Required" | "Suspended"
  avatar: string
  portfolioCount: number
  joinedDate: string
  lastActive: string
  verified: boolean
}

export interface AdminPropertyItem {
  id: string
  title: string
  location: string
  sellerName: string
  sellerEntity: string
  price: number
  category: "Villa" | "Penthouse" | "Island" | "Manor" | "Architectural"
  status: "Active" | "Pending Review" | "Under Offer" | "In Escrow" | "Flagged" | "Delisted"
  featured: boolean
  vdrAudited: boolean
  lidarScanAvailable: boolean
  submittedDate: string
  image: string
}

export interface AdminEscrowDeal {
  id: string
  propertyTitle: string
  propertyId: string
  buyerName: string
  sellerName: string
  brokerName: string
  dealValue: number
  earnestAmount: number
  earnestWired: boolean
  stage:
    | "Earnest Wire"
    | "Diligence Audit"
    | "Title Clearance"
    | "Final Settlement"
    | "Disbursed"
  platformFee: number
  closingDate: string
  disputed?: boolean
}

export interface AdminAuditLogItem {
  id: string
  timestamp: string
  eventType:
    | "FIDO2 Authenticated"
    | "Bilateral LOI Executed"
    | "Earnest Wire Verified"
    | "VDR Watermark Download"
    | "Role Privileges Modified"
    | "Emergency Freeze Toggled"
    | "Listing Approved"
  operator: string
  ipAddress: string
  location: string
  severity: "info" | "warning" | "critical"
  details: string
}

export type AdminNav =
  | "overview"
  | "users"
  | "properties"
  | "escrow"
  | "audit"
  | "settings"

export interface PlatformPolicy {
  platformFeeRate: number
  minEarnestPercent: number
  minAccreditationThreshold: number
  kycRigorLevel: "Tier 1 Multi-Sig Sovereign" | "Standard Institutional"
  emergencyFreeze: boolean
  multiSigEnclave: boolean
  maintenanceMode: boolean
}

export const INITIAL_ADMIN_USERS: AdminUserItem[] = [
  {
    id: "USR-001",
    name: "Alexander Vance",
    email: "admin@estatehub.com",
    role: "admin",
    roleTitle: "Master Platform Administrator & Escrow Arbiter",
    accreditationTier: "System Root Authority",
    kycStatus: "Verified",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    portfolioCount: 42,
    joinedDate: "Jan 10, 2025",
    lastActive: "Just now",
    verified: true,
  },
  {
    id: "USR-002",
    name: "Julian Rossi",
    email: "rossi.familyoffice@swiss-holdings.ch",
    role: "buyer",
    roleTitle: "Accredited Sovereign Buyer",
    accreditationTier: "Tier 1 - Sovereign ($25M+)",
    kycStatus: "Verified",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    portfolioCount: 3,
    joinedDate: "Feb 14, 2026",
    lastActive: "4 mins ago",
    verified: true,
  },
  {
    id: "USR-003",
    name: "Marcus Sterling",
    email: "sterling@belair-trust.com",
    role: "seller",
    roleTitle: "Family Office Estate Principal",
    accreditationTier: "Tier 1 - Sovereign ($25M+)",
    kycStatus: "Verified",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    portfolioCount: 6,
    joinedDate: "Mar 01, 2026",
    lastActive: "22 mins ago",
    verified: true,
  },
  {
    id: "USR-004",
    name: "Sarah Jenkins",
    email: "s.jenkins@estatehub.com",
    role: "broker",
    roleTitle: "Licensed Broker Partner & Syndicate Lead",
    accreditationTier: "Tier 2 - Institutional ($10M+)",
    kycStatus: "Verified",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCeeRJzQOHMWBoJLWDqJkpdnHdA0wgyPzLXk-QlMXndqzOQhXQUdzyX7JlevQf-pk0BSKb5Snqd4zdo1K7dBSvxyJpE1Olj7W95BFg3UfDAcBovcjH9kj2CwGZVLRqIBD2qStaWi4bXGOOR4Vy2eV_16xvldTGNBKvOczJcxGpqTzG5bl-lHFCfSMCp6FbI0Xikfq7vIL0dDwOhAamBmFonisGNB3wxysbrkUsfYBD-q4KuD2wEnGAx",
    portfolioCount: 8,
    joinedDate: "Jan 15, 2026",
    lastActive: "1 hour ago",
    verified: true,
  },
  {
    id: "USR-005",
    name: "Lord Alistair Sterling",
    email: "sterling.a@kensingtontrust.co.uk",
    role: "buyer",
    roleTitle: "Kensington Family Office Trustee",
    accreditationTier: "Tier 1 - Sovereign ($25M+)",
    kycStatus: "Verified",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    portfolioCount: 2,
    joinedDate: "May 12, 2026",
    lastActive: "3 hours ago",
    verified: true,
  },
  {
    id: "USR-006",
    name: "Claire Moreau",
    email: "c.moreau@monaco-invest.mc",
    role: "buyer",
    roleTitle: "Monaco Multi-Asset Syndicate",
    accreditationTier: "Tier 2 - Institutional ($10M+)",
    kycStatus: "Pending Review",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    portfolioCount: 1,
    joinedDate: "Yesterday",
    lastActive: "Yesterday",
    verified: false,
  },
  {
    id: "USR-007",
    name: "Daisuke Tanaka",
    email: "tanaka@shibuyare.co.jp",
    role: "buyer",
    roleTitle: "Shibuya Global Real Estate Principal",
    accreditationTier: "Tier 1 - Sovereign ($25M+)",
    kycStatus: "Verified",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    portfolioCount: 4,
    joinedDate: "Jul 20, 2026",
    lastActive: "5 hours ago",
    verified: true,
  },
]

export const INITIAL_ADMIN_PROPERTIES: AdminPropertyItem[] = [
  {
    id: "EST-001",
    title: "The Glass Horizon Villa",
    location: "Bel Air, Los Angeles, CA",
    sellerName: "Marcus Sterling",
    sellerEntity: "Bel Air Trust No. 8",
    price: 8750000,
    category: "Architectural",
    status: "Active",
    featured: true,
    vdrAudited: true,
    lidarScanAvailable: true,
    submittedDate: "Oct 01, 2026",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "EST-002",
    title: "One Greenwich Penthouse",
    location: "Tribeca, New York, NY",
    sellerName: "Hudson Yards Capital",
    sellerEntity: "One Greenwich Asset LLC",
    price: 18900000,
    category: "Penthouse",
    status: "Under Offer",
    featured: true,
    vdrAudited: true,
    lidarScanAvailable: true,
    submittedDate: "Sep 20, 2026",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "EST-003",
    title: "Biscayne Bay Deepwater Palazzo",
    location: "Miami Beach, FL",
    sellerName: "Star Island Holdings",
    sellerEntity: "Star Island Family Trust",
    price: 14200000,
    category: "Villa",
    status: "In Escrow",
    featured: true,
    vdrAudited: true,
    lidarScanAvailable: true,
    submittedDate: "Sep 15, 2026",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "EST-004",
    title: "Aspen Alpine Sanctuary",
    location: "Red Mountain, Aspen, CO",
    sellerName: "Rocky Mountain LLC",
    sellerEntity: "Apex Alpine Holdings",
    price: 12500000,
    category: "Manor",
    status: "Active",
    featured: false,
    vdrAudited: true,
    lidarScanAvailable: false,
    submittedDate: "Sep 28, 2026",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "EST-005",
    title: "Exuma Cays Private Atoll",
    location: "Exuma, Bahamas",
    sellerName: "Island Sovereign Trust",
    sellerEntity: "Bahamian Maritime Holdings",
    price: 24500000,
    category: "Island",
    status: "Pending Review",
    featured: false,
    vdrAudited: false,
    lidarScanAvailable: false,
    submittedDate: "Oct 06, 2026",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "EST-006",
    title: "Villa Mirasol Belle Époque",
    location: "Cap d'Antibes, France",
    sellerName: "Riviera Prime SAS",
    sellerEntity: "Cote d'Azur Estates",
    price: 32000000,
    category: "Manor",
    status: "Pending Review",
    featured: false,
    vdrAudited: false,
    lidarScanAvailable: true,
    submittedDate: "Oct 07, 2026",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop",
  },
]

export const INITIAL_ADMIN_ESCROW: AdminEscrowDeal[] = [
  {
    id: "ESC-801",
    propertyTitle: "Biscayne Bay Deepwater Palazzo",
    propertyId: "EST-003",
    buyerName: "Vanderbilt Partners",
    sellerName: "Star Island Holdings",
    brokerName: "Sarah Jenkins",
    dealValue: 14200000,
    earnestAmount: 1420000,
    earnestWired: true,
    stage: "Final Settlement",
    platformFee: 355000,
    closingDate: "Oct 28, 2026",
  },
  {
    id: "ESC-802",
    propertyTitle: "The Glass Horizon Villa",
    propertyId: "EST-001",
    buyerName: "Julian Rossi",
    sellerName: "Marcus Sterling",
    brokerName: "Sarah Jenkins",
    dealValue: 8750000,
    earnestAmount: 875000,
    earnestWired: true,
    stage: "Diligence Audit",
    platformFee: 218750,
    closingDate: "Nov 15, 2026",
  },
  {
    id: "ESC-803",
    propertyTitle: "One Greenwich Penthouse",
    propertyId: "EST-002",
    buyerName: "Geneva Capital Lux",
    sellerName: "Hudson Yards Capital",
    brokerName: "David Vance",
    dealValue: 18900000,
    earnestAmount: 1890000,
    earnestWired: false,
    stage: "Earnest Wire",
    platformFee: 472500,
    closingDate: "Dec 01, 2026",
  },
]

export const INITIAL_ADMIN_AUDIT: AdminAuditLogItem[] = [
  {
    id: "AUD-991",
    timestamp: "2 mins ago",
    eventType: "Bilateral LOI Executed",
    operator: "Julian Rossi (Buyer)",
    ipAddress: "194.230.14.88",
    location: "Zurich, Switzerland",
    severity: "info",
    details: "LOI submitted for EST-001 ($8.75M) with 10% earnest lock",
  },
  {
    id: "AUD-992",
    timestamp: "18 mins ago",
    eventType: "Earnest Wire Verified",
    operator: "First American Trust #ESC-801",
    ipAddress: "12.180.4.19",
    location: "New York, USA",
    severity: "info",
    details: "$1.42M earnest wire confirmed into custody account",
  },
  {
    id: "AUD-993",
    timestamp: "1 hour ago",
    eventType: "VDR Watermark Download",
    operator: "Lord Alistair Sterling",
    ipAddress: "82.165.197.1",
    location: "London, UK",
    severity: "warning",
    details: "Seismic audit & structural blueprints downloaded with encrypted watermark #KENS-88",
  },
  {
    id: "AUD-994",
    timestamp: "3 hours ago",
    eventType: "FIDO2 Authenticated",
    operator: "Alexander Vance (Admin)",
    ipAddress: "66.249.79.1",
    location: "Beverly Hills, CA",
    severity: "info",
    details: "Hardware YubiKey FIDO2 session initiated with root privileges",
  },
  {
    id: "AUD-995",
    timestamp: "5 hours ago",
    eventType: "Listing Approved",
    operator: "Alexander Vance (Admin)",
    ipAddress: "66.249.79.1",
    location: "Beverly Hills, CA",
    severity: "info",
    details: "Listing EST-004 'Aspen Alpine Sanctuary' verified and pushed live to global radar",
  },
]
