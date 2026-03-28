'use client'

import {CheckInForm} from './forms/CheckInForm'
import {CheckInQuote} from './sections/Quote'

export const CheckInPageContent = () => (
    <div className={'space-y-6 p-6'}>
        <CheckInQuote/>
        <CheckInForm/>
    </div>
)
