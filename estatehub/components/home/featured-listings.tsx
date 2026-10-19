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
import { useCurrency, useI18n } from "@/lib/i18n"

import { getPropertiesAction, toggleBookmarkAction } from "@/actions/properties"

interface Property {
  id: string
  slug: string
  title: string
  location: string
  price: string
  priceNumeric: number
  image: string
  badge: string
  description: string
  beds: number
  baths: number | string
  sqft: string
  estMortgage: string
}

export function FeaturedListings() {
  const { formatPrice } = useCurrency()
  const { t } = useI18n()
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({})
  const [properties, setProperties] = React.useState<Property[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    let isMounted = true

    getPropertiesAction({ limit: 6, featured_only: true })
      .then((res) => {
        if (!isMounted) return
        if (res.success && res.data && res.data.length > 0) {
          const mapped = res.data.map((p) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            location: `${p.city}, ${p.state}`,
            price: p.price_formatted || `$${p.price.toLocaleString()}`,
            priceNumeric: p.price,
            image: p.hero_image,
            badge: p.badge || "Verified Exclusive",
            description: p.description || "",
            beds: p.beds,
            baths: p.baths,
            sqft: p.sqft_formatted || p.sqft.toLocaleString(),
            estMortgage: p.est_mortgage || `~$${Math.round(p.price * 0.0045).toLocaleString()} / mo`,
          }))
          setProperties(mapped)
          setIsLoading(false)
        } else {
          // If no specific featured properties found, load active portfolio properties
          getPropertiesAction({ limit: 6 })
            .then((allRes) => {
              if (!isMounted) return
              if (allRes.success && allRes.data && allRes.data.length > 0) {
                const mapped = allRes.data.map((p) => ({
                  id: p.id,
                  slug: p.slug,
                  title: p.title,
                  location: `${p.city}, ${p.state}`,
                  price: p.price_formatted || `$${p.price.toLocaleString()}`,
                  priceNumeric: p.price,
                  image: p.hero_image,
                  badge: p.badge || "Verified Exclusive",
                  description: p.description || "",
                  beds: p.beds,
                  baths: p.baths,
                  sqft: p.sqft_formatted || p.sqft.toLocaleString(),
                  estMortgage: p.est_mortgage || `~$${Math.round(p.price * 0.0045).toLocaleString()} / mo`,
                }))
                setProperties(mapped)
              }
              setIsLoading(false)
            })
            .catch(() => {
              if (isMounted) setIsLoading(false)
            })
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
    toggleBookmarkAction(id).catch(() => {})
  }

  return (
    <SectionWrapper id="properties" className="py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-secondary uppercase tracking-widest font-bold mb-2">
            <IconStars size={16} />
            <span>{t("home.curatedPortfolio", "Curated Private Portfolio")}</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-on-surface">
            {t("home.signatureCollections", "Signature Collections")}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mt-2">
            {t(
              "home.portfolioDescription",
              "Hand-inspected, legally verified properties ready for discreet direct acquisition or private viewings."
            )}
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
            <span>{t("home.viewAll", "View All 340+")}</span>
            <IconArrowUpRight size={18} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-96 rounded-2xl bg-surface-container/50 animate-pulse border border-outline-variant/30"
            />
          ))
        ) : properties.length === 0 ? (
          <div className="col-span-full py-12 text-center text-on-surface-variant bg-surface-container-low rounded-2xl border border-outline-variant/30">
            <p className="text-sm font-medium">No active listings currently available.</p>
          </div>
        ) : (
          properties.map((prop) => {
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
                      {formatPrice(prop.priceNumeric)}
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
                      {t("home.bedrooms", "Bedrooms")}
                    </span>
                  </div>
                  <div className="flex flex-col border-x border-outline-variant/30">
                    <span className="text-sm font-bold text-on-surface">{prop.baths}</span>
                    <span className="text-[11px] text-on-surface-variant font-medium">
                      {t("home.bathrooms", "Bathrooms")}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface">{prop.sqft}</span>
                    <span className="text-[11px] text-on-surface-variant font-medium">
                      {t("home.sqft", "Sq Ft")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-on-surface-variant font-medium">
                      {t("home.estMortgage", "Est. Mortgage")}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-on-surface">
                      ~{formatPrice(Math.round(prop.priceNumeric * 0.00439))} {t("home.perMonth", "/ mo")}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="luxury"
                    size="sm"
                    className="rounded-xl gap-1.5 shadow-sm group/btn"
                    render={<Link href={`/properties/${prop.slug}`} />}
                  >
                    <span>{t("home.exploreDetails", "Explore Property")}</span>
                    <IconArrowRight
                      size={15}
                      className="group-hover/btn:translate-x-0.5 transition-transform"
                    />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        }))}
      </div>
    </SectionWrapper>
  )
}
