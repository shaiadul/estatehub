"use client"

import * as React from "react"
import {
  IconUsb,
  IconLock,
  IconShield,
  IconShieldCheck,
  IconRefresh,
  IconKey,
  IconDeviceMobile,
  IconFingerprint,
  IconChevronDown,
  IconChevronUp,
  IconArrowRight,
  IconX,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

interface Fido2ModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  entityName?: string
  tokenId?: string
}

function Fido2ModalInner({
  onClose,
  onSuccess,
  entityName = "Alpha Crest Sovereign Capital LLC",
  tokenId = "#9842",
}: Omit<Fido2ModalProps, "isOpen">) {
  const fallbackMethods = [
    {
      key: "mobile",
      Icon: IconDeviceMobile,
      title: "Mobile Authenticator",
      desc: "6-digit rotating code via EstateHub Guard",
    },
    {
      key: "biometric",
      Icon: IconFingerprint,
      title: "Biometric Platform Passkey",
      desc: "Touch ID, Face Recognition or Windows Hello",
    },
  ]
  const [pin, setPin] = React.useState<string[]>(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = React.useState(90)
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [showFallbacks, setShowFallbacks] = React.useState(false)
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      inputRefs.current[0]?.focus()
    }, 150)
    return () => clearTimeout(timeout)
  }, [])

  const handlePinChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const newPin = [...pin]
    newPin[index] = val.slice(-1)
    setPin(newPin)

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      onSuccess()
    }, 1200)
  }

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0")
    const s = (secs % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/30 flex flex-col">
        
        <div className="h-1.5 w-full bg-surface-container-low overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / 90) * 100}%` }}
          />
        </div>

        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors z-10"
        >
          <IconX className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8 flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="font-caption text-[11px] tracking-widest uppercase text-on-surface-variant font-semibold">
              Zero-Trust Protocol // Session Elevation
            </span>
            <span className="text-outline-variant text-[11px]">|</span>
            <span className="font-caption text-[11px] text-on-tertiary-container font-semibold flex items-center gap-1">
              <IconLock className="w-3.5 h-3.5" /> FIPS 140-3 Level 4
            </span>
          </div>

          <h2 className="font-headline-sm text-xl md:text-2xl text-on-surface font-bold tracking-tight">
            Hardware Security Verification
          </h2>
          <p className="font-body-sm text-xs md:text-sm text-on-surface-variant max-w-md mt-1">
            High-assurance clearance required to elevate session and access the sovereign closing enclave.
          </p>

          
          <div
            onClick={handleVerify}
            className="relative flex items-center justify-center my-6 cursor-pointer group"
          >
            <div className="absolute w-24 h-24 rounded-full bg-surface-container-high/60 animate-ping opacity-40" />
            <div className="absolute w-20 h-20 rounded-full bg-surface-container-highest animate-pulse" />
            <div className="relative w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xl group-hover:scale-105 active:scale-95 transition-transform">
              <IconUsb className="w-8 h-8 text-secondary" />
            </div>
            <div className="absolute -bottom-2.5 px-2.5 py-0.5 rounded-full bg-primary text-on-primary text-[10px] uppercase font-bold tracking-wider shadow-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping" />
              <span>Awaiting Touch</span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="font-label-md text-sm font-semibold text-on-surface">Interact With Your Security Key</p>
            <p className="font-body-sm text-xs text-on-surface-variant max-w-sm">
              Insert your registered security key into any USB port or tap your NFC device against your hardware reader.
            </p>
          </div>

          
          <div className="w-full mt-4 p-3 bg-surface-container-low rounded-xl text-left flex items-start gap-3 border border-surface-variant/30">
            <IconKey className="w-5 h-5 text-on-surface shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-label-sm text-xs text-on-surface uppercase tracking-wider font-semibold">
                  Registered Token {tokenId}
                </span>
                <span className="font-caption text-[10px] text-on-tertiary-container font-bold px-1.5 py-0.5 rounded bg-surface-container-lowest shadow-xs">
                  FIDO2 / WebAuthn
                </span>
              </div>
              <p className="font-caption text-[11px] text-on-surface-variant truncate mt-0.5">
                {entityName} • Escrow Authorized #AC-4188
              </p>
            </div>
          </div>

          
          <div className="w-full mt-5">
            <div className="flex items-center justify-between mb-2">
              <label className="font-label-sm text-xs text-on-surface font-semibold flex items-center gap-1">
                <span>Security PIN</span>
                <span className="text-on-surface-variant font-normal">(6 digits)</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setPin(["", "", "", "", "", ""])
                  inputRefs.current[0]?.focus()
                }}
                className="font-caption text-xs text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1"
              >
                <IconRefresh className="w-3 h-3" /> Reset PIN
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 sm:gap-2.5">
              {pin.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el
                  }}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center font-headline-sm text-lg bg-surface-container-low text-on-surface rounded-xl border border-outline-variant/40 focus:border-primary focus:bg-surface-container-lowest focus:outline-none transition-all shadow-inner"
                />
              ))}
            </div>

            <p className="font-caption text-[11px] text-on-surface-variant text-left mt-2 flex items-center gap-1">
              <IconShield className="w-3.5 h-3.5 text-on-surface-variant" /> Hardware enclave requires PIN touch verification within 90 seconds.
            </p>
          </div>

          
          <div className="w-full mt-5 space-y-2">
            <Button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full py-3 h-auto bg-primary hover:bg-primary/90 text-on-primary font-semibold text-sm rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <IconShieldCheck className="w-4 h-4 text-tertiary" />
              <span>{isVerifying ? "Verifying Enclave Cryptography..." : "Confirm & Elevate Session"}</span>
            </Button>

            <div className="flex items-center justify-between text-left px-1 font-caption text-xs text-on-surface-variant">
              <span>
                Session Expires:{" "}
                <strong className="font-mono text-on-surface font-semibold">{formatTimer(timeLeft)}</strong>
              </span>
              <span className="flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> Nonce #4f9a
              </span>
            </div>
          </div>
        </div>

        
        <div className="bg-surface-container-low p-4 border-t border-surface-variant/30">
          <button
            type="button"
            onClick={() => setShowFallbacks(!showFallbacks)}
            className="w-full flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <IconKey className="w-4 h-4" />
              </div>
              <div>
                <p className="font-label-sm text-xs text-on-surface font-semibold">Alternative Elevated Verification Methods</p>
                <p className="font-caption text-[10px] text-on-surface-variant">Access clearance without physical USB token</p>
              </div>
            </div>
            {showFallbacks ? (
              <IconChevronUp className="w-4 h-4 text-on-surface-variant" />
            ) : (
              <IconChevronDown className="w-4 h-4 text-on-surface-variant" />
            )}
          </button>

          {showFallbacks && (
            <div className="mt-3 space-y-2 pt-2 border-t border-surface-container animate-fade-in">
              {fallbackMethods.map((method) => (
                <div
                  key={method.key}
                  onClick={handleVerify}
                  className="p-2.5 bg-surface-container-lowest rounded-lg flex items-center justify-between hover:bg-surface-container transition-colors cursor-pointer group shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-on-surface">
                      <method.Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-label-sm text-xs font-semibold text-on-surface">{method.title}</p>
                      <p className="font-caption text-[10px] text-on-surface-variant">{method.desc}</p>
                    </div>
                  </div>
                  <IconArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-on-surface transition-colors" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Fido2Modal(props: Fido2ModalProps) {
  if (!props.isOpen) return null
  return <Fido2ModalInner {...props} />
}