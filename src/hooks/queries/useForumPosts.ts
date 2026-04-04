import { useQuery } from '@tanstack/react-query'

import type { FilterType, Post } from '@/types/community'
import type { Response } from '@/types/responses'

import { forumQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchPosts } from '@/api/forum'

type ForumQuery = {
    category?: string
    search?: string
    limit?: number
    page?: number
    filter?: FilterType
    tag?: string
}

export const useForumPosts = (
    query?: ForumQuery,
    options?: {
        enabled?: boolean
    }
) => {
    return useQuery<Response<Post[]>>({
        queryKey: query
            ? [...forumQueryKeys.posts, query]
            : forumQueryKeys.posts,
        queryFn: async () => {
            const response = await fetchPosts(query)
            return response.data
        },
        staleTime: 5 * minuteInMs,
        enabled: options?.enabled !== false
    })
}
