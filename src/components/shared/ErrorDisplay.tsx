'use client'

import { isNetworkError } from '@/utils/error'

import { ErrorStateCard } from './ErrorStateCard'

type ErrorDisplayProps = {
    error: Error | null
}

export const ErrorDisplay = ({
    error
}: ErrorDisplayProps) => {
    if (!error) return null

    return isNetworkError(error) ? (
        <div className={'text-sm text-muted-foreground'}>
            Failed to load data
        </div>
    ) : (
        <ErrorStateCard error={error}/>
    )
}
