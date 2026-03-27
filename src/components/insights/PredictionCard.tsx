import {Badge} from '@/components/ui/badge'

import * as InsightsDetailTexts
        from '@/constants/insightsDetailTexts'

export const PredictionCard = () => (
    <div className={'rounded-xl bg-primary p-4 text-white'}>
        <p className={'text-xs font-medium uppercase tracking-wider opacity-80'}>
            {InsightsDetailTexts.INSIGHTS_PATTERNS_PREDICTION_LABEL}
        </p>
        <h4 className={'mt-1 font-semibold'}>
            {InsightsDetailTexts.INSIGHTS_PATTERNS_PREDICTION_TITLE}
        </h4>
        <p className={'mt-2 text-sm opacity-90'}>
            {InsightsDetailTexts.INSIGHTS_PATTERNS_PREDICTION_DESCRIPTION}
        </p>
        <Badge className={'mt-4 border-0 bg-white/20 text-white'}>
            {InsightsDetailTexts.INSIGHTS_PATTERNS_PREDICTION_BADGE}
        </Badge>
    </div>
)
