export interface PropertyData {
  id: string
  slug: string
  title: string
  address: string
  city: string
  state: string
  zip: string
  price: number
  priceFormatted: string
  estMortgage: string
  beds: number
  baths: number
  sqft: number
  sqftFormatted: string
  lotSize: string
  yearBuilt: number
  garage: number
  propertyType: "villa" | "penthouse" | "waterfront" | "chalet" | "compound"
  transactionType: "buy" | "rent" | "lease"
  badge: string
  status: string
  viewsCount: number
  daysListed: number
  mlsId: string
  coordinates: { lat: number; lng: number }
  heroImage: string
  images: string[]
  description: string
  interiorAmenities: string[]
  exteriorAmenities: string[]
  securityAmenities: string[]
  financials: {
    assessedValue: string
    annualTax: string
    estimatedCapRate: string
    hoaFee: string
  }
  agent: {
    name: string
    title: string
    phone: string
    email: string
    rating: string
    reviews: number
    image: string
  }
}

export const PROPERTIES: PropertyData[] = [
  {
    id: "1",
    slug: "the-glass-horizon-villa",
    title: "The Glass Horizon Villa",
    address: "10540 Bellagio Road",
    city: "Bel Air, Los Angeles",
    state: "CA",
    zip: "90077",
    price: 8750000,
    priceFormatted: "$8,750,000",
    estMortgage: "$38,420 / mo",
    beds: 5,
    baths: 6,
    sqft: 8400,
    sqftFormatted: "8,400",
    lotSize: "0.85 Acres",
    yearBuilt: 2024,
    garage: 4,
    propertyType: "villa",
    transactionType: "buy",
    badge: "Verified Exclusive",
    status: "Active Listing",
    viewsCount: 1420,
    daysListed: 4,
    mlsId: "#EH-99824",
    coordinates: { lat: 34.0837, lng: -118.4485 },
    heroImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Perched high within exclusive Bel Air gates, The Glass Horizon Villa embodies architectural precision with panoramic canyon-to-Pacific ocean views. Designed for discreet high-profile living, the residence features full-height motorized Fleetwood glass pocket walls, bookmatched Calacatta marble waterfall surfaces, Gaggenau 400-series chef's suite, a 60-foot cantilevered infinity pool, temperature-regulated 600-bottle glass wine gallery, and state-of-the-art Dolby Atmos cinema.",
    interiorAmenities: [
      "Monolithic Calacatta Gold Marble Island",
      "Concealed Gaggenau 400 Kitchen Suite",
      "600-Bottle Climate-Controlled Glass Cellar",
      "Private Dolby Atmos Acoustic Screening Room",
      "Floating Rift-Cut White Oak Master Suite",
      "Sculptural Stone Spa Soaking Tub",
    ],
    exteriorAmenities: [
      "60ft Heated Zero-Edge Cantilevered Pool",
      "Travertine Outdoor Kitchen & Teppanyaki Grill",
      "Motorized Flush Perimeter Glass Pocket Doors",
      "Private Guarded Gate Compound Access",
      "Panoramic Sunset Canyon & Ocean Vistas",
      "Subterranean 4-Car Collector Showroom",
    ],
    securityAmenities: [
      "24/7 Gated Perimeter with AI Drone Sentry",
      "Encrypted Biometric Smart Lock Architecture",
      "Dedicated Panic Vault & Concealed Escrow Safe",
      "Crestron Home Automation & Surveillance",
    ],
    financials: {
      assessedValue: "$8,500,000",
      annualTax: "$104,200",
      estimatedCapRate: "6.8%",
      hoaFee: "$650 / mo",
    },
    agent: {
      name: "Marcus Sterling",
      title: "Senior Managing Partner • Beverly Hills",
      phone: "+1 (310) 849-2100",
      email: "sterling@estatehub.com",
      rating: "4.98",
      reviews: 112,
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    },
  },
  {
    id: "2",
    slug: "one-greenwich-penthouse",
    title: "One Greenwich Penthouse",
    address: "180 Greenwich Street, Penthouse 62",
    city: "Tribeca, New York",
    state: "NY",
    zip: "10007",
    price: 14200000,
    priceFormatted: "$14,200,000",
    estMortgage: "$69,800 / mo",
    beds: 4,
    baths: 5,
    sqft: 5800,
    sqftFormatted: "5,800",
    lotSize: "1,200 sq ft Terrace",
    yearBuilt: 2023,
    garage: 2,
    propertyType: "penthouse",
    transactionType: "buy",
    badge: "Rare Trophy",
    status: "Active Listing",
    viewsCount: 2180,
    daysListed: 7,
    mlsId: "#EH-88412",
    coordinates: { lat: 40.7128, lng: -74.006 },
    heroImage:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Commanding full 62nd-floor elevation with 360-degree skyline and Hudson River panoramas, 1,200 sq ft private wrap terrace, private keyed elevator, and concierge vault.",
    interiorAmenities: [
      "Double-Height 22ft Ceilings",
      "Private Keyed High-Speed Elevator",
      "Italian Boffi Kitchen with Marble Slabs",
      "En-suite Primary Sanctuary with Fireplace",
    ],
    exteriorAmenities: [
      "1,200 sq ft Private Perimeter Wrap Terrace",
      "Outdoor Sunset Plunge Spa",
      "Direct Rooftop Helipad Access Available",
    ],
    securityAmenities: [
      "24/7 White Glove Concierge & Armed Doorman",
      "Biometric Elevator Bank Authorization",
    ],
    financials: {
      assessedValue: "$13,900,000",
      annualTax: "$182,000",
      estimatedCapRate: "5.4%",
      hoaFee: "$4,200 / mo",
    },
    agent: {
      name: "Elena Vance-Chen",
      title: "Principal Broker • Tribeca & SoHo",
      phone: "+1 (212) 590-4410",
      email: "vance.chen@estatehub.com",
      rating: "5.0",
      reviews: 94,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    },
  },
  {
    id: "3",
    slug: "the-biscayne-point-villa",
    title: "The Biscayne Point Villa",
    address: "740 Biscayne Point Road",
    city: "Biscayne Bay, Miami",
    state: "FL",
    zip: "33141",
    price: 7800000,
    priceFormatted: "$7,800,000",
    estMortgage: "$38,400 / mo",
    beds: 6,
    baths: 8,
    sqft: 8200,
    sqftFormatted: "8,200",
    lotSize: "0.62 Acres",
    yearBuilt: 2024,
    garage: 3,
    propertyType: "waterfront",
    transactionType: "buy",
    badge: "Yacht Ready",
    status: "Active Listing",
    viewsCount: 1890,
    daysListed: 11,
    mlsId: "#EH-77192",
    coordinates: { lat: 25.8576, lng: -80.13 },
    heroImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "100 ft of protected deepwater frontage with mega-yacht mooring station. Seamless indoor-outdoor living with motorized glass pocket doors and rooftop lounge deck.",
    interiorAmenities: [
      "Polished Terrazzo & White Oak Flooring",
      "Custom Italian Molteni&C Closet Suites",
      "Sub-Zero & Wolf Commercial Kitchen",
    ],
    exteriorAmenities: [
      "100ft Deepwater Dock for 90ft+ Yacht",
      "Negative-Edge Saltwater Pool & Cabana",
      "Rooftop Sunset Lounge with Wet Bar",
    ],
    securityAmenities: [
      "Marine Waterfront Infrared Perimeter Radar",
      "Gated Island Security Patrol",
    ],
    financials: {
      assessedValue: "$7,600,000",
      annualTax: "$89,000",
      estimatedCapRate: "7.1%",
      hoaFee: "$480 / mo",
    },
    agent: {
      name: "Julian Rossi",
      title: "Waterfront Portfolio Director • Miami",
      phone: "+1 (305) 714-3890",
      email: "rossi@estatehub.com",
      rating: "4.97",
      reviews: 86,
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    },
  },
  {
    id: "4",
    slug: "trousdale-estates-modern",
    title: "Trousdale Architectural Sanctuary",
    address: "412 Loma Vista Drive",
    city: "Beverly Hills",
    state: "CA",
    zip: "90210",
    price: 11950000,
    priceFormatted: "$11,950,000",
    estMortgage: "$54,200 / mo",
    beds: 5,
    baths: 7,
    sqft: 7600,
    sqftFormatted: "7,600",
    lotSize: "0.55 Acres",
    yearBuilt: 2023,
    garage: 3,
    propertyType: "villa",
    transactionType: "buy",
    badge: "Trophy Asset",
    status: "Active Listing",
    viewsCount: 970,
    daysListed: 2,
    mlsId: "#EH-55201",
    coordinates: { lat: 34.095, lng: -118.398 },
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Single-story mid-century masterwork reimagined with contemporary engineering. Vanishing glass walls open into an expansive private courtyard with zero-edge pool.",
    interiorAmenities: [
      "Terrazzo Flooring with Radiant Floor Heating",
      "Japanese Soaking Tubs",
      "Bespoke Fluted Walnut Millwork",
    ],
    exteriorAmenities: [
      "Zen Courtyard with Ancient Olive Trees",
      "Infinity Edge Lap Pool",
      "Private Security Gate",
    ],
    securityAmenities: ["Biometric Gate Access", "Full Perimeter High-Res Security Matrix"],
    financials: {
      assessedValue: "$11,500,000",
      annualTax: "$138,000",
      estimatedCapRate: "6.2%",
      hoaFee: "$350 / mo",
    },
    agent: {
      name: "Marcus Sterling",
      title: "Senior Managing Partner • Beverly Hills",
      phone: "+1 (310) 849-2100",
      email: "sterling@estatehub.com",
      rating: "4.98",
      reviews: 112,
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    },
  },
  {
    id: "5",
    slug: "red-mountain-chalet-aspen",
    title: "Red Mountain Alpine Compound",
    address: "980 Willoughby Way",
    city: "Aspen",
    state: "CO",
    zip: "81611",
    price: 16500000,
    priceFormatted: "$16,500,000",
    estMortgage: "$79,100 / mo",
    beds: 6,
    baths: 8,
    sqft: 9800,
    sqftFormatted: "9,800",
    lotSize: "2.4 Acres",
    yearBuilt: 2024,
    garage: 4,
    propertyType: "chalet",
    transactionType: "buy",
    badge: "Alpine Sanctuary",
    status: "Active Listing",
    viewsCount: 3120,
    daysListed: 15,
    mlsId: "#EH-44199",
    coordinates: { lat: 39.1911, lng: -106.8175 },
    heroImage:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Direct ski-in / ski-out mountain estate framed in reclaimed Douglas fir timbers and structural architectural glass. Panoramic views of Aspen Mountain and Continental Divide.",
    interiorAmenities: [
      "Double-Sided Monumental Colorado River Stone Fireplace",
      "Heated Ski Locker Room with Boot Warmers",
      "Indoor Wellness Spa & Finnish Sauna",
    ],
    exteriorAmenities: [
      "Heated Hydronic Driveway & Terraces",
      "Outdoor Year-Round Heated Hot Springs Pool",
      "Private Heli-Drop Landing Zone",
    ],
    securityAmenities: ["Private Forest Compound Gate", "Thermal Imaging Cameras"],
    financials: {
      assessedValue: "$15,800,000",
      annualTax: "$162,000",
      estimatedCapRate: "8.1%",
      hoaFee: "$850 / mo",
    },
    agent: {
      name: "Marcus Sterling",
      title: "Senior Managing Partner • Beverly Hills",
      phone: "+1 (310) 849-2100",
      email: "sterling@estatehub.com",
      rating: "4.98",
      reviews: 112,
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    },
  },
  {
    id: "6",
    slug: "fisher-island-oceanfront-villa",
    title: "Fisher Island Palazzo di Mare",
    address: "6800 Fisher Island Drive",
    city: "Fisher Island, Miami",
    state: "FL",
    zip: "33109",
    price: 19800000,
    priceFormatted: "$19,800,000",
    estMortgage: "$94,500 / mo",
    beds: 6,
    baths: 9,
    sqft: 10400,
    sqftFormatted: "10,400",
    lotSize: "0.92 Acres",
    yearBuilt: 2024,
    garage: 5,
    propertyType: "waterfront",
    transactionType: "buy",
    badge: "Ultra-Private",
    status: "Active Listing",
    viewsCount: 2450,
    daysListed: 8,
    mlsId: "#EH-11002",
    coordinates: { lat: 25.7617, lng: -80.14 },
    heroImage:
      "https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Accessible solely via private ferry or private yacht, this Fisher Island palace provides unprecedented security and Caribbean-grade white sand beachfront.",
    interiorAmenities: [
      "Imported French Limestone Flooring",
      "Private Elevators Across 3 Levels",
      "Dual Master Wings with Private Spa Balconies",
    ],
    exteriorAmenities: [
      "Direct Private Beach Access",
      "Private Yacht Slip (Accommodates 130ft)",
      "Outdoor Pavilion with Summer Kitchen",
    ],
    securityAmenities: ["Private Island Security Navy", "24/7 Monitored Access Gate"],
    financials: {
      assessedValue: "$19,000,000",
      annualTax: "$220,000",
      estimatedCapRate: "6.5%",
      hoaFee: "$6,200 / mo",
    },
    agent: {
      name: "Julian Rossi",
      title: "Waterfront Portfolio Director • Miami",
      phone: "+1 (305) 714-3890",
      email: "rossi@estatehub.com",
      rating: "4.97",
      reviews: 86,
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    },
  },
  {
    id: "7",
    slug: "malibu-colony-beachfront-villa",
    title: "Malibu Colony Beachfront Villa",
    address: "23400 Malibu Colony Road",
    city: "Malibu",
    state: "CA",
    zip: "90265",
    price: 65000,
    priceFormatted: "$65,000 / mo",
    estMortgage: "Private Long-Term Lease",
    beds: 5,
    baths: 6,
    sqft: 6200,
    sqftFormatted: "6,200",
    lotSize: "0.45 Acres Beachfront",
    yearBuilt: 2023,
    garage: 3,
    propertyType: "waterfront",
    transactionType: "rent",
    badge: "Exclusive Lease",
    status: "Active Listing",
    viewsCount: 1640,
    daysListed: 5,
    mlsId: "#EH-66291",
    coordinates: { lat: 34.0312, lng: -118.6853 },
    heroImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Direct beachfront residence in gated Malibu Colony. Fully furnished with curated contemporary art, private teak oceanfront sundeck, heated saltwater plunge pool, and 24/7 security guard escort.",
    interiorAmenities: [
      "Bleached French Oak Wide-Plank Floors",
      "Custom Bulthaup Kitchen with Miele Appliances",
      "Ocean-Facing Primary Suite with Steam Shower",
      "Climate-Controlled 400-Bottle Wine Room",
    ],
    exteriorAmenities: [
      "Direct Private Beach Access Stairs",
      "Oceanfront Teak Sun Deck & Fire Pit",
      "Heated Saltwater Infinity Spa",
      "Outdoor Heated Dining Pavilion",
    ],
    securityAmenities: [
      "24/7 Gated Malibu Colony Guard Post",
      "Biometric Perimeter System",
    ],
    financials: {
      assessedValue: "$18,500,000",
      annualTax: "$195,000",
      estimatedCapRate: "5.8%",
      hoaFee: "$1,850 / mo",
    },
    agent: {
      name: "Marcus Sterling",
      title: "Senior Managing Partner • Beverly Hills",
      phone: "+1 (310) 849-2100",
      email: "sterling@estatehub.com",
      rating: "4.98",
      reviews: 112,
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    },
  },
  {
    id: "8",
    slug: "soho-architectural-sky-loft",
    title: "SoHo Architectural Sky Loft",
    address: "472 Broome Street, Penthouse 5",
    city: "SoHo, New York",
    state: "NY",
    zip: "10013",
    price: 45000,
    priceFormatted: "$45,000 / mo",
    estMortgage: "Annual Diplomatic Lease",
    beds: 3,
    baths: 4,
    sqft: 4800,
    sqftFormatted: "4,800",
    lotSize: "800 sq ft Terrace",
    yearBuilt: 2022,
    garage: 1,
    propertyType: "penthouse",
    transactionType: "lease",
    badge: "Diplomatic Lease",
    status: "Active Listing",
    viewsCount: 1290,
    daysListed: 3,
    mlsId: "#EH-33810",
    coordinates: { lat: 40.7223, lng: -74.001 },
    heroImage:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Cast-iron landmark full-floor penthouse with original Corinthian columns, 14-foot ceiling heights, keyed direct elevator access, private landscaped roof terrace with skyline vistas.",
    interiorAmenities: [
      "Restored Historic Cast-Iron Columns",
      "Custom Boffi Kitchen with Carrera Marble",
      "Primary Bathroom with Boffi Spoon Bathtub",
      "Sonos Architectural Multi-Room Audio",
    ],
    exteriorAmenities: [
      "Private Landscaped Roof Garden with Irrigation",
      "Gas Plumbed Outdoor Stainless Kitchen",
    ],
    securityAmenities: [
      "Keyed Direct Elevator Lockout",
      "Virtual White-Glove Doorman Matrix",
    ],
    financials: {
      assessedValue: "$11,200,000",
      annualTax: "$124,000",
      estimatedCapRate: "6.0%",
      hoaFee: "$2,400 / mo",
    },
    agent: {
      name: "Elena Vance-Chen",
      title: "Principal Broker • Tribeca & SoHo",
      phone: "+1 (212) 590-4410",
      email: "vance.chen@estatehub.com",
      rating: "5.0",
      reviews: 94,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    },
  },
]

export function getPropertyByIdOrSlug(idOrSlug: string): PropertyData {
  const decoded = decodeURIComponent(idOrSlug).toLowerCase().trim()
  const found = PROPERTIES.find(
    (p) => p.slug.toLowerCase() === decoded || p.id.toLowerCase() === decoded
  )
  return found || PROPERTIES[0]
}

export function getSimilarProperties(currentId: string, limit = 2): PropertyData[] {
  return PROPERTIES.filter((p) => p.id !== currentId).slice(0, limit)
}
