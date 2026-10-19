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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useI18n } from "@/lib/i18n"

import { forgotPasswordAction, resetPasswordAction } from "@/actions/auth"

export function ForgotPasswordView() {
  const { t } = useI18n()
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const [nonce, setNonce] = React.useState<string>("#0x7b29a8f4")
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)

  // Reset password states
  const [newPassword, setNewPassword] = React.useState("")
  const [isResetting, setIsResetting] = React.useState(false)
  const [resetSuccess, setResetSuccess] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    setErrorMsg(null)

    try {
      const res = await forgotPasswordAction(email)
      if (res.success && res.data) {
        setNonce(res.data.verification_nonce || "#0x" + Math.random().toString(16).slice(2, 10))
        setSubmitted(true)
      } else {
        setErrorMsg(res.error || "Failed to dispatch recovery instructions")
      }
    } catch {
      setErrorMsg("Network error contacting security gateway")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPassword || newPassword.length < 8) {
      setErrorMsg("New password must be at least 8 characters")
      return
    }

    setIsResetting(true)
    setErrorMsg(null)
    try {
      const res = await resetPasswordAction({
        email,
        token: nonce,
        new_password: newPassword,
      })
      if (res.success) {
        setResetSuccess(true)
      } else {
        setErrorMsg(res.error || "Password reset failed")
      }
    } catch {
      setErrorMsg("Network error resetting password")
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <SectionWrapper
      fullWidth
      className="relative bg-surface min-h-[calc(100vh-14rem)] flex items-center justify-center py-8 md:py-12"
      innerClassName="w-full max-w-lg mx-auto relative z-10"
    >
      <div className="w-full">
        <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-outline-variant/30 relative overflow-hidden">
          {/* Top Metallic Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-primary via-secondary to-primary" />

          {submitted ? (
            <div className="flex flex-col items-center text-center space-y-4 py-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-tertiary/10 text-on-tertiary-container flex items-center justify-center">
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
                <span className="font-bold text-on-surface">{nonce}</span>
              </div>

              {resetSuccess ? (
                <div className="w-full p-4 rounded-xl bg-tertiary/10 border border-tertiary/20 text-center">
                  <p className="text-sm font-semibold text-on-tertiary-container">
                    Password successfully updated!
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    You can now authenticate with your new credentials.
                  </p>
                  <div className="pt-3">
                    <Link href="/login">
                      <Button className="w-full py-2.5 h-auto rounded-xl bg-primary text-on-primary font-bold">
                        {t("auth.backToSignIn", "Return to Terminal Sign-In")}
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="w-full space-y-3 pt-2 text-left">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-on-surface">Set New Terminal Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Minimum 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                  {errorMsg && (
                    <p className="text-xs text-error font-medium">{errorMsg}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={isResetting}
                    className="w-full py-2.5 h-auto rounded-xl bg-primary text-on-primary font-bold text-xs"
                  >
                    {isResetting ? "Updating Key..." : "Update Password & Seal Credentials"}
                  </Button>
                  <div className="pt-1 text-center">
                    <Link href="/login" className="text-xs text-on-surface-variant hover:text-on-surface">
                      {t("auth.backToSignIn", "Return to Terminal Sign-In")}
                    </Link>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-low text-xs font-bold text-on-secondary-container mb-2">
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
                    <span>{t("auth.emailLabel", "Confidential Work Email")}</span>
                    <span className="font-caption text-[11px] text-on-surface-variant">{t("auth.domainVerified", "Authorized Entity Only")}</span>
                  </label>
                  <InputGroup className="h-11 rounded-xl bg-surface-container-low border-outline-variant/30 focus-within:bg-surface-container-lowest focus-within:border-primary transition-all">
                    <InputGroupAddon align="inline-start">
                      <IconAt className="w-4 h-4 text-outline" />
                    </InputGroupAddon>
                    <InputGroupInput
                      type="email"
                      required
                      placeholder="principal@familyoffice.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-on-surface placeholder:text-outline text-xs sm:text-sm"
                    />
                  </InputGroup>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 h-auto rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <span>{isLoading ? "Validating Enclave Registry..." : t("auth.recoveryLink", "Dispatch Recovery Link")}</span>
                  <IconArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <div className="pt-4 border-t border-surface-container flex flex-col gap-3 text-center">
                <Link
                  href="/login"
                  className="font-label-sm text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors inline-flex items-center justify-center gap-1"
                >
                  <IconArrowLeft className="w-3.5 h-3.5" />
                  <span>{t("auth.backToSignIn", "Back to Institutional Sign-In")}</span>
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
    </SectionWrapper>
  )
}
