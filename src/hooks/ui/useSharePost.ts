'use client'

import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import { communityLocales } from '@/locales/communityLocales'

export const useSharePost = (postId: string) => {
    const t = useTranslations()

    return async () => {
        const url = `${window.location.origin}/community/post/${postId}`

        if (navigator.share) {
            try {
                await navigator.share({ url })
                return
            } catch (error) {
                if (
                    error instanceof Error
                    && error.name === 'AbortError'
                ) return
            }
        }

        await navigator.clipboard.writeText(url)
        toast.success(t(communityLocales.postActions.linkCopied))
    }
}
