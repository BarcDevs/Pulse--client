'use client'

import {NotFoundContent} from '@/components/shared/error/notFound/NotFoundContent'
import {NotFoundImage} from '@/components/shared/error/notFound/NotFoundImage'
import {NotFoundResources} from '@/components/shared/error/notFound/NotFoundResources'

const NotFoundPage = () => {
    const handleGoBack = () => {
        if (typeof window !== 'undefined') {
            window.history.back()
        }
    }

    return (
        <main className={'grow flex flex-col items-center justify-center relative px-6 py-20 bg-soft-gradient'}>
            <div className={'absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl'}/>
            <div className={'absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl'}/>

            <div className={'max-w-4xl w-full flex flex-col md:flex-row items-center gap-12 relative z-10'}>
                <NotFoundImage/>
                <div className={'w-full md:w-1/2 text-center md:text-left order-2 md:order-1'}>
                    <NotFoundContent onGoBackAction={handleGoBack}/>
                    <NotFoundResources/>
                </div>
            </div>
        </main>
    )
}

export default NotFoundPage
