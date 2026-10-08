"use client"

import {
  IconShieldLock,
  IconDownload,
  IconCheck,
  IconAlertTriangle,
  IconInfoCircle,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { AdminState } from "./use-admin-state"

interface SystemAuditTabProps {
  state: AdminState
}

const SEVERITY_FILTERS = ["All", "info", "warning", "critical"]

export function SystemAuditTab({ state }: SystemAuditTabProps) {
  const {
    filteredAuditLogs,
    auditFilterSeverity,
    setAuditFilterSeverity,
    triggerToast,
  } = state

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconShieldLock size={16} />
              </span>
              <h2 className="text-lg font-black text-on-surface">
                Cryptographic Security &amp; Audit Trail
              </h2>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">
              Immutable telemetry log recording hardware passkey logins, bilateral LOI contracts, VDR access watermarks, and wire confirmations
            </p>
          </div>

          <Button
            onClick={() => triggerToast("Audit ledger exported with SHA-256 cryptographic signature")}
            className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground hover:bg-primary/90 sm:self-auto"
          >
            <IconDownload size={16} />
            <span>Export Verified Trail</span>
          </Button>
        </div>

        {/* Severity Filters */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-outline-variant/20 pt-3">
          <span className="mr-1 text-xs font-semibold text-on-surface-variant">
            Severity Filter:
          </span>
          {SEVERITY_FILTERS.map((sev) => (
            <button
              key={sev}
              type="button"
              onClick={() => setAuditFilterSeverity(sev)}
              className={`h-8 rounded-lg px-3 text-xs font-bold capitalize transition-all ${
                auditFilterSeverity === sev
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                <th className="pb-3 font-semibold">Event ID &amp; Time</th>
                <th className="pb-3 font-semibold">Action Type</th>
                <th className="pb-3 font-semibold">Operator Principal</th>
                <th className="pb-3 font-semibold">Network &amp; Geo</th>
                <th className="pb-3 font-semibold">Operation Details</th>
                <th className="pb-3 text-right font-semibold">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredAuditLogs.map((log) => (
                <tr
                  key={log.id}
                  className="transition-colors hover:bg-surface-container-high/30"
                >
                  <td className="py-4">
                    <p className="font-mono font-bold text-on-surface">{log.id}</p>
                    <p className="font-mono text-[10px] text-on-surface-variant">
                      {log.timestamp}
                    </p>
                  </td>

                  <td className="py-4 font-bold text-on-surface">
                    {log.eventType}
                  </td>

                  <td className="py-4">
                    <p className="font-semibold text-on-surface">{log.operator}</p>
                  </td>

                  <td className="py-4">
                    <p className="font-mono text-on-surface">{log.ipAddress}</p>
                    <p className="text-[11px] text-on-surface-variant">{log.location}</p>
                  </td>

                  <td className="py-4">
                    <p className="max-w-md text-xs text-on-surface-variant">
                      {log.details}
                    </p>
                  </td>

                  <td className="py-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        log.severity === "critical"
                          ? "bg-destructive/15 text-destructive"
                          : log.severity === "warning"
                            ? "bg-amber-500/15 text-amber-500"
                            : "bg-emerald-500/15 text-emerald-500"
                      }`}
                    >
                      {log.severity === "critical" ? (
                        <IconAlertTriangle size={11} />
                      ) : (
                        <IconCheck size={11} />
                      )}
                      <span>{log.severity}</span>
                    </span>
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
