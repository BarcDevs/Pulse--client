import {Badge} from '@/components/ui/badge'
import {
    Card,
    CardContent
} from '@/components/ui/card'
import {Progress} from '@/components/ui/progress'

import * as ChatTexts from '@/constants/chatTexts'

export const NextMilestoneCard = () => (
    <Card className={'border-0 bg-primary text-white shadow-none'}>
        <CardContent className={'pt-6'}>
            <p className={'text-xs font-medium uppercase tracking-wider opacity-80'}>
                {ChatTexts.CHAT_SIDEBAR_NEXT_MILESTONE_LABEL}
            </p>
            <h3 className={'mt-1 text-lg font-semibold'}>
                {ChatTexts.CHAT_SIDEBAR_NEXT_MILESTONE_TITLE}
            </h3>
            <Badge className={'mt-2 border-0 bg-white/20 text-white'}>
                {ChatTexts.CHAT_SIDEBAR_NEXT_MILESTONE_BADGE}
            </Badge>
            <Progress
                value={87}
                className={'mt-4 h-2 bg-white/20'}
            />
        </CardContent>
    </Card>
)
