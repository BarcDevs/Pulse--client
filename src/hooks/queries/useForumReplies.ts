import { Reply } from '@/types/community'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { forumQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchReplies } from '@/api/forum'

type RepliesResponse = {
    replies: Reply[]
}

export const useForumReplies = (
    postId: string | null | undefined
) => useQueryWithNetworkError<RepliesResponse>({
    queryKey: postId
        ? forumQueryKeys.replies(postId)
        : [
            'forum',
            'replies',
            'disabled'
        ],
    queryFn: async () => {
        if (!postId) {
            throw new Error('Post ID is required')
        }
        return fetchReplies(postId)
    },
    enabled: !!postId,
    staleTime: minuteInMs * 5,
    retry: false
})
