"use client"

import * as React from "react"
import {
  IconBuildingEstate,
  IconBuildingSkyscraper,
  IconSailboat,
  IconMountain,
  IconShieldLock,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import type { FormState } from "./types"

interface AssetLocationStepProps {
  form: FormState
  setForm: React.Dispatch<React.SetStateAction<FormState>>
}

export function AssetLocationStep({ form, setForm }: AssetLocationStepProps) {
  const propertyTypes = [
    {
      id: "villa",
      name: "Ultra Luxury Villa",
      desc: "Architectural estates with perimeter grounds, pool terraces, and horizon views.",
      icon: IconBuildingEstate,
    },
    {
      id: "penthouse",
      name: "Trophy Penthouse",
      desc: "Skyline crowned high-floor towers with wraparound terraces and keyed elevators.",
      icon: IconBuildingSkyscraper,
    },
    {
      id: "waterfront",
      name: "Waterfront Palazzo",
      desc: "Direct oceanfront or deepwater mooring frontage accommodating mega-yachts.",
      icon: IconSailboat,
    },
    {
      id: "chalet",
      name: "Alpine Chalet",
      desc: "Ski-in/ski-out mountain compounds with timber engineering and heated courts.",
      icon: IconMountain,
    },
    {
      id: "compound",
      name: "Private Compound",
      desc: "Multi-structure acreage properties with private guest houses and security gates.",
      icon: IconShieldLock,
    },
  ]

  const locationFields = [
    {
      key: "city",
      label: "City / Enclave",
      value: form.city,
      placeholder: "Bel Air, Los Angeles",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, city: e.target.value })),
    },
    {
      key: "state",
      label: "State",
      value: form.state,
      placeholder: "CA",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, state: e.target.value })),
    },
    {
      key: "zip",
      label: "ZIP Code",
      value: form.zip,
      placeholder: "90077",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, zip: e.target.value })),
    },
  ]

  const locationToggles = [
    {
      id: "gated",
      title: "Guarded Gate & 24/7 Security Patrol Zone",
      desc: "Property resides within private verified gated jurisdiction.",
      checked: form.gatedCommunity,
      setChecked: (checked: boolean) =>
        setForm((prev) => ({ ...prev, gatedCommunity: checked })),
    },
    {
      id: "mls-sync",
      title: "Real-Time MLS & National Luxury IDX Syndication",
      desc: "Auto-sync listing details to certified brokerage exchanges.",
      checked: form.mlsSync,
      setChecked: (checked: boolean) =>
        setForm((prev) => ({ ...prev, mlsSync: checked })),
    },
  ]

  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
          Asset Category &amp; Location
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
          Choose the architectural archetype and geographical positioning for this luxury holding.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {propertyTypes.map((pt) => {
          const Icon = pt.icon
          const isSelected = form.propertyType === pt.id
          return (
            <div
              key={pt.id}
              onClick={() =>
                setForm((prev) => ({ ...prev, propertyType: pt.id as FormState["propertyType"] }))
              }
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-3 ${
                isSelected
                  ? "border-secondary bg-secondary-container/20 shadow-md"
                  : "border-outline-variant/30 hover:border-outline-variant/70 bg-surface-container-low"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isSelected ? "bg-secondary text-primary-foreground" : "bg-surface-container text-secondary"
                }`}>
                  <Icon size={22} />
                </div>
                {isSelected && (
                  <Badge variant="gold" className="text-[10px]">Selected</Badge>
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">{pt.name}</h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
          Estate Listing Title
        </label>
        <Input
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="e.g. The Glass Horizon Villa"
          className="h-11"
        />
      </div>

      <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-4">
        <h3 className="text-base font-bold text-on-surface">Location &amp; Parcel Data</h3>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Street Address
          </label>
          <Input
            value={form.address}
            onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
            placeholder="10480 Bellagio Road"
            className="h-11"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {locationFields.map(({ key, label, value, placeholder, onChange }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                {label}
              </label>
              <Input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="h-11"
              />
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-col gap-3">
          {locationToggles.map(({ id, title, desc, checked, setChecked }) => (
            <div key={id} className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-low">
              <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={(checked) => setChecked(Boolean(checked))}
                className="mt-0.5"
              />
              <label htmlFor={id} className="cursor-pointer flex flex-col">
                <span className="text-xs font-bold text-on-surface">
                  {title}
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  {desc}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
