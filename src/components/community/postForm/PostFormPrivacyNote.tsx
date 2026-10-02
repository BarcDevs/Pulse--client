'use client'

import { useTranslations } from 'next-intl'

import { communityLocales } from '@/locales/communityLocales'

export const PostFormPrivacyNote = () => {
    const t = useTranslations()

    return (
        <p className={'text-xs text-muted-foreground'}>
            {t(communityLocales.postForm.privacyNote)}
        </p>
    )
}
