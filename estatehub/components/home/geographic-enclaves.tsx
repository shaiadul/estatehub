"use client"

import * as React from "react"
import Link from "next/link"
import { IconMapPinFilled } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useI18n } from "@/lib/i18n"

export function GeographicEnclaves() {
  const { t } = useI18n()

  return (
    <SectionWrapper fullWidth className="bg-surface-container-low py-16 my-8 border-y border-outline-variant/30">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-10 gap-2">
          <div>
            <span className="text-xs text-secondary uppercase tracking-widest font-bold block mb-1">
              {t("enclaves.badge", "Prime Territories")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-on-surface">
              {t("enclaves.title", "Geographic Enclaves")}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-md">
            {t("enclaves.subtitle", "Targeted liquidity pools and trophy asset concentrations across prime metropolitan markets.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Link
            href="/properties?location=Bel%20Air%2C%20Los%20Angeles%2C%20CA"
            className="md:col-span-7 relative h-80 rounded-2xl overflow-hidden shadow-md group block border border-outline-variant/30"
          >
            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1200&auto=format&fit=crop')",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary-container/95 via-primary-container/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <Badge variant="accent" className="gap-1 mb-2 px-3 py-1">
                  <IconMapPinFilled size={12} />
                  <span>West Coast Flagship</span>
                </Badge>
                <h3 className="text-2xl font-bold text-surface">Beverly Hills &amp; Bel Air</h3>
                <p className="text-xs sm:text-sm text-surface-container-high mt-1">
                  Median Price $8.9M • 14.2% YoY Appreciation
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-secondary-fixed">920</span>
                <span className="text-[11px] text-surface-container-high block">
                  {t("enclaves.activeListings", "Active Listings")}
                </span>
              </div>
            </div>
          </Link>

          <Link
            href="/properties?location=Tribeca%2C%20New%20York%2C%20NY"
            className="md:col-span-5 relative h-80 rounded-2xl overflow-hidden shadow-md group block border border-outline-variant/30"
          >
            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop')",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary-container/95 via-primary-container/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <Badge variant="secondary" className="mb-2 px-3 py-1 font-semibold">
                  Trophy Towers
                </Badge>
                <h3 className="text-2xl font-bold text-surface">Manhattan &amp; Brooklyn</h3>
                <p className="text-xs sm:text-sm text-surface-container-high mt-1">
                  Tribeca, SoHo &amp; Billionaires&apos; Row
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-secondary-fixed">1,150</span>
                <span className="text-[11px] text-surface-container-high block">
                  {t("enclaves.activeListings", "Active Listings")}
                </span>
              </div>
            </div>
          </Link>

          <Link
            href="/properties?location=Miami%2C%20FL"
            className="md:col-span-5 relative h-72 rounded-2xl overflow-hidden shadow-md group block border border-outline-variant/30"
          >
            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop')",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary-container/95 via-primary-container/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <Badge variant="secondary" className="mb-2 px-3 py-1 font-semibold">
                  Deepwater Coastal
                </Badge>
                <h3 className="text-2xl font-bold text-surface">Miami Waterfront</h3>
                <p className="text-xs sm:text-sm text-surface-container-high mt-1">
                  Star Island, Fisher Island &amp; Coral Gables
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-secondary-fixed">680</span>
                <span className="text-[11px] text-surface-container-high block">
                  {t("enclaves.activeListings", "Active Listings")}
                </span>
              </div>
            </div>
          </Link>

          <Link
            href="/properties?location=Aspen%2C%20CO"
            className="md:col-span-7 relative h-72 rounded-2xl overflow-hidden shadow-md group block border border-outline-variant/30"
          >
            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop')",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary-container/95 via-primary-container/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <Badge variant="accent" className="gap-1 mb-2 px-3 py-1">
                  <IconMapPinFilled size={12} />
                  <span>Alpine Sanctuary</span>
                </Badge>
                <h3 className="text-2xl font-bold text-surface">Aspen &amp; Vail Valley</h3>
                <p className="text-xs sm:text-sm text-surface-container-high mt-1">
                  Ski-in/Ski-out Private Ranches &amp; Modern Chalets
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-secondary-fixed">240</span>
                <span className="text-[11px] text-surface-container-high block">
                  {t("enclaves.activeListings", "Active Listings")}
                </span>
              </div>
            </div>
          </Link>
        </div>
    </SectionWrapper>
  )
}
