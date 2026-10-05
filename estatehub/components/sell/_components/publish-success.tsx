"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import {
  IconArrowRight,
  IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { FormState } from "./types"

interface PublishSuccessProps {
  form: FormState
  onReset: () => void
}

export function PublishSuccess({ form, onReset }: PublishSuccessProps) {
  const successStats: { key: string; label: string; valueClassName: string; value: ReactNode }[] = [
    {
      key: "status",
      label: "Syndicate Status",
      valueClassName: "text-sm font-bold text-on-tertiary-container flex items-center gap-1.5 mt-1",
      value: (
        <>
          <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" /> Live Broadcasting
        </>
      ),
    },
    {
      key: "valuation",
      label: "Target Valuation",
      valueClassName: "text-sm font-bold text-on-surface mt-1",
      value: <>${form.price.toLocaleString()} USD</>,
    },
    {
      key: "reach",
      label: "Investor Reach",
      valueClassName: "text-sm font-bold text-secondary mt-1",
      value: <>14,280+ High Net Worth</>,
    },
  ]

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col items-center text-center max-w-3xl mx-auto animate-in zoom-in-95 duration-300">
      <div className="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-fixed mb-6 shadow-md">
        <IconRosetteDiscountCheckFilled size={44} className="text-secondary" />
      </div>
      <Badge variant="gold" className="mb-3 text-xs font-bold uppercase tracking-wider">
        Syndicate Verified &amp; Active
      </Badge>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
        Listing Successfully Transmitted
      </h2>
      <p className="text-sm text-on-surface-variant max-w-xl mb-6 leading-relaxed">
        <strong className="text-on-surface">{form.title}</strong> has been encrypted and broadcast to the EstateHub Private Investor Syndicate. MLS ID <strong className="text-secondary font-mono">#EH-77894</strong> is officially reserved.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
        {successStats.map(({ key, label, valueClassName, value }) => (
          <div key={key} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
            <span className="text-xs text-on-surface-variant font-medium">{label}</span>
            <span className={valueClassName}>
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          variant="gold"
          size="lg"
          render={<Link href="/properties" />}
          className="gap-2"
        >
          <span>View in Portfolio</span>
          <IconArrowRight size={18} />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onReset}
        >
          Submit Another Estate
        </Button>
      </div>
    </div>
  )
}
