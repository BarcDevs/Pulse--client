'use client'

import { useTranslations } from 'next-intl'

import { TriangleAlert } from 'lucide-react'

import { communityLocales } from '@/locales/communityLocales'

export const PostFormPrivacyNote = () => {
    const t = useTranslations()

    return (
        <div className={'flex items-start gap-2 rounded-lg border border-warning/40 bg-warning-light p-3 text-xs font-medium text-warning-deep'}>
            <TriangleAlert className={'size-4 shrink-0'}/>
            <p>
                {t(communityLocales.postForm.privacyNote)}
            </p>
        </div>
    )
}
