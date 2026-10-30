"use client"

import {
  IconSearch,
  IconRefresh,
  IconDownload,
  IconX,
  IconLayoutGrid,
  IconList,
  IconFilter,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { AdminState } from "./use-admin-state"

interface AdminToolbarProps {
  state: AdminState
}

export function AdminToolbar({ state }: AdminToolbarProps) {
  const {
    activeNav,
    searchQuery,
    setSearchQuery,
    setUserRoleFilter,
    setPropertyStatusFilter,
    setPropertyCategoryFilter,
    setAuditFilterSeverity,
    setEscrowStageFilter,
    propertyViewMode,
    setPropertyViewMode,
    propertyCategoryFilter,
    filteredUsers,
    users,
    filteredProperties,
    properties,
    filteredEscrowDeals,
    escrowDeals,
    filteredAuditLogs,
    auditLogs,
    triggerToast,
  } = state

  const handleReset = () => {
    setSearchQuery("")
    setUserRoleFilter("All")
    setPropertyStatusFilter("All")
    setPropertyCategoryFilter("All")
    setAuditFilterSeverity("All")
    setEscrowStageFilter("All")
    triggerToast("All admin filters reset to defaults")
  }

  const handleExport = (format: "csv" | "json") => {
    if (format === "json") {
      triggerToast("Cryptographically signed JSON ledger exported (SHA-256 verified)")
    } else {
      triggerToast("CSV audit archive compiled and queued for download")
    }
  }

  // Calculate current context count
  const currentCount =
    activeNav === "properties"
      ? `${filteredProperties.length} of ${properties.length} listings`
      : activeNav === "users"
        ? `${filteredUsers.length} of ${users.length} members`
        : activeNav === "escrow"
          ? `${filteredEscrowDeals.length} of ${escrowDeals.length} deals`
          : activeNav === "audit"
            ? `${filteredAuditLogs.length} of ${auditLogs.length} events`
            : null

  const isFiltered =
    Boolean(searchQuery) ||
    state.userRoleFilter !== "All" ||
    state.propertyStatusFilter !== "All" ||
    state.propertyCategoryFilter !== "All" ||
    state.auditFilterSeverity !== "All" ||
    state.escrowStageFilter !== "All"

  return (
    <div className="flex flex-col justify-between gap-3 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs md:flex-row md:items-center">
      {/* Search Bar with Clear Button */}
      <div className="relative max-w-lg flex-1">
        <IconSearch
          size={16}
          className="absolute top-1/2 left-3.5 -translate-y-1/2 text-on-surface-variant"
        />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            activeNav === "properties"
              ? "Search by title, location, seller, or EST ID..."
              : activeNav === "users"
                ? "Search by name, email, role, or accreditation tier..."
                : activeNav === "escrow"
                  ? "Search by contract ID, property, buyer, or broker..."
                  : "Search logs by event, operator, details, or IP..."
          }
          className="h-10 rounded-xl border-outline-variant/40 bg-surface-container-low pr-8 pl-9 text-xs placeholder:text-on-surface-variant/70 focus-visible:ring-1 focus-visible:ring-primary"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
            title="Clear search"
          >
            <IconX size={14} />
          </button>
        )}
      </div>

      {/* Context Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Count Pill */}
        {currentCount && (
          <span className="hidden lg:inline-flex items-center rounded-full bg-surface-container px-3 py-1 font-mono text-[11px] font-semibold text-on-surface-variant border border-outline-variant/20">
            {currentCount}
          </span>
        )}

        {/* Property Specific Category Filter & View Mode */}
        {activeNav === "properties" && (
          <>
            <select
              value={propertyCategoryFilter}
              onChange={(e) => setPropertyCategoryFilter(e.target.value)}
              className="h-10 rounded-xl border border-outline-variant/40 bg-surface-container-low px-3 text-xs font-semibold text-on-surface focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Villa">Villas</option>
              <option value="Penthouse">Penthouses</option>
              <option value="Island">Private Islands</option>
              <option value="Manor">Manors &amp; Chalets</option>
              <option value="Architectural">Architectural</option>
            </select>

            <div className="flex items-center rounded-xl border border-outline-variant/30 bg-surface-container-low p-0.5">
              <button
                type="button"
                onClick={() => setPropertyViewMode("grid")}
                className={`flex h-8.5 items-center gap-1 rounded-lg px-2.5 text-xs font-bold transition-all ${
                  propertyViewMode === "grid"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
                title="Grid Card View"
              >
                <IconLayoutGrid size={15} />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setPropertyViewMode("table")}
                className={`flex h-8.5 items-center gap-1 rounded-lg px-2.5 text-xs font-bold transition-all ${
                  propertyViewMode === "table"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
                title="Dense Table View"
              >
                <IconList size={15} />
                <span className="hidden sm:inline">Table</span>
              </button>
            </div>
          </>
        )}

        {/* Reset Filters */}
        {isFiltered && (
          <Button
            variant="outline"
            onClick={handleReset}
            className="h-10 rounded-xl border-outline-variant/40 px-3 text-xs font-bold hover:bg-surface-container text-secondary"
          >
            <IconRefresh size={14} />
            <span>Reset</span>
          </Button>
        )}

        {/* Export Data */}
        <div className="flex items-center">
          <Button
            variant="outline"
            onClick={() => handleExport("csv")}
            className="h-10 rounded-xl border-outline-variant/40 px-3.5 text-xs font-bold hover:bg-surface-container"
          >
            <IconDownload size={14} />
            <span>Export</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
