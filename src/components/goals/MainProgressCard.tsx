import { Goal } from '@/types/goals'

import { Badge } from '@/components/ui/badge'

import { GoalActionButtons } from './GoalActionButtons'
import { GoalProgressRing } from './GoalProgressRing'

type MainProgressCardProps = {
    goal: Goal
    overallPercentage: number
    badge: string
    onCompleteToday?: () => void
    onEditPlan?: () => void
}

export const MainProgressCard = ({
    goal,
    overallPercentage,
    badge,
    onCompleteToday,
    onEditPlan
}: MainProgressCardProps) => (
    <div className={'md:col-span-8 bg-white rounded-xl overflow-hidden'}>
        <div className={'flex flex-col md:flex-row gap-0'}>
            <div className={'md:w-48 flex items-center justify-center p-8 bg-white'}>
                <GoalProgressRing percentage={overallPercentage}/>
            </div>

            <div className={'flex-1 p-8 flex flex-col gap-4 text-foreground'}>
                <Badge variant={'secondary'}>
                    {badge}
                </Badge>

                <div>
                    <h2 className={'text-2xl font-bold'}>
                        {goal.title}
                    </h2>

                    <p className={'text-sm text-foreground/60 mt-2'}>
                        {goal.description}
                    </p>
                </div>

                <GoalActionButtons
                    onCompleteToday={onCompleteToday}
                    onEditPlan={onEditPlan}
                />
            </div>
        </div>
    </div>
)
