import { Goal } from '@/types/goals'

type GoalInfoProps = {
    goal: Goal
}

export const GoalInfo = ({
    goal
}: GoalInfoProps) => (
    <div>
        <h2 className={'text-2xl font-bold'}>
            {goal.title}
        </h2>

        <p className={'text-sm text-foreground/60 mt-2'}>
            {goal.description}
        </p>
    </div>
)
