'use client'

import { useTranslations } from 'next-intl'

import { Sparkles } from 'lucide-react'

import { InsightDialogItem } from '@/components/checkIn/InsightDialogItem'
import { EmptyState } from '@/components/shared/EmptyState'

import { useCheckIns } from '@/hooks/queries/useCheckIns'

import { getLatestInsights } from '@/lib/insights/getLatestInsights'

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

    const insights = getLatestInsights(checkIns)
    const hasInsights = insights.length > 0

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
                        {insights.map((insight) => (
                            <InsightDialogItem
                                key={insight.id}
                                insight={insight}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
