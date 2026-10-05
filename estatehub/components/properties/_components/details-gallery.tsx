"use client"

import Image from "next/image"
import { IconPhoto } from "@tabler/icons-react"
import { photoLabels } from "./types"

interface DetailsGalleryProps {
  allPhotos: string[]
  propertyTitle: string
  onOpenLightbox: (index: number) => void
}

const SECONDARY_TILES = [
  { index: 1, alt: "Chef Kitchen" },
  { index: 2, alt: "Primary Suite" },
  { index: 3, alt: "Spa Bath" },
]

export function DetailsGallery({ allPhotos, propertyTitle, onOpenLightbox }: DetailsGalleryProps) {
  return (
    <>
      <section className="w-full bg-surface pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2.5 h-[420px] md:h-[560px] rounded-2xl overflow-hidden relative shadow-md">
            <div
              className="md:col-span-2 md:row-span-2 relative group overflow-hidden cursor-pointer"
              onClick={() => {
                onOpenLightbox(0)
              }}
            >
              <Image
                src={allPhotos[0]}
                alt={propertyTitle}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-primary-container/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 text-primary-foreground">
                <span className="px-2.5 py-1 rounded bg-primary-container/70 backdrop-blur-md text-xs font-semibold w-fit border border-primary-foreground/20">
                  {photoLabels[0].title}
                </span>
                <p className="text-xs text-primary-foreground/90 drop-shadow">
                  {photoLabels[0].sub}
                </p>
              </div>
            </div>

            {SECONDARY_TILES.map(({ index, alt }) => (
              <div
                key={index}
                className="relative group overflow-hidden cursor-pointer hidden md:block"
                onClick={() => {
                  onOpenLightbox(index)
                }}
              >
                <Image
                  src={allPhotos[index]}
                  alt={alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-primary-container/20 group-hover:bg-primary-container/0 transition-colors pointer-events-none" />
                <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-primary-container/70 backdrop-blur text-primary-foreground text-xs font-medium">
                  {photoLabels[index].title}
                </span>
              </div>
            ))}

            <div
              className="relative group overflow-hidden cursor-pointer hidden md:block"
              onClick={() => {
                onOpenLightbox(4)
              }}
            >
              <Image
                src={allPhotos[4]}
                alt="Wine Cellar & Lounge"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-primary-container/50 group-hover:bg-primary-container/30 transition-colors pointer-events-none" />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenLightbox(0)
                }}
                className="absolute inset-0 m-auto w-fit h-fit flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container/90 text-primary-foreground hover:bg-primary-container backdrop-blur-md shadow-xl text-xs font-bold transition-transform group-hover:scale-105 border border-primary-foreground/20"
              >
                <IconPhoto className="w-4 h-4 text-secondary" />
                <span>View All 38 Photos &amp; 3D Tour</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
