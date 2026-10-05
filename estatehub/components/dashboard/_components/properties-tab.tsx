"use client"

import Link from "next/link"
import Image from "next/image"
import { IconPlus, IconMapPin, IconEye, IconTrash } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CommandState } from "./use-command-state"

interface PropertiesTabProps {
  state: CommandState
}

const STATUS_FILTERS = ["All", "Active", "Under Offer", "In Escrow", "Draft"]

const CATEGORY_FILTERS = [
  "All",
  "Villa",
  "Penthouse",
  "Island",
  "Manor",
  "Architectural",
]

const PROPERTY_COLUMNS = [
  { label: "Ref ID", alignRight: false },
  { label: "Property", alignRight: false },
  { label: "Specifications", alignRight: false },
  { label: "Valuation", alignRight: false },
  { label: "Status", alignRight: false },
  { label: "Analytics", alignRight: false },
  { label: "Actions", alignRight: true },
]

export function PropertiesTab({ state }: PropertiesTabProps) {
  const {
    filteredProperties,
    propertyFilterStatus,
    setPropertyFilterStatus,
    propertyFilterCategory,
    setPropertyFilterCategory,
    setIsAddPropertyModalOpen,
    handleTogglePropertyStatus,
    handleDeleteProperty,
  } = state

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-black text-on-surface">
              Estate Inventory Management
            </h2>
            <p className="text-xs text-on-surface-variant">
              Full management table for listings, pricing controls, and status
              changes
            </p>
          </div>

          <Button
            onClick={() => setIsAddPropertyModalOpen(true)}
            className="flex h-10 items-center gap-2 self-start rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground hover:bg-primary/90 sm:self-auto"
          >
            <IconPlus size={16} />
            <span>Add New Listing</span>
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-outline-variant/20 pt-2">
          <span className="mr-1 text-xs font-semibold text-on-surface-variant">
            Status:
          </span>
          {STATUS_FILTERS.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setPropertyFilterStatus(st)}
              className={`h-8 rounded-lg px-3 text-xs font-bold transition-all ${
                propertyFilterStatus === st
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {st}
            </button>
          ))}

          <div className="mx-2 hidden h-4 w-px bg-outline-variant/40 sm:block" />

          <span className="mr-1 text-xs font-semibold text-on-surface-variant">
            Type:
          </span>
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setPropertyFilterCategory(cat)}
              className={`h-8 rounded-lg px-3 text-xs font-bold transition-all ${
                propertyFilterCategory === cat
                  ? "bg-secondary font-black text-primary"
                  : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                {PROPERTY_COLUMNS.map((col) => (
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
              {filteredProperties.map((prop) => (
                <tr
                  key={prop.id}
                  className="transition-colors hover:bg-surface-container-high/30"
                >
                  <td className="py-4 font-mono text-[11px] text-on-surface-variant">
                    {prop.id}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
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
                        <p className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                          <IconMapPin size={12} />
                          <span>{prop.location}</span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-on-surface-variant">
                    <div className="flex flex-col">
                      <span>
                        {prop.beds} Beds • {prop.baths} Baths
                      </span>
                      <span className="text-[11px]">
                        {prop.sqft.toLocaleString()} SqFt
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <p className="text-sm font-extrabold text-on-surface">
                      ${(prop.price / 1000000).toFixed(2)}M
                    </p>
                    <span className="text-[10px] text-on-surface-variant">
                      ${Math.round(prop.price / prop.sqft)}/sqft
                    </span>
                  </td>
                  <td className="py-4">
                    <Badge
                      variant={
                        prop.status === "Active"
                          ? "gold"
                          : prop.status === "In Escrow"
                            ? "secondary"
                            : prop.status === "Under Offer"
                              ? "default"
                              : "outline"
                      }
                      className="text-[10px] font-bold"
                    >
                      {prop.status}
                    </Badge>
                  </td>
                  <td className="py-4 text-on-surface-variant">
                    <div className="flex flex-col text-[11px]">
                      <span>{prop.inquiries} Inquiries</span>
                      <span>{prop.viewsCount.toLocaleString()} Views</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        onClick={() => handleTogglePropertyStatus(prop.id)}
                        className="h-8 rounded-lg border-outline-variant/40 px-2.5 text-xs font-semibold"
                      >
                        {prop.status === "Active" ? "Draft" : "Publish"}
                      </Button>

                      <Link
                        href="/properties"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/40 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                      >
                        <IconEye size={15} />
                      </Link>

                      <Button
                        variant="ghost"
                        onClick={() => handleDeleteProperty(prop.id)}
                        className="h-8 w-8 rounded-lg p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <IconTrash size={15} />
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
