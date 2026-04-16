'use client'

import { useState } from 'react'

import { Goal } from '@/types/goals'
import { SetState } from '@/types/react'

import { CreateGoalButton } from './CreateGoalButton'
import { GoalsList } from './GoalsList'
import { RecoveryGoalsHeader } from './RecoveryGoalsHeader'

type RecoveryGoalsPageContentProps = {
    initialGoals?: Goal[]
}

export const RecoveryGoalsPageContent = ({
    initialGoals = []
}: RecoveryGoalsPageContentProps) => {
    const [goals, setGoals]: [
        Goal[],
        SetState<Goal[]>
    ] = useState<Goal[]>(initialGoals)

    const handleChecklistChange = (
        goalId: string,
        itemId: string,
        completed: boolean
    ) => {
        setGoals((prev) => prev.map((goal) => (
            goal.id === goalId
                ? {
                    ...goal,
                    checklist: goal.checklist?.map((item) => (
                        item.id === itemId
                            ? { ...item, completed }
                            : item
                    ))
                } : goal
        )))
    }

    const handleAddStep = (goalId: string) => {
        // TODO: Implement add step functionality
        void goalId
    }

    const handleEditDraft = (goalId: string) => {
        // TODO: Implement edit draft functionality
        void goalId
    }

    const handleCreateGoal = () => {
        // TODO: Implement create goal functionality
    }

    return (
        <div className={'p-8 md:p-12 max-w-5xl mx-auto w-full'}>
            <RecoveryGoalsHeader
                title={'Milestones & Intentions'}
                description={'Recovery is not a linear journey. Focus on these small, meaningful steps that build the foundation for your long-term wellbeing.'}
            />

            <GoalsList
                goals={goals}
                onChecklistChange={handleChecklistChange}
                onAddStep={handleAddStep}
                onEditDraft={handleEditDraft}
            />

            <CreateGoalButton onCreate={handleCreateGoal}/>
        </div>
    )
}
