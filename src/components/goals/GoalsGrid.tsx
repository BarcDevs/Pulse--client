'use client'

import { PlusCircle } from 'lucide-react'

import { Goal } from '@/types/goals'

import { EmptyState } from '@/components/shared/EmptyState'

import  { recoveryGoalsPageTexts as pageTexts }
    from '@/constants/componentTexts/recoveryGoals'

import { GoalCard } from './cards/GoalCard'

type GoalsGridProps = {
    goals: Goal[]
    onEdit: (goalId: string) => void
    onDelete: (goalId: string) => void
    onCreateAction?: () => void
}

export const GoalsGrid = ({
    goals,
    onEdit,
    onDelete,
    onCreateAction
}: GoalsGridProps) => {
    const isEmpty = goals.length === 0

    return (
        <>
            {isEmpty && (
                <EmptyState message={pageTexts.emptyState.message}/>
            )}

            {!isEmpty && (
                <div className={'grid gap-6 grid-cols-1 md:grid-cols-2'}>
                    {goals.map((goal) => (
                        <GoalCard
                            key={goal.id}
                            goal={goal}
                            onEditAction={onEdit}
                            onDeleteAction={onDelete}
                        />
                    ))}
                    <div
                        onClick={onCreateAction}
                        className={'border-2 border-dashed border-outline-variant bg-transparent p-6 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/50 transition-colors group'}>
                        <div className={'w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'}>
                            <PlusCircle className={'w-6 h-6 text-outline'}/>
                        </div>
                        <p className={'font-headline font-bold text-on-surface-variant'}>
                            {pageTexts.overview.addGoalPlaceholder}
                        </p>
                        <p className={'text-xs text-outline mt-1'}>
                            {pageTexts.overview.addGoalSubtitle}
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}
