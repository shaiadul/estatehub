"use client"

import Link from "next/link"
import Image from "next/image"
import { IconPlus, IconMapPin, IconTrash, IconEye, IconBuildingEstate } from "@tabler/icons-react"
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
import type { CommandState } from "./use-command-state"
import { useI18n } from "@/lib/i18n"

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
  const { t } = useI18n()
  const {
    filteredProperties,
    propertyFilterStatus,
    setPropertyFilterStatus,
    propertyFilterCategory,
    setPropertyFilterCategory,
    setIsAddPropertyModalOpen,
    handleTogglePropertyStatus,
    handleDeleteProperty,
    setSearchQuery,
  } = state

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardHeader className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <IconBuildingEstate size={18} className="text-secondary" />
              <CardTitle className="text-base font-bold text-on-surface">
                Estate Inventory Management
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-on-surface-variant">
              Full management table for listings, pricing controls, and status changes
            </CardDescription>
          </div>

          <Button
            onClick={() => setIsAddPropertyModalOpen(true)}
            size="sm"
            className="flex h-9 items-center gap-1.5 self-start rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90 sm:self-auto"
          >
            <IconPlus size={15} />
            <span>{t("dash.addListing", "Add Property Listing")}</span>
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Filter Pills with Badge / Button styling */}
          <div className="flex flex-wrap items-center gap-2 border-t border-outline-variant/20 pt-3">
            <span className="text-[11px] font-bold text-on-surface-variant/70 uppercase">
              Status:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {STATUS_FILTERS.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setPropertyFilterStatus(st)}
                  className={`h-7.5 rounded-lg px-2.5 text-xs font-semibold transition-all ${
                    propertyFilterStatus === st
                      ? "bg-primary text-primary-foreground shadow-xs ring-1 ring-primary/20"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="mx-2 hidden h-4 w-px bg-outline-variant/40 sm:block" />

            <span className="text-[11px] font-bold text-on-surface-variant/70 uppercase">
              Type:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORY_FILTERS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setPropertyFilterCategory(cat)}
                  className={`h-7.5 rounded-lg px-2.5 text-xs font-semibold transition-all ${
                    propertyFilterCategory === cat
                      ? "bg-secondary text-primary font-bold shadow-xs"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Table or NoDataState */}
          {filteredProperties.length === 0 ? (
            <NoDataState
              variant="search"
              title="No property listings found"
              description="No estates match your current filter parameters or search query. Try adjusting your filters or add a new listing."
              action={{
                label: "Reset Filters",
                onClick: () => {
                  setPropertyFilterStatus("All")
                  setPropertyFilterCategory("All")
                  setSearchQuery("")
                },
              }}
              secondaryAction={{
                label: "+ Add Property",
                onClick: () => setIsAddPropertyModalOpen(true),
              }}
            />
          ) : (
            <div className="rounded-xl border border-outline-variant/20 overflow-hidden">
              <Table>
                <TableHeader className="bg-surface-container-low/70">
                  <TableRow>
                    {PROPERTY_COLUMNS.map((col) => (
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
                  {filteredProperties.map((prop) => (
                    <TableRow
                      key={prop.id}
                      className="transition-colors hover:bg-surface-container-high/30"
                    >
                      <TableCell className="font-mono text-[11px] font-semibold text-on-surface-variant">
                        {prop.id}
                      </TableCell>
                      <TableCell className="py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-outline-variant/30">
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
                            <p className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                              <IconMapPin size={11} className="text-secondary" />
                              <span>{prop.location}</span>
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-on-surface-variant">
                        <div className="flex flex-col text-xs">
                          <span className="font-medium">
                            {prop.beds} Beds • {prop.baths} Baths
                          </span>
                          <span className="text-[11px] text-on-surface-variant/70">
                            {prop.sqft.toLocaleString()} SqFt
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-mono text-xs font-extrabold text-on-surface">
                          ${(prop.price / 1000000).toFixed(2)}M
                        </p>
                        <span className="font-mono text-[10px] text-on-surface-variant">
                          ${Math.round(prop.price / prop.sqft)}/sqft
                        </span>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell className="text-on-surface-variant">
                        <div className="flex flex-col text-[11px]">
                          <span className="font-semibold text-on-surface">{prop.inquiries} Inquiries</span>
                          <span className="text-on-surface-variant/70">{prop.viewsCount} Views</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTogglePropertyStatus(prop.id)}
                            className="h-8 rounded-lg px-2 text-xs font-semibold text-primary hover:bg-primary/10"
                          >
                            Status
                          </Button>
                          <Link href={`/properties/${prop.id}`}>
                            <Button
                              variant="outline"
                              size="icon-sm"
                              className="h-8 w-8 rounded-lg border-outline-variant/40"
                              title="View Property"
                            >
                              <IconEye size={14} />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDeleteProperty(prop.id)}
                            className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"
                            title="Delete Listing"
                          >
                            <IconTrash size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
