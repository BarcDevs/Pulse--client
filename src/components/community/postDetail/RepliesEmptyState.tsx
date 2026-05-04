'use client'

import { useTranslations } from 'next-intl'

import { EmptyState } from '@/components/shared/EmptyState'

import { communityLocales } from '@/locales/communityLocales'

export const RepliesEmptyState = () => {
    const t = useTranslations()

    return (
        <div className={'rounded-md bg-muted/50 border border-border'}>
            <EmptyState
                message={t(communityLocales.postDetail.noReplies)}
            />
        </div>
    )
}
