import { insightsDetail }
    from '@/constants/componentTexts/insightsDetail'

export const ObservationCard = () => (
    <div className={'rounded-xl bg-surface-section p-4'}>
        <p className={'label-uppercase text-muted-foreground'}>
            {insightsDetail.patterns.observation.label}
        </p>
        <h4 className={'mt-1 font-semibold text-foreground'}>
            {insightsDetail.patterns.observation.title}
        </h4>
        <p className={'mt-2 text-sm text-muted-foreground'}>
            {insightsDetail.patterns.observation.description}
        </p>
        <div className={'mt-4'}>
            <div className={'text-3xl font-bold text-primary'}>
                {insightsDetail.patterns.observation.successValue}
            </div>
            <p className={'text-xs text-muted-foreground'}>
                {insightsDetail.patterns.observation.successLabel}
            </p>
        </div>
    </div>
)
