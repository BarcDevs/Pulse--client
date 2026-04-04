import type { FilterType } from '@/types/forum/forum'

export type ForumSearchParams = {
    filter?: FilterType | undefined
    tag?: string
    category?: string
    search?: string
}
