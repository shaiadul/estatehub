"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconShield,
  IconAt,
  IconArrowRight,
  IconArrowLeft,
  IconMailCheck,
  IconHeadset,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ForgotPasswordView() {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
    }, 700)
  }

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center py-12 px-4 md:px-8 relative bg-surface">
      <div className="w-full max-w-lg mx-auto relative z-10">
        <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-outline-variant/30 relative overflow-hidden">
          {/* Top Metallic Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-amber-400 to-primary" />

          {submitted ? (
            <div className="flex flex-col items-center text-center space-y-4 py-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <IconMailCheck className="w-8 h-8" />
              </div>
              <h2 className="font-headline-sm text-2xl font-bold text-on-surface">
                Encrypted Recovery Dispatched
              </h2>
              <p className="font-body-sm text-sm text-on-surface-variant max-w-sm">
                A cryptographic session reset token has been dispatched to{" "}
                <strong className="text-on-surface">{email}</strong>. The link expires in 15 minutes.
              </p>
              <div className="p-3 bg-surface-container-low rounded-xl text-left w-full font-mono text-xs text-on-surface-variant flex items-center justify-between">
                <span>Verification Nonce:</span>
                <span className="font-bold text-on-surface">#0x7b29a8f4</span>
              </div>
              <div className="pt-2 w-full">
                <Link href="/login">
                  <Button className="w-full py-3 h-auto rounded-xl bg-primary text-on-primary font-bold">
                    Return to Terminal Sign-In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-low text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">
                  <IconShield className="w-3.5 h-3.5" />
                  <span>Sovereign Recovery Protocol</span>
                </div>
                <h2 className="font-headline-md text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                  Credential Recovery
                </h2>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
                  Enter your registered institutional email to initiate secure key reconstruction.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs font-semibold text-on-surface flex items-center justify-between">
                    <span>Confidential Work Email</span>
                    <span className="font-caption text-[11px] text-on-surface-variant">Authorized Entity Only</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="email"
                      required
                      placeholder="principal@familyoffice.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface-container-low pl-10 pr-3 py-2.5 rounded-xl text-on-surface focus:bg-surface-container-lowest"
                    />
                    <IconAt className="w-4 h-4 text-outline absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 h-auto rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <span>{isLoading ? "Validating Enclave Registry..." : "Dispatch Recovery Link"}</span>
                  <IconArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <div className="pt-4 border-t border-surface-container flex flex-col gap-3 text-center">
                <Link
                  href="/login"
                  className="font-label-sm text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors inline-flex items-center justify-center gap-1"
                >
                  <IconArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Institutional Sign-In</span>
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-on-surface-variant font-caption text-xs">
                  <IconHeadset className="w-3.5 h-3.5" />
                  <span>Hardware token lost? Contact SecDesk: +41 22 819 0400</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
