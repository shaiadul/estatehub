"use client"

import * as React from "react"
import L from "leaflet"
import Image from "next/image"
import Link from "next/link"
import {
  IconPlus,
  IconMinus,
  IconFocusCentered,
  IconMapPin,
  IconSparkles,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { PropertyData } from "@/lib/properties-data"

interface PropertiesMapInnerProps {
  properties: PropertyData[]
  activeProperty: PropertyData | null
  onSelectProperty: (property: PropertyData) => void
}

const TILE_LAYERS = {
  street: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19,
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS",
    maxZoom: 19,
  },
}

export default function PropertiesMapInner({
  properties,
  activeProperty,
  onSelectProperty,
}: PropertiesMapInnerProps) {
  const mapContainerRef = React.useRef<HTMLDivElement>(null)
  const mapRef = React.useRef<L.Map | null>(null)
  const markersRef = React.useRef<Record<string, L.Marker>>({})
  const tileLayerRef = React.useRef<L.TileLayer | null>(null)
  const [mapType, setMapType] = React.useState<"street" | "satellite">("satellite")

  React.useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const initialCenter: [number, number] = [34.0837, -118.4485]
    const initialZoom = 11

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      attributionControl: false,
    })

    const initialTiles = L.tileLayer(TILE_LAYERS[mapType].url, {
      attribution: TILE_LAYERS[mapType].attribution,
      maxZoom: TILE_LAYERS[mapType].maxZoom,
      subdomains: "abcd",
    }).addTo(map)

    tileLayerRef.current = initialTiles
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // Switch Tile Layer (Street vs Satellite)
  React.useEffect(() => {
    if (!mapRef.current || !tileLayerRef.current) return

    mapRef.current.removeLayer(tileLayerRef.current)
    const newTiles = L.tileLayer(TILE_LAYERS[mapType].url, {
      attribution: TILE_LAYERS[mapType].attribution,
      maxZoom: TILE_LAYERS[mapType].maxZoom,
      subdomains: "abcd",
    }).addTo(mapRef.current)

    tileLayerRef.current = newTiles
  }, [mapType])

  React.useEffect(() => {
    const map = mapRef.current
    if (!map) return
    Object.values(markersRef.current).forEach((marker) => marker.remove())
    markersRef.current = {}

    if (properties.length === 0) return

    const bounds = L.latLngBounds([])

    properties.forEach((prop) => {
      if (!prop.coordinates) return

      const isSelected = activeProperty?.id === prop.id
      const latLng: [number, number] = [prop.coordinates.lat, prop.coordinates.lng]
      bounds.extend(latLng)

      // Dynamic price pill marker:
      // Uses iconSize: [0, 0] and iconAnchor: [0, 0] with translate(-50%, -100%)
      // so the pill auto-sizes to any price string without overflowing rigid dimensions,
      // and the pointer arrow remains perfectly centered on the coordinates.
      const customIcon = L.divIcon({
        className: "custom-property-pin !border-0 !bg-transparent",
        iconSize: [0, 0],
        iconAnchor: [0, 0],
        html: `
          <div style="transform: translate(-50%, -100%)" class="w-max">
            <div class="flex flex-col items-center cursor-pointer transition-transform duration-200 origin-bottom ${
              isSelected ? "scale-110" : "hover:scale-105"
            }">
              <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs whitespace-nowrap shadow-xl transition-colors ${
                isSelected
                  ? "bg-secondary text-on-secondary ring-4 ring-secondary/30 font-black shadow-amber-500/20"
                  : "bg-primary-container text-primary-foreground border border-primary-foreground/20 backdrop-blur-md hover:bg-primary-container"
              }">
                <span class="w-1.5 h-1.5 rounded-full shrink-0 ${
                  isSelected ? "bg-primary-container animate-pulse" : "bg-secondary"
                }"></span>
                <span class="tabular-nums tracking-tight whitespace-nowrap leading-none">${prop.priceFormatted}</span>
              </div>
              <div class="w-2 h-2 -mt-[5px] rotate-45 shrink-0 ${
                isSelected
                  ? "bg-secondary"
                  : "bg-primary-container border-r border-b border-primary-foreground/20"
              }"></div>
            </div>
          </div>
        `,
      })

      const marker = L.marker(latLng, { icon: customIcon }).addTo(map)
      marker.setZIndexOffset(isSelected ? 1000 : 0)

      marker.on("click", () => {
        onSelectProperty(prop)
        map.flyTo(latLng, Math.max(map.getZoom(), 13), {
          duration: 0.8,
        })
      })

      markersRef.current[prop.id] = marker
    })

    // Fit map to visible properties on initial load or properties change
    if (bounds.isValid() && !activeProperty) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })
    }
  }, [properties, activeProperty, onSelectProperty])

  // Center on active property if selected from external list
  React.useEffect(() => {
    const map = mapRef.current
    if (!map || !activeProperty?.coordinates) return

    const latLng: [number, number] = [
      activeProperty.coordinates.lat,
      activeProperty.coordinates.lng,
    ]
    map.flyTo(latLng, 14, { duration: 0.8 })
  }, [activeProperty?.id])

  const handleZoomIn = () => {
    mapRef.current?.zoomIn()
  }

  const handleZoomOut = () => {
    mapRef.current?.zoomOut()
  }

  const handleFitBounds = () => {
    if (!mapRef.current) return
    const bounds = L.latLngBounds([])
    properties.forEach((prop) => {
      if (prop.coordinates) {
        bounds.extend([prop.coordinates.lat, prop.coordinates.lng])
      }
    })
    if (bounds.isValid()) {
      mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })
    }
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-primary-container">
      {/* Map Viewport Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Map Header & Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface/90 backdrop-blur-md text-xs font-bold text-on-surface shadow-lg border border-outline-variant/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
          </span>
          <span>{properties.length} Active Estates on Radar</span>
        </div>

        {/* Layer Switcher (Street / Satellite) */}
        <div className="pointer-events-auto flex items-center gap-1 bg-surface/90 backdrop-blur-md p-1 rounded-xl shadow-lg border border-outline-variant/30">
          <button
            type="button"
            onClick={() => setMapType("street")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mapType === "street"
                ? "bg-primary text-on-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
            }`}
          >
            Street
          </button>
          <button
            type="button"
            onClick={() => setMapType("satellite")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mapType === "satellite"
                ? "bg-primary text-on-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
            }`}
          >
            Satellite
          </button>
        </div>
      </div>

      {/* Floating Zoom & Center Action Controls */}
      <div className="absolute top-20 right-4 flex flex-col gap-2 z-10">
        <div className="flex flex-col rounded-xl overflow-hidden shadow-lg border border-outline-variant/30 bg-surface/95 backdrop-blur-md">
          <button
            type="button"
            onClick={handleZoomIn}
            aria-label="Zoom in"
            className="w-9 h-9 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors border-b border-outline-variant/20"
          >
            <IconPlus size={16} />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            aria-label="Zoom out"
            className="w-9 h-9 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
          >
            <IconMinus size={16} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleFitBounds}
          aria-label="Fit all properties"
          title="Fit all estates"
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-surface/95 backdrop-blur-md text-on-surface hover:bg-surface-container shadow-lg border border-outline-variant/30 transition-colors"
        >
          <IconFocusCentered size={16} />
        </button>
      </div>

      {/* Selected Property Preview Drawer / Card */}
      {activeProperty && (
        <div className="absolute bottom-4 left-4 right-4 z-20 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Card className="bg-surface-container-lowest/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-outline-variant/30 p-3.5 flex flex-row items-center gap-4">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 shadow-xs">
              <Image
                src={activeProperty.heroImage}
                alt={activeProperty.title}
                fill
                sizes="120px"
                className="object-cover"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary-container/80 backdrop-blur-xs text-[10px] font-bold text-primary-foreground uppercase tracking-wider">
                {activeProperty.propertyType}
              </span>
            </div>

            <div className="flex flex-col flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="gold" className="text-[10px] py-0 px-2">
                  <IconSparkles size={10} className="mr-0.5 inline" />
                  {activeProperty.badge}
                </Badge>
                <span className="text-[11px] text-on-surface-variant font-mono truncate">
                  {activeProperty.city}
                </span>
              </div>

              <h4 className="text-sm font-bold text-on-surface truncate">
                {activeProperty.title}
              </h4>

              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-base font-extrabold text-secondary">
                  {activeProperty.priceFormatted}
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  {activeProperty.estMortgage}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-1.5 font-medium">
                <span>{activeProperty.beds} Beds</span>
                <span>•</span>
                <span>{activeProperty.baths} Baths</span>
                <span>•</span>
                <span>{activeProperty.sqftFormatted} Sq Ft</span>
              </div>
            </div>

            <Link href={`/properties/${activeProperty.slug}`} className="shrink-0">
              <Button variant="luxury" size="sm" className="rounded-xl px-4 font-bold shadow-xs">
                Explore
              </Button>
            </Link>
          </Card>
        </div>
      )}
    </div>
  )
}
