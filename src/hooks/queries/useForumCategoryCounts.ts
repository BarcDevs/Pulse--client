import { useQueryWithNetworkError }
    from '@/hooks/useQueryWithNetworkError'

import { forumQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchPostCategoryCounts } from '@/api/forum'

type CategoryCount = {
    category: string
    count: number
}

export const useForumCategoryCounts = () =>
    useQueryWithNetworkError<CategoryCount[]>({
        queryKey: forumQueryKeys.categoryCounts,
        queryFn: fetchPostCategoryCounts,
        staleTime: 5 * minuteInMs,
        retry: false
    })
