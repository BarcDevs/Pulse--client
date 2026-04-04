import { GoalProgressBar } from '@/components/shared/bars/GoalProgressBar'
import { Button } from '@/components/ui/button'

import { profilePageTexts } from '@/constants/componentTexts/profile'

export const ActiveGoals = () => (
    <div className={'rounded-2xl bg-primary p-6 text-primary-foreground'}>
        <h3 className={'text-lg font-semibold mb-6'}>
            {profilePageTexts.goals.title}
        </h3>

        <div className={'space-y-4'}>
            {profilePageTexts.goals.list.map((goal) => (
                <GoalProgressBar
                    key={goal.label}
                    label={goal.label}
                    progress={goal.progress}
                    variant={'white'}
                />
            ))}
        </div>

        <Button
            variant={'secondary'}
            className={'w-full mt-6 bg-white/20 hover:bg-white/30 text-primary-foreground border-0'}
        >
            {profilePageTexts.goals.viewRoadmap}
        </Button>
    </div>
)
