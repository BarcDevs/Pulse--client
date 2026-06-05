import type { Goal } from '@/types/goals'

import { ProgressGoalCard } from './cards/ProgressGoalCard'

type ProgressGoalsListProps = {
    goals: Goal[]
}

export const ProgressGoalsList = ({
    goals
}: ProgressGoalsListProps) => (
    <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
        {goals.map((goal) => (
            <ProgressGoalCard
                key={goal.id}
                goal={goal}
            />
        ))}
    </div>
)
