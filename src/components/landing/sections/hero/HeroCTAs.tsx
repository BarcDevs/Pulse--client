'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { ROUTES } from '@/constants/routes'

import { landingLocales } from '@/locales/landingLocales'

export const HeroCTAs = () => {
    const t = useTranslations()

    return (
        <div className={'flex items-center gap-4'}>
            <Link href={ROUTES.SIGNUP}>
                <Button
                    size={'lg'}
                    className={'transition-all duration-200'}
                >
                    {t(landingLocales.hero.startJourney)}
                </Button>
            </Link>
            <Link
                href={ROUTES.COMMUNITY}
                className={'inline-block py-3 text-sm font-semibold text-primary underline decoration-primary/35 decoration-[1.5px] underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-primary'}
            >
                {`${t(landingLocales.hero.exploreCommunity)} `}
                <span
                    aria-hidden={'true'}
                    className={'text-base'}
                >
                    {'→'}
                </span>
            </Link>
        </div>
    )
}
