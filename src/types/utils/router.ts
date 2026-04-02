import {FilterType} from '@/constants/filter'

export type ForumSearchParams = {
    filter?: FilterType | undefined
    tag?: string
    category?: string
    search?: string
}
