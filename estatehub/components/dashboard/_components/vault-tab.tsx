"use client"

import {
  IconFileText,
  IconCheck,
  IconUpload,
  IconDownload,
  IconFolderCheck,
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
import type { CommandState } from "./use-command-state"
import { useI18n } from "@/lib/i18n"

interface VaultTabProps {
  state: CommandState
}

export function VaultTab({ state }: VaultTabProps) {
  const { t } = useI18n()
  const { documents, triggerToast } = state

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardHeader className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconFolderCheck size={16} />
              </span>
              <CardTitle className="text-base font-bold text-on-surface">
                Legal Documents &amp; Due Diligence Vault
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-on-surface-variant">
              Encrypted title deeds, purchase agreements, and verified architectural surveys
            </CardDescription>
          </div>

          <Button
            onClick={() => triggerToast("Initializing secure file upload tunnel...")}
            size="sm"
            className="flex h-9 items-center gap-1.5 self-start rounded-xl bg-primary px-3.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 sm:self-auto"
          >
            <IconUpload size={15} />
            <span>{t("dash.uploadDoc", "Upload Document")}</span>
          </Button>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low/60 p-4 transition-all duration-200 hover:border-secondary/40 hover:bg-surface-container-low"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <IconFileText size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-on-surface line-clamp-1">
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

                <div className="flex items-center justify-between border-t border-outline-variant/20 pt-2.5">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-tertiary">
                    <IconCheck size={13} />
                    <span>{doc.status}</span>
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => triggerToast(`Downloading verified packet: ${doc.title}`)}
                    className="flex h-8 items-center gap-1.5 rounded-lg border-outline-variant/40 px-3 text-xs font-semibold hover:bg-surface-container"
                  >
                    <IconDownload size={13} />
                    <span>{t("dash.download", "Download")}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
