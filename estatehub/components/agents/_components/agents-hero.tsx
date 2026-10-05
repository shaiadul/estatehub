"use client"

import Link from "next/link"
import { Fragment } from "react"
import { IconChevronRight, IconSearch } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SectionWrapper } from "@/components/ui/section-wrapper"

interface AgentsHeroProps {
  selectedRegion: string
  onRegionChange: (region: string) => void
  searchQuery: string
  onSearchChange: (value: string) => void
  totalCount: number
}

export function AgentsHero({
  selectedRegion,
  onRegionChange,
  searchQuery,
  onSearchChange,
  totalCount,
}: AgentsHeroProps) {
  const regionFilters = [
    { key: "all", label: `All Jurisdictions (${totalCount})` },
    { key: "ca", label: "California (Bel Air & Beverly Hills)" },
    { key: "ny", label: "New York (Tribeca & Central Park)" },
    { key: "fl", label: "Florida (Miami & Palm Beach)" },
  ]

  const heroStats = [
    { key: "volume", label: "Syndicated Volume", value: "$1.2B+", valueClassName: "text-xl sm:text-2xl font-black text-on-surface mt-0.5" },
    { key: "discretion", label: "Discretion Score", value: "99.8%", valueClassName: "text-xl sm:text-2xl font-black text-secondary mt-0.5" },
    { key: "desks", label: "Global Desks", value: "42", valueClassName: "text-xl sm:text-2xl font-black text-on-surface mt-0.5" },
  ]

  return (
    <>
      <SectionWrapper fullWidth className="bg-surface-container-lowest border-b border-outline-variant/30 shadow-xs" innerClassName="py-8">
        <div>
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

            <div className="flex items-center gap-6 bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 shrink-0">
              {heroStats.map(({ key, label, value, valueClassName }, i) => (
                <Fragment key={key}>
                  {i > 0 && <div className="h-10 w-px bg-outline-variant/30" />}
                  <div className="flex flex-col">
                    <span className="text-xs text-on-surface-variant font-semibold">{label}</span>
                    <span className={valueClassName}>{value}</span>
                  </div>
                </Fragment>
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
              onClick={() => onRegionChange(key)}
              className="rounded-full text-xs font-semibold whitespace-nowrap"
            >
              {label}
            </Button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <IconSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <Input
            placeholder="Search advisor or specialty..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-10 text-xs rounded-xl"
          />
        </div>
      </SectionWrapper>
    </>
  )
}
