import {Calendar} from 'lucide-react'

import {progressPageTexts} from '@/constants/componentTexts/progress'

export const StreakCard = () => (
    <div className={'rounded-2xl bg-surface-card p-6'}>
        <div className={'flex items-start justify-between'}>
            <div>
                <p className={'text-xs font-medium text-muted-foreground uppercase tracking-wider'}>
                    {progressPageTexts.stats.streak.label}
                </p>
                <div className={'mt-2 flex items-baseline gap-2'}>
                    <span className={'text-4xl font-bold text-foreground'}>
                        12
                    </span>
                    <span className={'text-lg text-muted-foreground'}>
                        {progressPageTexts.stats.streak.unit}
                    </span>
                </div>
                <p className={'mt-1 text-sm text-muted-foreground'}>
                    {`${progressPageTexts.stats.streak.bestPrefix} `}
                    <span className={'text-secondary font-medium'}>
                        {progressPageTexts.stats.streak.bestValue}
                    </span>
                </p>
            </div>
            <div className={'h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center'}>
                <Calendar className={'h-6 w-6 text-warning'}/>
            </div>
        </div>
    </div>
)
