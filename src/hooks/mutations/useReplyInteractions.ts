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
import { useAuthExpiredToast } from '@/hooks/useAuthExpiredToast'

import { isUnauthorizedError } from '@/utils/error'
import { profileToggleCallbacks } from '@/utils/mutationHelpers'

import { ROUTES } from '@/constants/routes'

import { useAuth } from '@/context/AuthContext'

import { likeReply as likeReplyApi } from '@/api/forum'
import { communityLocales } from '@/locales/communityLocales'

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
    const { user } = useAuth()
    const { profile } = useProfile()
    const router = useRouter()
    const pathname = usePathname()
    const t = useTranslations()
    const { showSessionExpired } = useAuthExpiredToast()

    const liked = profile?.likedReplyIds.includes(replyId) ?? false

    const [likeCount, setLikeCount] = useState(initialLikes)
    const originalCountRef = useRef(initialLikes)

    const likeCallbacks = profileToggleCallbacks(
        queryClient,
        'likedReplyIds',
        replyId,
        (data: { liked: boolean }) => data.liked
    )

    const likeMutation = useMutation({
        mutationFn: () => likeReplyApi(postId, replyId),
        onMutate: likeCallbacks.onMutate,
        onSuccess: (data) => {
            likeCallbacks.onSuccess(data)
            setLikeCount(data.likes)
        },
        onError: (err, vars, context) => {
            likeCallbacks.onError(err, vars, context)
            setLikeCount(originalCountRef.current)
            if (isUnauthorizedError(err as Error)) showSessionExpired()
        }
    })

    const showLoginToast = () => {
        const message = t(communityLocales.toasts.loginToLikeReply)
        const buttonLabel = t(communityLocales.toasts.loginButton)
        const redirectUrl = ROUTES.loginWithRedirect(pathname)
        toast.info(message, {
            action: {
                label: buttonLabel,
                onClick: () => router.push(redirectUrl)
            }
        })
    }

    const toggleLike = () => {
        if (!user) {
            showLoginToast()
            return
        }
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
