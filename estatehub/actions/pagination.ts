import type { PaginationMeta } from "./types"

/**
 * Calculates standardized PaginationMeta for SSR list views and fallbacks.
 */
export function calculatePaginationMeta(
  total: number,
  page = 1,
  limit = 20
): PaginationMeta {
  const normalizedPage = Math.max(1, page)
  const normalizedLimit = Math.max(1, limit)
  const totalPages = Math.ceil(total / normalizedLimit) || 1

  return {
    page: normalizedPage,
    limit: normalizedLimit,
    total,
    total_pages: totalPages,
    has_next: normalizedPage < totalPages,
    has_prev: normalizedPage > 1,
  }
}
