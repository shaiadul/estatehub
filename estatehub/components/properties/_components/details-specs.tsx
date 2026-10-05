"use client"

import { IconBath, IconBed, IconCalendarEvent, IconCar, IconDeviceTv, IconGlassChampagne, IconPool, IconRuler, IconSun, IconTree } from "@tabler/icons-react"
import { PropertyData } from "@/lib/properties-data"

interface DetailsSpecsProps {
  property: PropertyData
}

const HIGHLIGHTS = [
  { Icon: IconSun, text: "180-degree unobstructed horizon panoramas and dramatic sunsets", wide: false },
  { Icon: IconPool, text: "60ft heated cantilevered negative-edge infinity pool & spa", wide: false },
  { Icon: IconGlassChampagne, text: "Temperature-controlled 600-bottle glass display wine gallery", wide: false },
  { Icon: IconDeviceTv, text: "Dolby Atmos 12-seat acoustic private screening cinema", wide: false },
  { Icon: IconCar, text: "Secured private motor court with accommodation for up to 8 collector vehicles", wide: true },
]

export function DetailsSpecs({ property }: DetailsSpecsProps) {
  const specs = [
    { Icon: IconBed, value: property.beds, label: "Bedrooms" },
    { Icon: IconBath, value: property.baths, label: "Bathrooms" },
    { Icon: IconRuler, value: property.sqftFormatted, label: "Interior Sq Ft" },
    { Icon: IconTree, value: property.lotSize, label: "Lot Size" },
    { Icon: IconCalendarEvent, value: property.yearBuilt, label: "Year Built" },
    { Icon: IconCar, value: property.garage, label: "Garage Spaces" },
  ]
  return (
    <>
      <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
        {specs.map(({ Icon, value, label }) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary mb-1">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-on-surface">{value}</span>
            <span className="text-xs text-on-surface-variant">{label}</span>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-on-surface">Architectural Narrative</h2>
          <span className="px-3 py-1 rounded-full bg-surface-container text-xs font-semibold text-secondary">
            Custom Masterwork
          </span>
        </div>

        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
          {property.description}
        </p>

        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
          Every facet reflects curatorial intent: book-matched marble hearths, custom Davide Groppi architectural lighting fixtures, and full Lutron HomeWorks intelligent automation orchestrating solar shading, security vaults, multizone climate, and acoustic soundscapes.
        </p>

        <div className="pt-2 flex flex-col gap-3">
          <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Estate Highlights
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {HIGHLIGHTS.map(({ Icon, text, wide }) => (
              <div
                key={text}
                className={`flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low${wide ? " md:col-span-2" : ""}`}
              >
                <Icon className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-xs text-on-surface font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
