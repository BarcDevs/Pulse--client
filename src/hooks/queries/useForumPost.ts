import { Post } from '@/types/community'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { forumQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchPost } from '@/api/forum'

export const useForumPost = (
    postId: string | null | undefined
) => useQueryWithNetworkError<Post>({
    queryKey: postId
        ? forumQueryKeys.post(postId)
        : ['forum',
            'post',
            'disabled'],
    queryFn: async () => {
        if (!postId) {
            throw new Error('Post ID is required')
        }
        return fetchPost(postId)
    },
    enabled: !!postId,
    staleTime: minuteInMs * 5,
    retry: false
})
