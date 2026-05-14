'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { ROUTES } from '@/constants/routes'

import { globalLocales } from '@/locales/globalLocales'
import { landingLocales } from '@/locales/landingLocales'

export const HeroCTAs = () => {
    const t = useTranslations()

    return (
        <div className={'flex items-center gap-4'}>
            <Link href={ROUTES.SIGNUP}>
                <Button
                    size={'lg'}
                    className={'transition-all duration-200 hover:shadow-lg hover:shadow-primary/40'}
                >
                    {t(landingLocales.hero.startJourney)}
                </Button>
            </Link>
            <Link href={'/community'}>
                <Button
                    variant={'outline'}
                    size={'lg'}
                    className={'transition-all duration-200 hover:shadow-lg hover:shadow-primary/20'}
                >
                    {t(globalLocales.landing.buttons.exploreForum)}
                </Button>
            </Link>
        </div>
    )
}
