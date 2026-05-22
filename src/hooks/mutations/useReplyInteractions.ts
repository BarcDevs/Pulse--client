'use client'

import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'

import { useProfile } from '@/hooks/queries/useProfile'

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
    const { profile } = useProfile()

    const profileLiked = profile?.likedReplyIds.includes(replyId) ?? false
    const [localLiked, setLocalLiked] = useState<boolean | null>(null)
    const [likeCount, setLikeCount] = useState(initialLikes)

    const liked = localLiked ?? profileLiked

    const likeMutation = useMutation({
        mutationFn: () => likeReplyApi(postId, replyId),
        onSuccess: (data) => {
            setLocalLiked(data.liked)
            setLikeCount(data.likes)
        }
    })

    return {
        liked,
        likeCount,
        toggleLike: () =>
            !likeMutation.isPending && likeMutation.mutate(),
        isLiking: likeMutation.isPending
    }
}
