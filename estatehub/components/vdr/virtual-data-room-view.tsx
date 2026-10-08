"use client"

import * as React from "react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import {
  COMP_ROWS,
  DEFAULT_PROPERTY,
  DiligenceRepository,
  DirectorCard,
  DOCUMENTS,
  EscrowChannels,
  ExhibitModal,
  FinancialsSection,
  HeroBanner,
  LidarPreview,
  LoiGenerator,
  VdrTabs,
  VdrToasts,
  useVdrState,
  vaultSizeMb,
  type VdrProperty,
  type VdrToast,
} from "./_components"

import { useSearchParams } from "next/navigation"
import { getPropertyByIdOrSlug } from "@/lib/properties-data"

interface VirtualDataRoomViewProps {
  property?: VdrProperty
}

/**
 * Virtual Data Room — thin orchestrator.
 * Business logic lives in `useVdrState` + `vdr-utils`;
 * rendering lives in `_components/*`.
 */
export function VirtualDataRoomView({ property = DEFAULT_PROPERTY }: VirtualDataRoomViewProps) {
  const searchParams = useSearchParams()
  const propertyParam = searchParams.get("id") || searchParams.get("property")

  const activeProperty: VdrProperty = React.useMemo(() => {
    if (propertyParam) {
      const p = getPropertyByIdOrSlug(propertyParam)
      if (p) {
        return {
          id: p.id,
          name: p.title,
          enclave: p.badge || "Verified Portfolio",
          location: `${p.city}, ${p.state}`,
          description: p.description,
          price: p.price,
          heroImage: p.heroImage,
          specs: [
            { label: "Interior Living", value: `${p.sqftFormatted} sq ft`, mono: true },
            { label: "Private Lot", value: p.lotSize, mono: true },
            { label: "Bedrooms / Baths", value: `${p.beds} Beds • ${p.baths} Baths` },
            { label: "Year Built", value: `${p.yearBuilt} Built` },
            { label: "Automotive Gallery", value: `${p.garage} Vehicles` },
            { label: "MLS Record", value: p.mlsId },
          ],
          cagr: 0.058,
          taxRate: 0.0125,
          annualOperatingCost: 48500,
          holdYears: 5,
        }
      }
    }
    return property
  }, [propertyParam, property])

  const [toasts, setToasts] = React.useState<VdrToast[]>([])

  const notify = React.useCallback((toast: Omit<VdrToast, "id">) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { ...toast, id }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  const vdr = useVdrState({ initialPrice: activeProperty.price, onNotify: notify })
  const totalVaultMb = React.useMemo(() => vaultSizeMb(DOCUMENTS), [])

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-surface">
      <SectionWrapper fullWidth innerClassName="py-6 md:py-10 flex flex-col gap-6 md:gap-8">
        <HeroBanner
          property={activeProperty}
          vdrHash={vdr.vdrHash}
          vaultSizeMb={totalVaultMb}
          vaultDownloading={vdr.vaultDownloading}
          onRefreshHash={vdr.refreshHash}
          onDownloadVault={vdr.downloadVault}
        />

        <VdrTabs activeTab={vdr.activeTab} onChange={vdr.setActiveTab} docs={DOCUMENTS} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
            <DiligenceRepository
              filteredDocs={vdr.filteredDocs}
              totalCount={DOCUMENTS.length}
              searchQuery={vdr.searchQuery}
              onSearchChange={vdr.setSearchQuery}
              downloadingId={vdr.downloadingId}
              onDownload={vdr.downloadDoc}
              onPreview={vdr.setPreviewDoc}
              onClearFilters={() => {
                vdr.setSearchQuery("")
                vdr.setActiveTab("all")
              }}
            />

            <FinancialsSection property={property} comps={COMP_ROWS} />

            <LidarPreview
              onLaunchDollhouse={() =>
                notify({
                  title: "Dollhouse loading",
                  description: "Launching interactive 3D dollhouse model...",
                })
              }
              onPlayDrone={() =>
                notify({
                  title: "Drone scan queued",
                  description: "Loading 4K perimeter flight-through (3m 40s).",
                })
              }
            />
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
            <LoiGenerator
              price={vdr.loi.price}
              onPriceChange={vdr.loi.setPrice}
              earnest={vdr.loi.earnest}
              onEarnestChange={vdr.loi.setEarnest}
              closingDays={vdr.loi.closingDays}
              onClosingDaysChange={vdr.loi.setClosingDays}
              contingency={vdr.loi.contingency}
              onContingencyChange={vdr.loi.setContingency}
              principal={vdr.loi.principal}
              submitting={vdr.loi.submitting}
              submitted={vdr.loi.submitted}
              loiNumber={vdr.loi.number}
              error={vdr.loi.error}
              onSubmit={vdr.loi.submit}
              onReset={vdr.loi.reset}
            />
            <EscrowChannels />
            <DirectorCard />
          </aside>
        </div>
      </SectionWrapper>

      <ExhibitModal
        previewDoc={vdr.previewDoc}
        downloading={vdr.downloadingId === vdr.previewDoc?.id}
        onClose={() => vdr.setPreviewDoc(null)}
        onDownload={vdr.downloadDoc}
      />
      <VdrToasts toasts={toasts} />
    </div>
  )
}
