"use client"

import {
  IconFileText,
  IconCheck,
  IconUpload,
  IconDownload,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CommandState } from "./use-command-state"

interface VaultTabProps {
  state: CommandState
}

export function VaultTab({ state }: VaultTabProps) {
  const { documents, triggerToast } = state

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-black text-on-surface">
              Legal Documents &amp; Due Diligence Vault
            </h2>
            <p className="text-xs text-on-surface-variant">
              Encrypted title deeds, purchase agreements, and verified
              architectural surveys
            </p>
          </div>

          <Button
            onClick={() =>
              triggerToast("Initializing secure file upload tunnel...")
            }
            className="flex h-10 items-center gap-2 self-start rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground hover:bg-primary/90 sm:self-auto"
          >
            <IconUpload size={16} />
            <span>Upload Document</span>
          </Button>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col justify-between gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <IconFileText size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs leading-snug font-bold text-on-surface">
                      {doc.title}
                    </h4>
                    <span className="font-mono text-[10px] text-on-surface-variant">
                      {doc.fileSize} • {doc.uploadedDate}
                    </span>
                  </div>
                </div>
                <Badge variant="gold" className="shrink-0 text-[10px]">
                  {doc.category}
                </Badge>
              </div>

              <div className="flex items-center justify-between border-t border-outline-variant/20 pt-2">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-tertiary">
                  <IconCheck size={13} />
                  <span>{doc.status}</span>
                </span>

                <Button
                  variant="outline"
                  onClick={() =>
                    triggerToast(`Downloading verified packet: ${doc.title}`)
                  }
                  className="flex h-8 items-center gap-1.5 rounded-lg border-outline-variant/40 px-3 text-xs font-bold hover:bg-surface-container-high/40"
                >
                  <IconDownload size={14} />
                  <span>Download</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
