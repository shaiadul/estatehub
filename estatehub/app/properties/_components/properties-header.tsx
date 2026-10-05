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

interface PropertiesHeaderProps {
  filteredCount: number
  priceSort: string
  onPriceSortChange: (value: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  showMap: boolean
  onToggleMap: () => void
}

const VIEW_MODES = [
  { id: "grid", label: "Grid View", Icon: IconLayoutGrid },
  { id: "list", label: "List View", Icon: IconList },
] as const

export function PropertiesHeader({
  filteredCount,
  priceSort,
  onPriceSortChange,
  viewMode,
  onViewModeChange,
  showMap,
  onToggleMap,
}: PropertiesHeaderProps) {
  return (
    <>
      
      <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-3">
        <Link href="/" className="hover:text-on-surface transition-colors flex items-center gap-1">
          <IconHome size={14} />
          <span>Home</span>
        </Link>
        <span className="text-outline-variant">/</span>
        <span className="text-on-surface font-semibold">Properties</span>
        <span className="text-outline-variant">/</span>
        <span>California</span>
        <span className="text-outline-variant">/</span>
        <span className="text-secondary font-bold">Los Angeles</span>
      </nav>

      
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
            Luxury Homes &amp; Estates for Sale in Los Angeles, CA
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm text-on-surface-variant">
              Showing <strong className="text-on-surface">{filteredCount}</strong> of 1,240 Private Portfolios
            </span>
            <Badge variant="secondary" className="text-xs px-2.5 py-0.5">
              MLS Direct Feed
            </Badge>
          </div>
        </div>

        
        <div className="flex flex-wrap items-center gap-3">
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-on-surface-variant font-medium hidden sm:inline">Sort:</span>
            <Select value={priceSort} onValueChange={(val) => { if (typeof val === "string") onPriceSortChange(val) }}>
              <SelectTrigger variant="subtle" size="md" className="w-[170px] sm:w-[185px] gap-2">
                <SelectValue placeholder="Sort price" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="high-to-low">Price: High to Low</SelectItem>
                <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                <SelectItem value="sqft">Largest Footprint</SelectItem>
              </SelectContent>
            </Select>
          </div>

          
          <div className="flex items-center bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
            {VIEW_MODES.map((mode) => (
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
            <span className="hidden sm:inline">Split Map</span>
            <span className={`w-2 h-2 rounded-full ${showMap ? "bg-secondary-fixed" : "bg-muted-foreground"}`} />
          </Button>
        </div>
      </div>
    </>
  )
}