'use client'

import { useTranslations } from 'next-intl'

import { Sparkles } from 'lucide-react'

import { ClassName } from '@/types/react'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { useCheckIns } from '@/hooks/queries/useCheckIns'

import { getLatestInsights } from '@/lib/insights/getLatestInsights'
import { cn } from '@/lib/utils'

import { dashboardLocales } from '@/locales/dashboardLocales'

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

    const insightText =
        getLatestInsights(checkInsResponse)

    return (
        <Card className={cn(
            'border-0 shadow-sm',
            className
        )}>
            <CardHeader>
                <div className={'flex items-center gap-2'}>
                    <Sparkles className={'size-4 text-purple'}/>
                    <CardTitle className={'text-sm font-medium text-muted-foreground'}>
                        {t(dashboardLocales.aiInsight.label)}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Skeleton className={'h-12 w-full'}/>
                ) : isError ? (
                    <p className={'text-sm text-muted-foreground'}>
                        Failed to load insights
                    </p>
                ) : (
                    <blockquote className={'border-l-2 border-primary pl-4 italic text-foreground'}>
                        {insightText}
                    </blockquote>
                )}
            </CardContent>
        </Card>
    )
}
