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
  IconServer,
  IconLock,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
          <CardContent className="flex flex-col justify-between p-4">
            <span className="text-xs text-on-surface-variant font-medium">Recorded Events</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-on-surface">{auditLogs.length}</span>
              <span className="text-[10px] font-mono text-emerald-500 font-semibold">100% Append-Only</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-secondary" />
          <CardContent className="flex flex-col justify-between p-4">
            <span className="text-xs text-on-surface-variant font-medium">HSM Signatures</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-secondary">SHA-256</span>
              <span className="text-[10px] text-on-surface-variant font-medium">Dual Enclave</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-amber-500" />
          <CardContent className="flex flex-col justify-between p-4">
            <span className="text-xs text-on-surface-variant font-medium">Security Alerts</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-500">
                {auditLogs.filter((a) => a.severity === "warning" || a.severity === "critical").length}
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium">Investigated</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-tertiary" />
          <CardContent className="flex flex-col justify-between p-4">
            <span className="text-xs text-on-surface-variant font-medium">SOC 2 / ISO 27001</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-500">Passed</span>
              <span className="text-[10px] text-on-surface-variant font-medium">Notarized</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardHeader className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconShieldLock size={16} />
              </span>
              <CardTitle className="text-base font-bold text-on-surface">
                Immutable Cryptographic Audit Trail
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-on-surface-variant">
              High-assurance append-only ledger recording all administrative, financial, and access operations
            </CardDescription>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => triggerToast("Compiling signed SHA-256 JSON audit archive...")}
            className="flex h-9 items-center gap-1.5 rounded-xl border-outline-variant/40 px-3.5 text-xs font-semibold hover:bg-surface-container sm:self-auto"
          >
            <IconDownload size={14} className="text-secondary" />
            <span>Download Audit Archive</span>
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Severity Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 border-t border-outline-variant/20 pt-3">
            {SEVERITY_FILTERS.map((sf) => (
              <button
                key={sf.id}
                type="button"
                onClick={() => setAuditFilterSeverity(sf.id)}
                className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all ${
                  auditFilterSeverity === sf.id
                    ? "bg-primary text-primary-foreground shadow-xs ring-1 ring-primary/20"
                    : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                <span>{sf.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    auditFilterSeverity === sf.id
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : sf.critical
                        ? "bg-destructive/20 text-destructive font-bold"
                        : sf.alert
                          ? "bg-amber-500/20 text-amber-500 font-bold"
                          : "bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  {sf.count}
                </span>
              </button>
            ))}
          </div>

          {/* Table */}
          {filteredAuditLogs.length === 0 ? (
            <NoDataState
              icon={IconShieldLock}
              variant={searchQuery ? "search" : "filter"}
              searchTerm={searchQuery}
              title={searchQuery ? `No audit logs match "${searchQuery}"` : "No audit logs at this severity"}
              description={`No system events match your query under severity filter "${auditFilterSeverity}".`}
              action={{
                label: "Reset Audit Filters",
                onClick: () => {
                  setSearchQuery("")
                  setAuditFilterSeverity("All")
                },
              }}
            />
          ) : (
            <div className="rounded-xl border border-outline-variant/20 overflow-hidden">
              <Table>
                <TableHeader className="bg-surface-container-low/70">
                  <TableRow>
                    <TableHead className="text-xs font-bold text-on-surface-variant">Timestamp &amp; Event</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant">Operator Principal</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant">Cryptographic Hash</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant">Severity</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant text-right">Inspection</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAuditLogs.map((log) => (
                    <TableRow
                      key={log.id}
                      className="transition-colors hover:bg-surface-container-high/30"
                    >
                      <TableCell className="py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface-container border border-outline-variant/30">
                            {getEventIcon(log.eventType)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-on-surface">{log.eventType}</span>
                              <span className="font-mono text-[10px] text-on-surface-variant">
                                {log.id}
                              </span>
                            </div>
                            <p className="text-[11px] text-on-surface-variant line-clamp-1">{log.details}</p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <p className="font-semibold text-xs text-on-surface">{log.operator}</p>
                        <p className="font-mono text-[10px] text-on-surface-variant">
                          {log.ipAddress} ({log.location})
                        </p>
                      </TableCell>

                      <TableCell>
                        <span className="font-mono text-[11px] font-semibold text-secondary">
                          SHA256:{log.id}
                        </span>
                        <p className="text-[10px] text-on-surface-variant">
                          {log.timestamp}
                        </p>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            log.severity === "critical"
                              ? "destructive"
                              : log.severity === "warning"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-[10px] font-bold"
                        >
                          {log.severity.toUpperCase()}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedAudit(log)}
                          className="h-8 rounded-lg border-outline-variant/40 px-2.5 text-xs font-semibold hover:bg-surface-container"
                        >
                          <IconEye size={13} />
                          <span>Inspect</span>
                        </Button>
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
