"use client"

import React from "react"
import Image from "next/image"
import {
  IconCalendarEvent,
  IconCheck,
  IconDownload,
  IconFileText,
  IconMail,
  IconPhone,
  IconSend,
  IconShieldCheck,
  IconShieldLock,
  IconStarFilled,
} from "@tabler/icons-react"
import { PropertyData } from "@/lib/properties-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { TourType } from "./types"

interface BookingSidebarProps {
  property: PropertyData
  tourType: TourType
  selectedDate: string
  selectedTime: string
  fullName: string
  phone: string
  email: string
  isAccredited: boolean
  bookingSubmitting: boolean
  brokerMsg: string
  brokerMsgSent: boolean
  onTourTypeChange: (value: TourType) => void
  onSelectedDateChange: (value: string) => void
  onSelectedTimeChange: (value: string) => void
  onFullNameChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onEmailChange: (value: string) => void
  onAccreditedChange: (value: boolean) => void
  onTourSubmit: (e: React.FormEvent) => void
  onBrokerMsgChange: (value: string) => void
  onBrokerMsgSubmit: (e: React.FormEvent) => void
}

const TOUR_TYPE_OPTIONS: { id: TourType; label: string }[] = [
  { id: "inperson", label: "In-Person Tour" },
  { id: "video", label: "Live Walkthrough" },
]

const TOUR_DATES = ["Today", "Tomorrow", "Fri, Nov 14", "Sat, Nov 15"]

const TOUR_TIMES = ["10:00 AM", "1:30 PM", "4:00 PM", "5:30 PM"]

export function BookingSidebar({
  property,
  tourType,
  selectedDate,
  selectedTime,
  fullName,
  phone,
  email,
  isAccredited,
  bookingSubmitting,
  brokerMsg,
  brokerMsgSent,
  onTourTypeChange,
  onSelectedDateChange,
  onSelectedTimeChange,
  onFullNameChange,
  onPhoneChange,
  onEmailChange,
  onAccreditedChange,
  onTourSubmit,
  onBrokerMsgChange,
  onBrokerMsgSubmit,
}: BookingSidebarProps) {
  const contactFields = [
    {
      key: "fullName",
      placeholder: "Full Legal Name",
      type: undefined as string | undefined,
      value: fullName,
      onChange: onFullNameChange,
    },
    {
      key: "phone",
      placeholder: "Mobile Phone (+1)",
      type: "tel",
      value: phone,
      onChange: onPhoneChange,
    },
    {
      key: "email",
      placeholder: "Private Email Address",
      type: "email",
      value: email,
      onChange: onEmailChange,
    },
  ]
  return (
    <>
      <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
        <div className="bg-surface-container-lowest rounded-2xl shadow-lg border border-outline-variant/30 p-5 sm:p-6 flex flex-col gap-5">
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
            <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-surface-container-lowest shadow-sm">
              <Image
                src={property.agent.image}
                alt={property.agent.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-on-surface truncate">
                  {property.agent.name}
                </h3>
                <IconShieldCheck className="w-4 h-4 text-secondary flex-shrink-0" />
              </div>
              <span className="text-[11px] text-on-surface-variant truncate">
                {property.agent.title}
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="flex items-center text-on-secondary-container text-xs font-bold gap-0.5">
                  <IconStarFilled className="w-3.5 h-3.5" />
                  {property.agent.rating}
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  ({property.agent.reviews} reviews • $180M+ Closed)
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href={`tel:${property.agent.phone}`}
              className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface font-semibold flex items-center justify-center gap-1.5 border border-outline-variant/30"
            >
              <IconPhone className="w-4 h-4 text-secondary" />
              <span>{property.agent.phone.split(" ")[0]}</span>
            </a>
            <a
              href={`mailto:${property.agent.email}`}
              className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface font-semibold flex items-center justify-center gap-1.5 border border-outline-variant/30"
            >
              <IconMail className="w-4 h-4 text-secondary" />
              <span>Email Broker</span>
            </a>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Schedule Private Viewing
            </span>

            <div className="grid grid-cols-2 p-1 bg-surface-container rounded-xl text-center text-xs font-semibold">
              {TOUR_TYPE_OPTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => onTourTypeChange(id)}
                  className={`py-1.5 rounded-lg transition-all ${
                    tourType === id
                      ? "bg-surface-container-lowest text-on-surface shadow-sm font-bold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-on-surface-variant font-semibold">
                Select Viewing Date
              </label>
              <div className="grid grid-cols-4 gap-1 text-center text-xs font-semibold">
                {TOUR_DATES.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => onSelectedDateChange(d)}
                    className={`py-2 rounded-lg transition-all text-xs ${
                      selectedDate === d
                        ? "bg-primary-container text-primary-foreground font-bold shadow-sm"
                        : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-on-surface-variant font-semibold">
                Preferred Time
              </label>
              <div className="grid grid-cols-4 gap-1 text-center text-xs">
                {TOUR_TIMES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => onSelectedTimeChange(t)}
                    className={`py-1.5 rounded-md transition-all font-semibold ${
                      selectedTime === t
                        ? "bg-secondary-container text-on-secondary-fixed font-bold border border-secondary/40"
                        : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={onTourSubmit} className="flex flex-col gap-2.5 mt-1">
              {contactFields.map(({ key, placeholder, type, value, onChange }) => (
                <Input
                  key={key}
                  placeholder={placeholder}
                  type={type}
                  required
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="h-10 text-xs"
                />
              ))}

              <div className="flex items-start gap-2 py-1">
                <Checkbox
                  id="investor-accredited"
                  checked={isAccredited}
                  onCheckedChange={(checked) => onAccreditedChange(Boolean(checked))}
                  className="mt-0.5"
                />
                <label
                  htmlFor="investor-accredited"
                  className="text-[11px] text-on-surface-variant leading-tight cursor-pointer"
                >
                  I am a pre-approved buyer or represent an institutional family office
                </label>
              </div>

              <Button
                type="submit"
                variant="gold"
                size="md"
                disabled={bookingSubmitting}
                className="w-full font-bold shadow-md mt-1 h-11"
              >
                {bookingSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Confirming Access...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <IconCalendarEvent className="w-4 h-4" />
                    <span>Request Private Tour</span>
                  </span>
                )}
              </Button>
            </form>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
            <span className="text-xs font-semibold text-on-surface">
              Have a Question for {property.agent.name.split(" ")[0]}?
            </span>
            <form onSubmit={onBrokerMsgSubmit} className="flex items-center gap-1.5 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/30">
              <input
                type="text"
                placeholder="Inquire about escrow terms, deed..."
                value={brokerMsg}
                onChange={(e) => onBrokerMsgChange(e.target.value)}
                className="w-full bg-transparent px-2 text-xs text-on-surface placeholder:text-outline focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send message to broker"
                className="p-2 rounded-lg bg-primary-container text-primary-foreground hover:bg-surface-container-high transition-colors flex items-center justify-center"
              >
                <IconSend className="w-3.5 h-3.5" />
              </button>
            </form>
            {brokerMsgSent && (
              <span className="text-[11px] text-on-tertiary-container font-semibold flex items-center gap-1">
                <IconCheck className="w-3.5 h-3.5" /> Direct inquiry routed to broker.
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => alert("Access granted: Downloading official MLS disclosures & geotechnical report.")}
            className="w-full py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-between text-on-surface text-xs font-semibold border border-outline-variant/30"
          >
            <div className="flex items-center gap-2">
              <IconFileText className="w-4 h-4 text-secondary" />
              <span>Official Property Disclosures &amp; Inspection</span>
            </div>
            <IconDownload className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-on-surface-variant text-[11px]">
            <IconShieldLock className="w-4 h-4 text-on-tertiary-container flex-shrink-0" />
            <span>Encrypted confidential transmission. Licensed Broker #DRE 01928475</span>
          </div>
        </div>
      </div>
    </>
  )
}
