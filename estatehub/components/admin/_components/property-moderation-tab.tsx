"use client"

import Image from "next/image"
import Link from "next/link"
import {
  IconBuildingEstate,
  IconCheck,
  IconStar,
  IconAlertTriangle,
  IconLock,
  IconExternalLink,
  IconEye,
  IconRefresh,
  IconBuildingBank,
  IconMapPin,
  IconCube,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NoDataState } from "@/components/ui/no-data-state"
import type { AdminState } from "./use-admin-state"

interface PropertyModerationTabProps {
  state: AdminState
}

export function PropertyModerationTab({ state }: PropertyModerationTabProps) {
  const {
    properties,
    filteredProperties,
    propertyStatusFilter,
    setPropertyStatusFilter,
    propertyCategoryFilter,
    setPropertyCategoryFilter,
    propertyViewMode,
    setPropertyViewMode,
    setSelectedProperty,
    handleApproveProperty,
    handleToggleFeaturedProperty,
    handleDelistProperty,
    pendingApprovalsCount,
    setSearchQuery,
    searchQuery,
  } = state

  const PROPERTY_STATUS_FILTERS = [
    { id: "All", label: "All Listings", count: properties.length },
    {
      id: "Pending Review",
      label: "Pending Review",
      count: pendingApprovalsCount,
      alert: pendingApprovalsCount > 0,
    },
    {
      id: "Active",
      label: "Active Radar",
      count: properties.filter((p) => p.status === "Active").length,
    },
    {
      id: "Under Offer",
      label: "Under Offer",
      count: properties.filter((p) => p.status === "Under Offer").length,
    },
    {
      id: "In Escrow",
      label: "In Escrow",
      count: properties.filter((p) => p.status === "In Escrow").length,
    },
    {
      id: "Delisted",
      label: "Delisted",
      count: properties.filter((p) => p.status === "Delisted").length,
    },
  ]

  const CATEGORIES = ["All", "Villa", "Penthouse", "Island", "Manor", "Architectural"]

  return (
    <div className="flex flex-col gap-6">
      {/* Property Moderation Metrics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs">
          <span className="text-xs text-on-surface-variant font-medium">Platform Listings</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-on-surface">{properties.length}</span>
            <span className="text-[10px] font-mono text-emerald-500 font-semibold">Trophy Portfolios</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs">
          <span className="text-xs text-on-surface-variant font-medium">Pending Diligence</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className={`text-2xl font-black ${pendingApprovalsCount > 0 ? "text-amber-500" : "text-on-surface"}`}>
              {pendingApprovalsCount}
            </span>
            <span className="text-[10px] text-on-surface-variant">Awaiting Approval</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs">
          <span className="text-xs text-on-surface-variant font-medium">Active In Escrow</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-secondary">
              {properties.filter((p) => p.status === "In Escrow").length}
            </span>
            <span className="text-[10px] text-on-surface-variant">Settlement Pipeline</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs">
          <span className="text-xs text-on-surface-variant font-medium">Gross Inventory Value</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-on-surface">
              ${(properties.reduce((sum, p) => sum + p.price, 0) / 1000000).toFixed(1)}M
            </span>
            <span className="text-[10px] text-on-surface-variant">Combined GMV</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
        {/* Header Title & Badges */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconBuildingEstate size={16} />
              </span>
              <h2 className="text-lg font-black text-on-surface">
                Platform Listing Curation &amp; Moderation Queue
              </h2>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">
              Audit inbound seller listings, verify title deed completeness, LiDAR scan telemetry, and feature trophy showcases
            </p>
          </div>

          <div className="flex items-center gap-2">
            {pendingApprovalsCount > 0 && (
              <Badge variant="gold" className="text-xs font-bold">
                {pendingApprovalsCount} Awaiting Diligence Audit
              </Badge>
            )}
          </div>
        </div>

        {/* Filter Pills with Counts & Category Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant/20 pt-3">
          <div className="flex flex-wrap items-center gap-2">
            {PROPERTY_STATUS_FILTERS.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setPropertyStatusFilter(st.id)}
                className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition-all ${
                  propertyStatusFilter === st.id
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                <span>{st.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    propertyStatusFilter === st.id
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : st.alert
                        ? "bg-amber-500/20 text-amber-500 font-bold"
                        : "bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  {st.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-on-surface-variant font-medium">Type:</span>
            <div className="flex flex-wrap items-center gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setPropertyCategoryFilter(cat)}
                  className={`h-7 rounded-md px-2 text-[11px] font-semibold transition-all ${
                    propertyCategoryFilter === cat
                      ? "bg-secondary text-primary font-bold"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Listings Display: Grid Mode or Table Mode */}
        {propertyViewMode === "grid" ? (
          /* LUXURY GRID VIEW */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 pt-2">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-low transition-all hover:border-outline-variant/60 hover:shadow-md"
              >
                {/* Photo & Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-surface-container">
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 right-2.5 left-2.5 flex items-center justify-between">
                    <Badge variant="outline" className="bg-black/60 text-white backdrop-blur-xs font-mono text-[10px]">
                      {prop.category}
                    </Badge>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold backdrop-blur-xs ${
                        prop.status === "Active"
                          ? "bg-emerald-500/80 text-white"
                          : prop.status === "Pending Review"
                            ? "bg-amber-500/90 text-white"
                            : prop.status === "In Escrow"
                              ? "bg-secondary/90 text-primary"
                              : "bg-black/70 text-white"
                      }`}
                    >
                      {prop.status}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Info */}
                  <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between text-white">
                    <div>
                      <span className="font-mono text-lg font-black tracking-tight">
                        ${(prop.price / 1000000).toFixed(2)}M
                      </span>
                      <p className="font-mono text-[10px] text-white/80">{prop.id}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      {prop.vdrAudited && (
                        <span className="flex items-center gap-0.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] text-emerald-400 backdrop-blur-xs">
                          <IconLock size={10} />
                          <span>VDR</span>
                        </span>
                      )}
                      {prop.lidarScanAvailable && (
                        <span className="flex items-center gap-0.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] text-secondary backdrop-blur-xs">
                          <IconCube size={10} />
                          <span>3D</span>
                        </span>
                      )}
                      {prop.featured && (
                        <span className="rounded-md bg-secondary/80 p-1 text-primary">
                          <IconStar size={11} className="fill-current" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details Body */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3
                      onClick={() => setSelectedProperty(prop)}
                      className="cursor-pointer font-bold text-sm text-on-surface hover:text-primary transition-colors line-clamp-1"
                    >
                      {prop.title}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-on-surface-variant line-clamp-1">
                      <IconMapPin size={13} className="shrink-0 text-on-surface-variant/70" />
                      <span>{prop.location}</span>
                    </p>

                    <div className="mt-3 flex items-center justify-between border-t border-outline-variant/20 pt-2 text-[11px] text-on-surface-variant">
                      <span>Seller: <strong className="text-on-surface font-semibold">{prop.sellerName}</strong></span>
                      <span className="font-mono">{prop.sellerEntity}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="mt-4 flex items-center justify-between border-t border-outline-variant/20 pt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedProperty(prop)}
                      className="h-8 rounded-lg border-outline-variant/40 px-2.5 text-xs font-bold hover:bg-surface-container"
                    >
                      <IconEye size={13} />
                      <span>Inspect</span>
                    </Button>

                    <div className="flex items-center gap-1.5">
                      {prop.status === "Pending Review" && (
                        <Button
                          size="sm"
                          onClick={() => handleApproveProperty(prop.id)}
                          className="h-8 rounded-lg bg-emerald-500 px-2.5 text-xs font-bold text-white hover:bg-emerald-600 shadow-xs"
                        >
                          <IconCheck size={14} />
                          <span>Approve</span>
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleFeaturedProperty(prop.id)}
                        className={`h-8 rounded-lg border-outline-variant/40 px-2 text-xs font-semibold ${
                          prop.featured ? "text-secondary font-bold" : ""
                        }`}
                        title="Toggle Featured placement"
                      >
                        <IconStar size={13} className={prop.featured ? "fill-secondary text-secondary" : ""} />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelistProperty(prop.id)}
                        className={`h-8 rounded-lg px-2 text-xs font-semibold ${
                          prop.status === "Delisted"
                            ? "text-emerald-500 hover:bg-emerald-500/10"
                            : "text-destructive hover:bg-destructive/10"
                        }`}
                      >
                        {prop.status === "Delisted" ? "Restore" : "Delist"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* DENSE TABLE VIEW */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                  <th className="pb-3 font-semibold">Trophy Estate</th>
                  <th className="pb-3 font-semibold">Seller Principal</th>
                  <th className="pb-3 font-semibold">Asking Price</th>
                  <th className="pb-3 font-semibold">Diligence Telemetry</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 text-right font-semibold">Moderation Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredProperties.map((prop) => (
                  <tr
                    key={prop.id}
                    className="transition-colors hover:bg-surface-container-high/30"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => setSelectedProperty(prop)}
                          className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container cursor-pointer"
                        >
                          <Image
                            src={prop.image}
                            alt={prop.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedProperty(prop)}
                              className="font-bold text-on-surface hover:text-primary transition-colors text-left"
                            >
                              {prop.title}
                            </button>
                            {prop.featured && (
                              <span className="flex items-center gap-0.5 rounded-full bg-secondary/20 px-1.5 py-0.5 text-[9px] font-black text-on-secondary-container">
                                <IconStar size={10} className="fill-secondary text-secondary" />
                                <span>Featured</span>
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-on-surface-variant">
                            {prop.location} • <span className="font-mono">{prop.id}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <p className="font-bold text-on-surface">{prop.sellerName}</p>
                      <p className="text-[11px] text-on-surface-variant font-mono">
                        {prop.sellerEntity}
                      </p>
                    </td>

                    <td className="py-4 font-mono font-black text-sm text-on-surface">
                      ${(prop.price / 1000000).toFixed(2)}M
                    </td>

                    <td className="py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex items-center gap-1 font-semibold text-[11px] ${
                            prop.vdrAudited ? "text-emerald-500" : "text-amber-500"
                          }`}
                        >
                          <IconLock size={12} />
                          <span>{prop.vdrAudited ? "VDR Verified" : "Docs Incomplete"}</span>
                        </span>
                        <span className="font-mono text-[10px] text-on-surface-variant">
                          {prop.lidarScanAvailable ? "3D LiDAR Mapped" : "Standard Floorplan"}
                        </span>
                      </div>
                    </td>

                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          prop.status === "Active"
                            ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                            : prop.status === "Pending Review"
                              ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                              : prop.status === "In Escrow"
                                ? "bg-secondary/20 text-on-secondary-container border border-secondary/40"
                                : "bg-surface-container text-on-surface-variant"
                        }`}
                      >
                        {prop.status}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedProperty(prop)}
                          className="h-8 rounded-lg border-outline-variant/40 px-2.5 text-xs font-bold hover:bg-surface-container"
                        >
                          <IconEye size={13} />
                          <span>Inspect</span>
                        </Button>

                        {prop.status === "Pending Review" && (
                          <Button
                            size="sm"
                            onClick={() => handleApproveProperty(prop.id)}
                            className="h-8 rounded-lg bg-emerald-500 px-2.5 text-xs font-bold text-white hover:bg-emerald-600"
                          >
                            <IconCheck size={14} />
                            <span>Approve</span>
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleFeaturedProperty(prop.id)}
                          className={`h-8 rounded-lg border-outline-variant/40 px-2 text-xs font-semibold ${
                            prop.featured ? "text-secondary font-bold" : ""
                          }`}
                          title="Toggle Featured Spotlight"
                        >
                          <IconStar size={13} className={prop.featured ? "fill-secondary text-secondary" : ""} />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelistProperty(prop.id)}
                          className={`h-8 rounded-lg px-2 text-xs font-semibold ${
                            prop.status === "Delisted"
                              ? "text-emerald-500 hover:bg-emerald-500/10"
                              : "text-destructive hover:bg-destructive/10"
                          }`}
                        >
                          {prop.status === "Delisted" ? "Restore" : "Delist"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredProperties.length === 0 && (
          <NoDataState
            icon={IconBuildingEstate}
            variant={searchQuery ? "search" : "filter"}
            searchTerm={searchQuery}
            title={searchQuery ? `No listings match "${searchQuery}"` : "No properties found in this filter"}
            description={`No properties currently match category "${propertyCategoryFilter}" with status "${propertyStatusFilter}".`}
            action={{
              label: "Reset Property Filters",
              onClick: () => {
                setSearchQuery("")
                setPropertyStatusFilter("All")
                setPropertyCategoryFilter("All")
              },
            }}
          />
        )}
      </div>
    </div>
  )
}
