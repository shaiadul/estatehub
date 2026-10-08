"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconHome,
  IconBuildingSkyscraper,
  IconBuildingMonument,
  IconPool,
  IconFence,
} from "@tabler/icons-react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useI18n } from "@/lib/i18n"

export function AssetClasses() {
  const { t } = useI18n()

  const assetClasses = [
    {
      title: t("assets.villas", "Luxury Villas"),
      count: `420 ${t("assets.activeCount", "Active Portfolios")}`,
      icon: IconHome,
      propertyType: "villa",
    },
    {
      title: t("assets.penthouses", "Sky Penthouses"),
      count: `185 ${t("assets.activeCount", "Active Portfolios")}`,
      icon: IconBuildingSkyscraper,
      propertyType: "penthouse",
    },
    {
      title: t("assets.manors", "Historic Manors"),
      count: `74 ${t("assets.activeCount", "Active Portfolios")}`,
      icon: IconBuildingMonument,
      propertyType: "chalet",
    },
    {
      title: t("assets.waterfront", "Modern Waterfront"),
      count: `310 ${t("assets.activeCount", "Active Portfolios")}`,
      icon: IconPool,
      propertyType: "waterfront",
    },
    {
      title: t("assets.compounds", "Private Compounds"),
      count: `92 ${t("assets.activeCount", "Active Portfolios")}`,
      icon: IconFence,
      propertyType: "compound",
    },
  ]

  return (
    <SectionWrapper className="py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs text-secondary uppercase tracking-widest font-bold block mb-1">
          {t("assets.badge", "Architectural Taxonomy")}
        </span>
        <h2 className="text-3xl lg:text-4xl font-bold text-on-surface">
          {t("assets.title", "Curated by Asset Class")}
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant mt-2">
          {t("assets.subtitle", "Filter high-performance private holdings according to structural typology and lifestyle utility.")}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {assetClasses.map((item, idx) => {
          const IconComp = item.icon
          const isSpan = idx === 4
          return (
            <Link
              key={item.title}
              href={`/properties?propertyType=${item.propertyType}`}
              className={`group p-6 rounded-2xl bg-surface-container-lowest hover:bg-surface-container text-center flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-all border border-outline-variant/30 ${
                isSpan ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary transition-all flex items-center justify-center text-on-surface shadow-inner">
                <IconComp size={28} />
              </div>
              <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                {item.title}
              </span>
              <span className="text-xs text-on-surface-variant">
                {item.count}
              </span>
            </Link>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
