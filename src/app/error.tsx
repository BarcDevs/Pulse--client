'use client'

import {ErrorActions} from '@/components/shared/error/ErrorActions'
import {ErrorContent} from '@/components/shared/error/ErrorContent'
import {ErrorDebug} from '@/components/shared/error/ErrorDebug'
import {ErrorIllustration} from '@/components/shared/error/ErrorIllustration'
import {ErrorInfoCards} from '@/components/shared/error/ErrorInfoCards'
import {Sidebar} from '@/components/sidebar/Sidebar'
import {
    SidebarInset,
    SidebarProvider
} from '@/components/ui/sidebar'

type ErrorProps = {
    error: Error & {digest?: string}
    reset: () => void
}

const ErrorPage = ({
    error,
    reset
}: ErrorProps) => (
    <SidebarProvider>
        <Sidebar isErrorPage={true}/>
        <SidebarInset className={'bg-surface-page'}>
            <div className={'flex-1 flex flex-col items-center justify-center min-h-screen px-4 py-8 md:py-16 max-w-3xl mx-auto w-full text-center bg-surface-bright'}>
                <ErrorIllustration/>
                <ErrorContent/>
                <ErrorActions resetAction={reset}/>
                <ErrorInfoCards/>
                <ErrorDebug message={error?.message}/>
            </div>
        </SidebarInset>
    </SidebarProvider>
)

export default ErrorPage
