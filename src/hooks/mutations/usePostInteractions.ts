'use client'

import { useRef, useState } from 'react'

import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import type { Profile } from '@/types/profile'

import { useProfile } from '@/hooks/queries/useProfile'

import { authQueryKeys } from '@/constants/queryKeys'

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

    const likeMutation = useMutation({
        mutationFn: () => likePostApi(postId),
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
                    const isLiked = old.likedPostIds.includes(postId)
                    return {
                        ...old,
                        likedPostIds: isLiked
                            ? old.likedPostIds.filter((id) => id !== postId)
                            : [...old.likedPostIds, postId]
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

    const saveMutation = useMutation({
        mutationFn: () => savePostApi(postId),
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
                    const isSaved = old.savedPostIds.includes(postId)
                    return {
                        ...old,
                        savedPostIds: isSaved
                            ? old.savedPostIds.filter((id) => id !== postId)
                            : [...old.savedPostIds, postId]
                    }
                }
            )
            return { snapshot }
        },
        onError: (_, __, context) => {
            if (context?.snapshot) {
                queryClient.setQueryData(
                    authQueryKeys.profile,
                    context.snapshot
                )
            }
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

    const toggleSave = () => {
        if (saveMutation.isPending) return
        saveMutation.mutate()
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
