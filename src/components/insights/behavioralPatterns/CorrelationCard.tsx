import { ArrowUpRight } from 'lucide-react'

import { insightsPageTexts }
    from '@/constants/componentTexts/insightsComponent'

const CORRELATION_HEIGHTS = [40, 65, 50, 80, 45, 70, 55]

export const CorrelationCard = () => (
    <div className={'space-y-3'}>
        <div className={'flex items-center gap-2'}>
            <span className={'text-xs font-medium text-muted-foreground uppercase tracking-wider'}>
                {insightsPageTexts.behavioralPatterns.correlation.label}
            </span>
            <ArrowUpRight className={'h-3 w-3 text-muted-foreground'}/>
        </div>
        <h4 className={'text-base font-medium text-foreground'}>
            {insightsPageTexts.behavioralPatterns.correlation.title}
        </h4>
        <p className={'text-sm text-muted-foreground leading-relaxed'}>
            {insightsPageTexts.behavioralPatterns.correlation.description}
        </p>
        <div className={'flex items-end gap-1 h-12 mt-2'}>
            {CORRELATION_HEIGHTS.map((height) => (
                <div
                    key={height}
                    className={'flex-1 bg-primary/20 rounded-t'}
                    style={{ height: `${height}%` }}
                />
            ))}
        </div>
    </div>
)
