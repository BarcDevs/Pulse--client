'use client'

import { useRef, useState } from 'react'

import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import type { Profile } from '@/types/profile'

import { useProfile } from '@/hooks/queries/useProfile'

import { authQueryKeys } from '@/constants/queryKeys'

import { likeReply as likeReplyApi } from '@/api/forum'

type UseReplyInteractionsProps = {
    postId: string
    replyId: string
    initialLikes?: number
}

export const useReplyInteractions = ({
    postId,
    replyId,
    initialLikes = 0
}: UseReplyInteractionsProps) => {
    const queryClient = useQueryClient()
    const { profile } = useProfile()

    const liked = profile?.likedReplyIds.includes(replyId) ?? false

    const [likeCount, setLikeCount] = useState(initialLikes)
    const originalCountRef = useRef(initialLikes)

    const likeMutation = useMutation({
        mutationFn: () => likeReplyApi(postId, replyId),
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: authQueryKeys.profile
            })
            const snapshot = queryClient.getQueryData<Profile>(
                authQueryKeys.profile
            )
            queryClient.setQueryData<Profile>(
                authQueryKeys.profile,
                (old) => {
                    if (!old) return old
                    const isLiked = old.likedReplyIds.includes(replyId)
                    return {
                        ...old,
                        likedReplyIds: isLiked
                            ? old.likedReplyIds.filter((id) => id !== replyId)
                            : [...old.likedReplyIds, replyId]
                    }
                }
            )
            return { snapshot }
        },
        onSuccess: (data) => {
            setLikeCount(data.likes)
        },
        onError: (_, __, context) => {
            if (context?.snapshot) {
                queryClient.setQueryData(
                    authQueryKeys.profile,
                    context.snapshot
                )
            }
            setLikeCount(originalCountRef.current)
        },
        onSettled: () => {
            void queryClient.invalidateQueries({
                queryKey: authQueryKeys.profile
            })
        }
    })

    const toggleLike = () => {
        if (likeMutation.isPending) return
        originalCountRef.current = likeCount
        setLikeCount(liked ? likeCount - 1 : likeCount + 1)
        likeMutation.mutate()
    }

    return {
        liked,
        likeCount,
        toggleLike,
        isLiking: likeMutation.isPending
    }
}
