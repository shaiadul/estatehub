"use client"

import Link from "next/link"
import Image from "next/image"
import {
  IconBookmark,
  IconMapPin,
  IconBed,
  IconBath,
  IconRulerMeasure,
  IconCalendarEvent,
  IconFileSpreadsheet,
  IconTrash,
  IconLock,
  IconArrowRight,
  IconTrendingDown,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CommandState } from "./use-command-state"
import { useI18n } from "@/lib/i18n"

interface SavedTabProps {
  state: CommandState
}

export function SavedTab({ state }: SavedTabProps) {
  const { t } = useI18n()
  const {
    savedProperties,
    handleRemoveSavedProperty,
    setIsSubmitLoiModalOpen,
    setLoiTargetProperty,
    setLoiOfferPrice,
    setIsBookTourModalOpen,
    setTourPropertyId,
  } = state

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                <IconBookmark size={16} />
              </span>
              <h2 className="text-lg font-black text-on-surface">
                {t("dash.savedEstates", "Saved Trophy Estates & Watchlist")}
              </h2>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">
              Curated private estates bookmarked for acquisition diligence, tour walkthroughs, and price movement tracking
            </p>
          </div>

          <Link href="/properties">
            <Button
              variant="outline"
              className="flex h-10 items-center gap-2 rounded-xl border-outline-variant/40 px-4 text-xs font-bold text-on-surface hover:bg-surface-container sm:self-auto"
            >
              <span>{t("dash.browseInventory", "Browse All Enclaves")}</span>
              <IconArrowRight size={14} />
            </Button>
          </Link>
        </div>

        {savedProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-outline-variant/40 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container text-on-surface-variant">
              <IconBookmark size={24} />
            </div>
            <h3 className="mt-4 text-sm font-bold text-on-surface">No Saved Estates In Watchlist</h3>
            <p className="mt-1 max-w-sm text-xs text-on-surface-variant">
              Browse the prime enclave inventory and bookmark trophy residences to monitor prices and submit bilateral LOIs.
            </p>
            <Link href="/properties" className="mt-4">
              <Button className="h-9 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground">
                Explore Properties
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {savedProperties.map((prop) => {
              const hasDiscount = prop.price < prop.originalPrice
              const discountAmount = prop.originalPrice - prop.price

              return (
                <div
                  key={prop.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-low transition-all duration-200 hover:border-secondary/50 hover:shadow-md"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-surface-container">
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <Badge variant="gold" className="text-[10px] font-bold">
                        {prop.category}
                      </Badge>
                      {hasDiscount && (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-black text-white shadow-xs">
                          <IconTrendingDown size={12} />
                          <span>-${(discountAmount / 1000).toFixed(0)}k Repriced</span>
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveSavedProperty(prop.id)}
                      className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-md transition-colors hover:bg-destructive hover:text-white"
                      title="Remove from saved"
                    >
                      <IconTrash size={14} />
                    </button>

                    <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between text-white">
                      <div>
                        <div className="font-mono text-xs text-white/70 line-through">
                          {hasDiscount && `$${(prop.originalPrice / 1000000).toFixed(2)}M`}
                        </div>
                        <div className="font-mono text-lg font-black tracking-tight text-white">
                          ${(prop.price / 1000000).toFixed(2)}M
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-white/70">Ref: {prop.propertyId}</span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <h3 className="line-clamp-1 text-sm font-bold text-on-surface">
                        {prop.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-1 text-xs text-on-surface-variant">
                        <IconMapPin size={13} className="shrink-0 text-secondary" />
                        <span className="truncate">{prop.location}</span>
                      </p>

                      <div className="mt-3 grid grid-cols-3 gap-2 border-y border-outline-variant/20 py-2.5 text-center text-xs">
                        <div className="flex flex-col items-center">
                          <span className="flex items-center gap-1 font-bold text-on-surface">
                            <IconBed size={13} className="text-on-surface-variant" />
                            {prop.beds}
                          </span>
                          <span className="text-[10px] text-on-surface-variant">Beds</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="flex items-center gap-1 font-bold text-on-surface">
                            <IconBath size={13} className="text-on-surface-variant" />
                            {prop.baths}
                          </span>
                          <span className="text-[10px] text-on-surface-variant">Baths</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="flex items-center gap-1 font-bold text-on-surface">
                            <IconRulerMeasure size={13} className="text-on-surface-variant" />
                            {(prop.sqft).toLocaleString()}
                          </span>
                          <span className="text-[10px] text-on-surface-variant">Sq Ft</span>
                        </div>
                      </div>

                      {prop.notes && (
                        <div className="mt-3 rounded-xl border border-secondary/20 bg-secondary/5 p-2.5 text-[11px] text-on-surface-variant">
                          <span className="font-bold text-on-secondary-container">Acquisition Note: </span>
                          <span>{prop.notes}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex flex-col gap-2 border-t border-outline-variant/20 pt-3">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setLoiTargetProperty(prop.propertyId)
                            setLoiOfferPrice(String(prop.price))
                            setIsSubmitLoiModalOpen(true)
                          }}
                          className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/90"
                        >
                          <IconFileSpreadsheet size={14} />
                          <span>Submit LOI</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setTourPropertyId(prop.propertyId)
                            setIsBookTourModalOpen(true)
                          }}
                          className="flex h-9 items-center justify-center gap-1.5 rounded-xl border-outline-variant/40 text-xs font-bold hover:bg-surface-container"
                        >
                          <IconCalendarEvent size={14} />
                          <span>Book Tour</span>
                        </Button>
                      </div>

                      <Link href="/vdr" className="w-full">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex h-8 w-full items-center justify-center gap-1.5 rounded-xl text-[11px] font-semibold text-on-secondary-container hover:bg-secondary/10"
                        >
                          <IconLock size={12} />
                          <span>Access Diligence Room (VDR)</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
