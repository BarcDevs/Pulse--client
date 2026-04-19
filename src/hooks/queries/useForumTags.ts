import type { PartialTag } from '@/types/community'
import type { Response } from '@/types/responses'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { forumQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchTags } from '@/api/forum'

export const useForumTags = (options?: {
    enabled?: boolean
}) => useQueryWithNetworkError<Response<PartialTag[]>>({
    queryKey: forumQueryKeys.tags,
    queryFn: async () => {
        const response = await fetchTags()
        return response.data
    },
    staleTime: 5 * minuteInMs,
    enabled: options?.enabled !== false,
    retry: false
})
