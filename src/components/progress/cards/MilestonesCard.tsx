import {Award} from 'lucide-react'

import {progressPageTexts} from '@/constants/componentTexts/progress'

export const MilestonesCard = () => (
    <div className={'rounded-2xl bg-surface-card p-6'}>
        <div className={'flex items-start justify-between'}>
            <div>
                <p className={'text-xs font-medium text-muted-foreground uppercase tracking-wider'}>
                    {progressPageTexts.stats.milestones.label}
                </p>
                <div className={'mt-2 flex items-baseline gap-2'}>
                    <span className={'text-4xl font-bold text-foreground'}>
                        5
                    </span>
                    <span className={'text-lg text-muted-foreground'}>
                        {progressPageTexts.stats.milestones.unit}
                    </span>
                </div>
                <p className={'mt-1 text-sm text-muted-foreground'}>
                    {`${progressPageTexts.stats.milestones.nextPrefix} `}
                    <span className={'text-primary font-medium'}>
                        {progressPageTexts.stats.milestones.nextValue}
                    </span>
                </p>
            </div>
            <div className={'h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center'}>
                <Award className={'h-6 w-6 text-accent'}/>
            </div>
        </div>
    </div>
)
