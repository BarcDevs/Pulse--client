'use client'

import { useState } from 'react'

import { useGuestSession } from '@/hooks/useGuestSession'

import { GuestCheckInContent } from './GuestCheckInContent'
import { GuestCheckInSkeletons } from './GuestCheckInSkeletons'
import { GuestHeader } from './GuestHeader'
import { GuestStartError } from './GuestStartError'
import { SaveProgressDialog } from './SaveProgressDialog'

export const GuestCheckInPage = () => {
    const {
        isReady,
        hasFailed,
        retry
    } = useGuestSession()
    const [isLimitReached, setIsLimitReached] = useState(false)

    return (
        <div className={'flex min-h-screen flex-col bg-surface-page'}>
            <GuestHeader/>
            <main className={'mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 px-4 py-6 md:max-w-xl md:py-10'}>
                {hasFailed && <GuestStartError onRetryAction={retry}/>}
                {!hasFailed && !isReady && <GuestCheckInSkeletons/>}
                {!hasFailed && isReady && (
                    <GuestCheckInContent
                        onLimitReachedAction={() => setIsLimitReached(true)}
                    />
                )}
            </main>
            <SaveProgressDialog
                open={isLimitReached}
                isLimitReached
                onOpenChangeAction={setIsLimitReached}
            />
        </div>
    )
}
