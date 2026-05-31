import { Reply } from '@/types/community'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { forumQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchReplies } from '@/api/forum'

export const useForumReplies = (
    postId?: string,
    limit?: number
) => useQueryWithNetworkError<Reply[]>({
    queryKey: postId
        ? forumQueryKeys.replies(postId, limit)
        : [
            'forum',
            'replies',
            'disabled'
        ],
    queryFn: async () => {
        if (!postId)
            throw new Error('Post ID is required')

        return fetchReplies(postId, limit)
    },
    enabled: !!postId,
    staleTime: minuteInMs * 5,
    retry: false
})
