"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  IconStars,
  IconRosetteDiscountCheckFilled,
  IconHeart,
  IconHeartFilled,
  IconArrowRight,
  IconArrowUpRight,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SectionWrapper } from "@/components/ui/section-wrapper"

interface Property {
  id: string
  slug: string
  title: string
  location: string
  price: string
  image: string
  badge: string
  description: string
  beds: number
  baths: number | string
  sqft: string
  estMortgage: string
}

export function FeaturedListings() {
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({
    "1": true,
  })

  const properties: Property[] = [
    {
      id: "1",
      slug: "the-glass-horizon-villa",
      title: "The Glass Horizon Villa",
      location: "Bel Air, Los Angeles, CA 90077",
      price: "$8,750,000",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      badge: "Verified Exclusive",
      description:
        "South-facing horizon panoramas with 60ft heated infinity pool edge, cantilevered glass walls, Gaggenau kitchen, and subterranean acoustic cinema.",
      beds: 5,
      baths: 6,
      sqft: "8,400",
      estMortgage: "~$38,420 / mo",
    },
    {
      id: "2",
      slug: "one-greenwich-penthouse",
      title: "One Greenwich Penthouse",
      location: "Tribeca, New York, NY",
      price: "$14,200,000",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      badge: "Rare Trophy",
      description:
        "Commanding full 62nd-floor elevation with 360-degree skyline and Hudson River panoramas, 1,200 sq ft private wrap terrace, private keyed elevator, and concierge vault.",
      beds: 4,
      baths: 5,
      sqft: "5,800",
      estMortgage: "~$69,800 / mo",
    },
    {
      id: "3",
      slug: "the-biscayne-point-villa",
      title: "The Biscayne Point Villa",
      location: "Biscayne Bay, Miami, FL",
      price: "$7,800,000",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      badge: "Yacht Ready",
      description:
        "100 ft of protected deepwater frontage with mega-yacht mooring station. Seamless indoor-outdoor living with motorized glass pocket doors and rooftop lounge deck.",
      beds: 6,
      baths: 7.5,
      sqft: "8,200",
      estMortgage: "~$38,400 / mo",
    },
  ]

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <SectionWrapper id="properties" className="py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-secondary uppercase tracking-widest font-bold mb-2">
            <IconStars size={16} />
            <span>Curated Private Portfolio</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-on-surface">
            Signature Collections
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mt-2">
            Hand-inspected, legally verified properties ready for discreet direct acquisition
            or private viewings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="luxury"
            size="lg"
            className="rounded-xl shadow-sm gap-1.5"
            render={<Link href="/properties" />}
          >
            <span>View All 340+</span>
            <IconArrowUpRight size={18} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {properties.map((prop) => {
          const isFav = !!favorites[prop.id]
          return (
            <Card
              key={prop.id}
              className="bg-surface-container-lowest rounded-2xl shadow-md overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-outline-variant/30 p-0 gap-0"
            >
              <Link href={`/properties/${prop.slug}`} className="relative block w-full aspect-16/10 overflow-hidden bg-surface-container">
                <Image
                  src={prop.image}
                  alt={prop.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary-container/90 via-primary-container/30 to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <Badge variant="verified" className="text-xs font-semibold gap-1 px-3 py-1">
                    <IconRosetteDiscountCheckFilled
                      size={14}
                      className="text-secondary-fixed shrink-0"
                    />
                    Title Verified
                  </Badge>
                  <Badge variant="gold" className="text-xs px-2.5 py-0.5 shadow-sm">
                    {prop.badge}
                  </Badge>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Save Property"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleFavorite(prop.id)
                  }}
                  className="absolute top-4 right-4 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface hover:scale-110 shadow-md"
                >
                  {isFav ? (
                    <IconHeartFilled size={18} className="text-destructive" />
                  ) : (
                    <IconHeart size={18} />
                  )}
                </Button>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] text-surface-container-high uppercase tracking-wider block font-medium">
                      {prop.location}
                    </span>
                    <h3 className="text-lg font-bold text-surface leading-tight mt-0.5">
                      {prop.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-secondary-fixed leading-tight">
                      {prop.price}
                    </span>
                  </div>
                </div>
              </Link>

              <CardContent className="p-5 flex flex-col flex-1 justify-between gap-5">
                <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                  {prop.description}
                </p>

                <div className="grid grid-cols-3 gap-2 py-2.5 px-4 rounded-xl bg-surface-container-low text-center border border-outline-variant/20">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface">{prop.beds}</span>
                    <span className="text-[11px] text-on-surface-variant font-medium">
                      Bedrooms
                    </span>
                  </div>
                  <div className="flex flex-col border-x border-outline-variant/30">
                    <span className="text-sm font-bold text-on-surface">{prop.baths}</span>
                    <span className="text-[11px] text-on-surface-variant font-medium">
                      Bathrooms
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface">{prop.sqft}</span>
                    <span className="text-[11px] text-on-surface-variant font-medium">
                      Sq Ft
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-on-surface-variant font-medium">
                      Est. Mortgage
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-on-surface">
                      {prop.estMortgage}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="luxury"
                    size="sm"
                    className="rounded-xl gap-1.5 shadow-sm group/btn"
                    render={<Link href={`/properties/${prop.slug}`} />}
                  >
                    <span>Explore Property</span>
                    <IconArrowRight
                      size={15}
                      className="group-hover/btn:translate-x-0.5 transition-transform"
                    />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
