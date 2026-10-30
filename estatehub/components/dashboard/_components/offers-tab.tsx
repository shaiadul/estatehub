"use client"

import Link from "next/link"
import { IconArrowRight, IconFileSpreadsheet, IconClock, IconSparkles } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { NoDataState } from "@/components/ui/no-data-state"
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
    activeRole,
    setIsSubmitLoiModalOpen,
    handleAcceptOffer,
    handleDeclineOffer,
    handleAdvanceDealStage,
    setCounterModalOffer,
    setCounterPriceInput,
  } = state

  const isBuyer = activeRole === "buyer"
  const isSeller = activeRole === "seller"
  const displayOffers = filteredOffers

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardHeader className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <IconFileSpreadsheet size={18} className="text-secondary" />
              <CardTitle className="text-base font-bold text-on-surface">
                {isBuyer
                  ? "My Purchase Proposals & LOI Ledger"
                  : isSeller
                    ? "Inbound Purchase Offers & LOI Ledger"
                    : "Bilateral Deal Mediation & LOI Desk"}
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-on-surface-variant">
              {isBuyer
                ? "Track active acquisition bids, review seller counter-proposals, and lock escrow earnest deposits"
                : isSeller
                  ? "Inbound sovereign offers, earnest deposits, and legal negotiation controls"
                  : "Supervise bilateral legal negotiations, deposit escrow verifications, and closing milestones"}
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isBuyer && (
              <Button
                onClick={() => setIsSubmitLoiModalOpen(true)}
                size="sm"
                className="h-8.5 rounded-xl bg-primary px-3.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90"
              >
                + New Purchase LOI
              </Button>
            )}

            <div className="flex items-center gap-1.5">
              {OFFER_STATUS_FILTERS.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setOfferFilterStatus(st)}
                  className={`h-7.5 rounded-lg px-2.5 text-xs font-semibold transition-all ${
                    offerFilterStatus === st
                      ? "bg-primary text-primary-foreground shadow-xs ring-1 ring-primary/20"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {displayOffers.length === 0 ? (
            <NoDataState
              variant="filter"
              title="No active purchase offers or LOIs"
              description="No proposals match your current filter selection. Submitted purchase terms, letters of intent, and counter-offers will appear here."
              action={{
                label: "Reset Status Filter",
                onClick: () => setOfferFilterStatus("All"),
              }}
              secondaryAction={
                isBuyer
                  ? {
                      label: "+ Submit New LOI",
                      onClick: () => setIsSubmitLoiModalOpen(true),
                    }
                  : undefined
              }
            />
          ) : (
            <div className="rounded-xl border border-outline-variant/20 overflow-hidden">
              <Table>
                <TableHeader className="bg-surface-container-low/70">
                  <TableRow>
                    {OFFER_COLUMNS.map((col) => (
                      <TableHead
                        key={col.label}
                        className={`text-xs font-bold text-on-surface-variant ${
                          col.alignRight ? "text-right" : ""
                        }`}
                      >
                        {col.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayOffers.map((offer) => (
                    <TableRow
                      key={offer.id}
                      className="transition-colors hover:bg-surface-container-high/30"
                    >
                      <TableCell className="font-mono text-[11px] font-semibold text-on-surface-variant">
                        {offer.id}
                      </TableCell>
                      <TableCell className="py-3.5">
                        <p className="font-bold text-xs text-on-surface">
                          {offer.propertyTitle}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold text-xs text-on-surface">
                          {offer.buyerName}
                        </p>
                        <p className="text-[11px] text-on-surface-variant">
                          {offer.buyerEntity}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="font-mono text-xs font-extrabold text-on-surface">
                          ${(offer.offerPrice / 1000000).toFixed(2)}M
                        </p>
                        <span className="font-mono text-[10px] text-on-surface-variant">
                          {offer.financing}
                        </span>
                      </TableCell>
                      <TableCell>
                        <p className="font-mono text-xs font-bold text-tertiary">
                          ${(offer.earnestDeposit / 1000).toFixed(0)}k (10%)
                        </p>
                        <span className="text-[10px] text-on-surface-variant">
                          POF Verified
                        </span>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell className="text-right">
                        {offer.status === "Escrow Opened" ? (
                          <Link
                            href="/closing"
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-secondary px-3 text-xs font-bold text-primary transition-colors hover:bg-secondary/90 shadow-xs"
                          >
                            <span>Closing Desk</span>
                            <IconArrowRight size={13} />
                          </Link>
                        ) : isBuyer ? (
                          <div className="flex items-center justify-end gap-1.5">
                            {offer.status === "Under Negotiation" && (
                              <Button
                                size="sm"
                                onClick={() => handleAcceptOffer(offer.id)}
                                className="h-8 rounded-lg bg-primary px-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90"
                              >
                                Accept Counter
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setCounterModalOffer(offer)
                                setCounterPriceInput(String(offer.offerPrice - 100000))
                              }}
                              className="h-8 rounded-lg border-outline-variant/40 px-2.5 text-xs font-semibold"
                            >
                              Modify
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeclineOffer(offer.id)}
                              className="h-8 rounded-lg px-2 text-xs text-destructive hover:bg-destructive/10"
                            >
                              Withdraw
                            </Button>
                          </div>
                        ) : offer.status !== "Declined" ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              size="sm"
                              onClick={() => handleAcceptOffer(offer.id)}
                              className="h-8 rounded-lg bg-tertiary px-2.5 text-xs font-bold text-primary-foreground hover:bg-tertiary shadow-xs"
                            >
                              {t("dash.accept", "Accept")}
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setCounterModalOffer(offer)
                                setCounterPriceInput(String(offer.offerPrice + 250000))
                              }}
                              className="h-8 rounded-lg border-outline-variant/40 px-2.5 text-xs font-bold"
                            >
                              {t("dash.counter", "Counter")}
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeclineOffer(offer.id)}
                              className="h-8 rounded-lg px-2 text-xs text-destructive hover:bg-destructive/10"
                            >
                              {t("dash.decline", "Decline")}
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-on-surface-variant font-medium">Archived</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deal Pipeline Cards */}
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <div className="flex items-center gap-2">
              <IconSparkles size={18} className="text-secondary" />
              <CardTitle className="text-base font-bold text-on-surface">
                Syndicate Deal Pipeline &amp; Escrow Milestones
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-on-surface-variant">
              Real-time status tracking from Inbound LOI to Final Custody Wire Disbursement
            </CardDescription>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {deals.length} Active Deals
          </Badge>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low/60 p-4 transition-all duration-200 hover:border-secondary/40 hover:bg-surface-container-low"
              >
                <div>
                  <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                    <span>{deal.id}</span>
                    <Badge variant="gold" className="text-[10px] py-0 px-1.5">
                      {deal.stage}
                    </Badge>
                  </div>
                  <h4 className="text-xs font-bold text-on-surface line-clamp-1">
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
                  <span className="flex items-center gap-1 font-mono text-[10px] text-on-surface-variant">
                    <IconClock size={12} />
                    <span>{deal.closingDate}</span>
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleAdvanceDealStage(deal.id)}
                    className="h-7.5 rounded-lg bg-primary px-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90"
                  >
                    {t("dash.advanceStage", "Advance")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
