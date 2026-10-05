"use client"

import Image from "next/image"
import {
  IconMapPin,
  IconEye,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import type { FormState } from "./types"

interface LivePreviewSidebarProps {
  form: FormState
}

export function LivePreviewSidebar({ form }: LivePreviewSidebarProps) {
  const previewStats = [
    { key: "beds", value: String(form.beds), label: "Beds" },
    { key: "baths", value: String(form.baths), label: "Baths" },
    { key: "sqft", value: form.sqft.toLocaleString(), label: "Sq Ft" },
  ]

  return (
    <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 shadow-xl flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
            <IconEye size={16} className="text-secondary" />
            Live Investor Preview
          </span>
          <Badge variant="gold" className="text-[10px]">Real-time IDX</Badge>
        </div>

        <div className="rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-low shadow-sm">
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={form.heroImage}
              alt={form.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-primary-container/80 text-primary-foreground font-bold text-xs">
                ${form.price.toLocaleString()}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed text-[10px] font-bold">
                {form.propertyType.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="p-5 flex flex-col gap-2">
            <h3 className="text-base font-bold text-on-surface truncate">
              {form.title || "Untitled Estate"}
            </h3>
            <p className="text-xs text-on-surface-variant flex items-center gap-1 truncate">
              <IconMapPin size={14} className="text-secondary shrink-0" />
              <span>{form.address}, {form.city}, {form.state} {form.zip}</span>
            </p>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-outline-variant/20 text-center text-xs text-on-surface-variant mt-1">
              {previewStats.map(({ key, value, label }) => (
                <div key={key}>
                  <span className="block font-bold text-on-surface text-sm">{value}</span>
                  <span className="text-[10px]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-2.5 text-xs">
          <div className="flex items-center justify-between font-semibold">
            <span className="text-on-surface-variant">Estimated Velocity</span>
            <span className="text-on-tertiary-container font-bold">Top 8% Tier</span>
          </div>
          <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
            <div className="h-full bg-secondary rounded-full w-[92%]" />
          </div>
          <span className="text-[11px] text-on-surface-variant">
            Valuation aligns with recent Bel Air knoll comps within $1,150/sq ft.
          </span>
        </div>
      </div>
    </div>
  )
}
