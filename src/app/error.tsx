'use client'

import { useEffect } from 'react'

import { ErrorPageContent } from '@/components/shared/error/ErrorPageContent'

import { secondInMs } from '@/constants/time'

import { useAuth } from '@/context/AuthContext'

import { appSettings } from '@/config/appSettings'

const NETWORK_RETRY_MS = 10 * secondInMs

type ErrorProps = {
    error: Error & { digest?: string }
    reset: () => void
}

const ErrorPage = ({
    error,
    reset
}: ErrorProps) => {
    const { setNetworkError } = useAuth()
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

    useEffect(() => {
        if (!isNetworkError) return

        setNetworkError(error)
        const timer = setTimeout(reset, NETWORK_RETRY_MS)
        window.addEventListener('online', reset)

        return () => {
            clearTimeout(timer)
            window.removeEventListener('online', reset)
        }
    }, [isNetworkError, error, reset, setNetworkError])

    if (isNetworkError) return null

    return (
        <ErrorPageContent
            resetAction={reset}
            message={error?.message}
        />
    )
}

export default ErrorPage
