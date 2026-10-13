import type { ListPageParam } from '@/types/responses'

// Sorted by counters that change while scrolling, so the server only pages them by page number
const pageOnlyFilters: readonly string[] = ['hot', 'popular']

export const usesCursorPaging = (filter?: string) =>
    !filter || !pageOnlyFilters.includes(filter)

export const getFirstListPageParam = (
    useCursor: boolean
): ListPageParam => useCursor ? {} : { page: 1 }

// In cursor mode a full page may be the last one, so an empty page is the end
export const getNextListPageParam = <T extends { id: string }>(
    lastPage: T[],
    allPages: T[][],
    limit: number,
    useCursor: boolean
): ListPageParam | undefined => {
    if (lastPage.length !== limit) return undefined

    return useCursor
        ? { cursor: lastPage[lastPage.length - 1].id }
        : { page: allPages.length + 1 }
}
