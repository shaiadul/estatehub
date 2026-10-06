"use client"

import Link from "next/link"
import { IconHome, IconMap, IconLayoutGrid, IconList } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useI18n } from "@/lib/i18n"

interface PropertiesHeaderProps {
  filteredCount: number
  priceSort: string
  onPriceSortChange: (value: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  showMap: boolean
  onToggleMap: () => void
}

export function PropertiesHeader({
  filteredCount,
  priceSort,
  onPriceSortChange,
  viewMode,
  onViewModeChange,
  showMap,
  onToggleMap,
}: PropertiesHeaderProps) {
  const { t } = useI18n()

  const viewModes = [
    { id: "grid", label: t("properties.gridView", "Grid View"), Icon: IconLayoutGrid },
    { id: "list", label: t("properties.listView", "List View"), Icon: IconList },
  ] as const

  return (
    <>
      
      <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-3">
        <Link href="/" className="hover:text-on-surface transition-colors flex items-center gap-1">
          <IconHome size={14} />
          <span>{t("properties.home", "Home")}</span>
        </Link>
        <span className="text-outline-variant">/</span>
        <span className="text-on-surface font-semibold">{t("nav.properties", "Properties")}</span>
        <span className="text-outline-variant">/</span>
        <span>California</span>
        <span className="text-outline-variant">/</span>
        <span className="text-secondary font-bold">Los Angeles</span>
      </nav>

      
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
            {t("properties.title", "Luxury Homes & Estates for Sale in Los Angeles, CA")}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm text-on-surface-variant">
              {t("properties.showing", "Showing")} <strong className="text-on-surface">{filteredCount}</strong> {t("properties.of", "of")} 1,240 {t("properties.privatePortfolios", "Private Portfolios")}
            </span>
            <Badge variant="secondary" className="text-xs px-2.5 py-0.5">
              {t("properties.mlsDirectFeed", "MLS Direct Feed")}
            </Badge>
          </div>
        </div>

        
        <div className="flex flex-wrap items-center gap-3">
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-on-surface-variant font-medium hidden sm:inline">{t("properties.sortLabel", "Sort:")}</span>
            <Select value={priceSort} onValueChange={(val) => { if (typeof val === "string") onPriceSortChange(val) }}>
              <SelectTrigger variant="subtle" size="md" className="w-[170px] sm:w-[185px] gap-2">
                <SelectValue placeholder={t("properties.sortPricePlaceholder", "Sort price")} />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="high-to-low">{t("properties.sortHighToLow", "Price: High to Low")}</SelectItem>
                <SelectItem value="low-to-high">{t("properties.sortLowToHigh", "Price: Low to High")}</SelectItem>
                <SelectItem value="sqft">{t("properties.sortSqft", "Largest Footprint")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          
          <div className="flex items-center bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
            {viewModes.map((mode) => (
              <Button
                key={mode.id}
                type="button"
                variant={viewMode === mode.id ? "default" : "ghost"}
                size="icon-xs"
                onClick={() => onViewModeChange(mode.id)}
                aria-label={mode.label}
                className="rounded-lg"
              >
                <mode.Icon size={16} />
              </Button>
            ))}
          </div>

          
          <Button
            type="button"
            variant={showMap ? "luxury" : "outline"}
            size="md"
            onClick={onToggleMap}
            className="gap-2 rounded-xl"
          >
            <IconMap size={17} />
            <span className="hidden sm:inline">{t("properties.splitMap", "Split Map")}</span>
            <span className={`w-2 h-2 rounded-full ${showMap ? "bg-secondary-fixed" : "bg-muted-foreground"}`} />
          </Button>
        </div>
      </div>
    </>
  )
}