'use client'

import { CheckInForm } from '@/components/checkIn/forms/CheckInForm'
import { CheckInQuote } from '@/components/checkIn/sections/Quote'

import { checkInTexts } from '@/constants/componentTexts/checkIn'

const CheckInPage = () => (
    <div className={'flex-1 p-4 md:p-6'}>
        <div className={'mx-auto max-w-2xl'}>
            <CheckInQuote/>

            <div className={'mb-8 text-center'}>
                <h1 className={'text-3xl font-semibold text-foreground'}>
                    {checkInTexts.pageTitle}
                </h1>
                <p className={'mt-2 text-muted-foreground'}>
                    {checkInTexts.pageSubtitle}
                </p>
            </div>

            <CheckInForm/>
        </div>
    </div>
)

export default CheckInPage
