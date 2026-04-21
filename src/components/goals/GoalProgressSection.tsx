import { GoalProgressRing } from './GoalProgressRing'

type GoalProgressSectionProps = {
    percentage: number
}

export const GoalProgressSection = ({
    percentage
}: GoalProgressSectionProps) => (
    <div className={'md:w-48 flex items-center justify-center p-8 bg-white'}>
        <GoalProgressRing percentage={percentage} />
    </div>
)
