"use client"

import { IconSearch, IconRefresh, IconDownload } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useI18n } from "@/lib/i18n"
import type { CommandState } from "./use-command-state"

interface CommandToolbarProps {
  state: CommandState
}

const TOOLBAR_BUTTONS = [
  { id: "reset", key: "dash.reset", label: "Reset", Icon: IconRefresh },
  { id: "export", key: "dash.exportLedger", label: "Export Ledger", Icon: IconDownload },
] as const

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
          placeholder={t("dash.searchPlaceholder", "Search by estate name, buyer, ID or enclave...")}
          className="h-10 rounded-xl border-outline-variant/40 bg-surface-container-low pr-4 pl-9 text-xs"
        />
      </div>

      <div className="flex items-center gap-2">
        {TOOLBAR_BUTTONS.map(({ id, key, label, Icon }) => (
          <Button
            key={id}
            variant="outline"
            onClick={
              id === "reset"
                ? () => {
                    setSearchQuery("")
                    setPropertyFilterStatus("All")
                    setPropertyFilterCategory("All")
                    setOfferFilterStatus("All")
                    triggerToast("Management filters reset")
                  }
                : () =>
                    triggerToast("Generating CSV management export ledger...")
            }
            className="h-10 rounded-xl border-outline-variant/40 px-3.5 text-xs font-bold hover:bg-surface-container-high/40"
          >
            <Icon size={15} />
            <span className="hidden sm:inline">{t(key, label)}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
