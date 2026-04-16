import { Goal } from '@/types/goals'

import { ActiveGoalCard } from './cards/ActiveGoalCard'
import { CompletedGoalCard } from './cards/CompletedGoalCard'
import { DraftGoalCard } from './cards/DraftGoalCard'

type GoalsListProps = {
    goals: Goal[]
    onChecklistChange?: (
        goalId: string,
        itemId: string,
        completed: boolean
    ) => void
    onAddStep?: (goalId: string) => void
    onEditDraft?: (goalId: string) => void
}

export const GoalsList = ({
    goals,
    onChecklistChange,
    onAddStep,
    onEditDraft
}: GoalsListProps) => (
    <div className={'space-y-6'}>
        {goals.map((goal) => (
            <div key={goal.id}>
                {goal.status === 'active' && (
                    <ActiveGoalCard
                        goal={goal}
                        onChecklistChange={
                            (itemId, completed) => onChecklistChange?.(
                                goal.id,
                                itemId,
                                completed
                            )}
                        onAddStep={() => onAddStep?.(goal.id)}
                    />
                )}
                {goal.status === 'completed' && (
                    <CompletedGoalCard goal={goal}/>
                )}
                {goal.status === 'draft' && (
                    <DraftGoalCard
                        goal={goal}
                        onEdit={() => onEditDraft?.(goal.id)}
                    />
                )}
            </div>
        ))}
    </div>
)
