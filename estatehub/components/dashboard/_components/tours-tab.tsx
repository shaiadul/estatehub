"use client"

import Link from "next/link"
import {
  IconCalendarEvent,
  IconCar,
  IconBrandTelegram,
  IconMapPin,
  IconPlus,
  IconCheck,
  IconX,
  IconClock,
  IconShieldCheck,
  IconUserCheck,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CommandState } from "./use-command-state"
import { useI18n } from "@/lib/i18n"

interface ToursTabProps {
  state: CommandState
}

export function ToursTab({ state }: ToursTabProps) {
  const { t } = useI18n()
  const {
    tours,
    activeRole,
    setIsBookTourModalOpen,
    handleCancelTour,
    triggerToast,
  } = state

  const isOrganizer = activeRole === "organizer"
  const relevantTours = tours.filter((tour) =>
    isOrganizer ? true : tour.clientRole === "buyer" || tour.clientName === "Julian Rossi"
  )

  const confirmedCount = relevantTours.filter((t) => t.status === "Confirmed").length

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col justify-between rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-xs font-medium">Scheduled Private Showings</span>
            <div className="rounded-xl bg-primary/10 p-2 text-primary">
              <IconCalendarEvent size={18} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-on-surface">
            {relevantTours.length} {relevantTours.length === 1 ? "Booking" : "Bookings"}
          </div>
          <span className="mt-1 text-xs text-on-tertiary-container font-semibold">
            {confirmedCount} Confirmed with Escorts
          </span>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-xs font-medium">Concierge Fleet Transit</span>
            <div className="rounded-xl bg-secondary/15 p-2 text-secondary">
              <IconCar size={18} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-on-surface">
            Chauffeured Maybach &amp; Heli
          </div>
          <span className="mt-1 text-xs text-on-surface-variant">
            Armored Diplomatic Transport Class
          </span>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-xs font-medium">Security &amp; NDA Clearance</span>
            <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-500">
              <IconShieldCheck size={18} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-on-surface">
            100% Cleared
          </div>
          <span className="mt-1 text-xs text-on-surface-variant">
            Perimeter Biometrics Verified
          </span>
        </div>
      </div>

      {/* Main Tour Schedule Table & Cards */}
      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconCalendarEvent size={16} />
              </span>
              <h2 className="text-lg font-black text-on-surface">
                {isOrganizer
                  ? "VIP Showing & Chauffeur Dispatch Schedule"
                  : "My Private Estate Showings & Itinerary"}
              </h2>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">
              {isOrganizer
                ? "Manage high-net-worth tour dispatch, coordinate private helicopter landings and chauffeured inspections"
                : "Your upcoming private on-site inspections, chauffeured transfers, and confidential walkthroughs"}
            </p>
          </div>

          <Button
            onClick={() => setIsBookTourModalOpen(true)}
            className="flex h-10 items-center gap-2 self-start rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground hover:bg-primary/90 sm:self-auto"
          >
            <IconPlus size={16} />
            <span>{isOrganizer ? "Dispatch New Showing" : "Request Private Tour"}</span>
          </Button>
        </div>

        {relevantTours.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-outline-variant/40 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container text-on-surface-variant">
              <IconCalendarEvent size={24} />
            </div>
            <h3 className="mt-4 text-sm font-bold text-on-surface">No Showings Scheduled</h3>
            <p className="mt-1 max-w-sm text-xs text-on-surface-variant">
              Request a discreet private inspection tour with personalized chauffeur or helicopter transit.
            </p>
            <Button
              onClick={() => setIsBookTourModalOpen(true)}
              className="mt-4 h-9 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground"
            >
              Book Showing Tour
            </Button>
          </div>
        ) : (
          <div className="mt-2 divide-y divide-outline-variant/20">
            {relevantTours.map((tour) => (
              <div
                key={tour.id}
                className="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                    {tour.transportType.includes("Helicopter") ? (
                      <IconBrandTelegram size={20} />
                    ) : (
                      <IconCar size={20} />
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-on-surface">
                        {tour.id}
                      </span>
                      <span className="font-bold text-on-surface sm:text-sm">
                        {tour.propertyTitle}
                      </span>
                      <Badge
                        variant={tour.status === "Confirmed" ? "gold" : "outline"}
                        className="text-[10px]"
                      >
                        {tour.status}
                      </Badge>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1 font-semibold text-on-surface">
                        <IconClock size={13} className="text-secondary" />
                        {tour.date} • {tour.timeSlot}
                      </span>
                      <span className="flex items-center gap-1">
                        <IconCar size={13} className="text-on-surface-variant" />
                        {tour.transportType}
                      </span>
                      <span className="flex items-center gap-1">
                        <IconUserCheck size={13} className="text-on-surface-variant" />
                        Desk Escort: {tour.assignedAgent}
                      </span>
                    </div>

                    {isOrganizer && (
                      <div className="mt-1 text-xs">
                        <span className="text-on-surface-variant">Client Principal: </span>
                        <span className="font-bold text-on-surface">{tour.clientName}</span>
                      </div>
                    )}

                    {tour.specialRequests && (
                      <p className="mt-2 max-w-xl rounded-xl bg-surface-container-low p-2 text-[11px] text-on-surface-variant">
                        <span className="font-bold text-on-surface">Protocols: </span>
                        {tour.specialRequests}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {tour.status === "Pending Concierge" && isOrganizer && (
                    <Button
                      size="sm"
                      onClick={() => triggerToast(`Tour ${tour.id} confirmed and driver dispatched`)}
                      className="flex h-8 items-center gap-1.5 rounded-xl bg-secondary px-3 text-xs font-bold text-primary hover:bg-secondary/90"
                    >
                      <IconCheck size={14} />
                      <span>Confirm &amp; Dispatch</span>
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCancelTour(tour.id)}
                    className="flex h-8 items-center gap-1 rounded-xl border-outline-variant/40 px-3 text-xs font-semibold text-destructive hover:bg-destructive/10"
                  >
                    <IconX size={14} />
                    <span>Cancel</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
