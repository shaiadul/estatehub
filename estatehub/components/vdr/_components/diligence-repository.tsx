"use client"

import { IconSearch, IconFileText, IconEye, IconDownload } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { DiligenceDoc } from "./types"

interface DiligenceRepositoryProps {
  filteredDocs: DiligenceDoc[]
  searchQuery: string
  onSearchChange: (value: string) => void
  downloadingId: string | null
  onDownload: (id: string) => void
  onPreview: (doc: DiligenceDoc) => void
}

export function DiligenceRepository({
  filteredDocs,
  searchQuery,
  onSearchChange,
  downloadingId,
  onDownload,
  onPreview,
}: DiligenceRepositoryProps) {
  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 sm:p-7 flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-container">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
              Unredacted Diligence Repository
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-on-secondary-container font-mono text-[10px] font-bold">
              SHA-256 Validated
            </span>
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
            All exhibits contain unredacted legal descriptors, surveyor stamps, and bilateral escrow disclosures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Filter exhibits..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-surface-container-low text-xs pl-8 pr-3 py-1.5 h-auto rounded-xl w-40 sm:w-48"
            />
            <IconSearch className="w-3.5 h-3.5 text-outline absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-4 rounded-xl bg-surface-container-low/70 hover:bg-surface-container transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-outline-variant/20"
          >
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs">
                <IconFileText className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface">
                    {doc.title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-on-tertiary-container font-caption text-[10px] font-bold">
                    {doc.badge}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-caption text-[11px] text-on-surface-variant flex-wrap mt-0.5">
                  <span>{doc.source}</span>
                  <span>•</span>
                  <span>{doc.date}</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span className="font-mono text-[10px] text-outline">{doc.sha}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onPreview(doc)}
                className="text-xs rounded-lg px-2.5 py-1.5 h-auto font-semibold gap-1 bg-surface-container-lowest"
              >
                <IconEye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </Button>
              <Button
                size="sm"
                disabled={downloadingId === doc.id}
                onClick={() => onDownload(doc.id)}
                className="text-xs rounded-lg px-3 py-1.5 h-auto font-semibold gap-1 bg-primary text-on-primary"
              >
                <IconDownload className="w-3.5 h-3.5" />
                <span>{downloadingId === doc.id ? "Decrypting..." : "Download"}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}