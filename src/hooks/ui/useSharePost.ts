'use client'

import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import { communityLocales } from '@/locales/communityLocales'

export const useSharePost = (postId: string) => {
    const t = useTranslations()

    return async () => {
        const url = `${window.location.origin}/community/post/${postId}`
        await navigator.clipboard.writeText(url)
        toast.success(t(communityLocales.postActions.linkCopied))
    }
}
