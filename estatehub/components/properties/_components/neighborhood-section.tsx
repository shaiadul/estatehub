"use client"

import { PropertyData } from "@/lib/properties-data"
import { SinglePropertyMap } from "@/components/map/single-property-map"

interface NeighborhoodSectionProps {
  property: PropertyData
}

const STAT_CARDS = [
  {
    key: "walk",
    value: "72",
    valueClass: "text-3xl font-extrabold text-on-surface",
    title: "Walk Score • Very Walkable",
    desc: "Private canyon trails and serene tree-canopied roads",
  },
  {
    key: "school",
    value: "10/10",
    valueClass: "text-3xl font-extrabold text-secondary",
    title: "Harvard-Westlake School",
    desc: "Top-ranked independent college prep secondary school (2.4 mi)",
  },
  {
    key: "club",
    value: (
      <>
        0.4 <span className="text-xs font-normal">mi</span>
      </>
    ),
    valueClass: "text-3xl font-extrabold text-on-surface",
    title: "Bel Air Country Club",
    desc: "Private championship golf & equestrian facilities",
  },
]

export function NeighborhoodSection({ property }: NeighborhoodSectionProps) {
  return (
    <>
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-on-surface">Neighborhood, Vicinity &amp; Schools</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STAT_CARDS.map(({ key, value, valueClass, title, desc }) => (
            <div
              key={key}
              className="p-4 rounded-xl bg-surface-container-low flex flex-col items-center text-center gap-1"
            >
              <span className={valueClass}>{value}</span>
              <span className="text-xs font-bold text-on-surface">{title}</span>
              <span className="text-[11px] text-on-surface-variant">{desc}</span>
            </div>
          ))}
        </div>

        <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30">
          <SinglePropertyMap
            coordinates={property.coordinates}
            title={property.title}
            address={property.address}
            city={property.city}
            priceFormatted={property.priceFormatted}
          />
        </div>
      </div>
    </>
  )
}
