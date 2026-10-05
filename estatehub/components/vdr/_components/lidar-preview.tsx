"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SPATIAL_PINS } from "./vdr-data"

interface LidarPreviewProps {
  image?: string
  onLaunchDollhouse?: () => void
  onPlayDrone?: () => void
}

export function LidarPreview({
  image = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
  onLaunchDollhouse,
  onPlayDrone,
}: LidarPreviewProps) {
  return (
    <section
      aria-label="3D scan preview"
      className="w-full bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 sm:p-7 flex flex-col gap-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-container">
        <div>
          <span className="text-xs uppercase tracking-wider text-on-secondary-container font-bold">
            Confidential Scan Data
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-on-surface">
            3D LiDAR Interior Mesh &amp; Drone Flight-Through
          </h2>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-mono text-xs font-semibold">
          Matterport Pro3 • 4K HDR
        </span>
      </div>

      <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden group border border-outline-variant/30">
        <Image
          fill
          src={image}
          alt="3D LiDAR interior mesh"
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/20 to-primary-container/40" />

        {SPATIAL_PINS.map((pin) => (
          <div
            key={pin.label}
            className={`${pin.positionClassName} flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container/90 text-primary-foreground text-xs backdrop-blur-md border ${pin.borderClassName} shadow-md`}
          >
            <span className={pin.dotClassName} />
            <span className="font-semibold">{pin.label}</span>
          </div>
        ))}

        <div className="absolute bottom-4 left-4 right-4 bg-primary-container/90 backdrop-blur-md p-3 rounded-xl flex items-center justify-between text-primary-foreground border border-outline-variant">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              size="sm"
              onClick={onLaunchDollhouse}
              className="bg-secondary text-on-secondary font-bold text-xs rounded-lg px-3 py-1.5"
            >
              Launch Interactive Dollhouse
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onPlayDrone}
              className="border-outline-variant text-muted-foreground text-xs rounded-lg px-3 py-1.5 bg-primary-container"
            >
              4K Drone Perimeter (3m 40s)
            </Button>
          </div>
          <span className="hidden sm:inline-block text-[11px] text-muted-foreground font-mono">
            Measured Accuracy: ±0.1%
          </span>
        </div>
      </div>
    </section>
  )
}
