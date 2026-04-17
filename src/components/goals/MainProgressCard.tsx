import { MainGoalCard as MainGoalCardType } from '@/types/goals'

import { Badge } from '@/components/ui/badge'

import { GoalActionButtons } from './GoalActionButtons'
import { GoalProgressRing } from './GoalProgressRing'

type MainProgressCardProps = {
    data: MainGoalCardType
    onCompleteToday?: () => void
    onEditPlan?: () => void
}

export const MainProgressCard = ({
    data,
    onCompleteToday,
    onEditPlan
}: MainProgressCardProps) => (
    <div className={'md:col-span-8 bg-white rounded-xl overflow-hidden'}>
        <div className={'flex flex-col md:flex-row gap-0'}>
            <div className={'md:w-48 flex items-center justify-center p-8 bg-white'}>
                <GoalProgressRing
                    percentage={data.overallPercentage}
                />
            </div>

            <div className={'flex-1 p-8 flex flex-col gap-4 text-foreground'}>
                <Badge variant={'secondary'}>
                    {data.badge}
                </Badge>

                <div>
                    <h2 className={'text-2xl font-bold'}>
                        {data.title}
                    </h2>

                    <p className={'text-sm text-foreground/60 mt-2'}>
                        {data.description}
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
