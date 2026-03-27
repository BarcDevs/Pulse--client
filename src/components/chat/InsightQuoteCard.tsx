import {Quote} from 'lucide-react'

import * as ChatTexts from '@/constants/chatTexts'

export const InsightQuoteCard = () => (
    <div className={'rounded-xl bg-surface-section p-4'}>
        <Quote className={'size-6 text-muted-foreground'}/>
        <p className={'mt-2 text-sm italic text-foreground'}>
            {`${ChatTexts.CHAT_SIDEBAR_QUOTE}`}
        </p>
        <p className={'mt-2 text-xs text-muted-foreground'}>
            {`- ${ChatTexts.CHAT_SIDEBAR_QUOTE_AUTHOR}`}
        </p>
    </div>
)
