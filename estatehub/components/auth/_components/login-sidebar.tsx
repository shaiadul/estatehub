"use client"

import {
  IconBuildingBank,
  IconShieldLock,
  IconDeviceAnalytics,
  IconLock,
} from "@tabler/icons-react"
import Image from "next/image"

export function LoginSidebar() {
  const pillars = [
    {
      Icon: IconBuildingBank,
      iconClassName: "w-5 h-5 text-on-secondary-container",
      title: "Off-Market Deal Rooms",
      badge: "> $10M+",
      desc: "Vetted access to confidential listings exceeding $10,000,000 with cryptographic non-disclosure agreements embedded on-chain.",
    },
    {
      Icon: IconShieldLock,
      iconClassName: "w-5 h-5 text-on-tertiary-container",
      title: "Bilateral Cryptographic Closings",
      badge: null,
      desc: "Legal digital PSA execution with verifiable settlement records, multisig escrows, and instantaneous sovereign deed generation.",
    },
    {
      Icon: IconDeviceAnalytics,
      iconClassName: "w-5 h-5 text-chart-5",
      title: "Integrated Facility IoT",
      badge: null,
      desc: "Autonomous telemetry, biometric perimeter access, aerial drone patrols, and high-precision microclimate telemetry feeds.",
    },
  ]
  return (
    <div className="lg:col-span-6 flex flex-col justify-between space-y-8 pr-0 lg:pr-6">
      <div className="flex flex-col space-y-4">
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm w-fit border border-outline-variant/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
          </span>
          <span className="font-caption text-xs text-on-surface-variant font-semibold tracking-wider uppercase">
            Zurich Secure Node // TLS 1.3 Active
          </span>
          <span className="text-on-surface-variant/40">|</span>
          <span className="font-caption text-xs text-on-surface-variant font-mono">0.14ms Latency</span>
        </div>

        
        <div className="space-y-1">
          <span className="font-label-sm text-xs uppercase tracking-widest text-on-secondary-container font-bold">
            Restricted Terminal Architecture
          </span>
          <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-on-surface font-extrabold tracking-tight leading-tight">
            The Sovereign Real Estate Exchange
          </h1>
        </div>

        <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
          Direct institutional access to off-market tier-one trophy assets, bilateral zero-knowledge closings, and autonomous facility command.
        </p>
      </div>

      
      <div className="relative rounded-2xl overflow-hidden shadow-lg bg-surface-container border border-outline-variant/20">
        <div className="relative h-48 w-full">
          <Image
            className="object-cover"
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            alt="Monolithic brutalist glass and black marble luxury estate perched over Lake Zurich at twilight"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary-container via-primary-container/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <span className="font-caption text-[11px] uppercase text-secondary font-bold tracking-wider block">
                Featured Tier-0 Property
              </span>
              <span className="font-headline-sm text-lg font-bold text-primary-foreground">
                The Enclave at Alpine Ridge
              </span>
              <p className="font-caption text-xs text-muted-foreground">
                Confidential Asset #CH-8829 // CHF 68,500,000
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-primary-container/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-outline-variant">
              <IconLock className="w-3.5 h-3.5 text-tertiary" />
              <span className="font-caption text-[11px] text-primary-foreground font-mono tracking-tight font-bold">
                ENCRYPTED
              </span>
            </div>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 gap-3 pt-2">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="group p-4 rounded-xl bg-surface-container-lowest shadow-xs border border-outline-variant/20 hover:border-primary/40 hover:shadow-md transition-all duration-300 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-on-surface">
              <pillar.Icon className={pillar.iconClassName} />
            </div>
            <div className="space-y-0.5">
              {pillar.badge ? (
                <div className="flex items-center gap-2">
                  <h3 className="font-label-md text-sm font-bold text-on-surface">{pillar.title}</h3>
                  <span className="font-caption text-[10px] px-1.5 py-0.5 rounded bg-secondary/10 text-on-secondary-container font-bold">
                    {pillar.badge}
                  </span>
                </div>
              ) : (
                <h3 className="font-label-md text-sm font-bold text-on-surface">{pillar.title}</h3>
              )}
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">{pillar.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}