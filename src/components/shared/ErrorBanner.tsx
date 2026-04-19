'use client'

import { useState } from 'react'

import { X } from 'lucide-react'

import { isNetworkError } from '@/utils/error'

import {
    inlineErrorTexts,
    networkErrorPageTexts
} from '@/constants/componentTexts/ui/errors'

import { isDev } from '@/config'

type ErrorBannerProps = {
    error: Error | null
}

export const ErrorBanner = ({
    error
}: ErrorBannerProps) => {
    const [dismissed, setDismissed] = useState(false)

    if (!error || dismissed) return null

    const isNetErr = isNetworkError(error)
    const message = isDev
        ? error.message
        : isNetErr
            ? networkErrorPageTexts.title
            : 'Something went wrong.'
    const description = isNetErr
        ? inlineErrorTexts.network
        : inlineErrorTexts.generic

    return (
        <div className={'bg-destructive/10 border-b border-destructive/20 px-4 py-3 text-destructive text-sm flex items-center justify-between'}>
            <div className={'flex-1 text-center'}>
                <p className={'font-medium'}>{message}</p>
                <p className={'text-xs opacity-75 mt-1'}>
                    {description}
                </p>
            </div>
            <button
                onClick={() => setDismissed(true)}
                className={'hover:opacity-70 transition-opacity ml-4'}
            >
                <X className={'w-4 h-4'}/>
            </button>
        </div>
    )
}
