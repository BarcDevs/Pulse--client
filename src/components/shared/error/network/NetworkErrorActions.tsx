'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/shared/buttons/Button'
import { Icon } from '@/components/shared/ui/Icon'

import { ROUTES } from '@/constants/routes'

import { globalLocales } from '@/locales/globalLocales'

export const NetworkErrorActions = () => {
    const t = useTranslations()

    const handleTryAgain = () =>
        window.location.reload()

    return (
        <div className={'flex flex-col sm:flex-row items-center justify-center gap-4 pt-4'}>
            <Button
                size={'lg'}
                onClick={handleTryAgain}
                className={'gap-2'}
            >
                <Icon
                    name={'error/refresh'}
                    size={20}
                />
                {t(globalLocales.errors.networkErrorPage.tryAgainBtn)}
            </Button>
            <Button
                asChild
                variant={'secondary'}
                size={'lg'}
                className={'gap-2'}
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