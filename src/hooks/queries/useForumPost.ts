import { QueryClient, useQueryClient } from '@tanstack/react-query'

import { Post } from '@/types/community'

import { useQueryWithNetworkError }
    from '@/hooks/useQueryWithNetworkError'

import { forumQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchPost } from '@/api/forum'

const findPostInCache = (
    queryClient: QueryClient,
    postId: string
) => {
    const cached = queryClient.getQueriesData<Post[]>({
        queryKey: forumQueryKeys.posts
    })
    for (const [queryKey, posts] of cached) {
        const post = Array.isArray(posts)
            ? posts.find(p => p.id === postId) : undefined
        if (post) return { post, queryKey }
    }
    return null
}

export const useForumPost = (
    postId: string | null | undefined
) => {
    const queryClient = useQueryClient()

    return useQueryWithNetworkError<Post>({
        queryKey: postId
            ? forumQueryKeys.post(postId)
            : [
                'forum',
                'post',
                'disabled'
            ],
        queryFn: async () => {
            if (!postId) {
                throw new Error('Post ID is required')
            }
            return fetchPost(postId)
        },
        initialData: () => {
            if (!postId) return undefined
            return findPostInCache(queryClient, postId)?.post
        },
        initialDataUpdatedAt: () => {
            if (!postId) return undefined
            const result = findPostInCache(
                queryClient,
                postId
            )
            return result
                ? queryClient
                    .getQueryState(
                        result.queryKey
                    )
                    ?.dataUpdatedAt
                : undefined
        },
        enabled: !!postId,
        staleTime: minuteInMs * 5,
        retry: false
    })
}
