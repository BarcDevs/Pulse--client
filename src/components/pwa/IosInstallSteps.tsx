'use client'

import { useTranslations } from 'next-intl'

import {
    Share,
    SquarePlus
} from 'lucide-react'

import { pwaLocales } from '@/locales/pwaLocales'

export const IosInstallSteps = () => {
    const t = useTranslations()

    return (
        <ol className={'grid gap-3 text-sm text-foreground'}>
            <li className={'flex items-center gap-3'}>
                <Share className={'size-5 shrink-0 text-primary'}/>
                {t(pwaLocales.install.iosStepShare)}
            </li>
            <li className={'flex items-center gap-3'}>
                <SquarePlus className={'size-5 shrink-0 text-primary'}/>
                {t(pwaLocales.install.iosStepAdd)}
            </li>
        </ol>
    )
}
