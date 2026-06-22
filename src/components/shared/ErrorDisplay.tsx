'use client'

import { useTranslations } from 'next-intl'

import { isNetworkError } from '@/utils/error'

import { globalLocales } from '@/locales/globalLocales'

import { ErrorStateCard } from './ErrorStateCard'

type ErrorDisplayProps = {
    error: Error | null
}

export const ErrorDisplay = ({
    error
}: ErrorDisplayProps) => {
    const t = useTranslations()

    if (!error) return null

    return isNetworkError(error) ? (
        <div className={'text-sm text-muted-foreground'}>
            {t(globalLocales.errors.inline.network)}
        </div>
    ) : (
        <ErrorStateCard error={error}/>
    )
}
