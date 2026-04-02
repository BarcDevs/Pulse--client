import {Quote} from 'lucide-react'

import {getRandomQuote} from '@/utils/checkIn'

export const CheckInQuote = () => {
    const quote = getRandomQuote()

    return (
        <div className={'mt-10 rounded-2xl bg-primary-light p-8 text-center'}>
            <Quote className={'mx-auto mb-4 size-8 text-primary'}/>
            <blockquote className={'text-lg italic text-foreground'}>
                {quote}
            </blockquote>
        </div>
    )
}
