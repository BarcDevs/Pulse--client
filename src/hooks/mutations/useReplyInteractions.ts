'use client'

import { useRef, useState } from 'react'

import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { useProfile } from '@/hooks/queries/useProfile'

import { profileToggleCallbacks } from '@/utils/mutationHelpers'

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

    const likeCallbacks = profileToggleCallbacks(
        queryClient,
        'likedReplyIds',
        replyId
    )

    const likeMutation = useMutation({
        mutationFn: () => likeReplyApi(postId, replyId),
        onMutate: likeCallbacks.onMutate,
        onSuccess: (data) => {
            setLikeCount(data.likes)
        },
        onError: (err, vars, context) => {
            // eslint-disable-next-line custom-rules/enforce-function-call-breaking
            likeCallbacks.onError(err, vars, context)
            setLikeCount(originalCountRef.current)
        },
        onSettled: likeCallbacks.onSettled
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
