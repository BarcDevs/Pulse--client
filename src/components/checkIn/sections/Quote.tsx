'use client'

import { useLocale, useTranslations } from 'next-intl'

import { Quote } from 'lucide-react'

import { pickQuote } from '@/utils/checkIn'

export const CheckInQuote = () => {
    const t = useTranslations('checkIn')
    const locale = useLocale()
    const quotes = t.raw('quotes') as string[]
    const quote = pickQuote(quotes, locale)

    return (
        <div className={'mt-10 mb-6 rounded-2xl bg-primary-light p-8 text-center'}>
            <Quote className={'mx-auto mb-4 size-8 text-primary'}/>
            <blockquote className={'text-lg italic text-foreground'}>
                {quote}
            </blockquote>
        </div>
    )
}
