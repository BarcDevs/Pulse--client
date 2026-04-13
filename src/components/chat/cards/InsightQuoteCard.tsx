import { Quote } from 'lucide-react'

import { chatTexts } from '@/constants/componentTexts/chat'

export const InsightQuoteCard = () => (
    <div className={'rounded-xl bg-surface-section p-4'}>
        <Quote className={'size-6 text-muted-foreground'}/>
        <p className={'mt-2 text-sm italic text-foreground'}>
            {`${chatTexts.sidebar.quote}`}
        </p>
        <p className={'mt-2 text-xs text-muted-foreground'}>
            {`- ${chatTexts.sidebar.quoteAuthor}`}
        </p>
    </div>
)
