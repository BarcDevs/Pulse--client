import { insightsPageTexts }
    from '@/constants/componentTexts/insightsComponent'

export const ObservationCard = () => (
    <div className={'space-y-3'}>
        <div className={'flex items-center gap-2'}>
            <span className={'text-xs font-medium text-muted-foreground uppercase tracking-wider'}>
                {insightsPageTexts.behavioralPatterns.observation.label}
            </span>
        </div>
        <h4 className={'text-base font-medium text-foreground'}>
            {insightsPageTexts.behavioralPatterns.observation.title}
        </h4>
        <p className={'text-sm text-muted-foreground leading-relaxed'}>
            {insightsPageTexts.behavioralPatterns.observation.description}
        </p>
        <div className={'mt-4'}>
            <div className={'text-3xl font-bold text-foreground'}>
                {insightsPageTexts.behavioralPatterns.observation.stat}
            </div>
            <p className={'text-xs text-muted-foreground'}>
                {insightsPageTexts.behavioralPatterns.observation.statLabel}
            </p>
        </div>
    </div>
)
