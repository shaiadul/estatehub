"use client"

import Image from "next/image"
import {
  IconBuildingEstate,
  IconCheck,
  IconStar,
  IconLock,
  IconEye,
  IconMapPin,
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
        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
          <CardContent className="flex flex-col justify-between p-4">
            <span className="text-xs text-on-surface-variant font-medium">Platform Listings</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-on-surface">{properties.length}</span>
              <span className="text-[10px] font-mono text-emerald-500 font-semibold">Trophy Portfolios</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-amber-500" />
          <CardContent className="flex flex-col justify-between p-4">
            <span className="text-xs text-on-surface-variant font-medium">Pending Diligence</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-2xl font-black ${pendingApprovalsCount > 0 ? "text-amber-500" : "text-on-surface"}`}>
                {pendingApprovalsCount}
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium">Awaiting Approval</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-secondary" />
          <CardContent className="flex flex-col justify-between p-4">
            <span className="text-xs text-on-surface-variant font-medium">Active In Escrow</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-secondary">
                {properties.filter((p) => p.status === "In Escrow").length}
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium">Settlement Pipeline</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-tertiary" />
          <CardContent className="flex flex-col justify-between p-4">
            <span className="text-xs text-on-surface-variant font-medium">Gross Inventory Value</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-on-surface">
                ${(properties.reduce((sum, p) => sum + p.price, 0) / 1000000).toFixed(1)}M
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium">Combined GMV</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardHeader className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconBuildingEstate size={16} />
              </span>
              <CardTitle className="text-base font-bold text-on-surface">
                Platform Listing Curation &amp; Moderation Queue
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-on-surface-variant">
              Audit inbound seller listings, verify title deed completeness, LiDAR scan telemetry, and feature trophy showcases
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            {pendingApprovalsCount > 0 && (
              <Badge variant="gold" className="text-xs font-bold">
                {pendingApprovalsCount} Awaiting Diligence Audit
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Filter Pills with Counts & Category Chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant/20 pt-3">
            <div className="flex flex-wrap items-center gap-2">
              {PROPERTY_STATUS_FILTERS.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setPropertyStatusFilter(st.id)}
                  className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all ${
                    propertyStatusFilter === st.id
                      ? "bg-primary text-primary-foreground shadow-xs ring-1 ring-primary/20"
                      : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  <span>{st.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
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
                        ? "bg-secondary text-primary font-bold shadow-xs"
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
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-low/50 transition-all hover:border-secondary/40 hover:shadow-md"
                >
                  {/* Photo & Badges */}
                  <div className="relative h-48 w-full overflow-hidden bg-surface-container">
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 right-2.5 left-2.5 flex items-center justify-between">
                      <Badge variant="outline" className="bg-black/60 text-white backdrop-blur-xs font-mono text-[10px] border-white/20">
                        {prop.category}
                      </Badge>
                      <Badge
                        variant={
                          prop.status === "Active"
                            ? "gold"
                            : prop.status === "Pending Review"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-[10px] font-bold shadow-xs"
                      >
                        {prop.status}
                      </Badge>
                    </div>

                    {/* Bottom Property Title & Price */}
                    <div className="absolute right-3 bottom-3 left-3">
                      <p className="font-mono text-xs font-semibold text-secondary">
                        {prop.id}
                      </p>
                      <h3 className="line-clamp-1 font-bold text-sm text-white">
                        {prop.title}
                      </h3>
                      <p className="font-mono text-base font-black text-white">
                        ${(prop.price / 1000000).toFixed(2)}M
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div className="space-y-2">
                      <p className="flex items-center gap-1 text-xs text-on-surface-variant">
                        <IconMapPin size={12} className="text-secondary" />
                        <span>{prop.location}</span>
                      </p>

                      <div className="flex items-center justify-between text-xs text-on-surface-variant border-y border-outline-variant/20 py-2">
                        <span>Submitted: {prop.submittedDate}</span>
                        <span className="font-mono">{prop.category}</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                        <span>Seller: <strong className="text-on-surface">{prop.sellerName}</strong></span>
                        <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                          <IconLock size={12} />
                          <span>{prop.vdrAudited ? "VDR Verified" : "Diligence Open"}</span>
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex items-center gap-2 border-t border-outline-variant/20 pt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedProperty(prop)}
                        className="h-8.5 flex-1 rounded-xl border-outline-variant/40 text-xs font-semibold hover:bg-surface-container"
                      >
                        <IconEye size={13} />
                        <span>Inspect Dossier</span>
                      </Button>

                      {prop.status === "Pending Review" ? (
                        <Button
                          size="sm"
                          onClick={() => handleApproveProperty(prop.id)}
                          className="h-8.5 rounded-xl bg-emerald-500 px-3 text-xs font-bold text-white hover:bg-emerald-600 shadow-xs"
                        >
                          <IconCheck size={14} />
                          <span>Approve</span>
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleFeaturedProperty(prop.id)}
                          className={`h-8.5 rounded-xl border-outline-variant/40 px-2.5 text-xs font-semibold ${
                            prop.featured ? "text-secondary font-bold" : ""
                          }`}
                          title="Toggle Featured Spotlight"
                        >
                          <IconStar size={13} className={prop.featured ? "fill-secondary text-secondary" : ""} />
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelistProperty(prop.id)}
                        className={`h-8.5 rounded-xl px-2.5 text-xs font-semibold ${
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
              ))}
            </div>
          ) : (
            /* DENSE TABLE VIEW */
            <div className="rounded-xl border border-outline-variant/20 overflow-hidden">
              <Table>
                <TableHeader className="bg-surface-container-low/70">
                  <TableRow>
                    <TableHead className="text-xs font-bold text-on-surface-variant">Listing Dossier</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant">Seller Principal</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant">Valuation</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant">Compliance</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant">Status</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant text-right">Moderation Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map((prop) => (
                    <TableRow
                      key={prop.id}
                      className="transition-colors hover:bg-surface-container-high/30"
                    >
                      <TableCell className="py-3.5">
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
                                className="font-bold text-xs text-on-surface hover:text-primary transition-colors text-left"
                              >
                                {prop.title}
                              </button>
                              {prop.featured && (
                                <Badge variant="gold" className="text-[9px] py-0 px-1 gap-0.5">
                                  <IconStar size={10} className="fill-secondary text-secondary" />
                                  <span>Featured</span>
                                </Badge>
                              )}
                            </div>
                            <p className="text-[11px] text-on-surface-variant">
                              {prop.location} • <span className="font-mono">{prop.id}</span>
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <p className="font-semibold text-xs text-on-surface">{prop.sellerName}</p>
                        <p className="text-[11px] text-on-surface-variant font-mono">
                          {prop.sellerEntity}
                        </p>
                      </TableCell>

                      <TableCell className="font-mono font-black text-xs text-on-surface">
                        ${(prop.price / 1000000).toFixed(2)}M
                      </TableCell>

                      <TableCell>
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
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            prop.status === "Active"
                              ? "gold"
                              : prop.status === "Pending Review"
                                ? "secondary"
                                : prop.status === "In Escrow"
                                  ? "default"
                                  : "outline"
                          }
                          className="text-[10px] font-bold"
                        >
                          {prop.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedProperty(prop)}
                            className="h-8 rounded-lg border-outline-variant/40 px-2.5 text-xs font-semibold hover:bg-surface-container"
                          >
                            <IconEye size={13} />
                            <span>Inspect</span>
                          </Button>

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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
        </CardContent>
      </Card>
    </div>
  )
}
