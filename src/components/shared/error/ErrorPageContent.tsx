import { Sidebar } from '@/components/layout/sidebar/Sidebar'

import { ErrorActions } from './ErrorActions'
import { ErrorContent } from './ErrorContent'
import { ErrorDebug } from './ErrorDebug'
import { ErrorIllustration } from './ErrorIllustration'
import { ErrorInfoCards } from './ErrorInfoCards'

type ErrorPageContentProps = {
    resetAction: () => void
    message?: string
}

export const ErrorPageContent = ({
    resetAction,
    message
}: ErrorPageContentProps) => (
    <div className={'flex'}>
        <Sidebar isErrorPage={true}/>
        <main className={'flex-1 flex flex-col min-h-screen px-4 py-8 md:py-16 max-w-5xl mx-auto w-full bg-surface-bright'}>
            <div className={'flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-start'}>
                <ErrorIllustration/>
                <div className={'flex flex-col'}>
                    <ErrorContent/>
                    <ErrorActions resetAction={resetAction}/>
                </div>
            </div>
            <ErrorInfoCards/>
            <ErrorDebug message={message}/>
        </main>
    </div>
)
