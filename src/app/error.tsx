'use client'

import { redirect } from 'next/navigation'

import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { ErrorActions } from '@/components/shared/error/ErrorActions'
import { ErrorContent } from '@/components/shared/error/ErrorContent'
import { ErrorDebug } from '@/components/shared/error/ErrorDebug'
import { ErrorIllustration } from '@/components/shared/error/ErrorIllustration'
import { ErrorInfoCards } from '@/components/shared/error/ErrorInfoCards'

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

    if (isNetworkError)
        redirect('/network-error')

    return (
        <div className={'flex'}>
            <Sidebar isErrorPage={true}/>
            <main className={'flex-1 flex flex-col items-center justify-center min-h-screen px-4 py-8 md:py-16 max-w-3xl mx-auto w-full text-center bg-surface-bright'}>
                <ErrorIllustration/>
                <ErrorContent/>
                <ErrorActions resetAction={reset}/>
                <ErrorInfoCards/>
                <ErrorDebug message={error?.message}/>
            </main>
        </div>
    )
}

export default ErrorPage
