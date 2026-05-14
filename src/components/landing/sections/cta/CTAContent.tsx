'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

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
                    variant={'secondary'}
                    size={'lg'}
                    className={'bg-white text-primary-gradient-start transition-all duration-200 hover:bg-white/90 hover:shadow-lg hover:shadow-white/30 hover:text-primary-gradient-start'}
                >
                    {t(landingLocales.cta.button)}
                </Button>
            </Link>
        </>
    )
}
