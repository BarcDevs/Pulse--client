import {progressPageTexts} from '@/constants/componentTexts/progress'

import {WellnessScoreCard} from '../cards/WellnessScoreCard'

export const WellnessScore = () => (
    <div className={'rounded-2xl bg-surface-card p-6'}>
        <div className={'flex items-center justify-between mb-4'}>
            <div>
                <p className={'text-xs font-medium text-muted-foreground uppercase tracking-wider'}>
                    {progressPageTexts.wellness.label}
                </p>
                <h3 className={'mt-1 text-xl font-semibold text-foreground'}>
                    {progressPageTexts.wellness.title}
                </h3>
            </div>
            <span className={'text-xs text-muted-foreground'}>
              {progressPageTexts.wellness.timeframe}
          </span>
        </div>

        <div className={'grid grid-cols-2 gap-4'}>
            <WellnessScoreCard
                label={progressPageTexts.wellness.mood}
                score={6.2}
                trend={progressPageTexts.wellness.trendingFlat}
            />
            <WellnessScoreCard
                label={progressPageTexts.wellness.pain}
                score={7.8}
                trend={progressPageTexts.wellness.improved}
            />
        </div>
    </div>
)
