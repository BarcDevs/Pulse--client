import type { CSSProperties } from 'react'

import type { CheckInInsightType } from '@/types/checkIn'

const neutralStyle = 'border-feedback-neutral bg-feedback-neutral/10'
const neutralDialogStyle = 'border-s-4 border-feedback-neutral'
const neutralColorVar = 'var(--feedback-neutral)'

const insightTypeStyles: Record<CheckInInsightType, string> = {
    MOTIVATIONAL: 'border-feedback-motivational bg-feedback-motivational/10',
    MOOD_DROP_ALERT: 'border-feedback-alert bg-feedback-alert/10',
    WEEKLY_SUMMARY: 'border-feedback-summary bg-feedback-summary/10',
    BAD_DAY_SUPPORT: 'border-feedback-support bg-feedback-support/10'
}

const insightTypeDialogStyles: Record<CheckInInsightType, string> = {
    MOTIVATIONAL: 'border-s-4 border-feedback-motivational',
    MOOD_DROP_ALERT: 'border-s-4 border-feedback-alert',
    WEEKLY_SUMMARY: 'border-s-4 border-feedback-summary',
    BAD_DAY_SUPPORT: 'border-s-4 border-feedback-support'
}

const insightTypeColorVars: Record<CheckInInsightType, string> = {
    MOTIVATIONAL: 'var(--feedback-motivational)',
    MOOD_DROP_ALERT: 'var(--feedback-alert)',
    WEEKLY_SUMMARY: 'var(--feedback-summary)',
    BAD_DAY_SUPPORT: 'var(--feedback-support)'
}

export const getInsightTypeStyle = (
    type: CheckInInsightType
) => insightTypeStyles[type] ?? neutralStyle

export const getInsightDialogStyle = (
    type: CheckInInsightType
) => insightTypeDialogStyles[type] ?? neutralDialogStyle

export const getInsightToastStyle = (
    type: CheckInInsightType
): CSSProperties => {
    const color = insightTypeColorVars[type] ?? neutralColorVar

    return {
        '--normal-border': color,
        '--normal-bg': `color-mix(in srgb, ${color} 10%, var(--popover))`,
        borderInlineStartWidth: 4
    } as CSSProperties
}
