"use client"

import * as React from "react"
import Image from "next/image"
import {
  IconShieldLock,
  IconBolt,
  IconTemperature,
  IconPool,
  IconLock,
  IconLockOpen,
  IconVideo,
  IconWind,
  IconFileText,
  IconDownload,
  IconCalendarEvent,
  IconCircleCheck,
  IconCheck,
} from "@tabler/icons-react"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function SmartEstateCommandView() {
  const [activeTab, setActiveTab] = React.useState<"facility" | "security" | "vdr" | "syndicate">("facility")
  const [securityArmed, setSecurityArmed] = React.useState<boolean>(true)
  const [salonTemp, setSalonTemp] = React.useState<number>(70)
  const [poolTemp, setPoolTemp] = React.useState<number>(82)
  const [wineTemp, setWineTemp] = React.useState<number>(55)
  const [gateUnlocked, setGateUnlocked] = React.useState<boolean>(false)
  const [actionToast, setActionToast] = React.useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setActionToast(msg)
    setTimeout(() => setActionToast(null), 3500)
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      <Header />

      <main className="w-full pt-20 flex-1">
        {/* Top Operational Status Banner */}
        <section className="w-full bg-surface-container-lowest border-b border-outline-variant/30 shadow-xs">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-mono text-[11px] text-on-surface-variant uppercase font-semibold">
                    Asset ID: BP-BELAIR-90077
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high font-mono text-[11px] text-on-surface uppercase font-semibold">
                    APN: 4376-012-044
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Encrypted IoT Mesh • Threat Lvl 0 (Secure)
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                  The Glass Horizon Villa — Smart Command Hub
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant flex items-center gap-1.5">
                  <span>10540 Bellagio Road, Bel Air, Los Angeles, CA</span>
                  <span>•</span>
                  <span>Supervised by Marcus Sterling, Premier Managing Partner</span>
                </p>
              </div>

              {/* Quick Remote Toggle Panel */}
              <div className="flex items-center gap-3 bg-surface-container-low p-2 rounded-2xl border border-outline-variant/30 shrink-0">
                <Button
                  variant={securityArmed ? "luxury" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSecurityArmed(!securityArmed)
                    triggerToast(securityArmed ? "Perimeter sentry disarmed to Guest Mode" : "Perimeter sentry armed to Level 3 lockdown")
                  }}
                  className="gap-2 text-xs"
                >
                  <IconShieldLock size={16} />
                  <span>{securityArmed ? "Perimeter: Armed" : "Perimeter: Standby"}</span>
                </Button>

                <Button
                  variant={gateUnlocked ? "destructive" : "gold"}
                  size="sm"
                  onClick={() => {
                    setGateUnlocked(!gateUnlocked)
                    triggerToast(gateUnlocked ? "Estate security motor gate locked" : "Estate security motor gate unlocked for dispatch")
                  }}
                  className="gap-2 text-xs"
                >
                  {gateUnlocked ? <IconLockOpen size={16} /> : <IconLock size={16} />}
                  <span>{gateUnlocked ? "Gate: Open" : "Gate: Locked"}</span>
                </Button>
              </div>
            </div>

            {/* Live Operational Metrics Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span>Current Valuation</span>
                  <Badge variant="gold" className="text-[10px] py-0">+8.4% YoY</Badge>
                </div>
                <span className="text-2xl font-black text-on-surface mt-1">$8,750,000</span>
                <span className="text-[11px] text-on-surface-variant mt-0.5">Assessed Portfolio Value</span>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span>Solar Output</span>
                  <IconBolt size={16} className="text-amber-500" />
                </div>
                <span className="text-2xl font-black text-on-surface mt-1">18.4 kW</span>
                <span className="text-[11px] text-emerald-600 font-semibold mt-0.5">Tesla Powerwall at 98%</span>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span>Infinity Pool</span>
                  <IconPool size={16} className="text-blue-500" />
                </div>
                <span className="text-2xl font-black text-on-surface mt-1">{poolTemp}°F</span>
                <span className="text-[11px] text-on-surface-variant mt-0.5">Saltwater Heating Active</span>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span>Air Quality Index</span>
                  <IconWind size={16} className="text-emerald-500" />
                </div>
                <span className="text-2xl font-black text-emerald-600 mt-1">12 AQI</span>
                <span className="text-[11px] text-on-surface-variant mt-0.5">HEPA Commercial Filtration</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Content & Tabbed Management */}
        <section className="w-full py-10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            {/* View Selection Tabs */}
            <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-4 mb-8 overflow-x-auto no-scrollbar">
              <Button
                variant={activeTab === "facility" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("facility")}
                className="rounded-full text-xs font-semibold gap-1.5"
              >
                <IconTemperature size={16} />
                <span>Facility &amp; Climate Automation</span>
              </Button>

              <Button
                variant={activeTab === "security" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("security")}
                className="rounded-full text-xs font-semibold gap-1.5"
              >
                <IconVideo size={16} />
                <span>Perimeter CCTV &amp; Night Sentry</span>
              </Button>

              <Button
                variant={activeTab === "vdr" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("vdr")}
                className="rounded-full text-xs font-semibold gap-1.5"
              >
                <IconFileText size={16} />
                <span>Virtual Data Room &amp; Deeds</span>
              </Button>

              <Button
                variant={activeTab === "syndicate" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("syndicate")}
                className="rounded-full text-xs font-semibold gap-1.5"
              >
                <IconCalendarEvent size={16} />
                <span>Private Showing Registry</span>
              </Button>
            </div>

            {/* TAB 1: Facility & Climate Automation */}
            {activeTab === "facility" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Grand Salon Climate */}
                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 shadow-sm flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                        Zone 01 • Main Salon
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-bold text-on-surface">Great Room &amp; Foyer</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Multi-zone VRF hydronic heat &amp; cooling</p>
                  </div>

                  <div className="flex flex-col items-center justify-center py-4 bg-surface-container-low rounded-2xl">
                    <span className="text-5xl font-black text-on-surface">{salonTemp}°F</span>
                    <span className="text-xs text-secondary font-semibold mt-1">Target Climate</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSalonTemp((prev) => prev - 1)}
                      className="w-12 h-10 font-bold text-lg"
                    >
                      -
                    </Button>
                    <span className="text-xs text-on-surface-variant font-medium">Fine Increment</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSalonTemp((prev) => prev + 1)}
                      className="w-12 h-10 font-bold text-lg"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Wine Cellar Climate */}
                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 shadow-sm flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                        Zone 02 • Wine Gallery
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <h3 className="text-lg font-bold text-on-surface">600-Bottle Glass Cellar</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Hermetic dual-compressor vapor regulation</p>
                  </div>

                  <div className="flex flex-col items-center justify-center py-4 bg-surface-container-low rounded-2xl">
                    <span className="text-5xl font-black text-secondary">{wineTemp}°F</span>
                    <span className="text-xs text-on-surface-variant font-semibold mt-1">62% Rel. Humidity</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setWineTemp((prev) => prev - 1)}
                      className="w-12 h-10 font-bold text-lg"
                    >
                      -
                    </Button>
                    <span className="text-xs text-on-surface-variant font-medium">Sommelier Setting</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setWineTemp((prev) => prev + 1)}
                      className="w-12 h-10 font-bold text-lg"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Pool & Cantilever Terrace */}
                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 shadow-sm flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                        Zone 03 • Exterior Edge
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-bold text-on-surface">60ft Cantilever Pool</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Automated ozone sanitizer &amp; heat pump</p>
                  </div>

                  <div className="flex flex-col items-center justify-center py-4 bg-surface-container-low rounded-2xl">
                    <span className="text-5xl font-black text-on-surface">{poolTemp}°F</span>
                    <span className="text-xs text-blue-600 font-semibold mt-1">Spa Spillway Active</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPoolTemp((prev) => prev - 1)}
                      className="w-12 h-10 font-bold text-lg"
                    >
                      -
                    </Button>
                    <span className="text-xs text-on-surface-variant font-medium">Water Temp</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPoolTemp((prev) => prev + 1)}
                      className="w-12 h-10 font-bold text-lg"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Perimeter CCTV & Sentry */}
            {activeTab === "security" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Camera 1: Motor Court */}
                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm flex flex-col">
                  <div className="relative h-64 w-full bg-slate-900">
                    <Image
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                      alt="CCTV Feed 1"
                      fill
                      className="object-cover opacity-75"
                    />
                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/80 text-white font-mono text-[11px] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      CAM-01 • GATED MOTOR COURT
                    </div>
                    <div className="absolute bottom-4 right-4 px-2 py-0.5 rounded bg-black/70 text-white font-mono text-[10px]">
                      1080p • 60 FPS • Encrypted Stream
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">Bellagio Gate North Approach</h4>
                      <p className="text-xs text-on-surface-variant">AI License Plate Reader Active • 0 Exceptions</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => triggerToast("Dispatching drone sentry to perimeter sector 1")}>
                      Deploy Drone
                    </Button>
                  </div>
                </div>

                {/* Camera 2: South Infinity Horizon */}
                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm flex flex-col">
                  <div className="relative h-64 w-full bg-slate-900">
                    <Image
                      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
                      alt="CCTV Feed 2"
                      fill
                      className="object-cover opacity-75"
                    />
                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/80 text-white font-mono text-[11px] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      CAM-02 • INFINITY CREST PANORAMA
                    </div>
                    <div className="absolute bottom-4 right-4 px-2 py-0.5 rounded bg-black/70 text-white font-mono text-[10px]">
                      4K Night Vision • Thermal Active
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">South Canyon Knoll Perimeter</h4>
                      <p className="text-xs text-on-surface-variant">Infrared Perimeter Beam Intact • 0 Motion Alerts</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => triggerToast("Exterior architectural perimeter lights pulsed")}>
                      Pulse Lights
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Virtual Data Room (VDR) & Deeds */}
            {activeTab === "vdr" && (
              <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-8 shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-on-surface">Confidential Virtual Data Room (VDR)</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                    Certified 256-bit encrypted legal filings, title insurance, architectural blueprints, and escrow receipts.
                  </p>
                </div>

                <div className="divide-y divide-outline-variant/20">
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                        <IconFileText size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">Grant Deed &amp; Title Insurance Policy</h4>
                        <p className="text-xs text-on-surface-variant">First American Title • $8,750,000 Insured Value</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => triggerToast("Downloading authenticated title policy PDF...")}>
                      <IconDownload size={14} /> Download PDF
                    </Button>
                  </div>

                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                        <IconFileText size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">Geotechnical Slope Stability &amp; Soil Audit</h4>
                        <p className="text-xs text-on-surface-variant">Bel Air Hills Engineering • Grade A1 Certification</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => triggerToast("Downloading geotechnical engineering report...")}>
                      <IconDownload size={14} /> Download PDF
                    </Button>
                  </div>

                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                        <IconFileText size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">Complete Architectural CAD Blueprint Set</h4>
                        <p className="text-xs text-on-surface-variant">3 Levels + Motor Vault • Studio Davide Groppi Lighting Plan</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => triggerToast("Downloading architectural blueprints archive...")}>
                      <IconDownload size={14} /> Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Private Showing Registry */}
            {activeTab === "syndicate" && (
              <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-8 shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-on-surface">Scheduled Showing &amp; VIP Access Protocol</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                    Pre-cleared high-net-worth investor viewings coordinated with the Bel Air security gate.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="gold" className="text-[10px]">Today • 2:00 PM</Badge>
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <IconCircleCheck size={14} /> Pre-Approved
                      </span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-on-surface">Geneva Family Office Syndicate</h4>
                      <p className="text-xs text-on-surface-variant mt-0.5">Accredited Buyer Principal • Escorted by Marcus Sterling</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-outline-variant/20">
                      <span>Vehicle: Armored Range Rover (#4XQ881)</span>
                      <span className="text-secondary font-bold">Gate Pass Issued</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[10px]">Tomorrow • 11:30 AM</Badge>
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <IconCircleCheck size={14} /> Pre-Approved
                      </span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-on-surface">Singapore Sovereign Wealth Partner</h4>
                      <p className="text-xs text-on-surface-variant mt-0.5">Live Walkthrough + 3D Matterport Review</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-outline-variant/20">
                      <span>Format: Encrypted Satellite Stream</span>
                      <span className="text-secondary font-bold">Link Generated</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Global Action Toast Notification */}
        {actionToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 animate-in slide-in-from-bottom duration-300">
            <IconCheck size={20} className="text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold">{actionToast}</span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
