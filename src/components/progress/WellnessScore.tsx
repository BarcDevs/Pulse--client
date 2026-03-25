import {TrendingUp} from 'lucide-react'

import * as ProgressTexts from '@/constants/progressTexts'

export const WellnessScore = () => (
    <div className={'rounded-2xl bg-surface-card p-6'}>
        <div className={'flex items-center justify-between mb-4'}>
            <div>
                <p className={'text-xs font-medium text-muted-foreground uppercase tracking-wider'}>
                    {ProgressTexts.PROGRESS_WELLNESS_LABEL}
                </p>
                <h3 className={'mt-1 text-xl font-semibold text-foreground'}>
                    {ProgressTexts.PROGRESS_WELLNESS_TITLE}
                </h3>
            </div>
            <span className={'text-xs text-muted-foreground'}>
              {ProgressTexts.PROGRESS_WELLNESS_TIMEFRAME}
          </span>
        </div>

        <div className={'grid grid-cols-2 gap-4'}>
            <div>
                <p className={'text-xs text-muted-foreground uppercase'}>
                  {ProgressTexts.PROGRESS_WELLNESS_MOOD}
                </p>
                <div className={'flex items-baseline gap-1 mt-1'}>
                    <span className={'text-2xl font-bold text-foreground'}>
                      6.2
                    </span>
                    <span className={'text-muted-foreground'}>
                      / 10
                    </span>
                </div>
                <div className={'flex items-center gap-1 mt-1 text-secondary text-sm'}>
                    <TrendingUp className={'h-3 w-3'}/>
                    {ProgressTexts.PROGRESS_WELLNESS_TRENDING_FLAT}
                </div>
            </div>

            <div>
                <p className={'text-xs text-muted-foreground uppercase'}>
                    {ProgressTexts.PROGRESS_WELLNESS_PAIN}
                </p>
                <div className={'flex items-baseline gap-1 mt-1'}>
                    <span className={'text-2xl font-bold text-foreground'}>
                      7.8
                    </span>
                    <span className={'text-muted-foreground'}>
                    / 10
                  </span>
                </div>
                <div className={'flex items-center gap-1 mt-1 text-secondary text-sm'}>
                    <TrendingUp className={'h-3 w-3'}/>
                    {ProgressTexts.PROGRESS_WELLNESS_IMPROVED}
                </div>
            </div>
        </div>
    </div>
)
