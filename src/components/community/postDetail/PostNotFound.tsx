'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/constants/routes'

import { communityLocales } from '@/locales/communityLocales'

export const PostNotFound = () => {
    const t = useTranslations()

    return (
        <div className={'rounded-md bg-destructive/10 border border-destructive/20 p-6 text-center'}>
            <h2 className={'text-lg font-semibold text-destructive mb-2'}>
                {t(communityLocales.postDetail.notFoundTitle)}
            </h2>
            <p className={'text-sm text-muted-foreground mb-4'}>
                {t(communityLocales.postDetail.notFoundDescription)}
            </p>
            <Link
                href={ROUTES.COMMUNITY}
                className={'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90'}
            >
                {t(communityLocales.postDetail.backToCommunity)}
            </Link>
        </div>
    )
}
