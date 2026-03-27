import {Award} from 'lucide-react'

import * as ProgressTexts from '@/constants/progressTexts'

export const MilestonesCard = () => (
    <div className={'rounded-2xl bg-surface-card p-6'}>
        <div className={'flex items-start justify-between'}>
            <div>
                <p className={'text-xs font-medium text-muted-foreground uppercase tracking-wider'}>
                    {ProgressTexts.PROGRESS_STATS_MILESTONES_LABEL}
                </p>
                <div className={'mt-2 flex items-baseline gap-2'}>
                    <span className={'text-4xl font-bold text-foreground'}>
                        5
                    </span>
                    <span className={'text-lg text-muted-foreground'}>
                        {ProgressTexts.PROGRESS_STATS_MILESTONES_UNIT}
                    </span>
                </div>
                <p className={'mt-1 text-sm text-muted-foreground'}>
                    {`${ProgressTexts.PROGRESS_STATS_MILESTONES_NEXT_PREFIX} `}
                    <span className={'text-primary font-medium'}>
                        {ProgressTexts.PROGRESS_STATS_MILESTONES_NEXT_VALUE}
                    </span>
                </p>
            </div>
            <div className={'h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center'}>
                <Award className={'h-6 w-6 text-accent'}/>
            </div>
        </div>
    </div>
)
