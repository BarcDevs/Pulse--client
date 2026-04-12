import { Badge } from '@/components/ui/badge'

import { insightsDetail }
    from '@/constants/componentTexts/insightsDetail'

export const PredictionCard = () => (
    <div className={'rounded-xl bg-primary p-4 text-white'}>
        <p className={'label-uppercase opacity-80'}>
            {insightsDetail.patterns.prediction.label}
        </p>
        <h4 className={'mt-1 font-semibold'}>
            {insightsDetail.patterns.prediction.title}
        </h4>
        <p className={'mt-2 text-sm opacity-90'}>
            {insightsDetail.patterns.prediction.description}
        </p>
        <Badge className={'mt-4 border-0 bg-white/20 text-white'}>
            {insightsDetail.patterns.prediction.badge}
        </Badge>
    </div>
)
