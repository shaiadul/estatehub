"use client"

import {
  IconShieldLock,
  IconLock,
  IconLockOpen,
  IconTemperature,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
      <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-on-surface">
            IoT Smart Estate Sentry &amp; Facility Controls
          </h2>
          <p className="text-xs text-on-surface-variant">
            Remote management for estate access perimeter, biometric entries,
            and smart environmental systems
          </p>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
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
            <p className="text-[11px] text-on-surface-variant">
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
              className={`h-10 w-full rounded-xl text-xs font-bold ${
                securityArmed
                  ? "bg-destructive/20 text-destructive hover:bg-destructive/30"
                  : "bg-tertiary text-primary-foreground"
              }`}
            >
              {securityArmed ? "Disarm Perimeter" : "Arm Perimeter Sentry"}
            </Button>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
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
                variant={gateUnlocked ? "secondary" : "outline"}
                className="text-[10px]"
              >
                {gateUnlocked ? "UNLOCKED" : "LOCKED"}
              </Badge>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              Automated license plate recognition and biometric intercom gate.
            </p>
            <Button
              onClick={() => {
                setGateUnlocked(!gateUnlocked)
                triggerToast(
                  gateUnlocked ? "Gate locked" : "Gate opened for guest dispatch"
                )
              }}
              className="h-10 w-full rounded-xl bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/90"
            >
              {gateUnlocked ? "Lock Motor Gate" : "Open Security Gate"}
            </Button>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <IconTemperature size={18} />
                </div>
                <span className="text-xs font-bold text-on-surface">
                  Main Salon Climate
                </span>
              </div>
              <span className="font-mono text-sm font-bold text-secondary">
                {salonTemp}°F
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              {TEMP_STEPS.map((step) => (
                <Button
                  key={step.label}
                  variant="outline"
                  onClick={() => setSalonTemp((t) => t + step.delta)}
                  className="h-10 flex-1 rounded-xl border-outline-variant/40 font-bold"
                >
                  {step.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
