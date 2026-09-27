'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/shared/buttons/Button'

import { isNetworkError } from '@/utils/error'

import { isDev } from '@/config'

import { globalLocales } from '@/locales/globalLocales'

type ErrorStateCardProps = {
    error: Error | null
}

export const ErrorStateCard = ({
    error
}: ErrorStateCardProps) => {
    const t = useTranslations()
    const errorMessage = error?.message || ''
    const isNetErr = isNetworkError(error)

    const displayMessage = isNetErr
        ? t(globalLocales.errors.inline.network)
        : isDev
            ? errorMessage
            : t(globalLocales.errors.inline.generic)

    const handleRetry = () => {
        window.location.reload()
    }

    return (
        <div className={'w-full rounded-md bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive space-y-3 flex flex-col items-center text-center'}>
            <p>{displayMessage}</p>
            <Button
                onClick={handleRetry}
                variant={'secondary'}
                size={'sm'}
            >
                {t(globalLocales.errors.inline.tryAgainBtn)}
            </Button>
        </div>
    )
}
