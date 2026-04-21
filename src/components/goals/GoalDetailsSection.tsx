import { Goal } from '@/types/goals'

import { Badge } from '@/components/ui/badge'

import { GoalActionButtons } from './GoalActionButtons'
import { GoalInfo } from './GoalInfo'

type GoalDetailsSectionProps = {
    goal: Goal
    badge: string
    onCompleteToday?: () => void
}

export const GoalDetailsSection = ({
    goal,
    badge,
    onCompleteToday
}: GoalDetailsSectionProps) => (
    <div className={'flex-1 p-8 flex flex-col gap-4 text-foreground'}>
        <Badge variant={'secondary'}>
            {badge}
        </Badge>

        <GoalInfo goal={goal} />

        <GoalActionButtons
            onCompleteTodayAction={onCompleteToday}
        />
    </div>
)
