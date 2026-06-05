'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/constants/routes'

import { globalLocales } from '@/locales/globalLocales'

export const NotFoundResources = () => {
    const t = useTranslations()

    return (
        <div className={'mt-16 grid grid-cols-2 gap-6 opacity-60'}>
            <div className={'flex flex-col gap-1'}>
                <span className={'text-[10px] uppercase font-bold tracking-widest text-outline'}>
                    {t(globalLocales.errors.notFoundPage.resourceCenterLabel)}
                </span>
                <Link
                    href={ROUTES.CHECK_IN}
                    className={'text-sm font-semibold hover:text-primary transition-colors'}
                >
                    {t(globalLocales.errors.notFoundPage.dailyJournalLink)}
                </Link>
            </div>
            <div className={'flex flex-col gap-1'}>
                <span className={'text-[10px] uppercase font-bold tracking-widest text-outline'}>
                    {t(globalLocales.errors.notFoundPage.supportHubLabel)}
                </span>
                <Link
                    href={ROUTES.COMMUNITY}
                    className={'text-sm font-semibold hover:text-primary transition-colors'}
                >
                    {t(globalLocales.errors.notFoundPage.groupMeetingsLink)}
                </Link>
            </div>
        </div>
    )
}
