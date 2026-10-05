"use client"

import * as React from "react"
import L from "leaflet"
import {
  IconPlus,
  IconMinus,
  IconFocusCentered,
  IconShieldCheck,
  IconBuildingEstate,
  IconMapPin,
} from "@tabler/icons-react"

interface SinglePropertyMapInnerProps {
  coordinates: { lat: number; lng: number }
  title: string
  address: string
  city: string
  priceFormatted: string
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

export default function SinglePropertyMapInner({
  coordinates,
  title,
  address,
  city,
  priceFormatted,
}: SinglePropertyMapInnerProps) {
  const mapContainerRef = React.useRef<HTMLDivElement>(null)
  const mapRef = React.useRef<L.Map | null>(null)
  const tileLayerRef = React.useRef<L.TileLayer | null>(null)
  const [mapType, setMapType] = React.useState<"street" | "satellite">("satellite")

  React.useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const center: [number, number] = [coordinates.lat, coordinates.lng]

    const map = L.map(mapContainerRef.current, {
      center,
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    })

    const initialTiles = L.tileLayer(TILE_LAYERS[mapType].url, {
      attribution: TILE_LAYERS[mapType].attribution,
      maxZoom: TILE_LAYERS[mapType].maxZoom,
      subdomains: "abcd",
    }).addTo(map)

    tileLayerRef.current = initialTiles

    // Add 0.5-mile Private Security Enclave radius circle
    L.circle(center, {
      radius: 650, // ~0.4 miles
      color: "var(--secondary)",
      weight: 1.5,
      dashArray: "4, 6",
      fillColor: "var(--secondary)",
      fillOpacity: 0.08,
    }).addTo(map)

    // Custom Estate Trophy Marker
    const estateIcon = L.divIcon({
      className: "single-estate-pin",
      html: `
        <div class="relative flex flex-col items-center">
          <div class="relative flex items-center justify-center">
            <span class="absolute w-12 h-12 rounded-full bg-secondary/30 animate-ping"></span>
            <div class="relative w-10 h-10 rounded-2xl bg-primary-container text-secondary flex items-center justify-center shadow-2xl border-2 border-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 21l18 0"/>
                <path d="M4 21v-11l7 -7l7 7v11"/>
                <path d="M9 21v-8a3 3 0 0 1 6 0v8"/>
              </svg>
            </div>
          </div>
          <div class="mt-1 px-2.5 py-0.5 rounded-full bg-primary-container text-secondary text-[10px] font-bold shadow-md border border-secondary/40 whitespace-nowrap">
            ${priceFormatted}
          </div>
        </div>
      `,
      iconSize: [60, 60],
      iconAnchor: [30, 30],
    })

    L.marker(center, { icon: estateIcon })
      .addTo(map)
      .bindPopup(
        `
        <div class="p-2 text-on-secondary">
          <div class="text-[10px] font-bold uppercase tracking-wider text-on-secondary-container mb-0.5">Confidential Asset</div>
          <div class="text-xs font-bold">${title}</div>
          <div class="text-[11px] text-muted-foreground">${address}</div>
          <div class="text-xs font-extrabold text-on-secondary-container mt-1">${priceFormatted}</div>
        </div>
      `,
        { closeButton: false }
      )

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [coordinates.lat, coordinates.lng, title, address, priceFormatted])

  // Switch Tile Layer
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

  const handleRecenter = () => {
    mapRef.current?.flyTo([coordinates.lat, coordinates.lng], 15, {
      duration: 0.8,
    })
  }

  return (
    <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-md border border-outline-variant/30 bg-primary-container">
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Header Controls Overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface/90 backdrop-blur-md text-xs font-bold text-on-surface shadow-md border border-outline-variant/30">
          <IconShieldCheck className="w-3.5 h-3.5 text-on-tertiary-container" />
          <span>Active 24/7 Security Patrol Zone</span>
        </div>

        {/* Street / Satellite Toggle */}
        <div className="pointer-events-auto flex items-center gap-1 bg-surface/90 backdrop-blur-md p-1 rounded-xl shadow-md border border-outline-variant/30">
          <button
            type="button"
            onClick={() => setMapType("street")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
              mapType === "street"
                ? "bg-primary text-on-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Street
          </button>
          <button
            type="button"
            onClick={() => setMapType("satellite")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
              mapType === "satellite"
                ? "bg-primary text-on-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Satellite
          </button>
        </div>
      </div>

      {/* Floating Action Controls */}
      <div className="absolute top-14 right-3 flex flex-col gap-1.5 z-10">
        <div className="flex flex-col rounded-xl overflow-hidden shadow-md border border-outline-variant/30 bg-surface/95 backdrop-blur-md">
          <button
            type="button"
            onClick={() => mapRef.current?.zoomIn()}
            aria-label="Zoom in"
            className="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors border-b border-outline-variant/20"
          >
            <IconPlus size={14} />
          </button>
          <button
            type="button"
            onClick={() => mapRef.current?.zoomOut()}
            aria-label="Zoom out"
            className="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
          >
            <IconMinus size={14} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleRecenter}
          aria-label="Recenter on estate"
          title="Recenter on estate"
          className="w-8 h-8 rounded-xl flex items-center justify-center bg-surface/95 backdrop-blur-md text-on-surface hover:bg-surface-container shadow-md border border-outline-variant/30 transition-colors"
        >
          <IconFocusCentered size={14} />
        </button>
      </div>

      {/* Bottom Coordinates & Info Badge */}
      <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-3 p-2.5 rounded-xl bg-surface/95 backdrop-blur-md shadow-lg border border-outline-variant/30">
          <div className="w-8 h-8 rounded-lg bg-primary text-secondary flex items-center justify-center shrink-0">
            <IconBuildingEstate className="w-4 h-4" />
          </div>
          <div className="flex flex-col pr-2">
            <span className="text-xs font-bold text-on-surface truncate">
              {address}, {city}
            </span>
            <span className="text-[10px] text-on-surface-variant font-mono">
              {coordinates.lat.toFixed(4)}° N, {Math.abs(coordinates.lng).toFixed(4)}° W • Elevation 840ft
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
