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
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { AdminState } from "./use-admin-state"

interface PropertyModerationTabProps {
  state: AdminState
}

const PROPERTY_STATUS_FILTERS = [
  "All",
  "Pending Review",
  "Active",
  "Under Offer",
  "In Escrow",
  "Delisted",
]

export function PropertyModerationTab({ state }: PropertyModerationTabProps) {
  const {
    filteredProperties,
    propertyStatusFilter,
    setPropertyStatusFilter,
    handleApproveProperty,
    handleToggleFeaturedProperty,
    handleDelistProperty,
    pendingApprovalsCount,
  } = state

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
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

          {pendingApprovalsCount > 0 && (
            <Badge variant="gold" className="text-xs font-bold">
              {pendingApprovalsCount} Awaiting Verification
            </Badge>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-outline-variant/20 pt-3">
          {PROPERTY_STATUS_FILTERS.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setPropertyStatusFilter(st)}
              className={`h-8 rounded-lg px-3 text-xs font-bold transition-all ${
                propertyStatusFilter === st
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Listings Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                <th className="pb-3 font-semibold">Trophy Estate</th>
                <th className="pb-3 font-semibold">Seller Principal</th>
                <th className="pb-3 font-semibold">Asking Price</th>
                <th className="pb-3 font-semibold">Diligence Ready</th>
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
                      <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container">
                        <Image
                          src={prop.image}
                          alt={prop.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-on-surface">{prop.title}</p>
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
                  </td>

                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
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
                        className={`h-8 rounded-lg border-outline-variant/40 px-2.5 text-xs font-semibold ${
                          prop.featured ? "text-secondary font-bold" : ""
                        }`}
                        title="Toggle Spotlight on Hero & Radar"
                      >
                        <IconStar size={13} className={prop.featured ? "fill-secondary text-secondary" : ""} />
                        <span className="hidden sm:inline">Feature</span>
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
      </div>
    </div>
  )
}
