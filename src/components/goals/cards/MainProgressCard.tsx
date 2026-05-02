import { useRecoveryGoalsData } from '@/hooks/useRecoveryGoalsData'

import { getBadge } from '@/lib/goals'

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
    const {
        activeGoal,
        overallPercentage
    } = useRecoveryGoalsData()

    if (!activeGoal) return null

    const badge = getBadge(overallPercentage)

    return (
        <div className={'md:col-span-8 bg-white rounded-xl overflow-hidden relative'}>
            {onEditGoal && (
                <EditGoalButton
                    goalId={activeGoal.id}
                    onEdit={onEditGoal}
                />
            )}
            <div className={'flex flex-col md:flex-row gap-0'}>
                <GoalProgressSection
                    percentage={overallPercentage}
                />

                <GoalDetailsSection
                    goal={activeGoal}
                    badge={badge}
                    onCompleteToday={onCompleteToday}
                />
            </div>
        </div>
    )
}
