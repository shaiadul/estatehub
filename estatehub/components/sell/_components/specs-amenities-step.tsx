"use client"

import * as React from "react"
import {
  IconBed,
  IconBath,
  IconRuler,
  IconTree,
  IconCalendarEvent,
  IconCar,
} from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import type { FormState } from "./types"

interface SpecsAmenitiesStepProps {
  form: FormState
  setForm: React.Dispatch<React.SetStateAction<FormState>>
  toggleAmenity: (item: string) => void
}

export function SpecsAmenitiesStep({ form, setForm, toggleAmenity }: SpecsAmenitiesStepProps) {
  const luxuryAmenitiesList = [
    "Zero-Edge Infinity Pool",
    "600-Bottle Glass Wine Cellar",
    "Dolby Atmos Cinema",
    "Gaggenau 400 Kitchen Suite",
    "Subterranean Motor Vault",
    "Private Heli-Drop Landing Pad",
    "Deepwater Yacht Mooring (100ft+)",
    "Lutron HomeWorks Automation",
    "Tesla Powerwall 3 Battery Bank",
    "Thermal Night-Vision Perimeter Sentry",
    "Biometric Safe Room & Vault",
    "Finnish Wellness Sauna & Cold Plunge",
  ]

  const specFields = [
    {
      key: "beds",
      label: "Bedrooms",
      Icon: IconBed,
      type: "number" as const,
      value: form.beds,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, beds: Number(e.target.value) })),
    },
    {
      key: "baths",
      label: "Bathrooms",
      Icon: IconBath,
      type: "number" as const,
      value: form.baths,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, baths: Number(e.target.value) })),
    },
    {
      key: "sqft",
      label: "Interior Sq Ft",
      Icon: IconRuler,
      type: "number" as const,
      value: form.sqft,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, sqft: Number(e.target.value) })),
    },
    {
      key: "lotSize",
      label: "Lot Acreage",
      Icon: IconTree,
      type: undefined as undefined,
      value: form.lotSize,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, lotSize: e.target.value })),
    },
    {
      key: "yearBuilt",
      label: "Year Built",
      Icon: IconCalendarEvent,
      type: "number" as const,
      value: form.yearBuilt,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, yearBuilt: Number(e.target.value) })),
    },
    {
      key: "garage",
      label: "Garage Bays",
      Icon: IconCar,
      type: "number" as const,
      value: form.garage,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, garage: Number(e.target.value) })),
    },
  ]

  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
          Architectural Specifications &amp; Amenities
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
          Detail the scale, interior metrics, and signature luxury features of this estate.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {specFields.map(({ key, label, Icon, type, value, onChange }) => (
          <div key={key} className="flex flex-col gap-1.5 p-4 rounded-2xl bg-surface-container-low">
            <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
              <Icon size={16} className="text-secondary" /> {label}
            </label>
            <Input
              type={type}
              value={value}
              onChange={onChange}
              className="h-10 text-base font-bold"
            />
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-3">
        <div>
          <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
            Luxury Finishes &amp; Amenities
          </h3>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Highlight distinguishing estate assets for high-net-worth filter indexing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {luxuryAmenitiesList.map((amenity) => {
            const isChecked = form.selectedAmenities.includes(amenity)
            return (
              <div
                key={amenity}
                onClick={() => toggleAmenity(amenity)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isChecked
                    ? "border-secondary bg-secondary-container/20 text-on-surface font-semibold"
                    : "border-outline-variant/30 bg-surface-container-low text-on-surface-variant hover:border-outline-variant/60"
                }`}
              >
                <span className="text-xs">{amenity}</span>
                <Checkbox checked={isChecked} onCheckedChange={() => toggleAmenity(amenity)} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
