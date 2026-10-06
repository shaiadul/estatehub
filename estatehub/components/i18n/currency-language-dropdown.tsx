"use client"

import * as React from "react"
import {
  IconWorld,
  IconChevronDown,
  IconCheck,
} from "@tabler/icons-react"
import {
  useI18n,
  SUPPORTED_LANGUAGES,
  SUPPORTED_CURRENCIES,
  type Locale,
  type CurrencyCode,
} from "@/lib/i18n"
import { cn } from "cn"

interface CurrencyLanguageDropdownProps {
  className?: string
  align?: "left" | "right"
}

export function CurrencyLanguageDropdown({
  className,
  align = "right",
}: CurrencyLanguageDropdownProps) {
  const [open, setOpen] = React.useState(false)
  const [mode, setMode] = React.useState<"preset" | "currency">("preset")
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const {
    locale,
    currency,
    setLocaleAndCurrency,
    setCurrency,
    currentLanguage,
    currentCurrency,
    t,
  } = useI18n()

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  const handleSelectPreset = (loc: Locale, cur: CurrencyCode) => {
    setLocaleAndCurrency(loc, cur)
    setOpen(false)
  }

  const handleSelectCurrencyOnly = (cur: CurrencyCode) => {
    setCurrency(cur)
    setOpen(false)
  }

  const presets = [
    {
      locale: "en" as Locale,
      currency: "USD" as CurrencyCode,
      name: "English",
      nativeName: "English (US)",
      flag: "🇺🇸",
      currencyLabel: "USD ($)",
      exchangeRate: "1.00 USD",
    },
    {
      locale: "bn" as Locale,
      currency: "BDT" as CurrencyCode,
      name: "Bengali",
      nativeName: "বাংলা (বাংলাদেশ)",
      flag: "🇧🇩",
      currencyLabel: "BDT (৳)",
      exchangeRate: "120.50 BDT",
    },
    {
      locale: "ar" as Locale,
      currency: "SAR" as CurrencyCode,
      name: "Arabic",
      nativeName: "العربية (السعودية)",
      flag: "🇸🇦",
      currencyLabel: "SAR (ر.س)",
      exchangeRate: "3.75 SAR",
    },
    {
      locale: "it" as Locale,
      currency: "EUR" as CurrencyCode,
      name: "Italian",
      nativeName: "Italiano (Italia)",
      flag: "🇮🇹",
      currencyLabel: "EUR (€)",
      exchangeRate: "0.92 EUR",
    },
  ]

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      {/* ── Dropdown Trigger Button ── */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Select language and currency"
        className={cn(
          "flex h-9 items-center gap-1.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest/80 px-2.5 text-xs font-semibold text-on-surface shadow-2xs transition-all hover:bg-surface-container hover:border-outline-variant/60 focus:outline-none",
          open && "border-secondary/60 bg-surface-container ring-1 ring-secondary/30"
        )}
      >
        <span className="text-sm shrink-0 leading-none">{currentLanguage.flag}</span>
        <span className="font-bold text-on-surface">{currentCurrency.code}</span>
        <span className="text-outline-variant text-[10px] font-mono">•</span>
        <span className="text-on-surface-variant font-mono uppercase text-[11px]">
          {currentLanguage.code}
        </span>
        <IconChevronDown
          size={14}
          className={cn(
            "text-on-surface-variant transition-transform duration-200",
            open && "rotate-180 text-secondary"
          )}
        />
      </button>

      {/* ── Dropdown Menu Popover ── */}
      {open && (
        <div
          className={cn(
            "absolute top-11 z-50 w-72 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-2 shadow-2xl duration-150 animate-in fade-in slide-in-from-top-2 text-on-surface",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {/* Dropdown Header */}
          <div className="flex items-center justify-between border-b border-surface-container px-3 py-2 mb-1.5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                {t("nav.currencyAndLanguage", "Language & Currency")}
              </span>
              <div className="text-xs font-bold text-on-surface flex items-center gap-1.5 mt-0.5">
                <span>{currentLanguage.flag}</span>
                <span>{currentLanguage.nativeName}</span>
              </div>
            </div>
            <span className="rounded-md bg-secondary/15 px-2 py-0.5 font-mono text-[10px] font-bold text-on-secondary-container">
              {currentCurrency.code} ({currentCurrency.symbol})
            </span>
          </div>

          {/* Mode Switcher (Presets vs Currency Only) */}
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-surface-container p-0.5 mb-2">
            <button
              type="button"
              onClick={() => setMode("preset")}
              className={cn(
                "rounded-lg py-1 text-[11px] font-bold transition-all",
                mode === "preset"
                  ? "bg-surface-container-lowest text-on-surface shadow-2xs"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {t("nav.language", "Language")} &amp; {t("nav.currency", "Currency")}
            </button>
            <button
              type="button"
              onClick={() => setMode("currency")}
              className={cn(
                "rounded-lg py-1 text-[11px] font-bold transition-all",
                mode === "currency"
                  ? "bg-surface-container-lowest text-on-surface shadow-2xs"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {t("nav.currency", "Currency")} Only
            </button>
          </div>

          {/* List: Presets Mode */}
          {mode === "preset" && (
            <div className="flex flex-col gap-1">
              {presets.map((item) => {
                const isSelected = locale === item.locale && currency === item.currency
                return (
                  <button
                    key={item.locale}
                    type="button"
                    onClick={() => handleSelectPreset(item.locale, item.currency)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-2.5 py-2 text-left transition-all",
                      isSelected
                        ? "bg-secondary/15 border border-secondary/40 text-on-surface font-bold"
                        : "hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg shrink-0">{item.flag}</span>
                      <div className="flex flex-col leading-tight">
                        <span className="text-xs font-bold text-on-surface">
                          {item.nativeName}
                        </span>
                        <span className="text-[10px] text-on-surface-variant font-mono">
                          {item.currencyLabel} • 1 USD = {item.exchangeRate}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-on-secondary shrink-0">
                        <IconCheck size={12} className="stroke-[3]" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          )}

          {/* List: Currency Only Mode */}
          {mode === "currency" && (
            <div className="flex flex-col gap-1">
              {SUPPORTED_CURRENCIES.map((cur) => {
                const isSelected = currency === cur.code
                return (
                  <button
                    key={cur.code}
                    type="button"
                    onClick={() => handleSelectCurrencyOnly(cur.code)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-2.5 py-2 text-left transition-all",
                      isSelected
                        ? "bg-secondary/15 border border-secondary/40 text-on-surface font-bold"
                        : "hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-container font-mono text-xs font-bold text-on-surface shrink-0">
                        {cur.symbol}
                      </div>
                      <div className="flex flex-col leading-tight">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-on-surface">{cur.code}</span>
                          <span className="text-[11px] text-on-surface-variant">({cur.name})</span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant font-mono">
                          1 USD = {cur.rateFromUSD} {cur.code}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-on-secondary shrink-0">
                        <IconCheck size={12} className="stroke-[3]" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          )}

          {/* Quick Info Footer */}
          <div className="mt-1.5 border-t border-surface-container px-3 py-1.5 flex items-center justify-between text-[10px] text-on-surface-variant font-mono">
            <span>Rates updated live</span>
            <span className="text-secondary font-bold">4K Sovereign Multi-Currency</span>
          </div>
        </div>
      )}
    </div>
  )
}
