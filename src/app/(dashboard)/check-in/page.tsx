'use client'

import {CheckInForm} from '@/components/checkIn/CheckInForm'
import {CheckInQuote} from '@/components/checkIn/Quote'

import * as CheckInTexts from '@/constants/checkInTexts'

const CheckInPage = () => (
    <div className={'flex-1 p-4 md:p-6'}>
        <div className={'mx-auto max-w-2xl'}>
            <div className={'mb-8 text-center'}>
                <h1 className={'text-3xl font-semibold text-foreground'}>
                    {CheckInTexts.CHECK_IN_PAGE_TITLE}
                </h1>
                <p className={'mt-2 text-muted-foreground'}>
                    {CheckInTexts.CHECK_IN_PAGE_SUBTITLE}
                </p>
            </div>

            <CheckInForm/>

            <p className={'mt-4 text-center text-xs text-muted-foreground'}>
                {CheckInTexts.CHECK_IN_AUTOSAVE_STATUS}
            </p>

            <CheckInQuote/>
        </div>
    </div>
)

export default CheckInPage
