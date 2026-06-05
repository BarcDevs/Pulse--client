import type { PartialTag } from '@/types/community'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { forumQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchTags } from '@/api/forum'

type UseForumTagsOptions = {
    filter?: 'popular'
    limit?: number
    enabled?: boolean
}

export const useForumTags = (
    options?: UseForumTagsOptions
) => {
    const {
        filter,
        limit,
        enabled
    } = options ?? {}
    return useQueryWithNetworkError<
        PartialTag[]
    >({
        queryKey: [
            ...forumQueryKeys.tags,
            filter,
            limit
        ],
        queryFn: () =>
            fetchTags({ filter, limit }),
        staleTime: 5 * minuteInMs,
        enabled: enabled !== false,
        retry: false
    })
}
