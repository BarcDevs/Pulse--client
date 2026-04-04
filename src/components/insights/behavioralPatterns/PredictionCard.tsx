import { TrendingUp } from 'lucide-react'

import { insightsPageTexts }
    from '@/constants/componentTexts/insightsComponent'

export const PredictionCard = () => (
    <div className={'rounded-xl bg-primary p-5 text-primary-foreground'}>
        <span className={'text-xs font-medium uppercase tracking-wider opacity-80'}>
            {insightsPageTexts.behavioralPatterns.prediction.label}
        </span>
        <h4 className={'mt-2 text-base font-medium'}>
            {insightsPageTexts.behavioralPatterns.prediction.title}
        </h4>
        <p className={'mt-2 text-sm opacity-80 leading-relaxed'}>
            {insightsPageTexts.behavioralPatterns.prediction.description}
        </p>
        <div className={'mt-4 flex items-center gap-2 text-xs'}>
            <TrendingUp className={'h-4 w-4'}/>
            {insightsPageTexts.behavioralPatterns.prediction.confidence}
        </div>
    </div>
)
