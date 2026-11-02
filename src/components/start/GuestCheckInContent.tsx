'use client'

import { useTranslations } from 'next-intl'

import { startLocales } from '@/locales/startLocales'

import { GuestCheckInForm } from './GuestCheckInForm'

type GuestCheckInContentProps = {
    onLimitReachedAction: () => void
}

export const GuestCheckInContent = ({
    onLimitReachedAction
}: GuestCheckInContentProps) => {
    const t = useTranslations()

    return (
        <>
            <div className={'md:text-center'}>
                <h1 className={'text-2xl font-bold tracking-tight text-foreground md:text-3xl'}>
                    {t(startLocales.title)}
                </h1>
                <p className={'mt-1.5 text-base text-muted-foreground'}>
                    {t(startLocales.subtitle)}
                </p>
            </div>
            <GuestCheckInForm onLimitReachedAction={onLimitReachedAction}/>
        </>
    )
}
