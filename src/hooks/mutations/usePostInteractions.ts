'use client'

import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'

import { useProfile } from '@/hooks/queries/useProfile'

import {
    likePost as likePostApi,
    savePost as savePostApi
} from '@/api/forum'

type UsePostInteractionsProps = {
    postId: string
    initialLikes?: number
}

export const usePostInteractions = ({
    postId,
    initialLikes = 0
}: UsePostInteractionsProps) => {
    const { profile } = useProfile()

    const profileLiked = profile?.likedPostIds.includes(postId) ?? false
    const profileSaved = profile?.savedPostIds.includes(postId) ?? false

    const [localLiked, setLocalLiked] = useState<boolean | null>(null)
    const [localSaved, setLocalSaved] = useState<boolean | null>(null)
    const [likeCount, setLikeCount] = useState(initialLikes)

    const liked = localLiked ?? profileLiked
    const saved = localSaved ?? profileSaved

    const likeMutation = useMutation({
        mutationFn: () => likePostApi(postId),
        onSuccess: (data) => {
            setLocalLiked(data.liked)
            setLikeCount(data.likes)
        }
    })

    const saveMutation = useMutation({
        mutationFn: () => savePostApi(postId),
        onSuccess: (data) => {
            setLocalSaved(data.saved)
        }
    })

    return {
        liked,
        likeCount,
        saved,
        toggleLike: () => !likeMutation.isPending && likeMutation.mutate(),
        toggleSave: () => !saveMutation.isPending && saveMutation.mutate(),
        isLiking: likeMutation.isPending,
        isSaving: saveMutation.isPending
    }
}
