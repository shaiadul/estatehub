"use client"

export interface AgentRecord {
  id: string
  name: string
  title: string
  license: string
  region: string
  phone: string
  email: string
  rating: string
  reviews: number
  volumeClosed: string
  activeListingsCount: number
  specialties: string[]
  bio: string
  image: string
}

export const AGENTS_LIST: AgentRecord[] = [
  {
    id: "marcus-sterling",
    name: "Marcus Sterling",
    title: "Senior Managing Partner",
    license: "#DRE 01928475",
    region: "Beverly Hills & Bel Air, CA",
    phone: "+1 (310) 849-2100",
    email: "sterling@estatehub.com",
    rating: "4.98",
    reviews: 112,
    volumeClosed: "$420M+",
    activeListingsCount: 4,
    specialties: ["Ultra Luxury Villas", "Gated Knolls", "Subterranean Motor Vaults"],
    bio: "Over two decades orchestrating off-market acquisitions across Beverly Hills, Bel Air knolls, and Trousdale Estates for international family offices.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "elena-vance-chen",
    name: "Elena Vance-Chen",
    title: "Principal Broker • TriBeCa & SoHo",
    license: "#NY-RE 4829104",
    region: "Tribeca & Manhattan, NY",
    phone: "+1 (212) 590-4410",
    email: "vance.chen@estatehub.com",
    rating: "5.0",
    reviews: 94,
    volumeClosed: "$340M+",
    activeListingsCount: 3,
    specialties: ["Trophy Penthouses", "Keyed Elevator Lofts", "Commercial Syndicates"],
    bio: "Specializing in super-prime Manhattan towers, sky mansions, and landmark historic cast-iron lofts with institutional cross-border escrow guidance.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "julian-rossi",
    name: "Julian Rossi",
    title: "Waterfront Portfolio Director",
    license: "#FL-BK 3392018",
    region: "Miami Beach & Fisher Island, FL",
    phone: "+1 (305) 714-3890",
    email: "rossi@estatehub.com",
    rating: "4.97",
    reviews: 86,
    volumeClosed: "$290M+",
    activeListingsCount: 3,
    specialties: ["Deepwater Frontage", "Mega-Yacht Berths", "Private Island Compounds"],
    bio: "Unrivaled expertise in South Florida's premier maritime estates, private guarded islands, and deepwater dockage estates accommodating 100ft+ vessels.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    title: "Senior Managing Director, Luxury Estates",
    license: "#DRE 01928475",
    region: "Los Angeles & Hollywood Hills, CA",
    phone: "+1 (310) 555-0198",
    email: "s.jenkins@estatehub.com",
    rating: "4.99",
    reviews: 84,
    volumeClosed: "$180M+",
    activeListingsCount: 2,
    specialties: ["Architectural Modernism", "Promontory Vistas", "Celebrity Trusts"],
    bio: "Leading confidential representation for high-profile creatives, tech entrepreneurs, and generational wealth funds seeking architectural perfection.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeeRJzQOHMWBoJLWDqJkpdnHdA0wgyPzLXk-QlMXndqzOQhXQUdzyX7JlevQf-pk0BSKb5Snqd4zdo1K7dBSvxyJpE1Olj7W95BFg3UfDAcBovcjH9kj2CwGZVLRqIBD2qStaWi4bXGOOR4Vy2eV_16xvldTGNBKvOczJcxGpqTzG5bl-lHFCfSMCp6FbI0Xikfq7vIL0dDwOhAamBmFonisGNB3wxysbrkUsfYBD-q4KuD2wEnGAx",
  },
]
