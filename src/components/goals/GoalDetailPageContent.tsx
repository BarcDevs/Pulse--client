'use client'

import Link from 'next/link'

import { ChevronRight } from 'lucide-react'

import { GoalPageSkeletons }
    from '@/components/goals/GoalPageSkeletons'
import { ErrorDisplay }
    from '@/components/shared/ErrorDisplay'

import { useGoal } from '@/hooks/queries/useGoal'

import { getProgressPercentage } from '@/lib/goals'
import { cn } from '@/lib/utils'

import { MilestonesSection }
    from './milestones/MilestonesSection'
import { GoalProgressRing } from './GoalProgressRing'

type GoalDetailPageContentProps = {
    goalId: string
}

export const GoalDetailPageContent = ({
    goalId
}: GoalDetailPageContentProps) => {
    const {
        data: goal,
        isLoading,
        isError,
        error
    } = useGoal(goalId)

    return (
        <div className={'p-8 md:p-12 max-w-6xl mx-auto w-full min-h-screen'}>

            {isLoading && (
                <GoalPageSkeletons/>
            )}

            {isError && !isLoading && (
                <ErrorDisplay error={error}/>
            )}

            {!isLoading && !isError && goal && (
                <>
                    <nav className={'flex items-center text-sm text-slate-500 font-medium'}>
                        <Link
                            href={'/recovery-goals'}
                            className={'hover:text-primary transition-colors'}
                        >
                            Goals
                        </Link>
                        <ChevronRight className={'w-4 h-4 mx-2'}/>
                        <span className={'text-on-surface'}>
                            {goal.title}
                        </span>
                    </nav>

                    <section className={'flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12'}>
                        <div className={'flex-1'}>
                            <h2 className={cn(
                                'text-4xl md:text-5xl',
                                'font-extrabold',
                                'font-headline',
                                'tracking-tight',
                                'text-on-surface',
                                'mb-4'
                            )}>
                                {goal.title}
                            </h2>
                            {goal.description && (
                                <p className={'text-lg text-on-surface-variant max-w-2xl leading-relaxed'}>
                                    {goal.description}
                                </p>
                            )}
                        </div>
                        <div className={cn(
                            'bg-surface-container-lowest',
                            'p-6 rounded-xl',
                            'flex flex-col items-center',
                            'justify-center',
                            'min-w-45'
                        )}>
                            <GoalProgressRing
                                percentage={getProgressPercentage(goal)}
                            />
                        </div>
                    </section>

                    <div className={'mt-12'}>
                        <MilestonesSection
                            goalId={goal.id}
                            milestones={goal.milestones || []}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
