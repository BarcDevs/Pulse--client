'use client'

import { useRef, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { useProfile } from '@/hooks/queries/useProfile'

import { profileToggleCallbacks } from '@/utils/mutationHelpers'

import { useAuth } from '@/context/AuthContext'

import {
    likePost as likePostApi,
    savePost as savePostApi
} from '@/api/forum'
import { communityLocales } from '@/locales/communityLocales'

type UsePostInteractionsProps = {
    postId: string
    initialLikes?: number
}

export const usePostInteractions = ({
    postId,
    initialLikes = 0
}: UsePostInteractionsProps) => {
    const queryClient = useQueryClient()
    const { user } = useAuth()
    const { profile } = useProfile()
    const router = useRouter()
    const pathname = usePathname()
    const t = useTranslations()

    const liked = profile?.likedPostIds.includes(postId) ?? false
    const saved = profile?.savedPostIds.includes(postId) ?? false

    const [likeCount, setLikeCount] = useState(initialLikes)
    const originalCountRef = useRef(initialLikes)

    const likeCallbacks =
        profileToggleCallbacks(
            queryClient,
            'likedPostIds',
            postId,
            (data: { liked: boolean }) => data.liked
        )

    const likeMutation = useMutation({
        mutationFn: () => likePostApi(postId),
        onMutate: likeCallbacks.onMutate,
        onSuccess: (data) => {
            likeCallbacks.onSuccess(data)
            setLikeCount(data.likes)
        },
        onError: (err, vars, context) => {
            likeCallbacks.onError(err, vars, context)
            setLikeCount(originalCountRef.current)
        }
    })

    const saveMutation = useMutation({
        mutationFn: () => savePostApi(postId),
        ...profileToggleCallbacks(
            queryClient,
            'savedPostIds',
            postId,
            (data: { saved: boolean }) => data.saved
        )
    })

    const showLoginToast = (msgKey: keyof typeof communityLocales.toasts) => {
        toast.info(t(communityLocales.toasts[msgKey]), {
            action: {
                label: t(communityLocales.toasts.loginButton),
                onClick: () => router.push(
                    `/login?redirect=${encodeURIComponent(pathname)}`
                )
            }
        })
    }

    const toggleLike = () => {
        if (!user) {
            showLoginToast('loginToLike')
            return
        }
        if (likeMutation.isPending) return
        originalCountRef.current = likeCount
        setLikeCount(liked ? likeCount - 1 : likeCount + 1)
        likeMutation.mutate()
    }

    const toggleSave = () => {
        if (!user) {
            showLoginToast('loginToSave')
            return
        }
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
