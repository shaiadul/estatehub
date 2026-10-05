"use client"

import { IconArmchair, IconBolt, IconLock, IconTree } from "@tabler/icons-react"
import { PropertyData } from "@/lib/properties-data"

interface AmenitiesMatrixProps {
  property: PropertyData
}

const ECO_AMENITIES = [
  "18.4 kW Hidden High-Yield Solar Array",
  "3x Tesla Powerwall 3 Battery Backup Units",
  "Dual Level-2 High-Power EV Charging Stations",
  "Low-E Acoustic Insulated Glass Glazing",
  "High-Efficiency Multi-Zone VRF HVAC Systems",
]

export function AmenitiesMatrix({ property }: AmenitiesMatrixProps) {
  const categories = [
    { Icon: IconArmchair, title: "Comfort & Interior Finishings", items: property.interiorAmenities },
    { Icon: IconTree, title: "Outdoor & Grounds", items: property.exteriorAmenities },
    { Icon: IconLock, title: "Security & Smart Technology", items: property.securityAmenities },
    { Icon: IconBolt, title: "Eco, Energy & Utilities", items: ECO_AMENITIES },
  ]
  return (
    <>
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-on-surface">Curated Amenities &amp; Specifications</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map(({ Icon, title, items }) => (
            <div key={title} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-on-surface font-bold text-sm">
                <Icon className="w-5 h-5 text-secondary" />
                <span>{title}</span>
              </div>
              <ul className="flex flex-col gap-2 text-xs text-on-surface-variant">
                {items.map((amenity, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
