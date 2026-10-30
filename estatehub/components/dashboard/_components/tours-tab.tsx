"use client"

import {
  IconCalendarEvent,
  IconCar,
  IconBrandTelegram,
  IconPlus,
  IconCheck,
  IconX,
  IconClock,
  IconShieldCheck,
  IconUserCheck,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { NoDataState } from "@/components/ui/no-data-state"
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
        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
          <CardContent className="flex flex-col justify-between p-5">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-xs font-semibold">Scheduled Private Showings</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <IconCalendarEvent size={17} />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-on-surface">
              {relevantTours.length} {relevantTours.length === 1 ? "Booking" : "Bookings"}
            </div>
            <span className="mt-2 text-xs text-on-tertiary-container font-semibold">
              {confirmedCount} Confirmed with Escorts
            </span>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-secondary" />
          <CardContent className="flex flex-col justify-between p-5">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-xs font-semibold">Concierge Fleet Transit</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                <IconCar size={17} />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-on-surface">
              Chauffeured Maybach &amp; Heli
            </div>
            <span className="mt-2 text-xs text-on-surface-variant">
              Armored Diplomatic Transport Class
            </span>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute top-0 inset-x-0 h-1 bg-tertiary" />
          <CardContent className="flex flex-col justify-between p-5">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-xs font-semibold">Security &amp; NDA Clearance</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <IconShieldCheck size={17} />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-on-surface">
              100% Cleared
            </div>
            <span className="mt-2 text-xs text-on-surface-variant">
              Perimeter Biometrics Verified
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Main Tour Schedule Table & Cards */}
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardHeader className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconCalendarEvent size={16} />
              </span>
              <CardTitle className="text-base font-bold text-on-surface">
                {isOrganizer
                  ? "VIP Showing & Chauffeur Dispatch Schedule"
                  : "My Private Estate Showings & Itinerary"}
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-on-surface-variant">
              {isOrganizer
                ? "Manage high-net-worth tour dispatch, coordinate private helicopter landings and chauffeured inspections"
                : "Your upcoming private on-site inspections, chauffeured transfers, and confidential walkthroughs"}
            </CardDescription>
          </div>

          <Button
            onClick={() => setIsBookTourModalOpen(true)}
            size="sm"
            className="flex h-9 items-center gap-1.5 self-start rounded-xl bg-primary px-3.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 sm:self-auto"
          >
            <IconPlus size={15} />
            <span>{isOrganizer ? "Dispatch New Showing" : "Request Private Tour"}</span>
          </Button>
        </CardHeader>

        <CardContent>
          {relevantTours.length === 0 ? (
            <NoDataState
              variant="empty"
              title="No Showings Scheduled"
              description="Request a discreet private inspection tour with personalized chauffeur or helicopter transit."
              action={{
                label: "Book Showing Tour",
                onClick: () => setIsBookTourModalOpen(true),
              }}
            />
          ) : (
            <div className="divide-y divide-outline-variant/20 rounded-xl border border-outline-variant/20 overflow-hidden">
              {relevantTours.map((tour) => (
                <div
                  key={tour.id}
                  className="flex flex-col justify-between gap-4 p-4 transition-colors hover:bg-surface-container-high/20 sm:flex-row sm:items-center"
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
                        className="flex h-8 items-center gap-1.5 rounded-xl bg-secondary px-3 text-xs font-bold text-primary shadow-xs hover:bg-secondary/90"
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
        </CardContent>
      </Card>
    </div>
  )
}
