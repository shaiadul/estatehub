"use client"

import * as React from "react"
import {
  IconSearchOff,
  IconFilterOff,
  IconInbox,
  IconRefresh,
  IconAlertTriangle,
  IconArrowRight,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

export interface NoDataAction {
  label: string
  onClick?: () => void
  href?: string
  icon?: React.ReactNode
}

export interface NoDataStateProps {
  title?: string
  description?: string
  icon?: React.ComponentType<{ className?: string; size?: number }>
  variant?: "empty" | "search" | "filter" | "error"
  searchTerm?: string
  action?: NoDataAction
  secondaryAction?: NoDataAction
  className?: string
  compact?: boolean
}

export function NoDataState({
  title,
  description,
  icon: CustomIcon,
  variant = "empty",
  searchTerm,
  action,
  secondaryAction,
  className = "",
  compact = false,
}: NoDataStateProps) {
  // Derive default title, description and icon based on variant
  const getDefaultIcon = () => {
    switch (variant) {
      case "search":
        return IconSearchOff
      case "filter":
        return IconFilterOff
      case "error":
        return IconAlertTriangle
      default:
        return IconInbox
    }
  }

  const IconComponent = CustomIcon || getDefaultIcon()

  const defaultTitle =
    variant === "search"
      ? searchTerm
        ? `No results for "${searchTerm}"`
        : "No matching results found"
      : variant === "filter"
        ? "No items match active filters"
        : variant === "error"
          ? "Unable to load data from API"
          : "No records found"

  const defaultDescription =
    variant === "search"
      ? "Try checking your spelling or using more generic keywords to find what you need."
      : variant === "filter"
        ? "Try adjusting or resetting your filter criteria to display available records."
        : variant === "error"
          ? "The server or service API was unreachable. Please retry or check connection status."
          : "There are currently no items in this ledger. New entries will appear here automatically."

  const displayTitle = title || defaultTitle
  const displayDescription = description || defaultDescription

  return (
    <div
      data-slot="no-data-state"
      className={`flex w-full flex-col items-center justify-center text-center ${
        compact ? "py-8 px-4" : "py-14 px-6"
      } ${className}`}
    >
      {/* Visual Icon with Dual Concentric Soft Rings */}
      <div className="relative mb-3.5 flex items-center justify-center">
        <div className="absolute h-16 w-16 rounded-full bg-surface-container/60 blur-xs" />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-outline-variant/30 bg-surface-container-low text-on-surface-variant shadow-xs">
          <IconComponent size={22} className={variant === "error" ? "text-destructive" : "text-on-surface-variant"} />
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="font-heading text-sm font-bold tracking-tight text-on-surface max-w-sm">
        {displayTitle}
      </h3>
      <p className="mt-1 text-xs text-on-surface-variant max-w-md leading-relaxed">
        {displayDescription}
      </p>

      {/* Action Buttons */}
      {(action || secondaryAction) && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {action && (
            <Button
              size="sm"
              variant={variant === "error" ? "default" : "outline"}
              onClick={action.onClick}
              className="h-8 rounded-xl px-3.5 text-xs font-semibold gap-1.5 shadow-xs"
            >
              {action.icon || (variant === "filter" || variant === "search" ? <IconRefresh size={13} /> : null)}
              <span>{action.label}</span>
            </Button>
          )}

          {secondaryAction && (
            <Button
              size="sm"
              variant="ghost"
              onClick={secondaryAction.onClick}
              className="h-8 rounded-xl px-3 text-xs font-semibold text-on-surface-variant hover:text-on-surface"
            >
              <span>{secondaryAction.label}</span>
              <IconArrowRight size={13} className="ml-1" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
