"use client"

import { IconPlus, IconPhone, IconMail } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CommandState } from "./use-command-state"
import { useI18n } from "@/lib/i18n"

interface CrmTabProps {
  state: CommandState
}

const CRM_COLUMNS = [
  { label: "Client Dossier", alignRight: false },
  { label: "Entity / Family Office", alignRight: false },
  { label: "Target Budget", alignRight: false },
  { label: "Lead Tier", alignRight: false },
  { label: "Pipeline Status", alignRight: false },
  { label: "Assigned Desk", alignRight: false },
  { label: "Direct Outreach", alignRight: true },
]

export function CrmTab({ state }: CrmTabProps) {
  const { t } = useI18n()
  const { filteredLeads, setIsAddClientModalOpen, triggerToast } = state

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-black text-on-surface">
              Client &amp; Investor CRM Directory
            </h2>
            <p className="text-xs text-on-surface-variant">
              High-net-worth investor profiles, lead scoring, and tour
              expedition dispatches
            </p>
          </div>

          <Button
            onClick={() => setIsAddClientModalOpen(true)}
            className="flex h-10 items-center gap-2 self-start rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground hover:bg-primary/90 sm:self-auto"
          >
            <IconPlus size={16} />
            <span>{t("dash.enrollClient", "Enroll New Client")}</span>
          </Button>
        </div>

        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                {CRM_COLUMNS.map((col) => (
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
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="transition-colors hover:bg-surface-container-high/30"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                        {lead.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{lead.name}</p>
                        <p className="text-[11px] text-on-surface-variant">
                          {lead.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-medium text-on-surface-variant">
                    {lead.entity}
                  </td>
                  <td className="py-4 text-sm font-bold text-on-surface">
                    ${(lead.budget / 1000000).toFixed(1)}M
                  </td>
                  <td className="py-4">
                    <Badge
                      variant={
                        lead.leadScore === "VIP" ? "gold" : "secondary"
                      }
                      className="text-[10px] font-bold"
                    >
                      {lead.leadScore}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <span className="text-[11px] font-semibold text-secondary">
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 text-[11px] text-on-surface-variant">
                    {lead.assignedAgent}
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`tel:${lead.phone}`}
                        onClick={() =>
                          triggerToast(`Dialing client: ${lead.phone}`)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/40 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
                      >
                        <IconPhone size={14} />
                      </a>
                      <a
                        href={`mailto:${lead.email}`}
                        onClick={() =>
                          triggerToast(
                            `Opening dispatch email to ${lead.email}`
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/40 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
                      >
                        <IconMail size={14} />
                      </a>
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
