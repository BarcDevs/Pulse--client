'use client'

import type { LayoutProps } from '@/types'

import { ErrorBanner } from '@/components/shared/ErrorBanner'

import { useAuth } from '@/context/AuthContext'

export const ErrorBannerWrapper = ({
    children
}: LayoutProps) => {
    const { error, networkError } = useAuth()
    const bannerError = networkError || error

    return (
        <>
            {bannerError
                && <ErrorBanner error={bannerError}/>
            }
            {children}
        </>
    )
}
