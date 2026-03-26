import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {PROGRESS_MILESTONES_WITH_ICONS}
    from '@/constants/progressMaps'
import {
    PROGRESS_MILESTONES_SEE_ALL,
    PROGRESS_MILESTONES_TITLE
} from '@/constants/progressTexts'

import {MilestoneCard} from './MilestoneCard'

export const ProgressMilestones = () => (
    <Card className={'mt-6 border-0 shadow-sm'}>
        <CardHeader className={'flex flex-row items-center justify-between'}>
            <CardTitle className={'text-lg font-semibold'}>
                {PROGRESS_MILESTONES_TITLE}
            </CardTitle>
            <span className={'text-sm text-muted-foreground'}>
                {PROGRESS_MILESTONES_SEE_ALL}
            </span>
        </CardHeader>
        <CardContent>
            <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
                {PROGRESS_MILESTONES_WITH_ICONS.map((milestone) => (
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
