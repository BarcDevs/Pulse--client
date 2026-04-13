import { Moon, TrendingUp } from 'lucide-react'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { chatTexts } from '@/constants/componentTexts/chat'

import { InsightItem } from './InsightItem'

export const RecentInsightsCard = () => (
    <Card className={'border-0 bg-surface-section shadow-none'}>
        <CardHeader className={'pb-2'}>
            <CardTitle className={'text-sm font-medium text-muted-foreground'}>
                {chatTexts.sidebar.insightsTitle}
            </CardTitle>
            <p className={'text-xs text-muted-foreground'}>
                {chatTexts.sidebar.insightsTimeframe}
            </p>
        </CardHeader>
        <CardContent className={'space-y-4'}>
            <InsightItem
                icon={TrendingUp}
                iconBg={'bg-amber-100'}
                label={chatTexts.sidebar.emotionalTrendLabel}
                title={chatTexts.sidebar.emotionalTrendTitle}
                description={chatTexts.sidebar.emotionalTrendDescription}
            />
            <InsightItem
                icon={Moon}
                iconBg={'bg-blue-100'}
                label={chatTexts.sidebar.sleepQualityLabel}
                title={chatTexts.sidebar.sleepQualityTitle}
                description={chatTexts.sidebar.sleepQualityDescription}
            />
        </CardContent>
    </Card>
)
