'use client'

import { useState } from 'react'

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
    hideButton?: boolean
}

export const DashboardAIInsight = ({
    className,
    hideButton = false
}: DashboardAIInsightProps) => {
    const t = useTranslations()
    const [isExpanded, setIsExpanded] = useState(false)
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
            <CardContent className={'space-y-3'}>
                {isLoading ? (
                    <Skeleton className={'h-12 w-full'}/>
                ) : isError ? (
                    <p className={'text-sm text-muted-foreground'}>
                        {t(dashboardLocales.aiInsight.failedToLoad)}
                    </p>
                ) : !insightText ? (
                    <p className={'text-sm text-muted-foreground'}>
                        {t(dashboardLocales.noInsights)}
                    </p>
                ) : (
                    <>
                        <blockquote className={cn(
                            'border-l-2 border-primary pl-4 italic text-foreground text-sm',
                            !isExpanded && 'line-clamp-3'
                        )}>
                            {insightText}
                        </blockquote>
                        {!hideButton && (
                            // todo: replace with shadcn's
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className={'text-sm text-primary hover:underline cursor-pointer'}
                            >
                                {t(isExpanded
                                    ? dashboardLocales.aiInsight.seeLess
                                    : dashboardLocales.aiInsight.seeMore
                                )}
                            </button>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    )
}
