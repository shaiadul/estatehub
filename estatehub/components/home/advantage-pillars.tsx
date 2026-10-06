"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconBuildingBank,
  IconHeadset,
  IconChartBar,
  IconReceiptTax,
  IconChevronRight,
} from "@tabler/icons-react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useI18n } from "@/lib/i18n"

export function AdvantagePillars() {
  const { t } = useI18n()

  const pillars = [
    {
      title: t("pillars.escrowTitle", "Guaranteed Escrow & Title"),
      description: t(
        "pillars.escrowDesc",
        "Full chain-of-title verification through tier-1 institutional escrow partners before any public listing or off-market distribution."
      ),
      cta: t("pillars.escrowCta", "Learn Protocol"),
      icon: IconBuildingBank,
    },
    {
      title: t("pillars.conciergeTitle", "Elite Broker Concierge"),
      description: t(
        "pillars.conciergeDesc",
        "Dedicated private client managers matching off-market pocket listings with sovereign wealth and family office mandates."
      ),
      cta: t("pillars.conciergeCta", "Advisory Scope"),
      icon: IconHeadset,
    },
    {
      title: t("pillars.valuationTitle", "Algorithmic Valuation"),
      description: t(
        "pillars.valuationDesc",
        "Machine-learning comp engine paired with physical hyper-local broker appraisal to eliminate valuation discrepancies."
      ),
      cta: t("pillars.valuationCta", "Model Analytics"),
      icon: IconChartBar,
    },
    {
      title: t("pillars.markupTitle", "Zero Hidden Markups"),
      description: t(
        "pillars.markupDesc",
        "Direct advisory pricing structure with institutional fee transparency, transparent settlement schedules, and no syndicate fees."
      ),
      cta: t("pillars.markupCta", "Fee Transparency"),
      icon: IconReceiptTax,
    },
  ]

  return (
    <section className="w-full bg-primary-container text-surface py-20 relative overflow-hidden">
      <div className="absolute -top-40 right-10 w-96 h-96 rounded-full bg-secondary-fixed/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-96 h-96 rounded-full bg-surface-container-highest/10 blur-3xl pointer-events-none" />

      <SectionWrapper as="div" className="relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs text-secondary-fixed uppercase tracking-widest font-bold block mb-1">
              {t("pillars.badge", "Institutional Integrity")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-surface">
              {t("pillars.title", "The EstateHub Advantage")}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-surface-container-high max-w-md">
            {t("pillars.subtitle", "Private transactional infrastructure designed for discretion, legal precision, and rapid capital placement.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const IconComp = pillar.icon
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl bg-surface/5 backdrop-blur-md shadow-sm flex flex-col justify-between border border-primary-foreground/10 hover:border-secondary-fixed/30 transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed/20 flex items-center justify-center mb-5 text-secondary-fixed group-hover:scale-110 transition-transform">
                    <IconComp size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-surface mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-surface-container-high leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <Link
                  href="#contact"
                  className="pt-5 mt-5 flex items-center gap-1 text-secondary-fixed text-xs font-semibold hover:text-primary-foreground transition-colors"
                >
                  <span>{pillar.cta}</span>
                  <IconChevronRight size={16} />
                </Link>
              </div>
            )
          })}
        </div>
      </SectionWrapper>
    </section>
  )
}
