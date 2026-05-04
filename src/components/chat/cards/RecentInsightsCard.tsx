import { useTranslations } from 'next-intl'

import { Moon, TrendingUp } from 'lucide-react'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { chatLocales } from '@/locales/chatLocales'

import { InsightItem } from './InsightItem'

export const RecentInsightsCard = () => {
    const t = useTranslations()

    return (
        <Card className={'border-0 bg-surface-section shadow-none'}>
            <CardHeader className={'pb-2'}>
                <CardTitle className={'text-sm font-medium text-muted-foreground'}>
                    {t(chatLocales.sidebar.insightsTitle)}
                </CardTitle>
                <p className={'text-xs text-muted-foreground'}>
                    {t(chatLocales.sidebar.insightsTimeframe)}
                </p>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                <InsightItem
                    icon={TrendingUp}
                    iconBg={'bg-amber-100'}
                    label={t(chatLocales.sidebar.emotionalTrendLabel)}
                    title={t(chatLocales.sidebar.emotionalTrendTitle)}
                    description={t(chatLocales.sidebar.emotionalTrendDescription)}
                />
                <InsightItem
                    icon={Moon}
                    iconBg={'bg-blue-100'}
                    label={t(chatLocales.sidebar.sleepQualityLabel)}
                    title={t(chatLocales.sidebar.sleepQualityTitle)}
                    description={t(chatLocales.sidebar.sleepQualityDescription)}
                />
            </CardContent>
        </Card>
    )
}
