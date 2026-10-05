"use client"

import { IconCircleCheck } from "@tabler/icons-react"

export function ReviewStep() {
  const auditChecks = [
    {
      title: "MLS & Legal Title Verification Passed",
      desc: "Jurisdiction records validate fee-simple ownership.",
    },
    {
      title: "4K Media Assets Compressed & CDN Cached",
      desc: "High-resolution imagery prepared for private virtual data rooms.",
    },
    {
      title: "Sovereign Syndicate Broadcast Network Ready",
      desc: "Broadcasting to 14,000+ verified investors upon confirmation.",
    },
  ]

  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
          Final Syndicate Audit &amp; Verification
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
          Pre-flight verification checks before live global syndicate broadcast.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {auditChecks.map(({ title, desc }) => (
          <div key={title} className="p-4 rounded-2xl bg-tertiary/10 border border-tertiary/30 flex items-center gap-3">
            <IconCircleCheck className="text-on-tertiary-container size-5 shrink-0" />
            <div className="flex flex-col text-xs">
              <span className="font-bold text-on-tertiary-container">
                {title}
              </span>
              <span className="text-on-tertiary-container">
                {desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
