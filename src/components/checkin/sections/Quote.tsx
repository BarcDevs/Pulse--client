'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Quote } from 'lucide-react'

export const CheckInQuote = () => {
    const t = useTranslations('checkIn')
    const quotes = t.raw('quotes') as string[]
    const [quote] = useState(
        () => quotes[Math.floor(Math.random() * quotes.length)]
    )

    return (
        <div className={'mt-10 rounded-2xl bg-primary-light p-8 text-center'}>
            <Quote className={'mx-auto mb-4 size-8 text-primary'}/>
            <blockquote className={'text-lg italic text-foreground'}>
                {quote}
            </blockquote>
        </div>
    )
}
