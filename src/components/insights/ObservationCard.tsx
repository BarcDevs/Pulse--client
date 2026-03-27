import * as InsightsDetailTexts from '@/constants/insightsDetailTexts'

export const ObservationCard = () => (
    <div className={'rounded-xl bg-surface-section p-4'}>
        <p className={'text-xs font-medium uppercase tracking-wider text-muted-foreground'}>
            {InsightsDetailTexts.INSIGHTS_PATTERNS_OBSERVATION_LABEL}
        </p>
        <h4 className={'mt-1 font-semibold text-foreground'}>
            {InsightsDetailTexts.INSIGHTS_PATTERNS_OBSERVATION_TITLE}
        </h4>
        <p className={'mt-2 text-sm text-muted-foreground'}>
            {InsightsDetailTexts.INSIGHTS_PATTERNS_OBSERVATION_DESCRIPTION}
        </p>
        <div className={'mt-4'}>
            <div className={'text-3xl font-bold text-primary'}>
                {InsightsDetailTexts.INSIGHTS_PATTERNS_OBSERVATION_SUCCESS_VALUE}
            </div>
            <p className={'text-xs text-muted-foreground'}>
                {InsightsDetailTexts.INSIGHTS_PATTERNS_OBSERVATION_SUCCESS_LABEL}
            </p>
        </div>
    </div>
)
