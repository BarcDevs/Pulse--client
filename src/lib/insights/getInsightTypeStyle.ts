import type { CheckInInsightType } from '@/types/checkIn'

const neutralStyle = 'border-feedback-neutral bg-feedback-neutral/10'

const insightTypeStyles: Record<CheckInInsightType, string> = {
    MOTIVATIONAL: 'border-feedback-motivational bg-feedback-motivational/10',
    MOOD_DROP_ALERT: 'border-feedback-alert bg-feedback-alert/10',
    WEEKLY_SUMMARY: 'border-feedback-summary bg-feedback-summary/10',
    BAD_DAY_SUPPORT: 'border-feedback-support bg-feedback-support/10'
}

export const getInsightTypeStyle = (
    type: CheckInInsightType
) => insightTypeStyles[type] ?? neutralStyle
