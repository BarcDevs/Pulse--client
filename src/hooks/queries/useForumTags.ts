import type { PartialTag } from '@/types/community'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { forumQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchTags } from '@/api/forum'

export const useForumTags = (options?: {
    enabled?: boolean
}) => useQueryWithNetworkError<PartialTag[]>({
    queryKey: forumQueryKeys.tags,
    queryFn: () => fetchTags(),
    staleTime: 5 * minuteInMs,
    enabled: options?.enabled !== false,
    retry: false
})
