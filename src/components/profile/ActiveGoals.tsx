import {GoalProgressBar} from '@/components/shared/GoalProgressBar'
import {Button} from '@/components/ui/button'

import {
    PROFILE_GOALS_LIST,
    PROFILE_GOALS_TITLE,
    PROFILE_GOALS_VIEW_ROADMAP
} from '@/constants/profileTexts'

export const ActiveGoals = () => (
    <div className={'rounded-2xl bg-primary p-6 text-primary-foreground'}>
        <h3 className={'text-lg font-semibold mb-6'}>
            {PROFILE_GOALS_TITLE}
        </h3>

        <div className={'space-y-4'}>
            {PROFILE_GOALS_LIST.map((goal) => (
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
            {PROFILE_GOALS_VIEW_ROADMAP}
        </Button>
    </div>
)
