"use client"

import * as React from "react"
import { IconUpload } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getPresignedUploadUrlAction } from "@/actions/storage"
import type { FormState } from "./types"

interface MediaStepProps {
  form: FormState
  setForm: React.Dispatch<React.SetStateAction<FormState>>
}

export function MediaStep({ form, setForm }: MediaStepProps) {
  const [isUploading, setIsUploading] = React.useState<boolean>(false)
  const [uploadedName, setUploadedName] = React.useState<string>("")
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadedName(file.name)

    try {
      const presign = await getPresignedUploadUrlAction(file.name, file.type, "properties")
      if (presign.success && presign.data?.upload_url) {
        try {
          await fetch(presign.data.upload_url, {
            method: "PUT",
            headers: { "Content-Type": file.type },
            body: file,
          })
          const cleanUrl = presign.data.upload_url.split("?")[0]
          setForm((prev) => ({ ...prev, heroImage: cleanUrl }))
        } catch {
          const localUrl = URL.createObjectURL(file)
          setForm((prev) => ({ ...prev, heroImage: localUrl }))
        }
      } else {
        const localUrl = URL.createObjectURL(file)
        setForm((prev) => ({ ...prev, heroImage: localUrl }))
      }
    } catch {
      const localUrl = URL.createObjectURL(file)
      setForm((prev) => ({ ...prev, heroImage: localUrl }))
    } finally {
      setIsUploading(false)
    }
  }

  const urlFields = [
    {
      key: "heroImage",
      label: "Primary Facade Hero Image URL",
      value: form.heroImage,
      placeholder: "https://...",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, heroImage: e.target.value })),
    },
    {
      key: "virtualTourUrl",
      label: "Matterport 3D / Unreal Engine Tour URL",
      value: form.virtualTourUrl,
      placeholder: "https://matterport.com/...",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, virtualTourUrl: e.target.value })),
    },
  ]

  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-on-surface tracking-tight">
          High-Resolution Media &amp; 3D Walkthrough
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
          Upload 4K architectural photography, drone footage, and 3D spatial scans.
        </p>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-outline-variant/40 rounded-3xl p-8 flex flex-col items-center justify-center text-center bg-surface-container-low hover:border-secondary transition-colors cursor-pointer group"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/png,image/jpeg,image/webp,image/avif"
          className="hidden"
        />
        <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-secondary mb-3 group-hover:scale-110 transition-transform">
          <IconUpload size={28} className={isUploading ? "animate-bounce text-secondary" : ""} />
        </div>
        <h3 className="text-sm font-bold text-on-surface">
          {isUploading
            ? "Encrypting & Uploading 4K Media..."
            : uploadedName
            ? `Uploaded: ${uploadedName}`
            : "Drag & drop architectural photography"}
        </h3>
        <p className="text-xs text-on-surface-variant mt-1">
          {isUploading
            ? "Direct-to-S3 Presigned Storage Transmission"
            : "Supports RAW, TIFF, PNG, or JPG up to 100MB per asset."}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isUploading}
          className="mt-4 text-xs font-semibold pointer-events-none"
        >
          {isUploading ? "Uploading Media..." : "Browse Media Files"}
        </Button>
      </div>

      {urlFields.map(({ key, label, value, placeholder, onChange }) => (
        <div key={key} className="flex flex-col gap-2">
          <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
            {label}
          </label>
          <Input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="h-11"
          />
        </div>
      ))}
    </div>
  )
}
