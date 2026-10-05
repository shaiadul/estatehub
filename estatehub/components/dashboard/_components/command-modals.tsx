"use client"

import { IconX } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { CommandState } from "./use-command-state"
import type { PropertyItem } from "./types"

interface CommandModalsProps {
  state: CommandState
}

const CATEGORY_OPTIONS = [
  "Villa",
  "Penthouse",
  "Island",
  "Manor",
  "Architectural",
] as const

interface ModalTextField {
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  type?: "email" | "number" | "text"
  required?: boolean
}

export function CommandModals({ state }: CommandModalsProps) {
  const {
    isAddPropertyModalOpen,
    setIsAddPropertyModalOpen,
    newPropertyTitle,
    setNewPropertyTitle,
    newPropertyLocation,
    setNewPropertyLocation,
    newPropertyPrice,
    setNewPropertyPrice,
    newPropertyCategory,
    setNewPropertyCategory,
    newPropertyBeds,
    setNewPropertyBeds,
    newPropertyBaths,
    setNewPropertyBaths,
    newPropertySqft,
    setNewPropertySqft,
    handleCreateProperty,
    counterModalOffer,
    setCounterModalOffer,
    counterPriceInput,
    setCounterPriceInput,
    handleApplyCounterOffer,
    isAddClientModalOpen,
    setIsAddClientModalOpen,
    newClientName,
    setNewClientName,
    newClientEntity,
    setNewClientEntity,
    newClientEmail,
    setNewClientEmail,
    newClientPhone,
    setNewClientPhone,
    newClientBudget,
    setNewClientBudget,
    newClientEnclave,
    setNewClientEnclave,
    handleCreateClient,
  } = state

  const locationPriceFields: ModalTextField[] = [
    {
      label: "Location",
      placeholder: "e.g. Bel Air, CA",
      value: newPropertyLocation,
      onChange: setNewPropertyLocation,
      required: true,
    },
    {
      label: "Price ($ USD)",
      placeholder: "e.g. 12500000",
      value: newPropertyPrice,
      onChange: setNewPropertyPrice,
      type: "number",
      required: true,
    },
  ]

  const bedBathFields: ModalTextField[] = [
    {
      label: "Bedrooms",
      value: newPropertyBeds,
      onChange: setNewPropertyBeds,
      type: "number",
    },
    {
      label: "Bathrooms",
      value: newPropertyBaths,
      onChange: setNewPropertyBaths,
      type: "number",
    },
  ]

  const contactFields: ModalTextField[] = [
    {
      label: "Email",
      placeholder: "client@familyoffice.com",
      value: newClientEmail,
      onChange: setNewClientEmail,
      type: "email",
      required: true,
    },
    {
      label: "Phone",
      placeholder: "+1 555-0192",
      value: newClientPhone,
      onChange: setNewClientPhone,
    },
  ]

  const targetFields: ModalTextField[] = [
    {
      label: "Target Budget ($)",
      placeholder: "15000000",
      value: newClientBudget,
      onChange: setNewClientBudget,
      type: "number",
    },
    {
      label: "Target Enclave",
      placeholder: "Bel Air, Miami",
      value: newClientEnclave,
      onChange: setNewClientEnclave,
    },
  ]

  return (
    <>
      {isAddPropertyModalOpen && (
        <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-primary-container/70 p-4 backdrop-blur-md fade-in">
          <div className="flex w-full max-w-lg flex-col gap-4 rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div>
                <h3 className="text-base font-bold text-on-surface">
                  Add New Property to Inventory
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Enroll listing into the management database
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddPropertyModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              >
                <IconX size={16} />
              </button>
            </div>

            <form
              onSubmit={handleCreateProperty}
              className="flex flex-col gap-3"
            >
              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Property Title
                </label>
                <Input
                  required
                  placeholder="e.g. The Bel Air Hilltop Manor"
                  value={newPropertyTitle}
                  onChange={(e) => setNewPropertyTitle(e.target.value)}
                  className="h-10 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {locationPriceFields.map((field) => (
                  <div key={field.label}>
                    <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                      {field.label}
                    </label>
                    <Input
                      required={field.required}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="h-10 rounded-xl text-xs"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Category
                  </label>
                  <select
                    value={newPropertyCategory}
                    onChange={(e) =>
                      setNewPropertyCategory(
                        e.target.value as PropertyItem["category"]
                      )
                    }
                    className="h-10 w-full rounded-xl border border-outline-variant/40 bg-surface-container-low px-3 text-xs text-on-surface"
                  >
                    {CATEGORY_OPTIONS.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                {bedBathFields.map((field) => (
                  <div key={field.label}>
                    <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                      {field.label}
                    </label>
                    <Input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="h-10 rounded-xl text-xs"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-2 flex items-center justify-end gap-2 border-t border-outline-variant/30 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddPropertyModalOpen(false)}
                  className="h-10 rounded-xl border-outline-variant/40 px-4 text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                >
                  Save Listing
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {counterModalOffer && (
        <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-primary-container/70 p-4 backdrop-blur-md fade-in">
          <div className="flex w-full max-w-md flex-col gap-4 rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div>
                <h3 className="text-base font-bold text-on-surface">
                  Submit Counter-Offer
                </h3>
                <p className="text-xs text-on-surface-variant">
                  {counterModalOffer.propertyTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCounterModalOffer(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              >
                <IconX size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-3 text-xs">
                <span className="text-on-surface-variant">
                  Buyer's Submitted Price:
                </span>
                <p className="text-base font-extrabold text-on-surface">
                  ${(counterModalOffer.offerPrice / 1000000).toFixed(2)}M
                </p>
                <span className="text-[11px] text-on-surface-variant">
                  {counterModalOffer.buyerName}
                </span>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Proposed Counter Valuation ($ USD)
                </label>
                <Input
                  type="number"
                  value={counterPriceInput}
                  onChange={(e) => setCounterPriceInput(e.target.value)}
                  className="h-10 rounded-xl font-mono text-xs"
                  placeholder="e.g. 8900000"
                />
              </div>

              <div className="mt-2 flex items-center justify-end gap-2 border-t border-outline-variant/30 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCounterModalOffer(null)}
                  className="h-10 rounded-xl border-outline-variant/40 px-4 text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleApplyCounterOffer}
                  className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                >
                  Transmit Counter-Offer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddClientModalOpen && (
        <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-primary-container/70 p-4 backdrop-blur-md fade-in">
          <div className="flex w-full max-w-md flex-col gap-4 rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div>
                <h3 className="text-base font-bold text-on-surface">
                  Enroll Client Dossier
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Create accredited investor profile in CRM
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddClientModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              >
                <IconX size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Full Name
                </label>
                <Input
                  required
                  placeholder="e.g. Lord Alistair Sterling"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="h-10 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Corporate Entity / Trust
                </label>
                <Input
                  placeholder="e.g. Sterling Heritage S.A."
                  value={newClientEntity}
                  onChange={(e) => setNewClientEntity(e.target.value)}
                  className="h-10 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {contactFields.map((field) => (
                  <div key={field.label}>
                    <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                      {field.label}
                    </label>
                    <Input
                      required={field.required}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="h-10 rounded-xl text-xs"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {targetFields.map((field) => (
                  <div key={field.label}>
                    <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                      {field.label}
                    </label>
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="h-10 rounded-xl text-xs"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-2 flex items-center justify-end gap-2 border-t border-outline-variant/30 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddClientModalOpen(false)}
                  className="h-10 rounded-xl border-outline-variant/40 px-4 text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                >
                  Save Client
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
