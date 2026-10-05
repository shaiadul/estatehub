"use client"

import Link from "next/link"
import {
  IconShieldLock,
  IconFingerprint,
  IconKey,
  IconAt,
  IconLock,
  IconEye,
  IconEyeOff,
  IconArrowRight,
  IconUsb,
  IconChevronRight,
  IconHeadset,
  IconUserCheck,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { UserProfile } from "@/lib/auth-context"
import type { AuthRole } from "./auth-types"

interface LoginFormProps {
  authMode: "passkey" | "password"
  onAuthModeChange: (mode: "passkey" | "password") => void
  email: string
  onEmailChange: (value: string) => void
  password: string
  onPasswordChange: (value: string) => void
  showPassword: boolean
  onTogglePassword: () => void
  rememberSession: boolean
  onRememberChange: (value: boolean) => void
  isSubmitting: boolean
  onPasswordSubmit: (e: React.FormEvent) => void
  onPasskeyAuth: () => void
  onFidoOpen: () => void
  onDemoSelect: (role: AuthRole) => void
  user: UserProfile | null
  isLoggedIn: boolean
  isRentContext: boolean
  isSellerContext: boolean
}

export function LoginForm({
  authMode,
  onAuthModeChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  showPassword,
  onTogglePassword,
  rememberSession,
  onRememberChange,
  isSubmitting,
  onPasswordSubmit,
  onPasskeyAuth,
  onFidoOpen,
  onDemoSelect,
  user,
  isLoggedIn,
  isRentContext,
  isSellerContext,
}: LoginFormProps) {
  const demoRoles: { id: AuthRole; label: string; name: string }[] = [
    { id: "broker", label: "Broker", name: "(Sarah)" },
    { id: "buyer", label: "Buyer", name: "(Julian)" },
    { id: "seller", label: "Seller", name: "(Marcus)" },
  ]
  const authModes = [
    { id: "passkey" as const, label: "Passkey & Biometric", Icon: IconFingerprint },
    { id: "password" as const, label: "Institutional Password", Icon: IconKey },
  ]
  return (
    <div className="lg:col-span-6 w-full max-w-xl mx-auto lg:ml-auto">
      
      <div className="mb-4 p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-caption text-xs uppercase font-bold tracking-wider text-on-surface-variant flex items-center gap-1.5">
            <IconUserCheck className="w-3.5 h-3.5 text-on-secondary-container" /> Quick Demo Sign-In
          </span>
          <span className="text-[11px] text-muted-foreground">Instant 1-Click Access</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {demoRoles.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => onDemoSelect(role.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                user?.role === role.id && isLoggedIn
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/40"
              }`}
            >
              <span>{role.label}</span>
              <span className="text-[10px] opacity-75">{role.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden border border-outline-variant/30">
        
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />

        
        <div className="space-y-1 mb-6">
          <div className="flex items-center justify-between">
            <span className="font-caption text-xs tracking-widest uppercase font-bold text-on-secondary-container">
              {isRentContext
                ? "Client Rental Portal"
                : isSellerContext
                ? "Seller Syndication Portal"
                : "Single Sign-On Terminal"}
            </span>
            <div className="flex items-center gap-1 text-on-tertiary-container">
              <IconShieldLock className="w-4 h-4" />
              <span className="font-caption text-xs font-mono font-bold">FIPS 140-3</span>
            </div>
          </div>
          <h2 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
            {isRentContext
              ? "Client Portal Sign-In"
              : isSellerContext
              ? "Seller Portal Sign-In"
              : "Institutional Portal Sign-In"}
          </h2>
          <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
            {isRentContext
              ? "Sign in to access private rental portfolios, schedule client viewings, and request terms."
              : isSellerContext
              ? "Authenticate to list, syndicate, and manage your luxury properties on the private exchange."
              : "Authenticate using verified credentials or registered hardware token."}
          </p>
        </div>

        
        <div className="p-1 rounded-xl bg-surface-container-low flex items-center gap-1 mb-6">
          {authModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => onAuthModeChange(mode.id)}
              className={`flex-1 py-2 px-3 rounded-lg font-label-md text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                authMode === mode.id
                  ? "bg-surface-container-lowest text-on-surface font-bold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface font-medium"
              }`}
            >
              <mode.Icon className="w-4 h-4" />
              <span>{mode.label}</span>
            </button>
          ))}
        </div>

        
        {authMode === "passkey" ? (
          <div className="space-y-4 mb-4">
            <Button
              onClick={onPasskeyAuth}
              disabled={isSubmitting}
              className="w-full py-4 h-auto rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-semibold text-sm sm:text-base flex items-center justify-center gap-3 shadow-md group transition-all"
            >
              <IconFingerprint className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
              <span>{isSubmitting ? "Verifying Passkey..." : "Authenticate with Passkey / Face ID"}</span>
            </Button>

            
            <div className="relative flex items-center justify-center py-2">
              <div className="w-full h-px bg-surface-variant" />
              <span className="absolute bg-surface-container-lowest px-3 font-caption text-xs text-on-surface-variant uppercase tracking-wider">
                or use password credentials
              </span>
            </div>
          </div>
        ) : null}

        
        <form onSubmit={onPasswordSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="font-label-sm text-xs text-on-surface font-semibold flex items-center justify-between">
              <span>Confidential Work Email</span>
              <span className="font-caption text-[11px] text-on-surface-variant">Domain Verified Only</span>
            </label>
            <div className="relative">
              <Input
                type="email"
                required
                placeholder="name@entity.com"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                className="w-full bg-surface-container-low pl-10 pr-3 py-2.5 rounded-xl text-on-surface placeholder:text-outline focus:bg-surface-container-lowest transition-all"
              />
              <IconAt className="w-4 h-4 text-outline absolute left-3.5 top-3.5" />
            </div>
          </div>

          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-label-sm text-xs text-on-surface font-semibold">Security Password</label>
              <Link
                href="/forgot-password"
                className="font-caption text-xs text-on-surface-variant hover:text-on-surface transition-colors underline decoration-outline-variant"
              >
                Forgot Credentials?
              </Link>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                required={authMode === "password"}
                placeholder="••••••••••••••••"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                className="w-full bg-surface-container-low pl-10 pr-10 py-2.5 rounded-xl text-on-surface font-mono placeholder:text-outline focus:bg-surface-container-lowest transition-all"
              />
              <IconLock className="w-4 h-4 text-outline absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={onTogglePassword}
                className="absolute right-3.5 top-3.5 text-outline hover:text-on-surface transition-colors"
              >
                {showPassword ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberSession}
              onChange={(e) => onRememberChange(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-outline text-primary accent-primary cursor-pointer shrink-0"
            />
            <label htmlFor="remember" className="font-caption text-xs text-on-surface-variant leading-snug cursor-pointer">
              Keep session active on this trusted hardware enclave for 8 hours (IP Geofenced)
            </label>
          </div>

          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 h-auto rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-semibold text-sm flex items-center justify-center gap-2 shadow-md group transition-all"
          >
            <span>{isSubmitting ? "Authorizing Enclave..." : "Authorize & Enter Enclave"}</span>
            <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          
          <div className="pt-1">
            <button
              type="button"
              onClick={onFidoOpen}
              className="w-full py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-xs flex items-center justify-center gap-2 transition-colors border border-outline-variant/30"
            >
              <IconUsb className="w-4 h-4 text-on-surface-variant" />
              <span>Use FIDO2 Hardware Key (USB-C / NFC)</span>
            </button>
          </div>
        </form>

        
        <div className="mt-6 pt-4 border-t border-surface-container -mx-6 sm:-mx-8 lg:-mx-10 -mb-6 sm:-mb-8 lg:-mb-10 p-4 bg-surface-container-low/40 text-center">
          <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
            New institutional counterparty?{" "}
            <Link
              href="/register"
              className="font-label-sm text-on-surface hover:text-on-secondary-container font-bold transition-colors inline-flex items-center gap-0.5 ml-1"
            >
              <span>Request Membership &amp; Begin KYC Application</span>
              <IconChevronRight className="w-3.5 h-3.5" />
            </Link>
          </p>
        </div>
      </div>

      
      <div className="mt-4 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-tertiary" />
          <span className="font-caption text-xs text-on-surface-variant font-mono">
            Hardware Security Module (HSM) Online
          </span>
        </div>
        <a
          href="mailto:security@estatehub.com"
          className="font-caption text-xs text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1"
        >
          <IconHeadset className="w-3.5 h-3.5" />
          <span>Emergency SecDesk</span>
        </a>
      </div>
    </div>
  )
}