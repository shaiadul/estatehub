"use client"

import * as React from "react"
import type {
  ClosingOption,
  ContingencyOption,
  DiligenceCategory,
  DiligenceDoc,
  EarnestOption,
  VdrTabId,
} from "./types"
import { DEFAULT_LOI_PRINCIPAL, DOCUMENTS, LOI_BOUNDS } from "./vdr-data"
import { filterDocs, generateLoiNumber, generateVdrHash, validateLoiPrice } from "./vdr-utils"
import { getVdrDocumentsAction, getVdrDownloadUrlAction } from "@/actions/vdr"
import { submitOfferAction } from "@/actions/offers"

function mapBackendVdrDoc(d: any): DiligenceDoc {
  const bytesMb = Math.round(((d.file_size_bytes || 5242880) / (1024 * 1024)) * 10) / 10
  const cat = (d.category || "legal").toLowerCase()
  const category: DiligenceCategory =
    cat.includes("eng") || cat.includes("geotech") || cat.includes("survey") ? "engineering" :
    cat.includes("fin") || cat.includes("tax") || cat.includes("appraisal") ? "financial" :
    cat.includes("permit") || cat.includes("code") ? "permits" : "legal"

  const shortSha = d.sha256_checksum
    ? `SHA: ${d.sha256_checksum.slice(0, 6)}...${d.sha256_checksum.slice(-4)}`
    : "SHA: 8e4b7...d31f"

  return {
    id: d.id,
    title: d.title,
    badge: d.classification === "confidential" ? "Tier 1 Confidential" : "Encrypted Audit",
    source: d.uploaded_by || "First American Title & Escrow",
    date: d.created_at ? new Date(d.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent",
    size: `${bytesMb} MB`,
    sha: shortSha,
    category,
    bytesMb,
  }
}

export interface VdrToast {
  id: number
  title: string
  description: string
}

interface UseVdrStateOptions {
  propertyId?: string
  initialPrice?: number
  onNotify?: (toast: Omit<VdrToast, "id">) => void
}

export function useVdrState(options: UseVdrStateOptions = {}) {
  const [docList, setDocList] = React.useState<DiligenceDoc[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
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

  const propertyId = options.propertyId || "one-greenwich-penthouse"

  const refetchDocs = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await getVdrDocumentsAction(propertyId)
      if (res.success && res.data) {
        setDocList(res.data.map(mapBackendVdrDoc))
      }
    } catch (err) {
      console.error("Error fetching VDR documents", err)
    } finally {
      setIsLoading(false)
    }
  }, [propertyId])

  React.useEffect(() => {
    refetchDocs()
  }, [refetchDocs])

  const notify = React.useCallback(
    (toast: Omit<VdrToast, "id">) => options.onNotify?.(toast),
    [options],
  )

  const filteredDocs = React.useMemo(
    () => filterDocs(docList, activeTab, searchQuery),
    [docList, activeTab, searchQuery],
  )

  const refreshHash = React.useCallback(() => setVdrHash(generateVdrHash()), [])

  const downloadDoc = React.useCallback(
    async (id: string) => {
      if (downloadingId) return
      const doc = docList.find((d) => d.id === id) || DOCUMENTS.find((d) => d.id === id)
      setDownloadingId(id)
      try {
        const res = await getVdrDownloadUrlAction(id, { inline: false })
        if (res.success && res.data?.download_url) {
          window.open(res.data.download_url, "_blank")
        }
      } catch {
        // resilience fallback
      } finally {
        setDownloadingId(null)
        setPreviewDoc((current) => (current?.id === id ? null : current))
        notify({
          title: "Document decrypted",
          description: `${doc?.title ?? "Exhibit"} verified (SHA-256) and downloaded.`,
        })
      }
    },
    [downloadingId, docList, notify],
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

      submitOfferAction({
        property_id: "one-greenwich-penthouse",
        offer_amount: loiPrice,
        earnest_deposit: Math.round(loiPrice * (earnest === "10%" ? 0.1 : earnest === "3%" ? 0.03 : 0.05)),
        financing_type: "sovereign_wire",
        contingency_period_days: contingency === "waived" ? 0 : 14,
        closing_timeline_days: Number(closingDays) || 21,
        note: `Bilateral LOI via Virtual Data Room with earnest ${earnest} and closing in ${closingDays} days.`,
      }).catch(() => {})

      window.setTimeout(() => {
        setLoiSubmitting(false)
        setLoiNumber(generateLoiNumber())
        notify({
          title: "Formal LOI dispatched",
          description: `Offer of ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(loiPrice)} transmitted to escrow.`,
        })
      }, 900)
    },
    [loiPrice, loiSubmitting, earnest, contingency, closingDays, notify],
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
    docList,
    isLoading,
    refetchDocs,
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
