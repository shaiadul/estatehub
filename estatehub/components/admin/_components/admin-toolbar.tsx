"use client"

import { IconSearch, IconRefresh, IconDownload, IconShield } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { AdminState } from "./use-admin-state"

interface AdminToolbarProps {
  state: AdminState
}

export function AdminToolbar({ state }: AdminToolbarProps) {
  const {
    searchQuery,
    setSearchQuery,
    setUserRoleFilter,
    setPropertyStatusFilter,
    setAuditFilterSeverity,
    triggerToast,
  } = state

  const handleReset = () => {
    setSearchQuery("")
    setUserRoleFilter("All")
    setPropertyStatusFilter("All")
    setAuditFilterSeverity("All")
    triggerToast("All admin filters reset to defaults")
  }

  const handleExport = () => {
    triggerToast("Generating cryptographically signed audit ledger (SHA-256)...")
  }

  return (
    <div className="flex flex-col justify-between gap-3 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs md:flex-row md:items-center">
      <div className="relative max-w-md flex-1">
        <IconSearch
          size={16}
          className="absolute top-1/2 left-3.5 -translate-y-1/2 text-on-surface-variant"
        />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search members, properties, escrow IDs, or audit events..."
          className="h-10 rounded-xl border-outline-variant/40 bg-surface-container-low pr-4 pl-9 text-xs"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={handleReset}
          className="h-10 rounded-xl border-outline-variant/40 px-3.5 text-xs font-bold hover:bg-surface-container"
        >
          <IconRefresh size={15} />
          <span>Reset Filters</span>
        </Button>

        <Button
          variant="outline"
          onClick={handleExport}
          className="h-10 rounded-xl border-outline-variant/40 px-3.5 text-xs font-bold hover:bg-surface-container"
        >
          <IconDownload size={15} />
          <span>Export Ledger</span>
        </Button>
      </div>
    </div>
  )
}
