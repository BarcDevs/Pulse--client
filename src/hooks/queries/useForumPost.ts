import { Post } from '@/types/community'

import { useQueryWithError } from '@/hooks/useQueryWithError'

import { forumQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchPost } from '@/api/forum'

export const useForumPost = (
    postId: string | null | undefined
) => useQueryWithError<Post>({
    queryKey: postId
        ? forumQueryKeys.post(postId)
        : ['forum',
            'post',
            'disabled'],
    queryFn: async () => {
        if (!postId) {
            throw new Error('Post ID is required')
        }
        const response = await fetchPost(postId)
        return response.data.data as Post
    },
    enabled: !!postId,
    staleTime: minuteInMs * 5,
    retry: false
})
