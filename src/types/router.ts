import type { FilterType } from '@/types/community'

export type ForumSearchParams = {
    filter?: FilterType | undefined
    tag?: string
    category?: string
    search?: string
}
