"use client"

import {
  IconBuildingBank,
  IconBriefcase,
  IconCheck,
  IconLock,
  IconBadge,
  IconGavel,
} from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ENTITY_CLASSES } from "./auth-types"

interface RegisterIdentityStepProps {
  selectedEntityClass: string
  onEntityClassChange: (value: string) => void
  fullName: string
  onFullNameChange: (value: string) => void
  title: string
  onTitleChange: (value: string) => void
  entityName: string
  onEntityNameChange: (value: string) => void
  jurisdiction: string
  onJurisdictionChange: (value: string) => void
  phonePrefix: string
  onPhonePrefixChange: (value: string) => void
  phone: string
  onPhoneChange: (value: string) => void
  email: string
  onEmailChange: (value: string) => void
  cbQualified: boolean
  onCbQualifiedChange: (value: boolean) => void
  cbNda: boolean
  onCbNdaChange: (value: boolean) => void
  cbOfac: boolean
  onCbOfacChange: (value: boolean) => void
}

export function RegisterIdentityStep({
  selectedEntityClass,
  onEntityClassChange,
  fullName,
  onFullNameChange,
  title,
  onTitleChange,
  entityName,
  onEntityNameChange,
  jurisdiction,
  onJurisdictionChange,
  phonePrefix,
  onPhonePrefixChange,
  phone,
  onPhoneChange,
  email,
  onEmailChange,
  cbQualified,
  onCbQualifiedChange,
  cbNda,
  onCbNdaChange,
  cbOfac,
  onCbOfacChange,
}: RegisterIdentityStepProps) {
  const disclosures = [
    {
      key: "qualified",
      checked: cbQualified,
      onChange: onCbQualifiedChange,
      title: "Qualified Purchaser Certification (Sec. 2(a)(51) Investment Company Act)",
      desc: "I certify that the applicant meets the legal definition under Section 2(a)(51) of the U.S. Investment Company Act or equivalent international sovereign thresholds (>$5M liquid investment threshold).",
    },
    {
      key: "nda",
      checked: cbNda,
      onChange: onCbNdaChange,
      title: "Master Bilateral Non-Disclosure & Virtual Data Room (VDR) Protocol",
      desc: "I agree to keep all disclosed architectural floorplans, title deeds, owner entities, and structural valuations rigorously confidential without unauthorized third-party dispersal.",
    },
    {
      key: "ofac",
      checked: cbOfac,
      onChange: onCbOfacChange,
      title: "Automated FinCEN, OFAC, & Sanctions Clearance Authorization",
      desc: "Authorize automated cross-referencing against OFAC, FATF, and Interpol PEP watchlists to validate entity status prior to opening escrow gateways.",
    },
  ]
  const jurisdictions = [
    { value: "CH-ZH", label: "Switzerland (Kanton Zürich)" },
    { value: "US-DE", label: "United States (Delaware LLC / C-Corp)" },
    { value: "SG", label: "Singapore (ACRA Registered)" },
    { value: "UK", label: "United Kingdom (Companies House)" },
    { value: "AE-DIFC", label: "United Arab Emirates (DIFC Sovereign)" },
    { value: "LU", label: "Luxembourg (SCSp / SICAV)" },
    { value: "KY", label: "Cayman Islands (Exempted Enterprise)" },
  ]
  const phonePrefixes = [
    { value: "+41", label: "+41 (CH)" },
    { value: "+1", label: "+1 (US)" },
    { value: "+44", label: "+44 (UK)" },
    { value: "+65", label: "+65 (SG)" },
    { value: "+971", label: "+971 (UAE)" },
  ]
  return (
    <div className="flex flex-col gap-6">
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="font-label-md text-xs sm:text-sm text-on-surface uppercase tracking-wider font-bold">
            01. Select Principal or Institutional Class
          </label>
          <span className="font-caption text-xs text-on-surface-variant">Single Selection Required</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ENTITY_CLASSES.map((item) => {
            const Icon = item.icon
            const isSelected = selectedEntityClass === item.id
            return (
              <div
                key={item.id}
                onClick={() => onEntityClassChange(item.id)}
                className={`cursor-pointer p-5 rounded-2xl transition-all border flex flex-col justify-between h-36 ${
                  isSelected
                    ? "bg-primary text-on-primary border-primary shadow-md"
                    : "bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:border-primary/50 shadow-xs"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? "bg-primary-foreground/10" : "bg-surface-container"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? "text-secondary" : "text-on-surface-variant"}`} />
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      isSelected
                        ? "bg-secondary text-on-secondary"
                        : "border border-outline-variant"
                    }`}
                  >
                    {isSelected && <IconCheck className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
                <div>
                  <h4
                    className={`font-label-md text-sm font-bold tracking-tight ${
                      isSelected ? "text-primary-foreground" : "text-on-surface"
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p
                    className={`font-caption text-xs mt-1 ${
                      isSelected ? "text-muted-foreground" : "text-on-surface-variant"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      
      <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-5">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <span className="font-label-md text-xs sm:text-sm text-on-surface uppercase tracking-wider font-bold">
            02. Entity &amp; Authorized Representative Mandate
          </span>
          <span className="font-caption text-xs text-on-surface-variant font-mono">AES-256 In-Flight Encryption</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs text-on-surface font-semibold">Full Legal Name</label>
            <div className="relative">
              <Input
                value={fullName}
                onChange={(e) => onFullNameChange(e.target.value)}
                placeholder="e.g. Henrik Von Stauffen"
                className="w-full bg-surface-container-low pl-3 pr-10 py-2.5 rounded-xl text-on-surface focus:bg-surface-container-lowest"
              />
              <IconBadge className="w-4 h-4 text-on-surface-variant absolute right-3 top-3.5 pointer-events-none" />
            </div>
            <span className="font-caption text-[11px] text-on-surface-variant">Matches official passport or biometric identity ledger.</span>
          </div>

          
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs text-on-surface font-semibold">Institutional / Entity Title</label>
            <div className="relative">
              <Input
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="e.g. Managing General Partner"
                className="w-full bg-surface-container-low pl-3 pr-10 py-2.5 rounded-xl text-on-surface focus:bg-surface-container-lowest"
              />
              <IconBriefcase className="w-4 h-4 text-on-surface-variant absolute right-3 top-3.5 pointer-events-none" />
            </div>
            <span className="font-caption text-[11px] text-on-surface-variant">Authorized signatory status required for binding LOIs.</span>
          </div>

          
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs text-on-surface font-semibold">Entity Legal Name</label>
            <div className="relative">
              <Input
                value={entityName}
                onChange={(e) => onEntityNameChange(e.target.value)}
                placeholder="e.g. Crestview Capital LLC"
                className="w-full bg-surface-container-low pl-3 pr-10 py-2.5 rounded-xl text-on-surface focus:bg-surface-container-lowest"
              />
              <IconBuildingBank className="w-4 h-4 text-on-surface-variant absolute right-3 top-3.5 pointer-events-none" />
            </div>
            <span className="font-caption text-[11px] text-on-surface-variant">Registered legal entity entering dealroom escrow.</span>
          </div>

          
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs text-on-surface font-semibold">Jurisdiction of Incorporation</label>
            <Select value={jurisdiction} onValueChange={(val) => { if (val) onJurisdictionChange(val) }}>
              <SelectTrigger className="w-full bg-surface-container-low rounded-xl">
                <SelectValue placeholder="Select jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                  {jurisdictions.map((j) => (
                    <SelectItem key={j.value} value={j.value}>
                      {j.label}
                    </SelectItem>
                  ))}
                </SelectContent>
            </Select>
            <span className="font-caption text-[11px] text-on-surface-variant">Primary legal headquarters for bilateral jurisdiction.</span>
          </div>

          
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs text-on-surface font-semibold">Direct Signal-Verified Phone</label>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4">
                <Select value={phonePrefix} onValueChange={(val) => { if (val) onPhonePrefixChange(val) }}>
                  <SelectTrigger className="w-full bg-surface-container-low rounded-xl text-xs">
                    <SelectValue placeholder="+41" />
                  </SelectTrigger>
                  <SelectContent>
                    {phonePrefixes.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-8">
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => onPhoneChange(e.target.value)}
                  className="w-full bg-surface-container-low py-2.5 rounded-xl text-on-surface focus:bg-surface-container-lowest"
                />
              </div>
            </div>
            <span className="font-caption text-[11px] text-on-surface-variant">Used exclusively for 2FA tokenization and closing sign-off.</span>
          </div>

          
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs text-on-surface font-semibold">Confidential Institutional Email</label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="principal@familyoffice.com"
                className="w-full bg-surface-container-low pl-3 pr-10 py-2.5 rounded-xl text-on-surface focus:bg-surface-container-lowest"
              />
              <IconLock className="w-4 h-4 text-on-surface-variant absolute right-3 top-3.5 pointer-events-none" />
            </div>
            <span className="font-caption text-[11px] text-on-surface-variant">Whitelisted domain; generic webmail addresses are rejected.</span>
          </div>
        </div>
      </div>

      
      <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <IconGavel className="w-5 h-5 text-primary" />
          <span className="font-label-md text-xs sm:text-sm text-on-surface uppercase tracking-wider font-bold">
            03. Preliminary Disclosures &amp; Enclave Mandates
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {disclosures.map((item) => (
            <label
              key={item.key}
              className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low cursor-pointer transition-colors border border-outline-variant/20"
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) => item.onChange(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-outline text-primary accent-primary cursor-pointer shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-body-md text-xs sm:text-sm text-on-surface font-semibold leading-snug">
                  {item.title}
                </span>
                <span className="font-caption text-xs text-on-surface-variant mt-0.5">{item.desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}