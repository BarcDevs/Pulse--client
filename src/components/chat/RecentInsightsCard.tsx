import {Moon, TrendingUp} from 'lucide-react'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import * as ChatTexts from '@/constants/chatTexts'

import {InsightItem} from './InsightItem'

export const RecentInsightsCard = () => (
    <Card className={'border-0 bg-surface-section shadow-none'}>
        <CardHeader className={'pb-2'}>
            <CardTitle className={'text-sm font-medium text-muted-foreground'}>
                {ChatTexts.CHAT_SIDEBAR_INSIGHTS_TITLE}
            </CardTitle>
            <p className={'text-xs text-muted-foreground'}>
                {ChatTexts.CHAT_SIDEBAR_INSIGHTS_TIMEFRAME}
            </p>
        </CardHeader>
        <CardContent className={'space-y-4'}>
            <InsightItem
                icon={TrendingUp}
                iconBg={'bg-amber-100'}
                label={ChatTexts.CHAT_SIDEBAR_EMOTIONAL_TREND_LABEL}
                title={ChatTexts.CHAT_SIDEBAR_EMOTIONAL_TREND_TITLE}
                description={ChatTexts.CHAT_SIDEBAR_EMOTIONAL_TREND_DESCRIPTION}
            />
            <InsightItem
                icon={Moon}
                iconBg={'bg-blue-100'}
                label={ChatTexts.CHAT_SIDEBAR_SLEEP_QUALITY_LABEL}
                title={ChatTexts.CHAT_SIDEBAR_SLEEP_QUALITY_TITLE}
                description={ChatTexts.CHAT_SIDEBAR_SLEEP_QUALITY_DESCRIPTION}
            />
        </CardContent>
    </Card>
)
