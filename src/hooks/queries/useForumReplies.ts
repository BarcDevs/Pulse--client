import { Reply } from '@/types/community'

import { useQueryWithError } from '@/hooks/useQueryWithError'

import { forumQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchReplies } from '@/api/forum'

type RepliesResponse = {
    replies: Reply[]
}

export const useForumReplies = (
    postId: string | null | undefined
) => {
    return useQueryWithError<RepliesResponse>({
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
            // TODO: remove cast when fetchReplies type is corrected to Response<Reply[]>
            const response = await fetchReplies(postId)
            return { replies: response.data.data as unknown as Reply[] }
        },
        enabled: !!postId,
        staleTime: minuteInMs * 5,
        retry: false
    })
}
