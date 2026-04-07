import { useQuery } from '@tanstack/react-query'

import { Reply } from '@/types/community'

import { forumQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchReplies } from '@/api/forum'

type RepliesResponse = {
    replies: Reply[]
}

export const useForumReplies = (
    postId: string | null | undefined
) => {
    return useQuery<RepliesResponse>({
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
            const response = await fetchReplies(postId)
            return response.data.data as RepliesResponse
        },
        enabled: !!postId,
        staleTime: minuteInMs * 5
    })
}
