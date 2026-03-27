import {TrendingUp} from 'lucide-react'

import * as InsightsComponentTexts
    from '@/constants/insightsComponentTexts'

export const PredictionCard = () => (
    <div className={'rounded-xl bg-primary p-5 text-primary-foreground'}>
        <span className={'text-xs font-medium uppercase tracking-wider opacity-80'}>
            {InsightsComponentTexts.INSIGHTS_BEHAVIORAL_PATTERNS_PREDICTION_LABEL}
        </span>
        <h4 className={'mt-2 text-base font-medium'}>
            {InsightsComponentTexts.INSIGHTS_BEHAVIORAL_PATTERNS_PREDICTION_TITLE}
        </h4>
        <p className={'mt-2 text-sm opacity-80 leading-relaxed'}>
            {InsightsComponentTexts.INSIGHTS_BEHAVIORAL_PATTERNS_PREDICTION_DESCRIPTION}
        </p>
        <div className={'mt-4 flex items-center gap-2 text-xs'}>
            <TrendingUp className={'h-4 w-4'}/>
            {InsightsComponentTexts.INSIGHTS_BEHAVIORAL_PATTERNS_PREDICTION_CONFIDENCE}
        </div>
    </div>
)
