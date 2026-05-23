'use client'

import { useRef, useState } from 'react'

import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { useProfile } from '@/hooks/queries/useProfile'

import { profileToggleCallbacks } from '@/utils/mutationHelpers'

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
    const queryClient = useQueryClient()
    const { profile } = useProfile()

    const liked = profile?.likedPostIds.includes(postId) ?? false
    const saved = profile?.savedPostIds.includes(postId) ?? false

    const [likeCount, setLikeCount] = useState(initialLikes)
    const originalCountRef = useRef(initialLikes)

    const likeCallbacks =
        profileToggleCallbacks(
            queryClient,
            'likedPostIds',
            postId
        )

    const likeMutation = useMutation({
        mutationFn: () => likePostApi(postId),
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

    const saveMutation = useMutation({
        mutationFn: () => savePostApi(postId),
        ...profileToggleCallbacks(
            queryClient,
            'savedPostIds',
            postId
        )
    })

    const toggleLike = () => {
        if (likeMutation.isPending) return
        originalCountRef.current = likeCount
        setLikeCount(liked ? likeCount - 1 : likeCount + 1)
        likeMutation.mutate()
    }

    const toggleSave = () => {
        if (saveMutation.isPending) return
        saveMutation.mutate(undefined)
    }

    return {
        liked,
        likeCount,
        saved,
        toggleLike,
        toggleSave,
        isLiking: likeMutation.isPending,
        isSaving: saveMutation.isPending
    }
}
