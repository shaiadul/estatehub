"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  IconStarFilled,
  IconPhone,
  IconMail,
  IconArrowRight,
} from "@tabler/icons-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useI18n } from "@/lib/i18n"

export function BrokerSpotlight() {
  const { t } = useI18n()

  const brokers = [
    {
      name: "Marcus Sterling",
      title: "Senior Managing Partner • Beverly Hills",
      rating: "4.98 / 5.0",
      reviews: "112 Private Reviews",
      volume: "$340M+",
      avgClose: "24 Days",
      bio: "Specializing in off-market estates and celebrity residential portfolios throughout Bel Air, Trousdale, and Brentwood.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Elena Vance-Chen",
      title: "Principal Broker • Tribeca & SoHo",
      rating: "5.0 / 5.0",
      reviews: "94 Private Reviews",
      volume: "$410M+",
      avgClose: "18 Days",
      bio: "Leading Manhattan penthouses, historic full-floor lofts, and confidential high-net-worth real estate syndications.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Julian Rossi",
      title: "Waterfront Portfolio Director • Miami",
      rating: "4.97 / 5.0",
      reviews: "86 Private Reviews",
      volume: "$275M+",
      avgClose: "29 Days",
      bio: "Deepwater yacht access consultant, specialist in Star Island, Venetian Islands, and Palm Beach oceanfront properties.",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    },
  ]

  return (
    <SectionWrapper id="agents" className="py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs text-secondary uppercase tracking-widest font-bold block mb-1">
            {t("spotlight.badge", "Human Expertise")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-on-surface">
            {t("spotlight.title", "Certified Broker Spotlight")}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-lg mt-1">
            {t("spotlight.subtitle", "Each advisor ranks within the top percentile of global luxury transaction volume and holds active licensure.")}
          </p>
        </div>

        <Link
          href="/agents"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary hover:text-on-secondary-fixed transition-colors"
        >
          <span>{t("spotlight.browseAll", "Browse All 84 Advisors")}</span>
          <IconArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {brokers.map((broker) => (
          <Card
            key={broker.name}
            className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all border border-outline-variant/30 p-0"
          >
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={broker.image}
                    alt={broker.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover shadow-sm border-2 border-secondary/30"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-on-surface">{broker.name}</h3>
                    <p className="text-xs text-on-surface-variant font-medium">
                      {broker.title}
                    </p>
                    <div className="flex items-center gap-1 text-secondary text-xs mt-1">
                      <IconStarFilled size={14} />
                      <span className="font-bold">{broker.rating}</span>
                      <span className="text-on-surface-variant font-normal">
                        ({broker.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-surface-container-low mb-4 text-center border border-outline-variant/20">
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase font-semibold block">
                      {t("spotlight.careerVolume", "Career Volume")}
                    </span>
                    <span className="text-sm font-bold text-on-surface">{broker.volume}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase font-semibold block">
                      {t("spotlight.avgClose", "Avg. Close Days")}
                    </span>
                    <span className="text-sm font-bold text-on-surface">{broker.avgClose}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {broker.bio}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-5 mt-5 border-t border-outline-variant/20">
                <Button
                  type="button"
                  variant="luxury"
                  size="sm"
                  render={<Link href="/agents" />}
                  className="flex-1 rounded-xl gap-1.5 shadow-sm"
                >
                  <IconPhone size={15} />
                  <span>{t("spotlight.directCall", "Direct Call")}</span>
                </Button>
                <Button
                  type="button"
                  variant="subtle"
                  size="sm"
                  render={<Link href="/agents" />}
                  className="flex-1 rounded-xl gap-1.5"
                >
                  <IconMail size={15} />
                  <span>{t("spotlight.emailBroker", "Email Broker")}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  )
}
