"use client"

import { FloorLevel } from "./types"

interface FloorPlansProps {
  activeFloor: FloorLevel
  onActiveFloorChange: (floor: FloorLevel) => void
}

const FLOOR_TABS: { id: FloorLevel; label: string }[] = [
  { id: "level1", label: "Level 1 (Main)" },
  { id: "level2", label: "Level 2 (Suites)" },
  { id: "level3", label: "Basement & Media" },
]

const FLOOR_DETAILS: Record<
  FloorLevel,
  { title: string; sqft: string; desc: string; rooms: [string, string, string] }
> = {
  level1: {
    title: "Main Living Level & Infinity Terrace",
    sqft: "3,650 Sq Ft",
    desc: "Includes Grand Foyer, Great Room with 14ft ceilings, Chef's Show Kitchen, Butler's Pantry, Formal Dining, Powder Room, and seamless access to 2,400 sq ft exterior sun terrace.",
    rooms: ["Grand Salon", "Chef Kitchen", "Pool Terrace"],
  },
  level2: {
    title: "Upper Master Sanctuary & Guest Suites",
    sqft: "2,950 Sq Ft",
    desc: "Features Primary Master Suite with dual showroom dressing rooms, private terrace, 3 junior en-suite bedrooms, and executive sky-office overlooking the pool courtyard.",
    rooms: ["Master Suite", "En-suite II", "Sky Deck"],
  },
  level3: {
    title: "Subterranean Cinema, Cellar & Motor Vault",
    sqft: "1,800 Sq Ft",
    desc: "Dedicated entertainment level housing the 600-bottle glass wine gallery, 12-seat Dolby Atmos screening room, wellness gym, safe vault, and 4-car showroom garage.",
    rooms: ["Cinema Lounge", "Wine Gallery", "Motor Court"],
  },
}

const ROOM_BOXES = [
  { x: 25, width: 120, textX: 45, roomIndex: 0, highlight: false },
  { x: 155, width: 110, textX: 175, roomIndex: 1, highlight: false },
  { x: 275, width: 100, textX: 290, roomIndex: 2, highlight: true },
]

export function FloorPlans({ activeFloor, onActiveFloorChange }: FloorPlansProps) {
  const detail = FLOOR_DETAILS[activeFloor]
  return (
    <>
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-on-surface">Floor Plans &amp; Architectural Layout</h2>
            <p className="text-xs text-on-surface-variant">
              Engineered 3-level vertical circulation and sightlines.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-surface-container p-1 rounded-xl">
            {FLOOR_TABS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => onActiveFloorChange(id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFloor === id
                    ? "bg-surface-container-lowest text-on-surface shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative bg-surface-container-low rounded-2xl p-6 overflow-hidden flex flex-col items-center justify-center min-h-[300px] border border-outline-variant/20">
          <div className="w-full max-w-xl p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-2 text-left mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-on-surface">{detail.title}</span>
              <span className="text-xs font-bold text-secondary">{detail.sqft}</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">{detail.desc}</p>
          </div>

          <div className="w-full max-w-lg h-44 rounded-xl bg-surface-container flex items-center justify-center p-4 border border-outline-variant/30">
            <svg
              className="w-full h-full text-outline"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 400 120"
            >
              <rect x="10" y="10" width="380" height="100" rx="6" strokeDasharray="4 2" />
              {ROOM_BOXES.map(({ x, width, textX, roomIndex, highlight }) => (
                <g key={x}>
                  <rect
                    x={x}
                    y="25"
                    width={width}
                    height="70"
                    rx="4"
                    className={highlight ? "fill-secondary/60 stroke-secondary" : "fill-surface-container-high"}
                  />
                  <text
                    x={textX}
                    y="65"
                    fill={highlight ? "var(--secondary)" : "currentColor"}
                    fontSize="11"
                    fontWeight="bold"
                    className={highlight ? undefined : "text-on-surface"}
                  >
                    {detail.rooms[roomIndex]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
