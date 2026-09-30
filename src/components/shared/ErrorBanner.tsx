'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { X } from 'lucide-react'

import { IconButton } from '@/components/shared/buttons/IconButton'

import {
    getApiErrorMessage,
    isAbortedError,
    isNetworkError
} from '@/utils/error'

import { isDev } from '@/config'

import { globalLocales } from '@/locales/globalLocales'

type ErrorBannerProps = {
    error: Error | null
}

export const ErrorBanner = ({
    error
}: ErrorBannerProps) => {
    const t = useTranslations()
    const [dismissed, setDismissed] = useState(false)

    if (!error || dismissed) return null

    const isNetErr = isNetworkError(error)
    const message = isNetErr
        ? t(globalLocales.errors.networkErrorPage.title)
        : isAbortedError(error)
            ? t(globalLocales.errors.inline.aborted)
            : isDev
                ? getApiErrorMessage(error, error.message)
                : t(globalLocales.errors.inline.title)
    const description = isNetErr
        ? t(globalLocales.errors.inline.network)
        : t(globalLocales.errors.inline.generic)

    return (
        <div className={'bg-destructive/10 border-b border-destructive/20 px-4 py-3 text-destructive text-sm flex items-center justify-between'}>
            <div className={'flex-1 text-center'}>
                <p className={'font-medium'}>{message}</p>
                <p className={'text-xs opacity-75 mt-1'}>
                    {description}
                </p>
            </div>
            {/*todo: replace with CloseButton*/}
            <IconButton
                size={'sm'}
                onClick={() => setDismissed(true)}
                className={'ml-4'}
            >
                <X className={'w-4 h-4'}/>
            </IconButton>
        </div>
    )
}
