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
  IconArrowRight,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { NoDataState } from "@/components/ui/no-data-state"
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
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardHeader className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                <IconBookmark size={16} />
              </span>
              <CardTitle className="text-base font-bold text-on-surface">
                {t("dash.savedEstates", "Saved Trophy Estates & Watchlist")}
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-on-surface-variant">
              Curated private estates bookmarked for acquisition diligence, tour walkthroughs, and price movement tracking
            </CardDescription>
          </div>

          <Link href="/properties">
            <Button
              variant="outline"
              size="sm"
              className="flex h-9 items-center gap-2 rounded-xl border-outline-variant/40 px-3.5 text-xs font-semibold hover:bg-surface-container"
            >
              <span>{t("dash.browseInventory", "Browse All Enclaves")}</span>
              <IconArrowRight size={14} />
            </Button>
          </Link>
        </CardHeader>

        <CardContent>
          {savedProperties.length === 0 ? (
            <NoDataState
              variant="empty"
              title="No Saved Estates in Watchlist"
              description="Browse the prime enclave inventory and bookmark trophy residences to monitor prices and submit bilateral LOIs."
              action={{
                label: "Explore Estates Radar",
                href: "/properties",
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savedProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-low/50 p-4 transition-all duration-200 hover:border-secondary/40 hover:shadow-md"
                >
                  <div>
                    <div className="relative mb-3.5 aspect-video w-full overflow-hidden rounded-xl bg-surface-container">
                      <Image
                        src={prop.image}
                        alt={prop.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="gold" className="text-[10px] shadow-xs">
                          {prop.category}
                        </Badge>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSavedProperty(prop.id)}
                        className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-surface-container-lowest/80 text-on-surface-variant backdrop-blur-sm transition-colors hover:bg-destructive hover:text-white"
                        title="Remove from watchlist"
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>

                    <h4 className="line-clamp-1 text-sm font-bold text-on-surface">
                      {prop.title}
                    </h4>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-on-surface-variant">
                      <IconMapPin size={12} className="text-secondary" />
                      <span>{prop.location}</span>
                    </p>

                    <div className="mt-2.5 flex items-center gap-3 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1 font-medium">
                        <IconBed size={13} /> {prop.beds} Beds
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-medium">
                        <IconBath size={13} /> {prop.baths} Baths
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-medium">
                        <IconRulerMeasure size={13} /> {prop.sqft.toLocaleString()} SqFt
                      </span>
                    </div>

                    <p className="mt-3 font-mono text-lg font-black text-on-surface">
                      ${(prop.price / 1000000).toFixed(2)}M
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 border-t border-outline-variant/20 pt-3">
                    <Button
                      size="sm"
                      onClick={() => {
                        setLoiTargetProperty(prop.propertyId)
                        setLoiOfferPrice(String(prop.price))
                        setIsSubmitLoiModalOpen(true)
                      }}
                      className="h-8.5 flex-1 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90"
                    >
                      <IconFileSpreadsheet size={13} />
                      <span>Submit LOI</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setTourPropertyId(prop.propertyId)
                        setIsBookTourModalOpen(true)
                      }}
                      className="h-8.5 rounded-xl border-outline-variant/40 px-3 text-xs font-semibold"
                    >
                      <IconCalendarEvent size={13} />
                      <span>Tour</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
