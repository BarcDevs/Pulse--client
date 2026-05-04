'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Icon } from '@/components/shared/ui/Icon'
import { Button } from '@/components/ui/button'

import { globalLocales } from '@/locales/globalLocales'

export const NetworkErrorActions = () => {
    const t = useTranslations()
    const router = useRouter()

    const handleTryAgain = () =>
        window.location.reload()

    const handleCheckStatus = () =>
        router.push('/status')

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
                onClick={handleCheckStatus}
                variant={'outline'}
                className={'px-8 py-4 gap-2 rounded-xl'}
            >
                <Icon
                    name={'error/help'}
                    size={20}
                />
                {t(globalLocales.errors.networkErrorPage.checkStatusBtn)}
            </Button>
        </div>
    )
}