import { GoalProgressBar } from '@/components/shared/GoalProgressBar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
    PROFILE_GOALS_LIST,
    PROFILE_GOALS_TITLE,
    PROFILE_GOALS_VIEW_ROADMAP,
} from '@/constants/profileTexts'

const goals = PROFILE_GOALS_LIST

export const ProfileGoals = () => {
    return (
        <Card className={'border-0 bg-primary text-white shadow-sm'}>
            <CardHeader>
                <CardTitle className={'text-lg font-semibold text-white'}>
                    {PROFILE_GOALS_TITLE}
                </CardTitle>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                {goals.map((goal) => (
                    <GoalProgressBar
                        key={goal.label}
                        label={goal.label}
                        progress={goal.progress}
                        variant={'white'}
                    />
                ))}

                <Button
                    variant={'outline'}
                    className={
                        'mt-4 w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white'
                    }
                >
                    {PROFILE_GOALS_VIEW_ROADMAP}
                </Button>
            </CardContent>
        </Card>
    )
}
