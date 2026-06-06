'use client'

import { useEffect } from 'react'

import { redirect } from 'next/navigation'

import { ErrorPageContent } from '@/components/shared/error/ErrorPageContent'

import { ROUTES } from '@/constants/routes'

import { appSettings } from '@/config/appSettings'

type ErrorProps = {
    error: Error & { digest?: string }
    reset: () => void
}

const ErrorPage = ({
    error,
    reset
}: ErrorProps) => {
    const axiosError = error as any
    const isNetworkError = (
        axiosError?.code === 'ERR_NETWORK'
        || axiosError?.code?.startsWith('ECONNREFUSED')
        || axiosError?.code?.startsWith('ENOTFOUND')
        || axiosError?.code?.startsWith('ECONNABORTED')
        || error?.message?.includes('Failed to fetch')
        || error?.message?.includes('NetworkError')
    )

    useEffect(() => {
        document.title = `Something went wrong | ${appSettings.brandName}`
    }, [])

    if (isNetworkError)
        redirect(ROUTES.NETWORK_ERROR)

    return (
        <ErrorPageContent
            resetAction={reset}
            message={error?.message}
        />
    )
}

export default ErrorPage
