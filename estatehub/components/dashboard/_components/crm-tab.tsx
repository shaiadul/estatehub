"use client"

import { IconPlus, IconPhone, IconMail, IconUsers } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardHeader className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <IconUsers size={18} className="text-secondary" />
              <CardTitle className="text-base font-bold text-on-surface">
                Client &amp; Investor CRM Directory
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-on-surface-variant">
              High-net-worth investor profiles, lead scoring, and tour expedition dispatches
            </CardDescription>
          </div>

          <Button
            onClick={() => setIsAddClientModalOpen(true)}
            size="sm"
            className="flex h-9 items-center gap-1.5 self-start rounded-xl bg-primary px-3.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 sm:self-auto"
          >
            <IconPlus size={15} />
            <span>{t("dash.enrollClient", "Enroll New Client")}</span>
          </Button>
        </CardHeader>

        <CardContent>
          {filteredLeads.length === 0 ? (
            <NoDataState
              variant="empty"
              title="No Client Dossiers Found"
              description="No investor records match your current criteria. Enroll a prospective high-net-worth buyer or family office."
              action={{
                label: "Enroll New Client",
                onClick: () => setIsAddClientModalOpen(true),
              }}
            />
          ) : (
            <div className="rounded-xl border border-outline-variant/20 overflow-hidden">
              <Table>
                <TableHeader className="bg-surface-container-low/70">
                  <TableRow>
                    {CRM_COLUMNS.map((col) => (
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
                  {filteredLeads.map((lead) => (
                    <TableRow
                      key={lead.id}
                      className="transition-colors hover:bg-surface-container-high/30"
                    >
                      <TableCell className="py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar size="sm" className="bg-primary/10 text-primary border border-primary/20">
                            <AvatarFallback className="text-xs font-bold">
                              {lead.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-xs text-on-surface">{lead.name}</p>
                            <p className="text-[11px] text-on-surface-variant">
                              {lead.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-medium text-on-surface-variant">
                        {lead.entity}
                      </TableCell>
                      <TableCell className="font-mono text-xs font-bold text-on-surface">
                        ${(lead.budget / 1000000).toFixed(1)}M
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={lead.leadScore === "VIP" ? "gold" : "secondary"}
                          className="text-[10px] font-bold"
                        >
                          {lead.leadScore}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] font-semibold text-secondary">
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-on-surface-variant">
                        {lead.assignedAgent}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`tel:${lead.phone}`}
                            onClick={() => triggerToast(`Dialing client: ${lead.phone}`)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/40 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
                            title="Call Phone"
                          >
                            <IconPhone size={14} />
                          </a>
                          <a
                            href={`mailto:${lead.email}`}
                            onClick={() => triggerToast(`Opening dispatch email to ${lead.email}`)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/40 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
                            title="Send Email"
                          >
                            <IconMail size={14} />
                          </a>
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
