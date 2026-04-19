'use client'

import { Button } from '@/components/ui/button'

import { isNetworkError } from '@/utils/error'

import { inlineErrorTexts } from '@/constants/componentTexts/ui/errors'

import { isDev } from '@/config'

type ErrorStateCardProps = {
    error: Error | null
}

export const ErrorStateCard = ({
    error
}: ErrorStateCardProps) => {
    const errorMessage = error?.message || ''
    const isNetErr = isNetworkError(error)

    const displayMessage = isDev
        ? errorMessage
        : isNetErr
            ? inlineErrorTexts.network
            : inlineErrorTexts.generic

    const handleRetry = () => {
        window.location.reload()
    }

    return (
        <div className={'w-full rounded-md bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive space-y-3 flex flex-col items-center text-center'}>
            <p>{displayMessage}</p>
            <Button
                onClick={handleRetry}
                variant={'outline'}
                size={'sm'}
                className={'text-destructive border-destructive/30 hover:bg-destructive/5'}
            >
                {inlineErrorTexts.tryAgainBtn}
            </Button>
        </div>
    )
}
