"use client"

import { IconDownload, IconEye, IconFileText } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import type { DiligenceDoc } from "./types"

interface DocumentCardProps {
  doc: DiligenceDoc
  downloading: boolean
  onDownload: (id: string) => void
  onPreview: (doc: DiligenceDoc) => void
}

export function DocumentCard({ doc, downloading, onDownload, onPreview }: DocumentCardProps) {
  return (
    <article className="p-4 rounded-xl bg-surface-container-low/70 hover:bg-surface-container transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-outline-variant/20">
      <div className="flex items-start sm:items-center gap-3 min-w-0">
        <div
          aria-hidden
          className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs"
        >
          <IconFileText className="w-5 h-5 text-secondary" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs sm:text-sm font-bold text-on-surface">{doc.title}</span>
            <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-on-tertiary-container text-[10px] font-bold">
              {doc.badge}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-on-surface-variant flex-wrap mt-0.5">
            <span>{doc.source}</span>
            <span aria-hidden>•</span>
            <span>{doc.date}</span>
            <span aria-hidden>•</span>
            <span>{doc.size}</span>
            <span aria-hidden>•</span>
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
          disabled={downloading}
          onClick={() => onDownload(doc.id)}
          aria-live="polite"
          className="text-xs rounded-lg px-3 py-1.5 h-auto font-semibold gap-1 bg-primary text-on-primary"
        >
          <IconDownload className="w-3.5 h-3.5" />
          <span>{downloading ? "Decrypting..." : "Download"}</span>
        </Button>
      </div>
    </article>
  )
}
