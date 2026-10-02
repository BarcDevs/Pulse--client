'use client'

import { useRef, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import { Post } from '@/types/community'

import { useCreatePostMutation } from '@/hooks/mutations/useCreatePostMutation'
import { useAuthExpiredToast } from '@/hooks/useAuthExpiredToast'

import { buildTempPost } from '@/lib/community/buildTempPost'

import {
    clearDraft,
    DRAFT_KEYS,
    getDraft,
    saveDraft
} from '@/utils/communityDraft'
import { isUnauthorizedError } from '@/utils/error'

import { ROUTES } from '@/constants/routes'
import { secondInMs } from '@/constants/time'

import { useAuth } from '@/context/AuthContext'

import { communityLocales } from '@/locales/communityLocales'
import { globalLocales } from '@/locales/globalLocales'
import { PostFormSchema } from '@/validations/forms/postFormSchema'

export const useCommunityPostComposer = () => {
    const t = useTranslations()
    const router = useRouter()
    const pathname = usePathname()
    const { user } = useAuth()
    const { showAuthExpiredWithDraft } = useAuthExpiredToast()
    const createPost = useCreatePostMutation()
    const [isNewPostOpen, setIsNewPostOpen] = useState(
        () => !!(getDraft(DRAFT_KEYS.newPost(user?.id)) && user)
    )
    const [pendingPosts, setPendingPosts] = useState<Post[]>([])
    const [postDraft] = useState(
        () => getDraft(DRAFT_KEYS.newPost(user?.id))?.data
    )
    const tempCountRef = useRef(0)

    const openNewPost = () => {
        if (!user) {
            toast.info(t(communityLocales.toasts.loginToCreate), {
                action: {
                    label: t(communityLocales.toasts.loginButton),
                    onClick: () => router.push(
                        ROUTES.loginWithRedirect(pathname)
                    )
                }
            })
            return
        }
        setIsNewPostOpen(true)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const closeNewPost = () => setIsNewPostOpen(false)

    const submitPost = async (data: PostFormSchema) => {
        tempCountRef.current += 1
        const tempPost = buildTempPost(
            `temp-post-${tempCountRef.current}`,
            data,
            user
        )
        setPendingPosts((prev) => [tempPost, ...prev])
        setIsNewPostOpen(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })

        try {
            const realPost = await createPost.mutateAsync(data)
            setPendingPosts((prev) =>
                prev.map((p) => p.id === tempPost.id ? realPost : p)
            )
            clearDraft(DRAFT_KEYS.newPost(user?.id))
            toast.success(
                t(communityLocales.toasts.postPublished),
                { duration: 2.5 * secondInMs }
            )
        } catch (error) {
            setPendingPosts((prev) =>
                prev.filter((p) => p.id !== tempPost.id)
            )
            if (isUnauthorizedError(error as Error)) {
                saveDraft(
                    DRAFT_KEYS.newPost(user?.id),
                    'newPost',
                    data
                )
                showAuthExpiredWithDraft()
                return
            }
            toast.error(
                t(communityLocales.toasts.postPublishFailed),
                {
                    action: {
                        label: t(globalLocales.shared.retry),
                        onClick: () => void submitPost(data)
                    },
                    duration: 5 * secondInMs
                }
            )
        }
    }

    return {
        isNewPostOpen,
        isPublishing: createPost.isPending,
        pendingPosts,
        postDraft,
        openNewPost,
        closeNewPost,
        submitPost
    }
}
