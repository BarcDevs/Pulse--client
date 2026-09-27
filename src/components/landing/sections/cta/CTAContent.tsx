'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/shared/buttons/Button'

import { ROUTES } from '@/constants/routes'

import { landingLocales } from '@/locales/landingLocales'

export const CTAContent = () => {
    const t = useTranslations()

    return (
        <>
            <h2 className={'relative mb-3.5 text-3xl font-extrabold tracking-tight text-white'}>
                {t(landingLocales.cta.headline)}
            </h2>
            <p className={'relative mb-8 text-sm leading-relaxed text-white/75'}>
                {t(landingLocales.cta.desc)}
            </p>

            <Link
                href={ROUTES.SIGNUP}
                className={'relative'}
            >
                <Button
                    variant={'onGradient'}
                    size={'lg'}
                >
                    {t(landingLocales.cta.button)}
                </Button>
            </Link>
        </>
    )
}
