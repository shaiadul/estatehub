"use client"

import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CommandState } from "./use-command-state"
import { useI18n } from "@/lib/i18n"

interface OffersTabProps {
  state: CommandState
}

const OFFER_STATUS_FILTERS = [
  "All",
  "Pending Review",
  "Under Negotiation",
  "Escrow Opened",
  "Declined",
]

const OFFER_COLUMNS = [
  { label: "Offer ID", alignRight: false },
  { label: "Target Estate", alignRight: false },
  { label: "Prospective Buyer", alignRight: false },
  { label: "Offer Valuation", alignRight: false },
  { label: "Earnest Wire", alignRight: false },
  { label: "Status", alignRight: false },
  { label: "Negotiation Actions", alignRight: true },
]

export function OffersTab({ state }: OffersTabProps) {
  const { t } = useI18n()
  const {
    filteredOffers,
    offerFilterStatus,
    setOfferFilterStatus,
    deals,
    handleAcceptOffer,
    handleDeclineOffer,
    handleAdvanceDealStage,
    setCounterModalOffer,
    setCounterPriceInput,
  } = state

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-black text-on-surface">
              Purchase Offers &amp; LOI Ledger
            </h2>
            <p className="text-xs text-on-surface-variant">
              Inbound sovereign offers, earnest deposits, and legal negotiation
              controls
            </p>
          </div>

          <div className="flex items-center gap-2">
            {OFFER_STATUS_FILTERS.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setOfferFilterStatus(st)}
                className={`h-8 rounded-lg px-3 text-xs font-bold transition-all ${
                  offerFilterStatus === st
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                {OFFER_COLUMNS.map((col) => (
                  <th
                    key={col.label}
                    className={`pb-3 font-semibold${col.alignRight ? " text-right" : ""}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredOffers.map((offer) => (
                <tr
                  key={offer.id}
                  className="transition-colors hover:bg-surface-container-high/30"
                >
                  <td className="py-4 font-mono text-[11px] text-on-surface-variant">
                    {offer.id}
                  </td>
                  <td className="py-4 font-bold text-on-surface">
                    {offer.propertyTitle}
                  </td>
                  <td className="py-4">
                    <p className="font-bold text-on-surface">
                      {offer.buyerName}
                    </p>
                    <p className="text-[11px] text-on-surface-variant">
                      {offer.buyerEntity}
                    </p>
                  </td>
                  <td className="py-4">
                    <p className="text-sm font-extrabold text-on-surface">
                      ${(offer.offerPrice / 1000000).toFixed(2)}M
                    </p>
                    <span className="font-mono text-[10px] text-on-surface-variant">
                      {offer.financing}
                    </span>
                  </td>
                  <td className="py-4">
                    <p className="font-bold text-tertiary">
                      ${(offer.earnestDeposit / 1000).toFixed(0)}k (10%)
                    </p>
                    <span className="text-[10px] text-on-surface-variant">
                      POF Verified
                    </span>
                  </td>
                  <td className="py-4">
                    <Badge
                      variant={
                        offer.status === "Pending Review"
                          ? "gold"
                          : offer.status === "Escrow Opened"
                            ? "secondary"
                            : offer.status === "Under Negotiation"
                              ? "default"
                              : "outline"
                      }
                      className="text-[10px] font-bold"
                    >
                      {offer.status}
                    </Badge>
                  </td>
                  <td className="py-4 text-right">
                    {offer.status !== "Escrow Opened" &&
                    offer.status !== "Declined" ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          onClick={() => handleAcceptOffer(offer.id)}
                          className="h-8 rounded-lg bg-tertiary px-2.5 text-xs font-bold text-primary-foreground hover:bg-tertiary"
                        >
                          {t("dash.accept", "Accept")}
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => {
                            setCounterModalOffer(offer)
                            setCounterPriceInput(
                              String(offer.offerPrice + 250000)
                            )
                          }}
                          className="h-8 rounded-lg border-outline-variant/40 px-2.5 text-xs font-bold"
                        >
                          {t("dash.counter", "Counter")}
                        </Button>

                        <Button
                          variant="ghost"
                          onClick={() => handleDeclineOffer(offer.id)}
                          className="h-8 rounded-lg px-2 text-xs text-destructive hover:bg-destructive/10"
                        >
                          {t("dash.decline", "Decline")}
                        </Button>
                      </div>
                    ) : (
                      <Link
                        href="/closing"
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-secondary px-3 text-xs font-bold text-primary transition-colors hover:bg-secondary/90"
                      >
                        <span>Closing Desk</span>
                        <IconArrowRight size={13} />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-on-surface">
              Syndicate Deal Pipeline &amp; Escrow Milestones
            </h3>
            <p className="text-xs text-on-surface-variant">
              Real-time status tracking from Inbound to Closed Settlement
            </p>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {deals.length} Active Deals
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="flex flex-col justify-between gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4"
            >
              <div>
                <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                  <span>{deal.id}</span>
                  <span className="font-bold text-secondary">{deal.stage}</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface">
                  {deal.estate}
                </h4>
                <p className="text-[11px] text-on-surface-variant">
                  {deal.location}
                </p>
              </div>

              <div className="flex items-center justify-between border-y border-outline-variant/20 py-2 text-xs">
                <span className="text-on-surface-variant">Commission</span>
                <span className="font-mono font-bold text-tertiary">
                  ${(deal.commission / 1000).toFixed(0)}k
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-on-surface-variant">
                  Close: {deal.closingDate}
                </span>
                <Button
                  onClick={() => handleAdvanceDealStage(deal.id)}
                  className="h-8 rounded-lg bg-primary px-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                >
                  {t("dash.advanceStage", "Advance Stage")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
