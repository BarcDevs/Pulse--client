'use client'

import type { LayoutProps } from '@/types'

import { ErrorBanner } from '@/components/shared/ErrorBanner'

import { isNetworkError, isUnauthorizedError } from '@/utils/error'

import { useAuth } from '@/context/AuthContext'

export const ErrorBannerWrapper = ({
    children
}: LayoutProps) => {
    const { error, networkError } = useAuth()
    const bannerError = networkError
        || (error && !isUnauthorizedError(error) && !isNetworkError(error) ? error : null)

    return (
        <>
            {bannerError
                && <ErrorBanner error={bannerError}/>
            }
            {children}
        </>
    )
}
