"use client"

import { IconFileSearch, IconSearch } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { DocumentCard } from "./document-card"
import type { DiligenceDoc } from "./types"

interface DiligenceRepositoryProps {
  filteredDocs: DiligenceDoc[]
  totalCount: number
  searchQuery: string
  onSearchChange: (value: string) => void
  downloadingId: string | null
  onDownload: (id: string) => void
  onPreview: (doc: DiligenceDoc) => void
  onClearFilters: () => void
}

export function DiligenceRepository({
  filteredDocs,
  totalCount,
  searchQuery,
  onSearchChange,
  downloadingId,
  onDownload,
  onPreview,
  onClearFilters,
}: DiligenceRepositoryProps) {
  return (
    <section
      aria-label="Diligence repository"
      className="w-full bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 sm:p-7 flex flex-col gap-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-container">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg sm:text-xl font-bold text-on-surface">
              Unredacted Diligence Repository
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-on-secondary-container font-mono text-[10px] font-bold">
              SHA-256 Validated • {filteredDocs.length}/{totalCount}
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            All exhibits contain unredacted legal descriptors, surveyor stamps, and bilateral escrow
            disclosures.
          </p>
        </div>

        <div className="relative">
          <Input
            type="search"
            placeholder="Filter exhibits..."
            aria-label="Filter exhibits"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-surface-container-low text-xs pl-8 pr-3 py-1.5 h-auto rounded-xl w-40 sm:w-48"
          />
          <IconSearch className="w-3.5 h-3.5 text-outline absolute left-2.5 top-2.5" />
        </div>
      </div>

      {filteredDocs.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <IconFileSearch className="w-8 h-8 text-outline" />
          <p className="text-sm font-bold text-on-surface">No exhibits match your filters</p>
          <p className="text-xs text-on-surface-variant">
            Try a different keyword or category.
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-1 px-3 py-1.5 rounded-lg bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high"
          >
            Clear search &amp; filters
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {filteredDocs.map((doc) => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              downloading={downloadingId === doc.id}
              onDownload={onDownload}
              onPreview={onPreview}
            />
          ))}
        </div>
      )}
    </section>
  )
}
