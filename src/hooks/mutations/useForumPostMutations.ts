import {
    QueryClient,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { Reply } from '@/types/community'

import { forumQueryKeys } from '@/constants/queryKeys'

import { useAuth } from '@/context/AuthContext'

import {
    createReply,
    deletePost,
    deleteReply as deleteReplyApi,
    updatePost,
    updateReply
} from '@/api/forum'
import { PostFormSchema } from '@/validations/forms/postFormSchema'

type UseForumPostMutationsProps = {
    postId: string
}

const invalidateReplyRelated = (
    queryClient: QueryClient,
    postId: string
) => {
    queryClient.invalidateQueries({ queryKey: forumQueryKeys.replies(postId) })
    queryClient.invalidateQueries({ queryKey: forumQueryKeys.post(postId) })
    queryClient.invalidateQueries({ queryKey: forumQueryKeys.posts })
}

export const useForumPostMutations = ({
    postId
}: UseForumPostMutationsProps) => {
    const queryClient = useQueryClient()
    const { user } = useAuth()

    const createReplyMutation = useMutation({
        mutationFn: (
            data: PostFormSchema
        ) => {
            const reply: Reply = {
                id: '',
                body: data.body,
                createdAt: new Date(),
                updatedAt: null,
                authorId: user?.id || '',
                votes: {
                    upvotes: 0,
                    upvotedBy: []
                }
            }
            return createReply(postId, reply)
        },
        onSuccess: () => invalidateReplyRelated(queryClient, postId)
    })

    const updateReplyMutation = useMutation({
        mutationFn: ({
            replyId,
            data
        }: {
            replyId: string
            data: PostFormSchema
        }) => {
            const reply: Reply = {
                id: replyId,
                body: data.body,
                createdAt: new Date(),
                updatedAt: new Date(),
                authorId: user?.id || '',
                votes: {
                    upvotes: 0,
                    upvotedBy: []
                }
            }
            return updateReply(
                postId,
                replyId,
                reply
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: forumQueryKeys.replies(postId)
            })
        }
    })

    const deleteReplyMutation = useMutation({
        mutationFn: (
            replyId: string
        ) => deleteReplyApi(postId, replyId),
        onSuccess: () => invalidateReplyRelated(queryClient, postId)
    })

    const updatePostMutation = useMutation({
        mutationFn: (
            data: PostFormSchema
        ) => updatePost(postId, {
            category: data.category || '',
            title: data.title || '',
            body: data.body,
            tags: data.tags || []
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: forumQueryKeys.post(postId)
            })
            queryClient.invalidateQueries({
                queryKey: forumQueryKeys.posts
            })
        }
    })

    const deletePostMutation = useMutation({
        mutationFn: () => deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: forumQueryKeys.posts
            })
        }
    })

    return {
        createReply: createReplyMutation,
        updateReply: updateReplyMutation,
        deleteReply: deleteReplyMutation,
        updatePost: updatePostMutation,
        deletePost: deletePostMutation
    }
}
