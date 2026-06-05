import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { forumQueryKeys } from '@/constants/queryKeys'

import { createPost } from '@/api/forum'
import { PostFormSchema } from '@/validations/forms/postFormSchema'

export const useCreatePostMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: PostFormSchema) => createPost({
            title: data.title!,
            category: data.category!,
            body: data.body,
            tags: data.tags ?? []
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: forumQueryKeys.posts
            })
        }
    })
}
