import * as InsightsComponentTexts
    from '@/constants/insightsComponentTexts'

export const ObservationCard = () => (
    <div className={'space-y-3'}>
        <div className={'flex items-center gap-2'}>
            <span className={'text-xs font-medium text-muted-foreground uppercase tracking-wider'}>
                {InsightsComponentTexts.INSIGHTS_BEHAVIORAL_PATTERNS_OBSERVATION_LABEL}
            </span>
        </div>
        <h4 className={'text-base font-medium text-foreground'}>
            {InsightsComponentTexts.INSIGHTS_BEHAVIORAL_PATTERNS_OBSERVATION_TITLE}
        </h4>
        <p className={'text-sm text-muted-foreground leading-relaxed'}>
            {InsightsComponentTexts.INSIGHTS_BEHAVIORAL_PATTERNS_OBSERVATION_DESCRIPTION}
        </p>
        <div className={'mt-4'}>
            <div className={'text-3xl font-bold text-foreground'}>
                {InsightsComponentTexts.INSIGHTS_BEHAVIORAL_PATTERNS_OBSERVATION_STAT}
            </div>
            <p className={'text-xs text-muted-foreground'}>
                {InsightsComponentTexts.INSIGHTS_BEHAVIORAL_PATTERNS_OBSERVATION_STAT_LABEL}
            </p>
        </div>
    </div>
)
