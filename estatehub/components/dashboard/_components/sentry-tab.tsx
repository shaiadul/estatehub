"use client"

import {
  IconShieldLock,
  IconLock,
  IconLockOpen,
  IconTemperature,
  IconDeviceAnalytics,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import type { CommandState } from "./use-command-state"

interface SentryTabProps {
  state: CommandState
}

const TEMP_STEPS = [
  { label: "-1°F", delta: -1 },
  { label: "+1°F", delta: 1 },
]

export function SentryTab({ state }: SentryTabProps) {
  const {
    securityArmed,
    setSecurityArmed,
    gateUnlocked,
    setGateUnlocked,
    salonTemp,
    setSalonTemp,
    triggerToast,
  } = state

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-sm shadow-xs">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <IconDeviceAnalytics size={16} />
            </span>
            <CardTitle className="text-base font-bold text-on-surface">
              IoT Smart Estate Sentry &amp; Facility Controls
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-on-surface-variant">
            Remote management for estate access perimeter, biometric entries, and smart environmental systems
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Perimeter Sentry Card */}
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low/60 p-5 transition-all duration-200 hover:border-secondary/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <IconShieldLock size={18} />
                  </div>
                  <span className="text-xs font-bold text-on-surface">
                    Perimeter Sentry
                  </span>
                </div>
                <Badge
                  variant={securityArmed ? "gold" : "outline"}
                  className="text-[10px]"
                >
                  {securityArmed ? "ARMED" : "STANDBY"}
                </Badge>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Radar motion barriers and thermal fence sensors across grounds.
              </p>
              <Button
                onClick={() => {
                  setSecurityArmed(!securityArmed)
                  triggerToast(
                    securityArmed
                      ? "Perimeter disarmed"
                      : "Perimeter locked down & armed"
                  )
                }}
                size="sm"
                className={`h-9.5 w-full rounded-xl text-xs font-bold shadow-xs ${
                  securityArmed
                    ? "bg-destructive/15 text-destructive hover:bg-destructive/25 border border-destructive/20"
                    : "bg-tertiary text-primary-foreground hover:bg-tertiary/90"
                }`}
              >
                {securityArmed ? "Disarm Perimeter" : "Arm Perimeter Sentry"}
              </Button>
            </div>

            {/* Motorized Security Gate */}
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low/60 p-5 transition-all duration-200 hover:border-secondary/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                    {gateUnlocked ? (
                      <IconLockOpen size={18} />
                    ) : (
                      <IconLock size={18} />
                    )}
                  </div>
                  <span className="text-xs font-bold text-on-surface">
                    Motorized Security Gate
                  </span>
                </div>
                <Badge
                  variant={gateUnlocked ? "outline" : "secondary"}
                  className="text-[10px]"
                >
                  {gateUnlocked ? "OPEN" : "LOCKED"}
                </Badge>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Biometric gate with license plate automatic vehicle recognition.
              </p>
              <Button
                variant={gateUnlocked ? "destructive" : "outline"}
                size="sm"
                onClick={() => {
                  setGateUnlocked(!gateUnlocked)
                  triggerToast(
                    gateUnlocked ? "Security gate closed" : "Security gate unlocked"
                  )
                }}
                className="h-9.5 w-full rounded-xl text-xs font-bold shadow-xs"
              >
                {gateUnlocked ? "Lock Security Gate" : "Grant Entry / Unlock"}
              </Button>
            </div>

            {/* Smart Climate Zone */}
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low/60 p-5 transition-all duration-200 hover:border-secondary/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-tertiary/10 text-tertiary">
                    <IconTemperature size={18} />
                  </div>
                  <span className="text-xs font-bold text-on-surface">
                    Salon Climate Zone
                  </span>
                </div>
                <span className="font-mono text-base font-black text-on-surface">
                  {salonTemp}°F
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Dual HVAC with automated humidity stabilization for art collections.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {TEMP_STEPS.map((step) => (
                  <Button
                    key={step.label}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSalonTemp((prev) => prev + step.delta)
                      triggerToast(`Climate target set: ${salonTemp + step.delta}°F`)
                    }}
                    className="h-9.5 rounded-xl border-outline-variant/40 text-xs font-bold hover:bg-surface-container"
                  >
                    {step.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
