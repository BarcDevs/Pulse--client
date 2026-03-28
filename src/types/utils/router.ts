import {Role} from '@/types/index'

import {FilterType} from '@/constants/filter'

export type ForumSearchParams = {
    filter?: FilterType | undefined
    tag?: string
    category?: string
    search?: string
}

export type RouterContext = {
    auth: {
        isLoggedIn: boolean
        role?: Role
    }
}
