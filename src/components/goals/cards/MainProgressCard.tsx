import { useTranslations } from 'next-intl'

import { useRecoveryGoalsData } from '@/hooks/useRecoveryGoalsData'

import {
    getBadge,
    getBadgeLabel
} from '@/lib/goals/getBadge'

import { EditGoalButton } from '../EditGoalButton'
import { GoalDetailsSection } from '../GoalDetailsSection'
import { GoalProgressSection } from '../GoalProgressSection'

type MainProgressCardProps = {
    onCompleteToday?: () => void
    onEditGoal?: (goalId: string) => void
}

export const MainProgressCard = ({
    onCompleteToday,
    onEditGoal
}: MainProgressCardProps) => {
    const t = useTranslations()
    const recoveryGoals = useRecoveryGoalsData()

    if (!recoveryGoals.progress.activeGoal) return null

    const badgeKey = getBadge(recoveryGoals.progress.overallPercentage)
    const badge = getBadgeLabel(badgeKey, t)

    return (
        <div className={'md:col-span-8 bg-white rounded-xl overflow-hidden relative'}>
            {onEditGoal && (
                <EditGoalButton
                    goalId={recoveryGoals.progress.activeGoal.id}
                    onEdit={onEditGoal}
                />
            )}
            <div className={'flex flex-col md:flex-row gap-0'}>
                <GoalProgressSection percentage={recoveryGoals.progress.overallPercentage}/>

                <GoalDetailsSection
                    goal={recoveryGoals.progress.activeGoal}
                    badge={badge}
                    onCompleteToday={onCompleteToday}
                />
            </div>
        </div>
    )
}
