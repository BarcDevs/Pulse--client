import { useTranslations } from 'next-intl'

import { Quote } from 'lucide-react'

import { chatLocales } from '@/locales/chatLocales'

export const InsightQuoteCard = () => {
    const t = useTranslations()

    return (
        <div className={'rounded-xl bg-surface-section p-4'}>
            <Quote className={'size-6 text-muted-foreground'}/>
            <p className={'mt-2 text-sm italic text-foreground'}>
                {`${t(chatLocales.sidebar.quote)}`}
            </p>
            <p className={'mt-2 text-xs text-muted-foreground'}>
                {`- ${t(chatLocales.sidebar.quoteAuthor)}`}
            </p>
        </div>
    )
}
