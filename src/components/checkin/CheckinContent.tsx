'use client'

import {CheckInForm} from './CheckInForm'
import {CheckInQuote} from './Quote'

export const CheckInContent = () => (
    <div className={'space-y-6 p-6'}>
        <CheckInQuote/>
        <CheckInForm/>
    </div>
)
