"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  IconStarFilled,
  IconShieldCheck,
  IconMapPin,
  IconCalendarEvent,
  IconChevronRight,
  IconSearch,
  IconCircleCheck,
  IconArrowRight,
} from "@tabler/icons-react"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface AgentRecord {
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

const AGENTS_LIST: AgentRecord[] = [
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

export function AgentsDirectoryView() {
  const [selectedRegion, setSelectedRegion] = React.useState<string>("all")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [consultModalAgent, setConsultModalAgent] = React.useState<AgentRecord | null>(null)
  const [consultBooked, setConsultBooked] = React.useState<boolean>(false)

  const filteredAgents = React.useMemo(() => {
    return AGENTS_LIST.filter((ag) => {
      const matchRegion =
        selectedRegion === "all" ||
        (selectedRegion === "ca" && ag.region.includes("CA")) ||
        (selectedRegion === "ny" && ag.region.includes("NY")) ||
        (selectedRegion === "fl" && ag.region.includes("FL"))

      const matchSearch =
        searchQuery === "" ||
        ag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ag.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ag.region.toLowerCase().includes(searchQuery.toLowerCase())

      return matchRegion && matchSearch
    })
  }, [selectedRegion, searchQuery])

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      <Header />

      <main className="w-full pt-20 flex-1">
        {/* Breadcrumb & Hero Header */}
        <section className="w-full bg-surface-container-lowest border-b border-outline-variant/30 shadow-xs">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium mb-3">
              <Link href="/" className="hover:text-on-surface transition-colors">Home</Link>
              <IconChevronRight size={14} className="text-outline-variant" />
              <span className="text-on-surface font-semibold">Private Advisory &amp; Brokerage</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <Badge variant="gold" className="mb-2 text-xs font-bold uppercase tracking-wider">
                  Accredited Sovereign Advisory
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight">
                  Premier Real Estate Directors
                </h1>
                <p className="text-sm sm:text-base text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
                  Discreet, institutional representation for ultra-high-net-worth acquisitions, generational trophy estates, and confidential private syndications.
                </p>
              </div>

              {/* Advisory Metrics Badge Card */}
              <div className="flex items-center gap-6 bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 shrink-0">
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant font-semibold">Syndicated Volume</span>
                  <span className="text-xl sm:text-2xl font-black text-on-surface mt-0.5">$1.2B+</span>
                </div>
                <div className="h-10 w-px bg-outline-variant/30" />
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant font-semibold">Discretion Score</span>
                  <span className="text-xl sm:text-2xl font-black text-secondary mt-0.5">99.8%</span>
                </div>
                <div className="h-10 w-px bg-outline-variant/30" />
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant font-semibold">Global Desks</span>
                  <span className="text-xl sm:text-2xl font-black text-on-surface mt-0.5">42</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Region Filter Bar */}
        <section className="w-full bg-surface py-8 border-b border-outline-variant/20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Region Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              <Button
                variant={selectedRegion === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion("all")}
                className="rounded-full text-xs font-semibold whitespace-nowrap"
              >
                All Jurisdictions ({AGENTS_LIST.length})
              </Button>
              <Button
                variant={selectedRegion === "ca" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion("ca")}
                className="rounded-full text-xs font-semibold whitespace-nowrap"
              >
                California (Bel Air &amp; Beverly Hills)
              </Button>
              <Button
                variant={selectedRegion === "ny" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion("ny")}
                className="rounded-full text-xs font-semibold whitespace-nowrap"
              >
                New York (Tribeca &amp; Central Park)
              </Button>
              <Button
                variant={selectedRegion === "fl" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion("fl")}
                className="rounded-full text-xs font-semibold whitespace-nowrap"
              >
                Florida (Miami &amp; Palm Beach)
              </Button>
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full md:w-72">
              <IconSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <Input
                placeholder="Search advisor or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 text-xs rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="w-full py-12">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="flex flex-col gap-6">
                    {/* Header Row: Avatar, Name, License */}
                    <div className="flex items-start gap-5">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-surface-container shadow-md">
                        <Image
                          src={agent.image}
                          alt={agent.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h2 className="text-xl sm:text-2xl font-bold text-on-surface truncate">
                            {agent.name}
                          </h2>
                          <IconShieldCheck className="text-secondary size-5 shrink-0" />
                        </div>

                        <span className="text-xs sm:text-sm font-semibold text-secondary mt-0.5">
                          {agent.title}
                        </span>

                        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-1.5">
                          <IconMapPin size={14} className="text-outline shrink-0" />
                          <span className="truncate">{agent.region}</span>
                        </div>

                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className="flex items-center gap-1 text-amber-500 font-bold">
                            <IconStarFilled size={14} /> {agent.rating}
                          </span>
                          <span className="text-on-surface-variant">
                            ({agent.reviews} client reviews)
                          </span>
                          <span className="text-on-surface font-semibold font-mono text-[11px] bg-surface-container px-2 py-0.5 rounded">
                            {agent.license}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bio Paragraph */}
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {agent.bio}
                    </p>

                    {/* Specialties Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {agent.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface text-[11px] font-semibold border border-outline-variant/20"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Performance Metrics Bar */}
                    <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 text-center">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-on-surface-variant font-medium">Career Volume</span>
                        <span className="text-base sm:text-lg font-black text-on-surface mt-0.5">{agent.volumeClosed}</span>
                      </div>
                      <div className="flex flex-col border-l border-outline-variant/30">
                        <span className="text-[11px] text-on-surface-variant font-medium">Active Portfolio</span>
                        <span className="text-base sm:text-lg font-black text-secondary mt-0.5">{agent.activeListingsCount} Exclusive</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-outline-variant/30">
                    <Button
                      variant="gold"
                      size="md"
                      onClick={() => setConsultModalAgent(agent)}
                      className="gap-2 font-bold w-full"
                    >
                      <IconCalendarEvent size={16} />
                      <span>Book Consultation</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="md"
                      render={<Link href={`/properties`} />}
                      className="gap-2 font-semibold w-full"
                    >
                      <span>View Listings</span>
                      <IconArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Private Consultation Modal */}
        {consultModalAgent && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
              <button
                type="button"
                onClick={() => {
                  setConsultModalAgent(null)
                  setConsultBooked(false)
                }}
                className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface"
              >
                ✕
              </button>

              {consultBooked ? (
                <div className="flex flex-col items-center text-center py-6">
                  <IconCircleCheck size={48} className="text-emerald-500 mb-4" />
                  <h3 className="text-2xl font-bold text-on-surface">Consultation Scheduled</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-2 max-w-sm leading-relaxed">
                    {consultModalAgent.name}&apos;s executive concierge will connect with you via encrypted phone or video dispatch within 2 business hours.
                  </p>
                  <Button
                    variant="gold"
                    size="md"
                    onClick={() => {
                      setConsultModalAgent(null)
                      setConsultBooked(false)
                    }}
                    className="mt-6 font-bold"
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={consultModalAgent.image}
                        alt={consultModalAgent.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-on-surface">
                        Schedule Private Advisory with {consultModalAgent.name}
                      </h3>
                      <span className="text-xs text-secondary font-medium">
                        {consultModalAgent.title}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    All communications are governed under strict attorney-client style confidentiality agreements.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setConsultBooked(true)
                    }}
                    className="flex flex-col gap-3 mt-2"
                  >
                    <Input placeholder="Full Legal Name" required className="h-10 text-xs" />
                    <Input placeholder="Private Phone (+1)" type="tel" required className="h-10 text-xs" />
                    <Input placeholder="Institutional Email" type="email" required className="h-10 text-xs" />
                    <Input placeholder="Holding or Syndicate Target (e.g. $10M - $25M)" className="h-10 text-xs" />

                    <Button type="submit" variant="gold" size="lg" className="w-full font-bold shadow-md mt-2">
                      Confirm Advisory Dispatch
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
