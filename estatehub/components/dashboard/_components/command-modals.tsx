"use client"

import { IconX } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { CommandState } from "./use-command-state"
import type { PropertyItem } from "./types"
import { useI18n } from "@/lib/i18n"

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
  const { t } = useI18n()
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
    properties,
    isSubmitLoiModalOpen,
    setIsSubmitLoiModalOpen,
    loiTargetProperty,
    setLoiTargetProperty,
    loiOfferPrice,
    setLoiOfferPrice,
    loiEarnestDeposit,
    setLoiEarnestDeposit,
    loiFinancing,
    setLoiFinancing,
    loiContingencyDays,
    setLoiContingencyDays,
    handleSubmitLoi,
    isBookTourModalOpen,
    setIsBookTourModalOpen,
    tourPropertyId,
    setTourPropertyId,
    tourDate,
    setTourDate,
    tourTimeSlot,
    setTourTimeSlot,
    tourTransportType,
    setTourTransportType,
    tourSpecialRequests,
    setTourSpecialRequests,
    handleBookTour,
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
                  {t("dash.cancel", "Cancel")}
                </Button>
                <Button
                  type="submit"
                  className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                >
                  {t("dash.saveListing", "Save Listing")}
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
                  {t("dash.cancel", "Cancel")}
                </Button>
                <Button
                  onClick={handleApplyCounterOffer}
                  className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                >
                  {t("dash.submitCounter", "Transmit Counter-Offer")}
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
                  {t("dash.cancel", "Cancel")}
                </Button>
                <Button
                  type="submit"
                  className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                >
                  {t("dash.saveClient", "Save Client")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Submit LOI Modal (Buyer Feature) */}
      {isSubmitLoiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
              <div>
                <h3 className="text-base font-black text-on-surface">
                  Submit Purchase LOI (Letter of Intent)
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Transmit an encrypted, legally binding purchase proposal to seller trust
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSubmitLoiModalOpen(false)}
                className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container"
              >
                <IconX size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitLoi} className="mt-4 flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Target Estate Listing
                </label>
                <select
                  value={loiTargetProperty}
                  onChange={(e) => {
                    setLoiTargetProperty(e.target.value)
                    const p = properties.find((item) => item.id === e.target.value)
                    if (p) {
                      setLoiOfferPrice(String(p.price))
                      setLoiEarnestDeposit(String(Math.round(p.price * 0.1)))
                    }
                  }}
                  className="h-10 w-full rounded-xl border border-outline-variant/40 bg-surface-container-low px-3 text-xs font-semibold text-on-surface focus:outline-none"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} (${(p.price / 1000000).toFixed(2)}M - {p.location})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Proposed Purchase Price ($ USD) *
                  </label>
                  <Input
                    type="number"
                    required
                    value={loiOfferPrice}
                    onChange={(e) => {
                      setLoiOfferPrice(e.target.value)
                      const val = Number(e.target.value)
                      if (!isNaN(val)) {
                        setLoiEarnestDeposit(String(Math.round(val * 0.1)))
                      }
                    }}
                    placeholder="e.g. 8500000"
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Earnest Deposit ($ USD)
                  </label>
                  <Input
                    type="number"
                    value={loiEarnestDeposit}
                    onChange={(e) => setLoiEarnestDeposit(e.target.value)}
                    placeholder="10% in trust"
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Financing &amp; Settlement
                  </label>
                  <select
                    value={loiFinancing}
                    onChange={(e) => setLoiFinancing(e.target.value)}
                    className="h-10 w-full rounded-xl border border-outline-variant/40 bg-surface-container-low px-3 text-xs font-semibold text-on-surface focus:outline-none"
                  >
                    <option value="Institutional All-Cash Wire">Institutional All-Cash Wire</option>
                    <option value="Private Banking Sovereign Wire">Private Banking Sovereign Wire</option>
                    <option value="Escrow Deposit via First American">Escrow Deposit via First American</option>
                    <option value="Crypto On-Chain USDC Escrow">Crypto On-Chain USDC Escrow</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Diligence Contingency (Days)
                  </label>
                  <Input
                    type="number"
                    value={loiContingencyDays}
                    onChange={(e) => setLoiContingencyDays(e.target.value)}
                    placeholder="14"
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-3 text-xs text-on-surface-variant">
                <span className="font-bold text-on-secondary-container">Proof of Funds Verification: </span>
                Your accredited sovereign liquidity letter is verified and will accompany this offer package.
              </div>

              <div className="mt-2 flex items-center justify-end gap-2 border-t border-outline-variant/30 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsSubmitLoiModalOpen(false)}
                  className="h-10 rounded-xl border-outline-variant/40 px-4 text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                >
                  Transmit Bilateral LOI
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Book Tour Modal (Buyer & Organizer Feature) */}
      {isBookTourModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
              <div>
                <h3 className="text-base font-black text-on-surface">
                  Book Private Showing &amp; Inspection Tour
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Arrange a confidential on-site walkthrough with fleet transport and security escorts
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsBookTourModalOpen(false)}
                className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container"
              >
                <IconX size={18} />
              </button>
            </div>

            <form onSubmit={handleBookTour} className="mt-4 flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Estate Residence
                </label>
                <select
                  value={tourPropertyId}
                  onChange={(e) => setTourPropertyId(e.target.value)}
                  className="h-10 w-full rounded-xl border border-outline-variant/40 bg-surface-container-low px-3 text-xs font-semibold text-on-surface focus:outline-none"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} - {p.location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Preferred Date
                  </label>
                  <Input
                    value={tourDate}
                    onChange={(e) => setTourDate(e.target.value)}
                    placeholder="e.g. Tomorrow, 14:00 PST"
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                    Time Window
                  </label>
                  <Input
                    value={tourTimeSlot}
                    onChange={(e) => setTourTimeSlot(e.target.value)}
                    placeholder="14:00 - 16:30"
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Concierge Transit Fleet
                </label>
                <select
                  value={tourTransportType}
                  onChange={(e) =>
                    setTourTransportType(
                      e.target.value as
                        | "Chauffeured Maybach"
                        | "Private Helicopter"
                        | "Discreet Chauffeur"
                        | "Virtual LiDAR 3D"
                    )
                  }
                  className="h-10 w-full rounded-xl border border-outline-variant/40 bg-surface-container-low px-3 text-xs font-semibold text-on-surface focus:outline-none"
                >
                  <option value="Chauffeured Maybach">Chauffeured Maybach (Diplomatic Grade)</option>
                  <option value="Private Helicopter">Private Helicopter (Helipad Direct Landing)</option>
                  <option value="Discreet Chauffeur">Discreet Executive Chauffeur (Unmarked)</option>
                  <option value="Virtual LiDAR 3D">Virtual LiDAR 3D Live Stream (Remote)</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-on-surface-variant">
                  Special Protocols / Escort Security Notes
                </label>
                <textarea
                  value={tourSpecialRequests}
                  onChange={(e) => setTourSpecialRequests(e.target.value)}
                  placeholder="e.g. Personal security detail requiring gate clearance, NDA verification, dietary preferences..."
                  rows={3}
                  className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low p-3 text-xs text-on-surface focus:outline-none"
                />
              </div>

              <div className="mt-2 flex items-center justify-end gap-2 border-t border-outline-variant/30 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsBookTourModalOpen(false)}
                  className="h-10 rounded-xl border-outline-variant/40 px-4 text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                >
                  Confirm &amp; Dispatch Showing
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
