'use client'

import { Moon, TrendingUp } from 'lucide-react'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import * as chatTexts from '@/constants/chatTexts'

import { InsightItem } from './InsightItem'

export const InsightsCard = () => (
    <Card className={'border-0 bg-surface-section shadow-none'}>
        <CardHeader className={'pb-2'}>
            <CardTitle className={'text-sm font-medium text-muted-foreground'}>
                {chatTexts.CHAT_SIDEBAR_INSIGHTS_TITLE}
            </CardTitle>
            <p className={'text-xs text-muted-foreground'}>
                {chatTexts.CHAT_SIDEBAR_INSIGHTS_TIMEFRAME}
            </p>
        </CardHeader>
        <CardContent className={'space-y-4'}>
            <InsightItem
                icon={TrendingUp}
                label={chatTexts.CHAT_SIDEBAR_EMOTIONAL_TREND_LABEL}
                title={chatTexts.CHAT_SIDEBAR_EMOTIONAL_TREND_TITLE}
                description={chatTexts.CHAT_SIDEBAR_EMOTIONAL_TREND_DESCRIPTION}
                iconBgColor={'bg-amber-100'}
                iconColor={'text-amber-600'}
                labelColor={'text-amber-600'}
            />
            <InsightItem
                icon={Moon}
                label={chatTexts.CHAT_SIDEBAR_SLEEP_QUALITY_LABEL}
                title={chatTexts.CHAT_SIDEBAR_SLEEP_QUALITY_TITLE}
                description={chatTexts.CHAT_SIDEBAR_SLEEP_QUALITY_DESCRIPTION}
                iconBgColor={'bg-blue-100'}
                iconColor={'text-primary'}
                labelColor={'text-primary'}
            />
        </CardContent>
    </Card>
)
