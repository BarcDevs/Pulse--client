'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import { sharePost as sharePostApi } from '@/api/forum'
import { communityLocales } from '@/locales/communityLocales'

export const useSharePost = (
    postId: string,
    initialShareCount = 0
) => {
    const t = useTranslations()
    const [shareCount, setShareCount] = useState(initialShareCount)

    const incrementShareCount = async () => {
        try {
            const data = await sharePostApi(postId)
            setShareCount(data.shareCount)
        } catch {}
    }

    const share = async () => {
        const url = `${window.location.origin}/community/post/${postId}`

        if (navigator.share) {
            try {
                await navigator.share({ url })
            } catch (error) {
                if (
                    error instanceof Error
                    && error.name === 'AbortError'
                ) return
                return
            }
            await incrementShareCount()
            return
        }

        await navigator.clipboard.writeText(url)
        toast.success(t(communityLocales.postActions.linkCopied))
        await incrementShareCount()
    }

    return { share, shareCount }
}
