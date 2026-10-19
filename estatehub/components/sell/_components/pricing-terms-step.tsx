"use client"

import * as React from "react"
import { IconSparkles } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { estimateValuationAction } from "@/actions/properties"
import type { ValuationResult } from "@/actions/types"
import type { FormState } from "./types"

interface PricingTermsStepProps {
  form: FormState
  setForm: React.Dispatch<React.SetStateAction<FormState>>
}

export function PricingTermsStep({ form, setForm }: PricingTermsStepProps) {
  const [valuationData, setValuationData] = React.useState<ValuationResult | null>(null)

  React.useEffect(() => {
    estimateValuationAction({
      property_type: form.propertyType,
      sqft: form.sqft,
      beds: form.beds,
      baths: form.baths,
      city: form.city,
      state: form.state,
      amenities_count: form.selectedAmenities.length,
      asking_price: form.price,
    })
      .then((res) => {
        if (res.success && res.data) {
          setValuationData(res.data)
        }
      })
      .catch(() => {})
  }, [
    form.propertyType,
    form.sqft,
    form.beds,
    form.baths,
    form.city,
    form.state,
    form.selectedAmenities.length,
    form.price,
  ])

  const secondaryFields = [
    {
      key: "hoaFee",
      label: "Monthly HOA / Maintenance ($)",
      value: form.hoaFee,
      step: undefined as string | undefined,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, hoaFee: Number(e.target.value) })),
    },
    {
      key: "commission",
      label: "Buyer Broker Commission (%)",
      value: form.commission,
      step: "0.1" as string | undefined,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, commission: Number(e.target.value) })),
    },
  ]

  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
          Valuation &amp; Syndicate Terms
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
          Establish asking price, escrow conditions, and buyer verification rules.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Asking Price (USD)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">$</span>
            <Input
              type="number"
              value={form.price}
              onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
              className="h-12 pl-8 text-lg font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {secondaryFields.map(({ key, label, value, step, onChange }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                {label}
              </label>
              <Input
                type="number"
                step={step}
                value={value}
                onChange={onChange}
                className="h-11 font-bold"
              />
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3 mt-2">
          <Checkbox
            id="nda"
            checked={form.ndaRequired}
            onCheckedChange={(checked) =>
              setForm((prev) => ({ ...prev, ndaRequired: Boolean(checked) }))
            }
            className="mt-0.5"
          />
          <label htmlFor="nda" className="cursor-pointer flex flex-col">
            <span className="text-xs font-bold text-on-surface">
              Confidential NDA Required for Financial Disclosures
            </span>
            <span className="text-[11px] text-on-surface-variant">
              Prospective buyers must execute institutional non-disclosure agreement prior to viewing escrow &amp; title data.
            </span>
          </label>
        </div>

        {valuationData && (
          <div className="p-4 rounded-2xl bg-surface-container-low border border-secondary/30 flex flex-col gap-2.5 mt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-on-surface flex items-center gap-1.5">
                <IconSparkles size={14} className="text-secondary" />
                Institutional Algorithmic Valuation Comps
              </span>
              <Badge variant="gold" className="text-[10px]">
                {valuationData.confidence_score}% Confidence · {valuationData.comps_count} Comps
              </Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1 border-t border-outline-variant/20">
              <div>
                <span className="text-[11px] text-on-surface-variant block">Fair Value Band</span>
                <span className="font-bold text-on-surface font-mono">
                  ${(valuationData.value_range_low / 1000000).toFixed(2)}M - ${(valuationData.value_range_high / 1000000).toFixed(2)}M
                </span>
              </div>
              <div>
                <span className="text-[11px] text-on-surface-variant block">Algorithmic Target</span>
                <span className="font-bold text-secondary font-mono">
                  ${(valuationData.estimated_value / 1000000).toFixed(2)}M
                </span>
              </div>
              <div>
                <span className="text-[11px] text-on-surface-variant block">Comp Benchmark</span>
                <span className="font-bold text-on-surface font-mono">
                  ${valuationData.price_per_sqft}/sqft
                </span>
              </div>
              <div>
                <span className="text-[11px] text-on-surface-variant block">Est. Cap Rate</span>
                <span className="font-bold text-tertiary font-mono">
                  {valuationData.cap_rate_estimated}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
