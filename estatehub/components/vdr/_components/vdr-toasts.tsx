"use client"

import { AppToasts } from "@/components/ui/app-toast"
import type { VdrToast } from "./use-vdr-state"

/** Thin wrapper — keeps VDR imports stable, renders the shared app toast design. */
export function VdrToasts({ toasts }: { toasts: VdrToast[] }) {
  return <AppToasts toasts={toasts} />
}
