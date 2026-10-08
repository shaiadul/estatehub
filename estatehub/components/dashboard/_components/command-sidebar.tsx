"use client"

import Link from "next/link"
import { IconExternalLink } from "@tabler/icons-react"
import { useI18n } from "@/lib/i18n"
import type { CommandState } from "./use-command-state"

interface CommandSidebarProps {
  state: CommandState
}

const SIDEBAR_LINKS = [
  { href: "/admin", key: "dash.adminConsole", label: "Admin Governance Console" },
  { href: "/closing", key: "dash.openEscrow", label: "Open Escrow Desk" },
  { href: "/vdr", key: "dash.vdrLink", label: "Virtual Data Room (VDR)" },
]

export function CommandSidebar({ state }: CommandSidebarProps) {
  const { t } = useI18n()
  const { activeNav, setActiveNav, activeRole, user, securityArmed, NAV_ITEMS } =
    state

  return (
    <aside className="flex flex-col gap-4 lg:col-span-3 xl:col-span-2">
      <div className="flex flex-col gap-1.5 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-3 shadow-xs">
        <div className="px-3 py-2 text-[11px] font-bold tracking-wider text-on-surface-variant/80 uppercase">
          {t("dash.management", "Management")}
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = activeNav === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveNav(item.id)}
              className={`flex h-10 w-full items-center justify-between rounded-2xl px-3.5 text-xs font-bold transition-all ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high/40 hover:text-on-surface"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={17} />
                <span>{t(`dash.nav.${item.id}`, item.label)}</span>
              </div>
              {item.dot && (
                <span
                  className={`h-2 w-2 rounded-full ${
                    securityArmed
                      ? "animate-pulse bg-tertiary"
                      : "bg-secondary"
                  }`}
                />
              )}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-3 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs">
        <div className="text-[11px] font-bold tracking-wider text-on-surface-variant/80 uppercase">
          {t("dash.activeOperator", "Active Operator")}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/15 text-sm font-bold text-secondary">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : "MD"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-on-surface">
              {user?.name || "Marcus Sterling"}
            </p>
            <p className="truncate text-[10px] text-on-surface-variant capitalize">
              {activeRole} • Accredited
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 border-t border-outline-variant/20 pt-2">
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex h-9 w-full items-center gap-2 rounded-xl px-3 text-xs font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high/40 hover:text-primary"
            >
              <IconExternalLink size={14} />
              <span>{t(link.key, link.label)}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
