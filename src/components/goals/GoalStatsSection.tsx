'use client'

import { useMilestones } from '@/hooks/queries/useMilestones'

import { recoveryGoalsPageTexts as pageTexts }
    from '@/constants/componentTexts/recoveryGoals'

export const GoalStatsSection = () => {
    const {
        activeMilestones,
        isError: milestonesError
    } = useMilestones()

    return (
        <div className={'bg-white p-6 rounded-xl shadow-sm border border-slate-100'}>
            <h4 className={'text-sm font-headline font-bold text-slate-500 uppercase tracking-widest mb-4'}>
                {pageTexts.insights.weeklyViewTitle}
            </h4>
            {milestonesError && (
                <p className={'text-sm text-on-surface-variant'}>
                    {pageTexts.insights.failedToLoad}
                </p>
            )}

            {!milestonesError && (
                <div className={'space-y-3'}>
                    <div className={'flex items-center justify-between text-sm'}>
                        <span className={'text-on-surface-variant'}>
                            {pageTexts.goalStats.activeMilestonesLabel}
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
