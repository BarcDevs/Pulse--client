'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Icon } from '@/components/shared/ui/Icon'
import { Button } from '@/components/ui/button'

import { ROUTES } from '@/constants/routes'

import { globalLocales } from '@/locales/globalLocales'

export const NetworkErrorActions = () => {
    const t = useTranslations()

    const handleTryAgain = () =>
        window.location.reload()

    return (
        <div className={'flex flex-col sm:flex-row items-center justify-center gap-4 pt-4'}>
            <Button
                onClick={handleTryAgain}
                className={'px-8 py-4 gap-2 rounded-xl'}
            >
                <Icon
                    name={'error/refresh'}
                    size={20}
                />
                {t(globalLocales.errors.networkErrorPage.tryAgainBtn)}
            </Button>
            <Button
                asChild
                variant={'outline'}
                className={'px-8 py-4 gap-2 rounded-xl'}
            >
                <Link href={ROUTES.STATUS}>
                    <Icon
                        name={'error/help'}
                        size={20}
                    />
                    {t(globalLocales.errors.networkErrorPage.checkStatusBtn)}
                </Link>
            </Button>
        </div>
    )
}