'use client'

import { useTranslations } from 'next-intl'

import { Sparkles } from 'lucide-react'

import { ClassName } from '@/types/react'

import { Card } from '@/components/shared/cards/Card'
import {
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { useCheckIns } from '@/hooks/queries/useCheckIns'

import { getLatestInsights } from '@/lib/insights/getLatestInsights'

import { dashboardLocales } from '@/locales/dashboardLocales'

import { DashboardInsightItem } from './DashboardInsightItem'

type DashboardAIInsightProps = {
    className?: ClassName
}

export const DashboardAIInsight = ({
    className
}: DashboardAIInsightProps) => {
    const t = useTranslations()
    const {
        data: checkInsResponse,
        isLoading,
        isError
    } = useCheckIns(1)

    const insights =
        getLatestInsights(checkInsResponse)

    return (
        <Card className={className}>
            <CardHeader>
                <div className={'flex items-center gap-2'}>
                    <Sparkles className={'size-4 text-purple'}/>
                    <CardTitle className={'text-sm font-medium text-muted-foreground'}>
                        {t(dashboardLocales.aiInsight.label)}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className={'space-y-3'}>
                {isLoading ? (
                    <Skeleton className={'h-12 w-full'}/>
                ) : isError ? (
                    <p className={'text-sm text-muted-foreground'}>
                        {t(dashboardLocales.aiInsight.failedToLoad)}
                    </p>
                ) : insights.length === 0 ? (
                    <p className={'text-sm text-muted-foreground'}>
                        {t(dashboardLocales.noInsights)}
                    </p>
                ) : (
                    insights.map((insight) => (
                        <DashboardInsightItem
                            key={insight.id}
                            insight={insight}
                        />
                    ))
                )}
            </CardContent>
        </Card>
    )
}
