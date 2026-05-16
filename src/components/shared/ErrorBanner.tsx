'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
    getApiErrorMessage,
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
    const message = isDev
        ? getApiErrorMessage(error, error.message)
        : isNetErr
            ? t(globalLocales.errors.networkErrorPage.title)
            : 'Something went wrong.'
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
            <Button
                onClick={() => setDismissed(true)}
                variant={'ghost'}
                size={'icon'}
                className={'ml-4 h-8 w-8'}
            >
                <X className={'w-4 h-4'}/>
            </Button>
        </div>
    )
}
