"use client"

import React from "react"
import Image from "next/image"
import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react"
import { photoLabels } from "./types"

interface DetailsLightboxProps {
  open: boolean
  lightboxIndex: number
  allPhotos: string[]
  propertyTitle: string
  onClose: () => void
  onIndexChange: React.Dispatch<React.SetStateAction<number>>
}

export function DetailsLightbox({
  open,
  lightboxIndex,
  allPhotos,
  propertyTitle,
  onClose,
  onIndexChange,
}: DetailsLightboxProps) {
  if (!open) return null

  const navButtons = [
    {
      key: "prev",
      Icon: IconChevronLeft,
      position: "absolute left-2 sm:left-4 p-3 rounded-full bg-primary-container/60 hover:bg-primary-container/80 text-primary-foreground transition-colors border border-primary-foreground/20",
      onClick: () => onIndexChange((prev) => (prev > 0 ? prev - 1 : allPhotos.length - 1)),
    },
    {
      key: "next",
      Icon: IconChevronRight,
      position: "absolute right-2 sm:right-4 p-3 rounded-full bg-primary-container/60 hover:bg-primary-container/80 text-primary-foreground transition-colors border border-primary-foreground/20",
      onClick: () => onIndexChange((prev) => (prev < allPhotos.length - 1 ? prev + 1 : 0)),
    },
  ]

  return (
    <>
      <div className="fixed inset-0 z-50 bg-primary-container/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
        <div className="flex items-center justify-between text-primary-foreground">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-primary-foreground/70">
              {lightboxIndex + 1} / {allPhotos.length}
            </span>
            <span className="text-sm font-semibold truncate max-w-[260px] sm:max-w-none">
              {propertyTitle} — {photoLabels[lightboxIndex]?.title || "Property Gallery"}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-colors"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
          <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
            <Image
              src={allPhotos[lightboxIndex]}
              alt="Gallery Preview"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {navButtons.map(({ key, Icon, position, onClick }) => (
            <button key={key} type="button" onClick={onClick} className={position}>
              <Icon className="w-6 h-6" />
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
          {allPhotos.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onIndexChange(idx)}
              className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                lightboxIndex === idx ? "ring-2 ring-secondary scale-105" : "opacity-50 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
