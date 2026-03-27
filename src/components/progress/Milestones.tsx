import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {progressPageTexts} from '@/constants/componentTexts/progress'
import {progressMilestones}
    from '@/constants/progressMaps'

import {MilestoneCard} from './MilestoneCard'

export const ProgressMilestones = () => (
    <Card className={'mt-6 border-0 shadow-sm'}>
        <CardHeader className={'flex flex-row items-center justify-between'}>
            <CardTitle className={'text-lg font-semibold'}>
                {progressPageTexts.milestones.title}
            </CardTitle>
            <span className={'text-sm text-muted-foreground'}>
                {progressPageTexts.milestones.seeAll}
            </span>
        </CardHeader>
        <CardContent>
            <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
                {progressMilestones.map((milestone) => (
                    <MilestoneCard
                        key={milestone.title}
                        icon={milestone.icon}
                        title={milestone.title}
                        description={milestone.description}
                        achieved={milestone.achieved}
                        iconBg={milestone.iconBg}
                        iconColor={milestone.iconColor}
                    />
                ))}
            </div>
        </CardContent>
    </Card>
)
