'use client'

import { useState } from 'react'

import { format, parseISO } from 'date-fns'
import { Plus } from 'lucide-react'

import { Goal } from '@/types/goals'

import { Button } from '@/components/ui/button'

import { getProgressPercentage } from '@/lib/goals'

import { AddMilestoneModal } from './form/AddMilestoneModal'
import { GoalProgressRing } from './GoalProgressRing'

type GoalDetailHeaderProps = {
    goal: Goal
}

export const GoalDetailHeader = ({
    goal
}: GoalDetailHeaderProps) => {
    const [addMilestoneOpen, setAddMilestoneOpen] = useState(false)
    const percentage = getProgressPercentage(goal)

    const targetDateFormatted = goal.targetDate
        ? format(parseISO(goal.targetDate), 'MMM dd, yyyy')
        : null

    return (
        <>
            <section className={'mb-12'}>
                <div className={'flex flex-col md:flex-row justify-between gap-8 mb-8'}>
                    <div className={'flex-1'}>
                        <h2 className={'text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-on-surface mb-4'}>
                            {goal.title}
                        </h2>
                        {goal.description && (
                            <p className={'text-lg text-on-surface-variant max-w-2xl leading-relaxed mb-6'}>
                                {goal.description}
                            </p>
                        )}
                        {targetDateFormatted && (
                            <p className={'text-sm font-medium text-on-surface-variant'}>
                                Target Date: <span className={'font-semibold text-on-surface'}>
                                    {targetDateFormatted}
                                </span>
                            </p>
                        )}
                    </div>
                    <div className={'flex flex-col items-end gap-4'}>
                        <Button
                            onClick={
                                () => setAddMilestoneOpen(
                                    true
                                )
                            }
                            size={'sm'}
                        >
                            <Plus className={'w-4 h-4 mr-2'}/>
                            Add Milestone
                        </Button>
                        <div className={'bg-primary-foreground border border-outline/20 shadow-sm p-6 rounded-xl flex flex-col items-center justify-center shrink-0 min-w-45'}>
                            <div className={'relative w-24 h-24 mb-3'}>
                                <GoalProgressRing
                                    percentage={percentage}
                                    size={96}
                                />
                                <div className={'absolute inset-0 flex items-center justify-center'}>
                                    <span className={'font-bold text-xl font-headline text-on-surface'}>
                                        {`${percentage}%`}
                                    </span>
                                </div>
                            </div>
                            <span className={'text-xs font-bold uppercase tracking-widest text-outline'}>
                                Overall Progress
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <AddMilestoneModal
                open={addMilestoneOpen}
                onOpenChange={setAddMilestoneOpen}
                goalId={goal.id}
            />
        </>
    )
}