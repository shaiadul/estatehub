"use client"

import Link from "next/link"
import {
  IconExternalLink,
  IconShieldCheck,
  IconBuildingBank,
  IconFolderCheck,
  IconCircleCheck,
} from "@tabler/icons-react"
import { useI18n } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarBadge } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { CommandState } from "./use-command-state"

interface CommandSidebarProps {
  state: CommandState
}

const SIDEBAR_PORTALS = [
  {
    href: "/admin",
    key: "dash.adminConsole",
    label: "Admin Governance Console",
    icon: IconShieldCheck,
    badge: "Admin",
  },
  {
    href: "/closing",
    key: "dash.openEscrow",
    label: "Digital Escrow Desk",
    icon: IconBuildingBank,
    badge: "Bilateral",
  },
  {
    href: "/vdr",
    key: "dash.vdrLink",
    label: "Virtual Data Room (VDR)",
    icon: IconFolderCheck,
    badge: "Encrypted",
  },
]

export function CommandSidebar({ state }: CommandSidebarProps) {
  const { t } = useI18n()
  const { activeNav, setActiveNav, activeRole, user, securityArmed, NAV_ITEMS } = state

  // Group navigation items for cleaner modern hierarchy
  const primaryNav = NAV_ITEMS.slice(0, 3) // overview, properties, offers
  const secondaryNav = NAV_ITEMS.slice(3, 6) // crm, financials, vault
  const telemetryNav = NAV_ITEMS.slice(6) // sentry, saved, tours

  const renderNavGroup = (title: string, items: typeof NAV_ITEMS) => (
    <div className="flex flex-col gap-1">
      <span className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-widest text-on-surface-variant/70 uppercase">
        {title}
      </span>
      {items.map((item) => {
        const Icon = item.icon
        const active = activeNav === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveNav(item.id)}
            className={`group relative flex h-10 w-full items-center justify-between rounded-xl px-3 text-xs font-semibold transition-all duration-200 ${
              active
                ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20"
                : "text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
                  active
                    ? "bg-primary-foreground/15 text-primary-foreground"
                    : "bg-surface-container/60 text-on-surface-variant group-hover:text-on-surface"
                }`}
              >
                <Icon size={16} />
              </span>
              <span className="truncate">{t(`dash.nav.${item.id}`, item.label)}</span>
            </div>

            {item.dot && (
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    securityArmed
                      ? "animate-ping bg-tertiary"
                      : "bg-secondary"
                  }`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    securityArmed ? "bg-tertiary" : "bg-secondary"
                  }`}
                />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "MS"

  return (
    <aside className="flex flex-col gap-4 lg:col-span-3 xl:col-span-2">
      {/* Navigation Card */}
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardContent className="flex flex-col gap-3 p-3">
          {renderNavGroup(t("dash.navPortfolio", "Portfolio & Deals"), primaryNav)}
          <Separator className="my-1 bg-outline-variant/20" />
          {renderNavGroup(t("dash.navFinance", "Client & Capital"), secondaryNav)}
          <Separator className="my-1 bg-outline-variant/20" />
          {renderNavGroup(t("dash.navSecurity", "Telemetry & Vault"), telemetryNav)}
        </CardContent>
      </Card>

      {/* Active Operator Card */}
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardContent className="flex flex-col gap-3.5 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest text-on-surface-variant/70 uppercase">
              {t("dash.activeOperator", "Active Principal")}
            </span>
            <Badge variant="verified" className="text-[10px] py-0 px-1.5 h-4 gap-1">
              <IconCircleCheck size={11} className="text-secondary" />
              <span>Accredited</span>
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Avatar size="default" className="border border-secondary/30 bg-secondary/15 ring-2 ring-secondary/20">
              <AvatarFallback className="text-xs font-black text-secondary">
                {userInitials}
              </AvatarFallback>
              <AvatarBadge className="bg-tertiary ring-background" />
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-on-surface">
                {user?.name || "Marcus Sterling"}
              </p>
              <p className="truncate text-[11px] text-on-surface-variant capitalize">
                {activeRole} Desk • Level III
              </p>
            </div>
          </div>

          <Separator className="bg-outline-variant/20" />

          {/* Quick Portals */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-on-surface-variant/70">
              Platform Switcher
            </span>
            {SIDEBAR_PORTALS.map((portal) => {
              const PortalIcon = portal.icon
              return (
                <Link
                  key={portal.href}
                  href={portal.href}
                  className="group flex h-8 w-full items-center justify-between rounded-lg px-2 text-xs font-medium text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
                >
                  <div className="flex items-center gap-2">
                    <PortalIcon size={14} className="text-on-surface-variant group-hover:text-secondary" />
                    <span className="truncate">{t(portal.key, portal.label)}</span>
                  </div>
                  <IconExternalLink size={12} className="opacity-40 group-hover:opacity-100" />
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
