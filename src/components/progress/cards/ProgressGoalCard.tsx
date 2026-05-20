import { useTranslations } from 'next-intl'

import type { Goal } from '@/types/goals'

import { Badge } from '@/components/ui/badge'

import { getCategoryColor, getProgressPercentage } from '@/lib/goals'
import { cn } from '@/lib/utils'

import { goalsLocales } from '@/locales/goalsLocales'

type ProgressGoalCardProps = {
    goal: Goal
}

export const ProgressGoalCard = ({
    goal
}: ProgressGoalCardProps) => {
    const t = useTranslations()
    const progressPercent = getProgressPercentage(goal)
    const categoryColor = getCategoryColor(goal.category)

    return (
        <div className={'flex flex-col gap-3 rounded-xl bg-surface-section p-5'}>
            <Badge
                className={cn(
                    categoryColor,
                    'w-fit px-2 py-0.5 text-xs font-bold rounded-full uppercase tracking-widest'
                )}
            >
                {t(goalsLocales.categoryLabels[goal.category])}
            </Badge>
            <h4 className={'font-semibold text-foreground leading-tight'}>
                {goal.title}
            </h4>
            <div className={'mt-auto space-y-1.5'}>
                <div className={'flex justify-between text-xs text-muted-foreground'}>
                    <span>
                        {t(goalsLocales.goalCard.progressLabel)}
                    </span>
                    <span className={'font-semibold'}>
                        {`${progressPercent}%`}
                    </span>
                </div>
                <div className={'h-1.5 overflow-hidden rounded-full bg-outline-variant'}>
                    <div
                        className={'h-full rounded-full bg-primary transition-all'}
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>
        </div>
    )
}
