'use client'

import { Award } from 'lucide-react'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'

import { progressPageTexts } from '@/constants/componentTexts/progress'

export const MilestonesCard = () => {
    const { data } = useCheckInStats('weekly')

    const milestonesAchieved = data?.data
        ?.milestonesAchieved ?? 0

    return (
        <div className={'card-base'}>
            <div className={'flex-start-between'}>
                <div>
                    <p className={'text-muted-foreground label-uppercase'}>
                        {progressPageTexts.stats
                            .milestones.label}
                    </p>
                    <div className={'mt-2 flex items-baseline gap-2'}>
                        <span className={'text-4xl font-bold text-foreground'}>
                            {milestonesAchieved}
                        </span>
                        <span className={'text-lg text-muted-foreground'}>
                            {progressPageTexts.stats
                                .milestones.unit}
                        </span>
                    </div>
                    <p className={'mt-1 text-sm text-muted-foreground'}>
                        {`${progressPageTexts.stats
                            .milestones.nextPrefix} `}
                        <span className={'text-primary font-medium'}>
                            {progressPageTexts.stats
                                .milestones.nextValue}
                        </span>
                    </p>
                </div>
                <div className={'h-12 w-12 rounded-xl bg-purple-50 flex--center'}>
                    <Award className={'h-6 w-6 text-accent'}/>
                </div>
            </div>
        </div>
    )
}
