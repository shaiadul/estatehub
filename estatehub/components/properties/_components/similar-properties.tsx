"use client"

import Link from "next/link"
import Image from "next/image"
import { Fragment } from "react"
import { IconArrowRight } from "@tabler/icons-react"
import { PropertyData } from "@/lib/properties-data"

interface SimilarPropertiesProps {
  similarProperties: PropertyData[]
}

export function SimilarProperties({ similarProperties }: SimilarPropertiesProps) {
  return (
    <>
      <div className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-on-surface">Similar Exclusive Estates</h2>
          <Link
            href="/properties"
            className="text-xs font-bold text-secondary hover:underline flex items-center gap-1"
          >
            <span>View Full Portfolio</span>
            <IconArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {similarProperties.map((simProp) => {
            const stats = [`${simProp.beds} Beds`, `${simProp.baths} Baths`, `${simProp.sqftFormatted} Sq Ft`]
            return (
              <Link
                key={simProp.id}
                href={`/properties/${simProp.slug}`}
                className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-outline-variant/20 block"
              >
                <div className="relative h-52 overflow-hidden bg-surface-container">
                  <Image
                    src={simProp.heroImage}
                    alt={simProp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-primary-container/80 backdrop-blur text-primary-foreground text-xs font-bold">
                    {simProp.priceFormatted}
                  </span>
                </div>

                <div className="p-4 flex flex-col gap-1.5">
                  <h3 className="text-sm font-bold text-on-surface truncate group-hover:text-secondary transition-colors">
                    {simProp.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant truncate">
                    {simProp.address}, {simProp.city}
                  </p>
                  <div className="flex items-center gap-3 text-on-surface-variant text-[11px] pt-2 border-t border-outline-variant/20 mt-1">
                    {stats.map((stat, idx) => (
                      <Fragment key={stat}>
                        {idx > 0 && <span>•</span>}
                        <span>{stat}</span>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
