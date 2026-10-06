import type { LanguageConfig, CurrencyConfig, Locale, CurrencyCode } from "./types"

export const DEFAULT_LOCALE: Locale = "en"
export const DEFAULT_CURRENCY: CurrencyCode = "USD"

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English (US)",
    flag: "🇺🇸",
    country: "United States",
    dir: "ltr",
    defaultCurrency: "USD",
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা (বাংলাদেশ)",
    flag: "🇧🇩",
    country: "Bangladesh",
    dir: "ltr",
    defaultCurrency: "BDT",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية (السعودية)",
    flag: "🇸🇦",
    country: "Saudi Arabia",
    dir: "rtl",
    defaultCurrency: "SAR",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano (Italia)",
    flag: "🇮🇹",
    country: "Italy",
    dir: "ltr",
    defaultCurrency: "EUR",
  },
]

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  {
    code: "USD",
    name: "US Dollar",
    nativeName: "Dollar ($)",
    symbol: "$",
    flag: "🇺🇸",
    rateFromUSD: 1.0,
    formatLocale: "en-US",
  },
  {
    code: "BDT",
    name: "Bangladeshi Taka",
    nativeName: "টাকা (৳)",
    symbol: "৳",
    flag: "🇧🇩",
    rateFromUSD: 120.5,
    formatLocale: "en-US", // using standard digit grouping with ৳ symbol for clean UI
  },
  {
    code: "SAR",
    name: "Saudi Riyal",
    nativeName: "ريال سعودي (ر.س)",
    symbol: "ر.س",
    flag: "🇸🇦",
    rateFromUSD: 3.75,
    formatLocale: "en-US",
  },
  {
    code: "EUR",
    name: "Euro",
    nativeName: "Euro (€)",
    symbol: "€",
    flag: "🇪🇺",
    rateFromUSD: 0.92,
    formatLocale: "de-DE",
  },
]
