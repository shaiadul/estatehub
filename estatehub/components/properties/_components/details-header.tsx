"use client"

import Link from "next/link"
import { IconArrowsExchange, IconCalculator, IconChevronRight, IconFileText, IconHeart, IconHeartFilled, IconMapPin, IconShare, IconShieldCheck } from "@tabler/icons-react"
import { PropertyData } from "@/lib/properties-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface DetailsHeaderProps {
  property: PropertyData
  isSaved: boolean
  onToggleSaved: () => void
  onShare: () => void
}

export function DetailsHeader({ property, isSaved, onToggleSaved, onShare }: DetailsHeaderProps) {
  const secondaryActions = [
    { key: "share", Icon: IconShare, label: "Share", onClick: onShare },
    {
      key: "brochure",
      Icon: IconFileText,
      label: "Brochure",
      onClick: () => alert("Downloading encrypted property prospectus brochure (PDF)..."),
    },
    {
      key: "compare",
      Icon: IconArrowsExchange,
      label: "Compare",
      onClick: () => alert("Property added to confidential comparison tray."),
    },
  ]
  return (
    <>
      <div className="w-full bg-surface-container-lowest border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-on-surface-variant">
            <Link href="/properties" className="hover:text-on-surface transition-colors font-medium">
              Properties
            </Link>
            <IconChevronRight className="w-3.5 h-3.5 text-outline-variant" />
            <span className="hover:text-on-surface transition-colors">{property.state === "CA" ? "California" : property.state === "NY" ? "New York" : property.state === "FL" ? "Florida" : "Colorado"}</span>
            <IconChevronRight className="w-3.5 h-3.5 text-outline-variant" />
            <span className="hover:text-on-surface transition-colors">{property.city.split(",")[0]}</span>
            <IconChevronRight className="w-3.5 h-3.5 text-outline-variant" />
            <span className="text-on-surface font-semibold truncate max-w-[180px] sm:max-w-none">
              {property.title}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-mono font-medium bg-surface-container-low border-outline-variant/40">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary mr-1.5 animate-pulse inline-block" />
              MLS: {property.mlsId}
            </Badge>
            <Badge variant="gold" className="text-xs font-semibold">
              <IconShieldCheck className="w-3.5 h-3.5 mr-1" />
              {property.badge || "Verified Exclusive"}
            </Badge>
          </div>
        </div>
      </div>

      <section className="w-full bg-surface border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-primary-container text-primary-foreground">
                  {property.status}
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-surface-container-high text-on-surface-variant">
                  Ultra Luxury Class
                </span>
                <span className="text-xs text-on-surface-variant">
                  Listed {property.daysListed} days ago • {property.viewsCount.toLocaleString()} views
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight">
                {property.title}
              </h1>

              <div className="flex items-center gap-1.5 text-on-surface-variant text-sm">
                <IconMapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>
                  {property.address}, {property.city}, {property.state} {property.zip}
                </span>
              </div>
            </div>

            <div className="flex flex-col lg:items-end gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight">
                  {property.priceFormatted}
                </span>
                <span className="text-sm font-semibold text-on-surface-variant uppercase">USD</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                <IconCalculator className="w-4 h-4 text-secondary" />
                <span>
                  Est. Mortgage: <strong className="text-on-surface font-bold">{property.estMortgage}</strong> with 20% down
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <Button
                  variant={isSaved ? "gold" : "outline"}
                  size="sm"
                  className="gap-1.5 h-9"
                  onClick={onToggleSaved}
                >
                  {isSaved ? (
                    <IconHeartFilled className="w-4 h-4 text-destructive" />
                  ) : (
                    <IconHeart className="w-4 h-4" />
                  )}
                  <span>{isSaved ? "Saved" : "Save"}</span>
                </Button>

                {secondaryActions.map(({ key, Icon, label, onClick }) => (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    className="gap-1.5 h-9"
                    onClick={onClick}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
