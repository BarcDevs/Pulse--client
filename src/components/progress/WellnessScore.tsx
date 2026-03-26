import * as ProgressTexts from '@/constants/progressTexts'

import {WellnessScoreCard} from './WellnessScoreCard'

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
            <WellnessScoreCard
                label={ProgressTexts.PROGRESS_WELLNESS_MOOD}
                score={6.2}
                trend={ProgressTexts.PROGRESS_WELLNESS_TRENDING_FLAT}
            />
            <WellnessScoreCard
                label={ProgressTexts.PROGRESS_WELLNESS_PAIN}
                score={7.8}
                trend={ProgressTexts.PROGRESS_WELLNESS_IMPROVED}
            />
        </div>
    </div>
)
