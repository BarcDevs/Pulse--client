'use client'

import { useTranslations } from 'next-intl'

import { useMilestones } from '@/hooks/queries/useMilestones'

import { goalsLocales } from '@/locales/goalsLocales'

export const GoalStatsSection = () => {
    const t = useTranslations()
    const {
        activeMilestones,
        isError: milestonesError
    } = useMilestones()

    return (
        <div className={'bg-white p-6 rounded-xl shadow-sm border border-slate-100'}>
            <h4 className={'text-sm font-headline font-bold text-slate-500 uppercase tracking-widest mb-4'}>
                {t(goalsLocales.insights.weeklyViewTitle)}
            </h4>
            {milestonesError && (
                <p className={'text-sm text-on-surface-variant'}>
                    {t(goalsLocales.insights.failedToLoad)}
                </p>
            )}

            {!milestonesError && (
                <div className={'space-y-3'}>
                    <div className={'flex items-center justify-between text-sm'}>
                        <span className={'text-on-surface-variant'}>
                            {t(goalsLocales.goalStats.activeMilestonesLabel)}
                        </span>
                        <span className={'font-bold text-primary'}>
                            {activeMilestones}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
