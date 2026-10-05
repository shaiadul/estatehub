"use client"

import { IconFileText } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { DiligenceDoc } from "./types"

interface ExhibitModalProps {
  previewDoc: DiligenceDoc | null
  downloading: boolean
  onClose: () => void
  onDownload: (id: string) => void
}

export function ExhibitModal({ previewDoc, downloading, onClose, onDownload }: ExhibitModalProps) {
  return (
    <Dialog open={previewDoc !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl bg-surface-container-lowest border-outline-variant/30 p-6">
        {previewDoc && (
          <>
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-on-surface">
                {previewDoc.title}
              </DialogTitle>
              <DialogDescription>
                {previewDoc.source} • {previewDoc.date} • {previewDoc.size}
              </DialogDescription>
            </DialogHeader>

            <div className="p-8 bg-surface-container-low rounded-xl text-center flex flex-col items-center gap-3">
              <IconFileText className="w-12 h-12 text-on-secondary-container" />
              <div>
                <p className="font-bold text-sm text-on-surface">
                  Unredacted Exhibit Watermarked for Session
                </p>
                <p className="text-xs text-on-surface-variant font-mono mt-1">{previewDoc.sha}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-tertiary/10 text-on-tertiary-container text-xs font-bold">
                {previewDoc.badge}
              </span>
            </div>

            <DialogFooter className="bg-transparent border-0 p-0 mx-0 mb-0">
              <Button variant="outline" size="sm" onClick={onClose}>
                Close Preview
              </Button>
              <Button size="sm" disabled={downloading} onClick={() => onDownload(previewDoc.id)}>
                {downloading ? "Decrypting..." : `Download Full ${previewDoc.size}`}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
