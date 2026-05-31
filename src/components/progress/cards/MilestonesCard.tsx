'use client'

import { useTranslations } from 'next-intl'

import { useGoals } from '@/hooks/queries/useGoals'
import { useRecoveryGoalsStats } from '@/hooks/queries/useRecoveryGoalsStats'

import { getMilestonesData } from '@/lib/milestones'

import { MilestonesCardSkeleton } from './MilestonesCardSkeleton'
import { MilestonesHeader } from './MilestonesHeader'
import { MilestonesNextUp } from './MilestonesNextUp'
import { MilestonesProgress } from './MilestonesProgress'

export const MilestonesCard = () => {
    const t = useTranslations()
    const {
        data: stats,
        isLoading: statsLoading,
        isError
    } = useRecoveryGoalsStats()
    const {
        data: goals = [],
        isLoading: goalsLoading
    } = useGoals()

    if (statsLoading || goalsLoading)
        return <MilestonesCardSkeleton/>

    const {
        completed,
        total,
        completionRate,
        nextMilestone,
        indicatorWidth,
        inProgressWidth,
        acrossGoalsLabel,
        percentCompleteLabel,
        completedCountLabel,
        inProgressCountLabel,
        upcomingCountLabel,
        nextUpLabel
        // eslint-disable-next-line custom-rules/enforce-function-call-breaking
    } = getMilestonesData(stats, goals, isError, t)

    return (
        <div className={'card-base'}>
            <MilestonesHeader
                completed={completed}
                total={total}
            />
            <MilestonesProgress
                completionRate={completionRate}
                indicatorWidth={indicatorWidth}
                inProgressWidth={inProgressWidth}
                acrossGoalsLabel={acrossGoalsLabel}
                percentCompleteLabel={percentCompleteLabel}
                completedCountLabel={completedCountLabel}
                inProgressCountLabel={inProgressCountLabel}
                upcomingCountLabel={upcomingCountLabel}
            />
            <MilestonesNextUp
                nextUpLabel={nextUpLabel}
                nextMilestone={nextMilestone}
            />
        </div>
    )
}
