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
import { SectionWrapper } from "@/components/ui/section-wrapper"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useI18n } from "@/lib/i18n"
import { listAgentsAction } from "@/actions/auth"

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

export function AgentsDirectoryView() {
  const { t } = useI18n()
  const [agentsList, setAgentsList] = React.useState<AgentRecord[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [selectedRegion, setSelectedRegion] = React.useState<string>("all")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [consultModalAgent, setConsultModalAgent] = React.useState<AgentRecord | null>(null)
  const [consultBooked, setConsultBooked] = React.useState<boolean>(false)

  React.useEffect(() => {
    let isMounted = true
    listAgentsAction()
      .then((res) => {
        if (!isMounted) return
        if (res.success && res.data && res.data.length > 0) {
          const mapped = res.data.map((u) => {
            return {
              id: u.id,
              name: u.full_name || u.email.split("@")[0],
              title: u.title || "Licensed Real Estate Broker Partner",
              license: u.jurisdiction ? `#${u.jurisdiction}` : "DRE Sovereign Verified",
              region: u.jurisdiction || "Global Prime Enclaves",
              phone: u.phone || "+1 (310) 849-2100",
              email: u.email,
              rating: "4.98",
              reviews: 96,
              volumeClosed: u.net_worth_tier || "$100M+ Volume",
              activeListingsCount: 3,
              specialties: [u.entity_name || "Sovereign Advisory", "Ultra Prime Estates"],
              bio: `${u.full_name || "Senior Partner"} directs confidential transactions and acquisitions across ${u.jurisdiction || "luxury enclaves"}.`,
              image:
                u.avatar_url ||
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
            }
          })
          setAgentsList(mapped)
        }
        setIsLoading(false)
      })
      .catch(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const filteredAgents = React.useMemo(() => {
    return agentsList.filter((ag) => {
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
  }, [agentsList, selectedRegion, searchQuery])

  const regionFilters = [
    { key: "all", label: `${t("agents.allJurisdictions", "All Jurisdictions")} (${agentsList.length})` },
    { key: "ca", label: "California (Bel Air & Beverly Hills)" },
    { key: "ny", label: "New York (Tribeca & Central Park)" },
    { key: "fl", label: "Florida (Miami & Palm Beach)" },
  ]

  const heroStats = [
    { key: "volume", label: t("agents.volumeLabel", "Syndicated Volume"), value: "$1.2B+", valueClassName: "text-xl sm:text-2xl font-black text-on-surface mt-0.5" },
    { key: "discretion", label: t("agents.discretionLabel", "Discretion Score"), value: "99.8%", valueClassName: "text-xl sm:text-2xl font-black text-secondary mt-0.5" },
    { key: "desks", label: t("agents.desksLabel", "Global Desks"), value: "42", valueClassName: "text-xl sm:text-2xl font-black text-on-surface mt-0.5" },
  ]

  const consultFields = [
    { key: "name", placeholder: t("agents.fullName", "Full Legal Name"), type: undefined as string | undefined, required: true },
    { key: "phone", placeholder: t("agents.phone", "Private Phone (+1)"), type: "tel", required: true },
    { key: "email", placeholder: t("agents.email", "Institutional Email"), type: "email", required: true },
    { key: "target", placeholder: t("agents.target", "Holding or Syndicate Target (e.g. $10M - $25M)"), type: undefined as string | undefined, required: false },
  ]

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      <Header />

      <main className="w-full pt-20 flex-1">
        <SectionWrapper fullWidth className="bg-surface-container-lowest border-b border-outline-variant/30 shadow-xs" innerClassName="py-8">
          <div>
            <Breadcrumb className="mb-3">
              <BreadcrumbList className="text-xs text-on-surface-variant font-medium">
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/" className="hover:text-on-surface transition-colors" />}>
                    {t("properties.home", "Home")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-on-surface font-semibold">
                    {t("agents.title", "Private Advisory & Brokerage")}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <Badge variant="gold" className="mb-2 text-xs font-bold uppercase tracking-wider">
                  {t("agents.badge", "Accredited Sovereign Advisory")}
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight">
                  {t("agents.title", "Premier Real Estate Directors")}
                </h1>
                <p className="text-sm sm:text-base text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
                  {t(
                    "agents.subtitle",
                    "Discreet, institutional representation for ultra-high-net-worth acquisitions, generational trophy estates, and confidential private syndications."
                  )}
                </p>
              </div>

              <div className="flex items-center gap-6 bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 shrink-0">
                {heroStats.map(({ key, label, value, valueClassName }, i) => (
                  <React.Fragment key={key}>
                    {i > 0 && <div className="h-10 w-px bg-outline-variant/30" />}
                    <div className="flex flex-col">
                      <span className="text-xs text-on-surface-variant font-semibold">{label}</span>
                      <span className={valueClassName}>{value}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper fullWidth className="bg-surface py-8 border-b border-outline-variant/20" innerClassName="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              {regionFilters.map(({ key, label }) => (
                <Button
                  key={key}
                  variant={selectedRegion === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRegion(key)}
                  className="rounded-full text-xs font-semibold whitespace-nowrap"
                >
                  {label}
                </Button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <IconSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <Input
                placeholder={t("agents.searchPlaceholder", "Search advisor or specialty...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 text-xs rounded-xl"
              />
            </div>
        </SectionWrapper>

        <SectionWrapper className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="flex flex-col gap-6">
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
                          <span className="flex items-center gap-1 text-on-secondary-container font-bold">
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

                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {agent.bio}
                    </p>

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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-outline-variant/30">
                    <Button
                      variant="gold"
                      size="md"
                      onClick={() => setConsultModalAgent(agent)}
                      className="gap-2 font-bold w-full"
                    >
                      <IconCalendarEvent size={16} />
                      <span>{t("agents.bookConsultation", "Book Consultation")}</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="md"
                      render={<Link href={`/properties`} />}
                      className="gap-2 font-semibold w-full"
                    >
                      <span>{t("agents.viewListings", "View Listings")}</span>
                      <IconArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
        </SectionWrapper>

        {consultModalAgent && (
          <div className="fixed inset-0 z-50 bg-primary-container/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
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
                  <IconCircleCheck size={48} className="text-on-tertiary-container mb-4" />
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
                    {t("agents.done", "Done")}
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
                        {t("agents.scheduleAdvisory", "Schedule Private Advisory with")} {consultModalAgent.name}
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
                    {consultFields.map(({ key, placeholder, type, required }) => (
                      <Input
                        key={key}
                        placeholder={placeholder}
                        type={type}
                        required={required}
                        className="h-10 text-xs"
                      />
                    ))}

                    <Button type="submit" variant="gold" size="lg" className="w-full font-bold shadow-md mt-2">
                      {t("agents.confirmDispatch", "Confirm Advisory Dispatch")}
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
