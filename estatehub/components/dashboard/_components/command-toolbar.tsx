"use client"

import { IconSearch, IconRefresh, IconDownload, IconX } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"
import type { CommandState } from "./use-command-state"

interface CommandToolbarProps {
  state: CommandState
}

export function CommandToolbar({ state }: CommandToolbarProps) {
  const { t } = useI18n()
  const {
    searchQuery,
    setSearchQuery,
    setPropertyFilterStatus,
    setPropertyFilterCategory,
    setOfferFilterStatus,
    triggerToast,
  } = state

  const handleResetFilters = () => {
    setSearchQuery("")
    setPropertyFilterStatus("All")
    setPropertyFilterCategory("All")
    setOfferFilterStatus("All")
    triggerToast("Management filters reset to default")
  }

  const handleExportLedger = () => {
    triggerToast("Compiling encrypted audit ledger export...")
  }

  return (
    <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
      <CardContent className="flex flex-col justify-between gap-3 p-3.5 sm:flex-row sm:items-center">
        {/* Search Input with Modern Icon & Kbd Badge */}
        <div className="relative flex-1 max-w-lg">
          <IconSearch
            size={16}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant pointer-events-none"
          />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("dash.searchPlaceholder", "Search estates, buyers, LOI identifiers, or enclaves...")}
            className="h-9.5 rounded-xl border-outline-variant/40 bg-surface-container-low/70 pr-16 pl-9 text-xs transition-colors focus:border-secondary focus:bg-surface-container-lowest"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1 text-on-surface-variant hover:text-on-surface"
            >
              <IconX size={13} />
            </button>
          ) : (
            <kbd className="absolute top-1/2 right-3 -translate-y-1/2 hidden select-none rounded border border-outline-variant/40 bg-surface-container px-1.5 py-0.5 text-[10px] font-mono text-on-surface-variant sm:inline-block">
              ⌘K
            </kbd>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetFilters}
            className="h-9.5 rounded-xl border-outline-variant/40 px-3 text-xs font-semibold hover:bg-surface-container"
          >
            <IconRefresh size={14} className="text-on-surface-variant" />
            <span className="hidden sm:inline">{t("dash.reset", "Reset Filters")}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportLedger}
            className="h-9.5 rounded-xl border-outline-variant/40 px-3 text-xs font-semibold hover:bg-surface-container"
          >
            <IconDownload size={14} className="text-secondary" />
            <span>{t("dash.exportLedger", "Export Ledger")}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
