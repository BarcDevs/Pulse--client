'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { useGuestSession } from '@/hooks/useGuestSession'

import { startLocales } from '@/locales/startLocales'

import { GuestCheckInForm } from './GuestCheckInForm'
import { SaveProgressDialog } from './SaveProgressDialog'

export const GuestCheckInPage = () => {
    const t = useTranslations()
    const { isReady, hasFailed } = useGuestSession()
    const [isLimitReached, setIsLimitReached] = useState(false)

    if (!isReady) {
        return (
            <p className={'p-6 text-center text-muted-foreground'}>
                {t(hasFailed ? startLocales.startError : startLocales.starting)}
            </p>
        )
    }

    return (
        <div className={'flex-1 p-4 md:p-6'}>
            <div className={'mx-auto max-w-2xl'}>
                <div className={'mb-8 text-center'}>
                    <h1 className={'text-3xl font-semibold text-foreground'}>
                        {t(startLocales.title)}
                    </h1>
                    <p className={'mt-2 text-muted-foreground'}>
                        {t(startLocales.subtitle)}
                    </p>
                </div>
                <GuestCheckInForm
                    onLimitReachedAction={() => setIsLimitReached(true)}
                />
            </div>
            <SaveProgressDialog
                open={isLimitReached}
                isLimitReached
                onOpenChangeAction={setIsLimitReached}
            />
        </div>
    )
}
