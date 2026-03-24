import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {PROGRESS_MILESTONES_WITH_ICONS} from '@/constants/progressMaps'
import {
    PROGRESS_MILESTONES_SEE_ALL,
    PROGRESS_MILESTONES_TITLE
} from '@/constants/progressTexts'

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
                    <div
                        key={milestone.title}
                        className={`flex flex-col items-center rounded-xl p-6 text-center ${
                            milestone.achieved ? 
                                'bg-surface-section' :
                                'bg-muted opacity-60'
                        }`}
                    >
                        <div
                            className={`flex size-12 items-center justify-center rounded-xl ${milestone.iconBg}`}
                        >
                            <milestone.icon className={`size-6 ${milestone.iconColor}`}/>
                        </div>
                        <h4 className={'mt-3 font-semibold text-foreground'}>
                            {milestone.title}
                        </h4>
                        <p className={'mt-1 text-sm text-muted-foreground'}>
                            {milestone.description}
                        </p>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)
