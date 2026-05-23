'use client'

import { useTranslations } from 'next-intl'

import { CheckInForm } from '@/components/checkIn/forms/CheckInForm'
import { CheckInQuote } from '@/components/checkIn/sections/Quote'

import { useCheckIn } from '@/context/CheckInContext'

import { checkInLocales } from '@/locales/checkInLocales'

const CheckInPage = () => {
    const t = useTranslations()
    const { isSubmitted } = useCheckIn()

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

                {isSubmitted
                    ? (
                        <p className={'text-center text-muted-foreground'}>
                            {t(checkInLocales.submittedFeedback)}
                        </p>
                    )
                    : <CheckInForm/>
                }
            </div>
        </div>
    )
}

export default CheckInPage
