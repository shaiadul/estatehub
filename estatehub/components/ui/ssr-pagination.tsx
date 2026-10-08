"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "cn"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import type { PaginationMeta } from "@/actions/types"

export interface SsrPaginationProps {
  meta: PaginationMeta
  basePath?: string
  className?: string
  showSummary?: boolean
}

/**
 * Production-ready SSR Pagination Bar.
 * Compatible with Server Components and Client Components.
 * Automatically preserves existing search/filter query parameters while mutating `page`.
 */
export function SsrPagination({
  meta,
  basePath,
  className,
  showSummary = true,
}: SsrPaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { page = 1, total_pages = 1, total = 0, limit = 20, has_prev, has_next } = meta

  // If there's only 1 page and 0 results, hide navigation buttons
  if (total_pages <= 1 && total <= limit) {
    if (total === 0) return null
    return showSummary ? (
      <div className={cn("flex justify-center text-xs text-muted-foreground py-4", className)}>
        Showing all {total} entries
      </div>
    ) : null
  }

  // Create link URL while preserving all active query params
  const createPageUrl = (targetPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (targetPage <= 1) {
      params.delete("page")
    } else {
      params.set("page", String(targetPage))
    }
    const targetPath = basePath || pathname || ""
    const qs = params.toString()
    return qs ? `${targetPath}?${qs}` : targetPath || "?"
  }

  // Generate pagination window: e.g. 1, 2, 3, '...', 10
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = []
    const maxVisible = 5

    if (total_pages <= maxVisible + 2) {
      for (let i = 1; i <= total_pages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      const start = Math.max(2, page - 1)
      const end = Math.min(total_pages - 1, page + 1)

      if (start > 2) {
        pages.push("ellipsis")
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (end < total_pages - 1) {
        pages.push("ellipsis")
      }

      pages.push(total_pages)
    }

    return pages
  }

  const startEntry = Math.min((page - 1) * limit + 1, total)
  const endEntry = Math.min(page * limit, total)

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-border/40 mt-8",
        className
      )}
    >
      {showSummary && (
        <div className="text-xs text-muted-foreground font-mono">
          Showing <span className="text-foreground font-semibold">{startEntry}</span>–
          <span className="text-foreground font-semibold">{endEntry}</span> of{" "}
          <span className="text-foreground font-semibold">{total}</span> records
        </div>
      )}

      <Pagination className="justify-center sm:justify-end">
        <PaginationContent className="gap-1">
          {/* Previous Page */}
          <PaginationItem>
            {has_prev ? (
              <Link
                href={createPageUrl(page - 1)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border border-border/60 bg-surface/50 hover:bg-surface-elevated hover:text-foreground transition-colors"
                aria-label="Previous Page"
              >
                <IconChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Previous</span>
              </Link>
            ) : (
              <span className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border border-border/20 text-muted-foreground/40 cursor-not-allowed select-none">
                <IconChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Previous</span>
              </span>
            )}
          </PaginationItem>

          {/* Numbered Page Links */}
          {getPageNumbers().map((p, idx) => {
            if (p === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            const isCurrent = p === page
            return (
              <PaginationItem key={p}>
                <Link
                  href={createPageUrl(p)}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-md text-xs font-mono transition-all",
                    isCurrent
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "border border-border/60 bg-surface/50 hover:bg-surface-elevated hover:text-foreground"
                  )}
                >
                  {p}
                </Link>
              </PaginationItem>
            )
          })}

          {/* Next Page */}
          <PaginationItem>
            {has_next ? (
              <Link
                href={createPageUrl(page + 1)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border border-border/60 bg-surface/50 hover:bg-surface-elevated hover:text-foreground transition-colors"
                aria-label="Next Page"
              >
                <span className="hidden sm:inline">Next</span>
                <IconChevronRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <span className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border border-border/20 text-muted-foreground/40 cursor-not-allowed select-none">
                <span className="hidden sm:inline">Next</span>
                <IconChevronRight className="h-3.5 w-3.5" />
              </span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
