"use client"

import Image from "next/image"
import { IconCircleCheck } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { AgentRecord } from "./types"
import { useI18n } from "@/lib/i18n"

interface ConsultModalProps {
  agent: AgentRecord | null
  booked: boolean
  onClose: () => void
  onBooked: () => void
}

export function ConsultModal({ agent, booked, onClose, onBooked }: ConsultModalProps) {
  const { t } = useI18n()

  const consultFields = [
    { key: "name", placeholder: t("agents.fullName", "Full Legal Name"), type: undefined as string | undefined, required: true },
    { key: "phone", placeholder: t("agents.phone", "Private Phone (+1)"), type: "tel", required: true },
    { key: "email", placeholder: t("agents.email", "Institutional Email"), type: "email", required: true },
    { key: "target", placeholder: t("agents.target", "Holding or Syndicate Target (e.g. $10M - $25M)"), type: undefined as string | undefined, required: false },
  ]

  if (!agent) return null

  return (
    <div className="fixed inset-0 z-50 bg-primary-container/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface"
        >
          ✕
        </button>

        {booked ? (
          <div className="flex flex-col items-center text-center py-6">
            <IconCircleCheck size={48} className="text-on-tertiary-container mb-4" />
            <h3 className="text-2xl font-bold text-on-surface">Consultation Scheduled</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-2 max-w-sm leading-relaxed">
              {agent.name}&apos;s executive concierge will connect with you via encrypted phone or video dispatch within 2 business hours.
            </p>
            <Button
              variant="gold"
              size="md"
              onClick={onClose}
              className="mt-6 font-bold"
            >
              {t("agents.done", "Done")}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-on-surface">
                  {t("agents.scheduleAdvisory", "Schedule Private Advisory with")} {agent.name}
                </h3>
                <span className="text-xs text-secondary font-medium">
                  {agent.title}
                </span>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              All communications are governed under strict attorney-client style confidentiality agreements.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                onBooked()
              }}
              className="flex flex-col gap-3 mt-2"
            >
              {consultFields.map(({ key, placeholder, type, required }) => (
                <Input
                  key={key}
                  placeholder={placeholder}
                  type={type}
                  required={required}
                  className="h-10 text-xs"
                />
              ))}

              <Button type="submit" variant="gold" size="lg" className="w-full font-bold shadow-md mt-2">
                {t("agents.confirmDispatch", "Confirm Advisory Dispatch")}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
