"use client"

import * as React from "react"
import {
  IconWorld,
  IconCheck,
  IconCurrencyDollar,
  IconArrowsExchange,
  IconSparkles,
  IconX,
} from "@tabler/icons-react"
import {
  useI18n,
  SUPPORTED_LANGUAGES,
  SUPPORTED_CURRENCIES,
  type Locale,
  type CurrencyCode,
} from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

interface CurrencyLanguageModalProps {
  className?: string
  variant?: "button" | "pill" | "menuItem"
}

export function CurrencyLanguageModal({
  className,
  variant = "button",
}: CurrencyLanguageModalProps) {
  const [open, setOpen] = React.useState(false)
  const {
    locale,
    currency,
    setLocaleAndCurrency,
    setLocale,
    setCurrency,
    currentLanguage,
    currentCurrency,
    formatPrice,
    t,
  } = useI18n()

  const [activeTab, setActiveTab] = React.useState<"language" | "currency">("language")
  const [tempLocale, setTempLocale] = React.useState<Locale>(locale)
  const [tempCurrency, setTempCurrency] = React.useState<CurrencyCode>(currency)

  // Sync temp values whenever modal opens
  React.useEffect(() => {
    if (open) {
      setTempLocale(locale)
      setTempCurrency(currency)
    }
  }, [open, locale, currency])

  const handleApply = () => {
    setLocale(tempLocale)
    setCurrency(tempCurrency)
    setOpen(false)
  }

  const handleQuickPreset = (loc: Locale, cur: CurrencyCode) => {
    setTempLocale(loc)
    setTempCurrency(cur)
  }

  // Sample price to preview conversion ($8,750,000)
  const sampleAmountUSD = 8750000
  const tempCurrConfig =
    SUPPORTED_CURRENCIES.find((c) => c.code === tempCurrency) || currentCurrency
  const previewConverted = Math.round(sampleAmountUSD * tempCurrConfig.rateFromUSD)
  const previewFormatted =
    tempCurrency === "BDT"
      ? `৳${previewConverted.toLocaleString("en-US")}`
      : tempCurrency === "SAR"
      ? `${previewConverted.toLocaleString("en-US")} ر.س`
      : tempCurrency === "EUR"
      ? `€${previewConverted.toLocaleString("de-DE")}`
      : `$${previewConverted.toLocaleString("en-US")}`

  return (
    <>
      {/* ── Trigger Button ── */}
      {variant === "menuItem" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "flex w-full items-center justify-between gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <IconWorld className="h-4 w-4 text-secondary" />
            <span>{t("nav.currencyAndLanguage", "Region & Currency")}</span>
          </div>
          <span className="flex items-center gap-1 font-mono text-[11px] text-on-secondary-container">
            <span>{currentLanguage.flag}</span>
            <span>{currentCurrency.code}</span>
          </span>
        </button>
      ) : variant === "pill" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "flex items-center gap-1.5 rounded-lg border border-outline-variant/40 bg-surface-container-low px-2.5 py-1 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container",
            className
          )}
        >
          <span>{currentLanguage.flag}</span>
          <span>{currentCurrency.code}</span>
          <span className="text-on-surface-variant font-mono">/ {currentLanguage.code.toUpperCase()}</span>
        </button>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpen(true)}
          className={cn(
            "h-9 items-center gap-1.5 rounded-xl border-outline-variant/40 px-3 text-xs font-semibold text-on-surface hover:text-on-surface hover:bg-surface-container transition-colors",
            className
          )}
          title="Change language and display currency"
        >
          <span className="text-sm">{currentLanguage.flag}</span>
          <span className="font-bold">{currentCurrency.code}</span>
          <span className="text-muted-foreground font-mono text-[11px]">•</span>
          <span className="font-semibold text-muted-foreground uppercase">{currentLanguage.code}</span>
        </Button>
      )}

      {/* ── Modal Dialog ── */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-primary/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setOpen(false)}
          />

          {/* Modal Card */}
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5 sm:p-6 text-on-surface shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-surface-container pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                  <IconWorld className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-on-surface">
                    {t("modal.title", "Language & Currency Preferences")}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {t(
                      "modal.subtitle",
                      "Select your preferred language and display currency. Exchange rates update in real time."
                    )}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                aria-label="Close dialog"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Regional Presets */}
            <div className="py-3 border-b border-surface-container">
              <span className="mb-2 block text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
                {t("modal.quickPresets", "Quick Regional Presets")}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { loc: "en" as Locale, cur: "USD" as CurrencyCode, label: "USA", flag: "🇺🇸", pair: "USD / EN" },
                  { loc: "bn" as Locale, cur: "BDT" as CurrencyCode, label: "BD", flag: "🇧🇩", pair: "BDT / BN" },
                  { loc: "ar" as Locale, cur: "SAR" as CurrencyCode, label: "KSA", flag: "🇸🇦", pair: "SAR / AR" },
                  { loc: "it" as Locale, cur: "EUR" as CurrencyCode, label: "ITA", flag: "🇮🇹", pair: "EUR / IT" },
                ].map((item) => {
                  const isPresetActive = tempLocale === item.loc && tempCurrency === item.cur
                  return (
                    <button
                      key={item.pair}
                      type="button"
                      onClick={() => handleQuickPreset(item.loc, item.cur)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-xl border p-2 text-left transition-all",
                        isPresetActive
                          ? "border-secondary bg-secondary/10 shadow-xs"
                          : "border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container"
                      )}
                    >
                      <span className="text-base">{item.flag}</span>
                      <div className="flex flex-col leading-tight">
                        <span className="text-xs font-bold text-on-surface">{item.pair}</span>
                        <span className="text-[10px] text-on-surface-variant">{item.label}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tabs (Language vs Currency) */}
            <div className="pt-3">
              <div className="flex items-center gap-1 rounded-xl bg-surface-container p-1 mb-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("language")}
                  className={cn(
                    "flex-1 rounded-lg py-1.5 text-xs font-bold transition-all",
                    activeTab === "language"
                      ? "bg-surface-container-lowest text-on-surface shadow-xs"
                      : "text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  {t("modal.tabLanguage", "Language")} ({SUPPORTED_LANGUAGES.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("currency")}
                  className={cn(
                    "flex-1 rounded-lg py-1.5 text-xs font-bold transition-all",
                    activeTab === "currency"
                      ? "bg-surface-container-lowest text-on-surface shadow-xs"
                      : "text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  {t("modal.tabCurrency", "Currency")} ({SUPPORTED_CURRENCIES.length})
                </button>
              </div>

              {/* Tab 1: Language Selection */}
              {activeTab === "language" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = tempLocale === lang.code
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => setTempLocale(lang.code)}
                        className={cn(
                          "flex items-center justify-between rounded-xl border p-2.5 text-left transition-all",
                          isSelected
                            ? "border-secondary bg-secondary/10 ring-1 ring-secondary/50"
                            : "border-outline-variant/30 hover:bg-surface-container hover:border-outline-variant"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{lang.flag}</span>
                          <div>
                            <div className="text-xs font-bold text-on-surface">
                              {lang.nativeName}
                            </div>
                            <div className="text-[11px] text-on-surface-variant">
                              {lang.name} • {lang.country}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-on-secondary">
                            <IconCheck className="h-3 w-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Tab 2: Currency Selection */}
              {activeTab === "currency" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {SUPPORTED_CURRENCIES.map((cur) => {
                    const isSelected = tempCurrency === cur.code
                    return (
                      <button
                        key={cur.code}
                        type="button"
                        onClick={() => setTempCurrency(cur.code)}
                        className={cn(
                          "flex items-center justify-between rounded-xl border p-2.5 text-left transition-all",
                          isSelected
                            ? "border-secondary bg-secondary/10 ring-1 ring-secondary/50"
                            : "border-outline-variant/30 hover:bg-surface-container hover:border-outline-variant"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-xs font-bold text-on-surface">
                            {cur.symbol}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-on-surface">{cur.code}</span>
                              <span className="text-[10px] text-on-surface-variant font-medium">
                                ({cur.nativeName})
                              </span>
                            </div>
                            <div className="text-[10px] text-on-surface-variant font-mono">
                              1 USD = {cur.rateFromUSD} {cur.code}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-on-secondary">
                            <IconCheck className="h-3 w-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Live Price Preview Box */}
            <div className="mt-4 rounded-xl bg-surface-container-low p-3 border border-outline-variant/20 flex items-center justify-between">
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
                  {t("modal.samplePrice", "Live Price Preview")}
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  Trophy Villa ($8,750,000 USD)
                </span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-base sm:text-lg text-secondary">
                  {previewFormatted}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-5 flex items-center justify-end gap-2 border-t border-surface-container pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
                className="rounded-xl border-outline-variant text-xs"
              >
                {t("modal.close", "Cancel")}
              </Button>
              <Button
                variant="gold"
                size="sm"
                onClick={handleApply}
                className="rounded-xl text-xs font-bold shadow-xs px-4"
              >
                <IconCheck className="h-3.5 w-3.5 mr-1 stroke-[3]" />
                {t("modal.apply", "Save Preferences")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
