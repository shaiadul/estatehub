"use client"

import Link from "next/link"
import Image from "next/image"
import {
  IconTrendingUp,
  IconChevronRight,
  IconAlertCircle,
  IconMapPin,
  IconEye,
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
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
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
  { label: "Action", alignRight: true },
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
      {/* 4 Primary KPI Telemetry Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS_DATA.map((st, idx) => {
          const Icon = st.icon
          return (
            <Card
              key={idx}
              className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Subtle top accent line */}
              <div
                className={`absolute top-0 inset-x-0 h-1 ${
                  idx === 0
                    ? "bg-primary"
                    : idx === 1
                      ? "bg-secondary"
                      : idx === 2
                        ? "bg-tertiary"
                        : "bg-chart-5"
                }`}
              />
              <CardContent className="flex flex-col justify-between p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-on-surface-variant">
                    {st.label}
                  </span>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl p-1.5 ${st.color}`}
                  >
                    <Icon size={17} />
                  </div>
                </div>

                <div className="mt-3 text-2xl font-black tracking-tight text-on-surface">
                  {st.value}
                </div>

                <div
                  className={`mt-2.5 flex items-center gap-1.5 text-xs font-semibold ${
                    st.trendPositive
                      ? "text-on-tertiary-container"
                      : "text-on-surface-variant"
                  }`}
                >
                  {st.trendPositive && <IconTrendingUp size={14} />}
                  <span>{st.trend}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Urgent Operational Items */}
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <div className="flex items-center gap-2">
              <IconAlertCircle size={18} className="text-secondary" />
              <CardTitle className="text-base font-bold text-on-surface">
                Urgent Operational Items
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-on-surface-variant">
              Critical milestones requiring managerial authorization
            </CardDescription>
          </div>
          <Badge variant="gold" className="px-2.5 py-0.5 text-xs">
            Action Required
          </Badge>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
            {URGENT_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low/60 p-4 transition-all duration-200 hover:border-secondary/40 hover:bg-surface-container-low"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                  <span className="text-[11px] font-medium text-on-surface-variant">
                    {item.meta}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold text-on-surface line-clamp-1">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-on-surface-variant line-clamp-2">
                    {item.sub}
                  </p>
                </div>

                {item.href ? (
                  <Link
                    href={item.href}
                    className={`flex h-9 w-full items-center justify-center rounded-xl text-xs font-bold transition-all ${item.btnClass}`}
                  >
                    {item.action}
                  </Link>
                ) : (
                  <Button
                    onClick={item.onClick}
                    size="sm"
                    className={`h-9 w-full rounded-xl text-xs font-bold shadow-xs ${item.btnClass}`}
                  >
                    {item.action}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role-Specific Lower Dashboard Section */}
      {state.activeRole === "buyer" ? (
        <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
          <CardHeader className="flex flex-col justify-between gap-2 pb-3 sm:flex-row sm:items-center">
            <div>
              <CardTitle className="text-base font-bold text-on-surface">
                Target Trophy Residences Watchlist
              </CardTitle>
              <CardDescription className="text-xs text-on-surface-variant">
                Actively monitored estates with verified pro-forma metrics and instant LOI transmission
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveNav("saved")}
              className="h-8.5 rounded-xl border-outline-variant/40 px-3 text-xs font-semibold"
            >
              <span>View All Saved ({state.savedProperties.length})</span>
              <IconChevronRight size={14} />
            </Button>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {state.savedProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-low/50 p-3.5 transition-all duration-200 hover:border-secondary/40 hover:shadow-sm"
                >
                  <div>
                    <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-xl bg-surface-container">
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
                    </div>
                    <h4 className="line-clamp-1 text-xs font-bold text-on-surface">
                      {prop.title}
                    </h4>
                    <p className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                      <IconMapPin size={11} className="text-secondary" />
                      <span>{prop.location}</span>
                    </p>
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
                      className="h-8 flex-1 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90"
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
                      className="h-8 rounded-xl border-outline-variant/40 px-3 text-xs font-semibold"
                    >
                      Tour
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
          <CardHeader className="flex flex-col justify-between gap-2 pb-3 sm:flex-row sm:items-center">
            <div>
              <CardTitle className="text-base font-bold text-on-surface">
                {state.activeRole === "organizer"
                  ? "Syndicate Managed Portfolio"
                  : "Property Inventory Snapshot"}
              </CardTitle>
              <CardDescription className="text-xs text-on-surface-variant">
                Live status of actively managed prime estates
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveNav("properties")}
              className="h-8.5 rounded-xl border-outline-variant/40 px-3 text-xs font-semibold"
            >
              <span>{t("dash.viewAllProperties", "View All Properties")} ({properties.length})</span>
              <IconChevronRight size={14} />
            </Button>
          </CardHeader>

          <CardContent className="p-0 sm:p-4">
            <div className="rounded-xl border border-outline-variant/20 overflow-hidden">
              <Table>
                <TableHeader className="bg-surface-container-low/70">
                  <TableRow>
                    {OVERVIEW_COLUMNS.map((col) => (
                      <TableHead
                        key={col.label}
                        className={`text-xs font-bold text-on-surface-variant ${
                          col.alignRight ? "text-right" : ""
                        }`}
                      >
                        {col.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.slice(0, 4).map((prop) => (
                    <TableRow
                      key={prop.id}
                      className="transition-colors hover:bg-surface-container-high/30"
                    >
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-outline-variant/30">
                            <Image
                              src={prop.image}
                              alt={prop.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-xs text-on-surface">
                              {prop.title}
                            </p>
                            <p className="text-[11px] text-on-surface-variant">
                              {prop.location}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-on-surface-variant">
                        {prop.category}
                      </TableCell>
                      <TableCell className="font-mono text-xs font-bold text-on-surface">
                        ${(prop.price / 1000000).toFixed(2)}M
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell className="text-xs text-on-surface-variant">
                        {prop.inquiries} leads
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTogglePropertyStatus(prop.id)}
                          className="h-8 rounded-lg px-2.5 text-xs font-semibold text-primary hover:bg-primary/10"
                        >
                          Toggle Status
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
