"use client"

import Link from "next/link"
import Image from "next/image"
import {
  IconTrendingUp,
  IconChevronRight,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CommandState } from "./use-command-state"
import { useI18n } from "@/lib/i18n"

interface OverviewTabProps {
  state: CommandState
}

const OVERVIEW_COLUMNS = [
  { label: "Estate", alignRight: false },
  { label: "Category", alignRight: false },
  { label: "Asking Valuation", alignRight: false },
  { label: "Status", alignRight: false },
  { label: "Inquiries", alignRight: false },
  { label: "Quick Action", alignRight: true },
]

export function OverviewTab({ state }: OverviewTabProps) {
  const { t } = useI18n()
  const {
    STATS_DATA,
    URGENT_ITEMS,
    properties,
    setActiveNav,
    handleTogglePropertyStatus,
  } = state

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS_DATA.map((st, idx) => {
          const Icon = st.icon
          return (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs"
            >
              <div className="mb-2 flex items-center justify-between text-on-surface-variant">
                <span className="text-xs font-medium">{st.label}</span>
                <div className={`rounded-xl p-2 ${st.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <div className="text-2xl font-black tracking-tight text-on-surface">
                {st.value}
              </div>
              <div
                className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${
                  st.trendPositive
                    ? "text-on-tertiary-container"
                    : "text-on-surface-variant"
                }`}
              >
                {st.trendPositive && <IconTrendingUp size={14} />}
                <span>{st.trend}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-on-surface">
              Urgent Operational Items
            </h2>
            <p className="text-xs text-on-surface-variant">
              Critical milestones requiring managerial authorization
            </p>
          </div>
          <Badge variant="gold" className="px-2.5 py-1 text-xs">
            Action Required
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {URGENT_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4"
            >
              <div className="flex items-start justify-between">
                <span
                  className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${item.tagColor}`}
                >
                  {item.tag}
                </span>
                <span className="text-xs text-on-surface-variant">
                  {item.meta}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">
                  {item.title}
                </p>
                <p className="text-[11px] text-on-surface-variant">
                  {item.sub}
                </p>
              </div>
              {item.href ? (
                <Link
                  href={item.href}
                  className={`flex h-9 w-full items-center justify-center rounded-xl text-xs font-bold transition-colors ${item.btnClass}`}
                >
                  {item.action}
                </Link>
              ) : (
                <Button
                  onClick={item.onClick}
                  className={`h-9 w-full rounded-xl text-xs font-bold ${item.btnClass}`}
                >
                  {item.action}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Role-Specific Lower Dashboard Section */}
      {state.activeRole === "buyer" ? (
        <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-base font-bold text-on-surface">
                Target Trophy Residences Watchlist
              </h2>
              <p className="text-xs text-on-surface-variant">
                Actively monitored estates with verified pro-forma metrics and instant LOI transmission
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setActiveNav("saved")}
              className="h-9 rounded-xl border-outline-variant/40 px-3 text-xs font-bold"
            >
              <span>View All Saved ({state.savedProperties.length})</span>
              <IconChevronRight size={15} />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {state.savedProperties.map((prop) => (
              <div
                key={prop.id}
                className="flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4"
              >
                <div>
                  <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-xl bg-surface-container">
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="gold" className="text-[10px]">
                        {prop.category}
                      </Badge>
                    </div>
                  </div>
                  <h4 className="line-clamp-1 text-sm font-bold text-on-surface">
                    {prop.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant">{prop.location}</p>
                  <p className="mt-2 font-mono text-base font-black text-on-surface">
                    ${(prop.price / 1000000).toFixed(2)}M
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-2 border-t border-outline-variant/20 pt-3">
                  <Button
                    size="sm"
                    onClick={() => {
                      state.setLoiTargetProperty(prop.propertyId)
                      state.setLoiOfferPrice(String(prop.price))
                      state.setIsSubmitLoiModalOpen(true)
                    }}
                    className="h-8 flex-1 rounded-xl bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/90"
                  >
                    Submit LOI
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      state.setTourPropertyId(prop.propertyId)
                      state.setIsBookTourModalOpen(true)
                    }}
                    className="h-8 rounded-xl border-outline-variant/40 text-xs font-semibold"
                  >
                    Tour
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-base font-bold text-on-surface">
                {state.activeRole === "organizer"
                  ? "Syndicate Managed Portfolio"
                  : "Property Inventory Snapshot"}
              </h2>
              <p className="text-xs text-on-surface-variant">
                Live status of actively managed prime estates
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setActiveNav("properties")}
              className="h-9 rounded-xl border-outline-variant/40 px-3 text-xs font-bold"
            >
              <span>{t("dash.viewAllProperties", "View All Properties")} ({properties.length})</span>
              <IconChevronRight size={15} />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                  {OVERVIEW_COLUMNS.map((col) => (
                    <th
                      key={col.label}
                      className={`pb-3 font-semibold${col.alignRight ? " text-right" : ""}`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {properties.slice(0, 4).map((prop) => (
                  <tr
                    key={prop.id}
                    className="transition-colors hover:bg-surface-container-high/30"
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={prop.image}
                            alt={prop.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">
                            {prop.title}
                          </p>
                          <p className="text-[11px] text-on-surface-variant">
                            {prop.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-on-surface-variant">
                      {prop.category}
                    </td>
                    <td className="py-3 font-bold text-on-surface">
                      ${(prop.price / 1000000).toFixed(2)}M
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={
                          prop.status === "Active"
                            ? "gold"
                            : prop.status === "In Escrow"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-[10px] font-bold"
                      >
                        {prop.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-on-surface-variant">
                      {prop.inquiries} leads
                    </td>
                    <td className="py-3 text-right">
                      <Button
                        variant="ghost"
                        onClick={() => handleTogglePropertyStatus(prop.id)}
                        className="h-8 rounded-lg px-2.5 text-xs font-semibold text-primary hover:bg-primary/10"
                      >
                        Toggle Status
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
