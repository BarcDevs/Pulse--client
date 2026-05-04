'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { communityLocales } from '@/locales/communityLocales'

export const UnauthenticatedReplyPrompt = () => {
    const t = useTranslations()

    return (
        <div className={'rounded-md bg-muted/50 border border-border p-4 text-center'}>
            <p className={'text-sm text-muted-foreground mb-3'}>
                {t(communityLocales.postDetail.loginToReply)}
            </p>
            <Link
                href={'/login'}
                className={'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90'}
            >
                {t(communityLocales.postDetail.loginButton)}
            </Link>
        </div>
    )
}
