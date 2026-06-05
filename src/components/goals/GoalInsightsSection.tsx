'use client'

import { useTranslations } from 'next-intl'

import { Sparkles } from 'lucide-react'

import { CheckInInsight } from '@/types/checkIn'

import { EmptyState } from '@/components/shared/EmptyState'

import { useCheckIns } from '@/hooks/queries/useCheckIns'

import { getInsightColor } from '@/lib/milestones'
import { cn } from '@/lib/utils'

import { goalsLocales } from '@/locales/goalsLocales'

import {
    GoalInsightsSectionSkeleton
} from './GoalInsightsSectionSkeleton'

export const GoalInsightsSection = () => {
    const t = useTranslations()
    const {
        data: checkIns,
        isLoading: checkInsLoading,
        isError: checkInsError
    } = useCheckIns(5)

    const insights = checkIns?.[0]?.insights ?? []
    const displayedInsights = insights.slice(0, 2)
    const hasInsights = displayedInsights.length > 0

    return (
        <>
            {checkInsLoading && (
                <GoalInsightsSectionSkeleton/>
            )}

            {!checkInsLoading && checkInsError && (
                <div className={'bg-white p-6 rounded-xl shadow-sm border border-slate-100'}>
                    <p className={'text-sm text-on-surface-variant'}>
                        {t(goalsLocales.insights.failedToLoad)}
                    </p>
                </div>
            )}

            {!checkInsLoading && !checkInsError && !hasInsights && (
                <EmptyState message={t(goalsLocales.insights.emptyState)}/>
            )}

            {!checkInsLoading && !checkInsError && hasInsights && (
                <div className={'bg-white p-6 rounded-xl shadow-sm border border-slate-100'}>
                    <div className={'flex items-center gap-2 mb-4'}>
                        <Sparkles className={'w-5 h-5 text-primary'}/>
                        <h4 className={'text-lg font-headline font-bold'}>
                            {t(goalsLocales.insights.title)}
                        </h4>
                    </div>
                    <div className={'space-y-4'}>
                        {displayedInsights.map((insight: CheckInInsight) => (
                            <div
                                key={insight.id}
                                className={cn(getInsightColor(insight.type), 'p-4 rounded-lg')}
                            >
                                <p className={'text-sm font-medium mb-1'}>
                                    {insight.title}
                                </p>
                                <p className={'text-xs'}>
                                    {insight.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
