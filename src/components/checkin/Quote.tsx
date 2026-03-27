import {Quote} from 'lucide-react'

import {checkInTexts} from '@/constants/componentTexts/checkIn'

export const CheckInQuote = () => (
    <div className={'mt-10 rounded-2xl bg-primary-light p-8 text-center'}>
        <Quote className={'mx-auto mb-4 size-8 text-primary'}/>
        <blockquote className={'text-lg italic text-foreground'}>
            {checkInTexts.quote}
        </blockquote>
    </div>
)
