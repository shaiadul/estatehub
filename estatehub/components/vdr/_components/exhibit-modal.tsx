"use client"

import { IconFileText } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import type { DiligenceDoc } from "./types"

interface ExhibitModalProps {
  previewDoc: DiligenceDoc | null
  onClose: () => void
  onDownload: (id: string) => void
}

export function ExhibitModal({ previewDoc, onClose, onDownload }: ExhibitModalProps) {
  if (!previewDoc) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl p-6 border border-outline-variant/30 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
          <div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">{previewDoc.title}</h3>
            <p className="text-xs text-on-surface-variant">{previewDoc.source} • {previewDoc.date}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface"
          >
            ✕
          </button>
        </div>

        <div className="p-8 bg-surface-container-low rounded-xl text-center flex flex-col items-center gap-3">
          <IconFileText className="w-12 h-12 text-on-secondary-container" />
          <div>
            <p className="font-bold text-sm text-on-surface">Unredacted Exhibit Watermarked for Session</p>
            <p className="text-xs text-on-surface-variant font-mono mt-1">{previewDoc.sha}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-tertiary/10 text-on-tertiary-container text-xs font-bold">
            {previewDoc.badge}
          </span>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Preview
          </Button>
          <Button size="sm" onClick={() => onDownload(previewDoc.id)}>
            Download Full {previewDoc.size}
          </Button>
        </div>
      </div>
    </div>
  )
}