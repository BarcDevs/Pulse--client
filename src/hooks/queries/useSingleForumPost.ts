import {useQuery} from '@tanstack/react-query'

import type {Post} from '@/types/forum/forum'
import type {Response} from '@/types/responses'

import {forumQueryKeys} from '@/constants/queryKeys'
import {minuteInMs} from '@/constants/time'

import {fetchPost} from '@/api/forum'

export const useSingleForumPost = (
    postId: string | null,
    options?: {
        enabled?: boolean
    }
) => {
    const isEnabled =
        options?.enabled !== false &&
        !!postId

    return useQuery<Response<Post>>({
        queryKey: forumQueryKeys.post(postId || ''),
        queryFn: async () => {
            const response = await fetchPost(postId!)
            return response.data
        },
        staleTime: 5 * minuteInMs,
        enabled: isEnabled
    })
}
