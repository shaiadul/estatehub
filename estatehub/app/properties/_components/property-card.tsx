"use client"

import Link from "next/link"
import Image from "next/image"
import {
  IconBed,
  IconBath,
  IconRulerMeasure,
  IconHeart,
  IconHeartFilled,
  IconArrowRight,
  IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { PropertyData } from "@/lib/properties-data"

interface PropertyCardProps {
  property: PropertyData
  viewMode: "grid" | "list"
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}

export function PropertyCard({ property: prop, viewMode, isFavorite, onToggleFavorite }: PropertyCardProps) {
  return (
    <Card
      className={`bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/30 overflow-hidden group p-0 ${
        viewMode === "list" ? "flex flex-col sm:flex-row" : "flex flex-col"
      }`}
    >
      {/* Image Preview */}
      <Link
        href={`/properties/${prop.slug}`}
        className={`relative block overflow-hidden bg-surface-container ${
          viewMode === "list" ? "sm:w-72 aspect-16/10 sm:aspect-auto shrink-0" : "w-full aspect-16/10"
        }`}
      >
        <Image
          src={prop.heroImage}
          alt={prop.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary-container/85 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <Badge variant="verified" className="text-[11px] px-2.5 py-0.5 font-semibold gap-1">
            <IconRosetteDiscountCheckFilled size={12} className="text-secondary-fixed shrink-0" />
            <span>Title Verified</span>
          </Badge>
          <Badge variant="gold" className="text-[11px] px-2 py-0 font-bold">
            {prop.badge}
          </Badge>
        </div>

        {/* Favorite button */}
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Save Property"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onToggleFavorite(prop.id)
          }}
          className="absolute top-3 right-3 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm"
        >
          {isFavorite ? (
            <IconHeartFilled size={15} className="text-destructive" />
          ) : (
            <IconHeart size={15} />
          )}
        </Button>

        {/* Price Tag over image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <span className="text-[10px] text-surface-container-high uppercase tracking-wider block font-medium">
              {prop.city}, {prop.state}
            </span>
            <h3 className="text-base font-bold text-surface leading-tight mt-0.5">
              {prop.title}
            </h3>
          </div>
          <span className="text-lg font-bold text-secondary-fixed">
            {prop.priceFormatted}
          </span>
        </div>
      </Link>

      {/* Content */}
      <CardContent className="p-4 flex flex-col justify-between flex-1 gap-4">
        <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
          {prop.description}
        </p>

        {/* Specs Row */}
        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-surface-container-low text-center border border-outline-variant/20">
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-on-surface flex items-center gap-1">
              <IconBed size={14} className="text-secondary" />
              {prop.beds}
            </span>
            <span className="text-[10px] text-on-surface-variant">Beds</span>
          </div>
          <div className="flex flex-col items-center border-x border-outline-variant/30">
            <span className="text-xs font-bold text-on-surface flex items-center gap-1">
              <IconBath size={14} className="text-secondary" />
              {prop.baths}
            </span>
            <span className="text-[10px] text-on-surface-variant">Baths</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-on-surface flex items-center gap-1">
              <IconRulerMeasure size={14} className="text-secondary" />
              {prop.sqftFormatted}
            </span>
            <span className="text-[10px] text-on-surface-variant">Sq Ft</span>
          </div>
        </div>

        {/* Footer action */}
        <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
          <div>
            <span className="text-[10px] text-on-surface-variant block">Est. Mortgage</span>
            <span className="text-xs font-bold text-on-surface">{prop.estMortgage}</span>
          </div>
          <Button
            variant="luxury"
            size="sm"
            className="rounded-xl gap-1"
            render={<Link href={`/properties/${prop.slug}`} />}
          >
            <span>Explore Details</span>
            <IconArrowRight size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
