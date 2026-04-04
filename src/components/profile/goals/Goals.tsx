import { GoalProgressBar } from '@/components/shared/bars/GoalProgressBar'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { profilePageTexts } from '@/constants/componentTexts/profile'

const goals = profilePageTexts.goals.list

export const ProfileGoals = () => {
    return (
        <Card className={'border-0 bg-primary text-white shadow-sm'}>
            <CardHeader>
                <CardTitle className={'text-lg font-semibold text-white'}>
                    {profilePageTexts.goals.title}
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
                    {profilePageTexts.goals.viewRoadmap}
                </Button>
            </CardContent>
        </Card>
    )
}
