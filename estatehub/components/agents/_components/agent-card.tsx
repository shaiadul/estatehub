"use client"

import Link from "next/link"
import Image from "next/image"
import {
  IconStarFilled,
  IconShieldCheck,
  IconMapPin,
  IconCalendarEvent,
  IconArrowRight,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import type { AgentRecord } from "./types"

interface AgentCardProps {
  agent: AgentRecord
  onBook: (agent: AgentRecord) => void
}

export function AgentCard({ agent, onBook }: AgentCardProps) {
  return (
    <div
      className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-5">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-surface-container shadow-md">
            <Image
              src={agent.image}
              alt={agent.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface truncate">
                {agent.name}
              </h2>
              <IconShieldCheck className="text-secondary size-5 shrink-0" />
            </div>

            <span className="text-xs sm:text-sm font-semibold text-secondary mt-0.5">
              {agent.title}
            </span>

            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-1.5">
              <IconMapPin size={14} className="text-outline shrink-0" />
              <span className="truncate">{agent.region}</span>
            </div>

            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="flex items-center gap-1 text-on-secondary-container font-bold">
                <IconStarFilled size={14} /> {agent.rating}
              </span>
              <span className="text-on-surface-variant">
                ({agent.reviews} client reviews)
              </span>
              <span className="text-on-surface font-semibold font-mono text-[11px] bg-surface-container px-2 py-0.5 rounded">
                {agent.license}
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          {agent.bio}
        </p>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {agent.specialties.map((spec, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface text-[11px] font-semibold border border-outline-variant/20"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 text-center">
          <div className="flex flex-col">
            <span className="text-[11px] text-on-surface-variant font-medium">Career Volume</span>
            <span className="text-base sm:text-lg font-black text-on-surface mt-0.5">{agent.volumeClosed}</span>
          </div>
          <div className="flex flex-col border-l border-outline-variant/30">
            <span className="text-[11px] text-on-surface-variant font-medium">Active Portfolio</span>
            <span className="text-base sm:text-lg font-black text-secondary mt-0.5">{agent.activeListingsCount} Exclusive</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-outline-variant/30">
        <Button
          variant="gold"
          size="md"
          onClick={() => onBook(agent)}
          className="gap-2 font-bold w-full"
        >
          <IconCalendarEvent size={16} />
          <span>Book Consultation</span>
        </Button>

        <Button
          variant="outline"
          size="md"
          render={<Link href={`/properties`} />}
          className="gap-2 font-semibold w-full"
        >
          <span>View Listings</span>
          <IconArrowRight size={16} />
        </Button>
      </div>
    </div>
  )
}
