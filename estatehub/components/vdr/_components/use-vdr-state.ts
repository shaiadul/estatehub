"use client"

import * as React from "react"
import type {
  ClosingOption,
  ContingencyOption,
  DiligenceDoc,
  EarnestOption,
  VdrTabId,
} from "./types"
import { DEFAULT_LOI_PRINCIPAL, DOCUMENTS, LOI_BOUNDS } from "./vdr-data"
import { filterDocs, generateLoiNumber, generateVdrHash, validateLoiPrice } from "./vdr-utils"

export interface VdrToast {
  id: number
  title: string
  description: string
}

interface UseVdrStateOptions {
  initialPrice?: number
  onNotify?: (toast: Omit<VdrToast, "id">) => void
}

export function useVdrState(options: UseVdrStateOptions = {}) {
  const [activeTab, setActiveTab] = React.useState<VdrTabId>("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [vdrHash, setVdrHash] = React.useState("AC-8841-ZH-VDR")
  const [downloadingId, setDownloadingId] = React.useState<string | null>(null)
  const [vaultDownloading, setVaultDownloading] = React.useState(false)
  const [previewDoc, setPreviewDoc] = React.useState<DiligenceDoc | null>(null)

  const [loiPrice, setLoiPrice] = React.useState(options.initialPrice ?? 9850000)
  const [earnest, setEarnest] = React.useState<EarnestOption>("5%")
  const [closingDays, setClosingDays] = React.useState<ClosingOption>("21")
  const [contingency, setContingency] = React.useState<ContingencyOption>("waived")
  const [loiSubmitting, setLoiSubmitting] = React.useState(false)
  const [loiNumber, setLoiNumber] = React.useState<string | null>(null)
  const [loiError, setLoiError] = React.useState<string | null>(null)

  const notify = React.useCallback(
    (toast: Omit<VdrToast, "id">) => options.onNotify?.(toast),
    [options],
  )

  const filteredDocs = React.useMemo(
    () => filterDocs(DOCUMENTS, activeTab, searchQuery),
    [activeTab, searchQuery],
  )

  const refreshHash = React.useCallback(() => setVdrHash(generateVdrHash()), [])

  const downloadDoc = React.useCallback(
    (id: string) => {
      if (downloadingId) return
      const doc = DOCUMENTS.find((d) => d.id === id)
      setDownloadingId(id)
      window.setTimeout(() => {
        setDownloadingId(null)
        setPreviewDoc((current) => (current?.id === id ? null : current))
        notify({
          title: "Document decrypted",
          description: `${doc?.title ?? "Exhibit"} verified (SHA-256) and downloaded.`,
        })
      }, 800)
    },
    [downloadingId, notify],
  )

  const downloadVault = React.useCallback(() => {
    if (vaultDownloading) return
    setVaultDownloading(true)
    window.setTimeout(() => {
      setVaultDownloading(false)
      notify({
        title: "Vault archive ready",
        description: "Full encrypted vault (.ZIP) verified and downloaded.",
      })
    }, 1200)
  }, [vaultDownloading, notify])

  const submitLoi = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const error = validateLoiPrice(loiPrice, LOI_BOUNDS.min, LOI_BOUNDS.max)
      if (error) {
        setLoiError(error)
        return
      }
      if (loiSubmitting) return
      setLoiError(null)
      setLoiSubmitting(true)
      window.setTimeout(() => {
        setLoiSubmitting(false)
        setLoiNumber(generateLoiNumber())
        notify({
          title: "Formal LOI dispatched",
          description: `Offer of ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(loiPrice)} transmitted to escrow.`,
        })
      }, 900)
    },
    [loiPrice, loiSubmitting, notify],
  )

  const resetLoi = React.useCallback(() => {
    setLoiNumber(null)
    setLoiError(null)
  }, [])

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    vdrHash,
    refreshHash,
    downloadingId,
    vaultDownloading,
    previewDoc,
    setPreviewDoc,
    downloadDoc,
    downloadVault,
    filteredDocs,
    loi: {
      price: loiPrice,
      setPrice: (v: number) => {
        setLoiPrice(v)
        setLoiError(null)
      },
      earnest,
      setEarnest,
      closingDays,
      setClosingDays,
      contingency,
      setContingency,
      principal: DEFAULT_LOI_PRINCIPAL,
      submitting: loiSubmitting,
      submitted: loiNumber !== null,
      number: loiNumber,
      error: loiError,
      submit: submitLoi,
      reset: resetLoi,
    },
  }
}

export type UseVdrStateReturn = ReturnType<typeof useVdrState>
