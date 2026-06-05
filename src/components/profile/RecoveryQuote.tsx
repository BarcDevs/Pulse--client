'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { profileLocales } from '@/locales/profileLocales'

export const RecoveryQuote = () => {
    const t = useTranslations()
    const [index] = useState(() =>
        Math.floor(Math.random() * profileLocales.recoveryQuotes.length)
    )

    // TODO: replace with user's recoveryGoalStatement field once API adds it
    return (
        <div className={'mt-6 rounded-xl bg-muted px-5 py-4'}>
            <p className={'text-sm italic leading-relaxed text-muted-foreground'}>
                {`"${t(profileLocales.recoveryQuotes[index])}"`}
            </p>
        </div>
    )
}
