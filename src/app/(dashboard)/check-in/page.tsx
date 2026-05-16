'use client'

import { useTranslations } from 'next-intl'

import { CheckInForm } from '@/components/checkin/forms/CheckInForm'
import { CheckInQuote } from '@/components/checkin/sections/Quote'

import { checkInLocales } from '@/locales/checkInLocales'

const CheckInPage = () => {
    const t = useTranslations()

    return (
        <div className={'flex-1 p-4 md:p-6'}>
            <div className={'mx-auto max-w-2xl'}>
                <CheckInQuote/>

                <div className={'mb-8 text-center'}>
                    <h1 className={'text-3xl font-semibold text-foreground'}>
                        {t(checkInLocales.pageTitle)}
                    </h1>
                    <p className={'mt-2 text-muted-foreground'}>
                        {t(checkInLocales.pageSubtitle)}
                    </p>
                </div>

                <CheckInForm/>
            </div>
        </div>
    )
}

export default CheckInPage
