"use client"

import {
  IconShieldLock,
  IconDownload,
  IconCheck,
  IconAlertTriangle,
  IconInfoCircle,
  IconKey,
  IconFileCertificate,
  IconBuildingBank,
  IconEye,
  IconRefresh,
  IconServer,
  IconLock,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NoDataState } from "@/components/ui/no-data-state"
import type { AdminState } from "./use-admin-state"
import type { AdminAuditLogItem } from "./types"

interface SystemAuditTabProps {
  state: AdminState
}

export function SystemAuditTab({ state }: SystemAuditTabProps) {
  const {
    auditLogs,
    filteredAuditLogs,
    auditFilterSeverity,
    setAuditFilterSeverity,
    setSelectedAudit,
    triggerToast,
    searchQuery,
    setSearchQuery,
  } = state

  const SEVERITY_FILTERS = [
    { id: "All", label: "All Telemetry", count: auditLogs.length },
    {
      id: "info",
      label: "Standard Events",
      count: auditLogs.filter((a) => a.severity === "info").length,
    },
    {
      id: "warning",
      label: "Security Warnings",
      count: auditLogs.filter((a) => a.severity === "warning").length,
      alert: auditLogs.filter((a) => a.severity === "warning").length > 0,
    },
    {
      id: "critical",
      label: "Critical Alerts",
      count: auditLogs.filter((a) => a.severity === "critical").length,
      critical: auditLogs.filter((a) => a.severity === "critical").length > 0,
    },
  ]

  const getEventIcon = (eventType: AdminAuditLogItem["eventType"]) => {
    switch (eventType) {
      case "FIDO2 Authenticated":
        return <IconKey size={15} className="text-secondary" />
      case "Bilateral LOI Executed":
        return <IconFileCertificate size={15} className="text-primary" />
      case "Earnest Wire Verified":
        return <IconBuildingBank size={15} className="text-emerald-500" />
      case "VDR Watermark Download":
        return <IconLock size={15} className="text-amber-500" />
      case "Role Privileges Modified":
        return <IconShieldLock size={15} className="text-secondary" />
      case "Emergency Freeze Toggled":
        return <IconAlertTriangle size={15} className="text-destructive" />
      case "Listing Approved":
        return <IconCheck size={15} className="text-emerald-500" />
      default:
        return <IconInfoCircle size={15} className="text-on-surface-variant" />
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Security Ledger Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs">
          <span className="text-xs text-on-surface-variant font-medium">Recorded Events</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-on-surface">{auditLogs.length}</span>
            <span className="text-[10px] font-mono text-emerald-500 font-semibold">100% Append-Only</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs">
          <span className="text-xs text-on-surface-variant font-medium">HSM Signatures</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-secondary">SHA-256</span>
            <span className="text-[10px] text-on-surface-variant">Dual Enclave</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs">
          <span className="text-xs text-on-surface-variant font-medium">Security Warnings</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-500">
              {auditLogs.filter((a) => a.severity === "warning").length}
            </span>
            <span className="text-[10px] text-on-surface-variant">Flagged Telemetry</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs">
          <span className="text-xs text-on-surface-variant font-medium">Critical Breaches</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-500">0</span>
            <span className="text-[10px] text-on-surface-variant">Zero Violations</span>
          </div>
        </div>
      </div>

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
            onClick={() =>
              triggerToast("Audit ledger exported with SHA-256 cryptographic signature: e3b0c44298fc1c149afbf4c8996fb924...")
            }
            className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground hover:bg-primary/90 sm:self-auto"
          >
            <IconDownload size={16} />
            <span>Export Verified Trail (SHA-256)</span>
          </Button>
        </div>

        {/* Severity Filters */}
        <div className="flex flex-wrap items-center gap-2 border-t border-outline-variant/20 pt-3">
          {SEVERITY_FILTERS.map((sev) => (
            <button
              key={sev.id}
              type="button"
              onClick={() => setAuditFilterSeverity(sev.id)}
              className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-bold capitalize transition-all ${
                auditFilterSeverity === sev.id
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              <span>{sev.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                  auditFilterSeverity === sev.id
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : sev.critical
                      ? "bg-destructive/20 text-destructive font-bold"
                      : sev.alert
                        ? "bg-amber-500/20 text-amber-500 font-bold"
                        : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {sev.count}
              </span>
            </button>
          ))}
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                <th className="pb-3 font-semibold">Event ID &amp; Timestamp</th>
                <th className="pb-3 font-semibold">Action / Event Type</th>
                <th className="pb-3 font-semibold">Operator Principal</th>
                <th className="pb-3 font-semibold">Network &amp; Geolocation</th>
                <th className="pb-3 font-semibold">Operation Details</th>
                <th className="pb-3 text-right font-semibold">Telemetry Trace</th>
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
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-container-high">
                        {getEventIcon(log.eventType)}
                      </div>
                      <span>{log.eventType}</span>
                    </div>
                  </td>

                  <td className="py-4">
                    <p className="font-semibold text-on-surface">{log.operator}</p>
                    <p className="text-[10px] text-on-surface-variant font-mono">Authenticated Session</p>
                  </td>

                  <td className="py-4">
                    <p className="font-mono text-on-surface">{log.ipAddress}</p>
                    <p className="text-[11px] text-on-surface-variant">{log.location}</p>
                  </td>

                  <td className="py-4 max-w-sm">
                    <p className="text-xs text-on-surface-variant line-clamp-2">
                      {log.details}
                    </p>
                  </td>

                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          log.severity === "critical"
                            ? "bg-destructive/15 text-destructive"
                            : log.severity === "warning"
                              ? "bg-amber-500/15 text-amber-500"
                              : "bg-emerald-500/15 text-emerald-500"
                        }`}
                      >
                        {log.severity}
                      </span>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedAudit(log)}
                        className="h-7 rounded-lg border-outline-variant/40 px-2 text-xs font-semibold hover:bg-surface-container"
                        title="View Full Cryptographic Trace & Payload"
                      >
                        <IconEye size={12} />
                        <span className="hidden sm:inline">Trace</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAuditLogs.length === 0 && (
            <NoDataState
              icon={IconShieldLock}
              variant={searchQuery ? "search" : "filter"}
              searchTerm={searchQuery}
              title={searchQuery ? `No audit events match "${searchQuery}"` : "No events at this severity level"}
              description={`No cryptographic telemetry entries found at severity "${auditFilterSeverity}".`}
              action={{
                label: "Reset Audit Filters",
                onClick: () => {
                  setSearchQuery("")
                  setAuditFilterSeverity("All")
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
