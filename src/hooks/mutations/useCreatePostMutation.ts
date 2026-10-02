import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { useRememberAnonymity } from '@/hooks/profile/useRememberAnonymity'

import { forumQueryKeys } from '@/constants/queryKeys'

import { createPost } from '@/api/forum'
import { PostFormSchema } from '@/validations/forms/postFormSchema'

export const useCreatePostMutation = () => {
    const queryClient = useQueryClient()
    const rememberAnonymity = useRememberAnonymity()

    return useMutation({
        mutationFn: (data: PostFormSchema) => createPost({
            title: data.title!,
            category: data.category!,
            body: data.body,
            tags: data.tags ?? [],
            isAnonymous: data.isAnonymous
        }),
        onSuccess: (_post, data) => {
            rememberAnonymity(data.isAnonymous)
            queryClient.invalidateQueries({
                queryKey: forumQueryKeys.posts
            })
        }
    })
}
