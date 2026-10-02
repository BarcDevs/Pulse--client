'use client'

import { useTranslations } from 'next-intl'

import type { CheckInInsight } from '@/types/checkIn'

import { TextButton } from '@/components/shared/buttons/TextButton'

import { getInsightTypeStyle } from '@/lib/insights/getInsightTypeStyle'
import { cn } from '@/lib/utils'

import { useCheckIn } from '@/context/CheckInContext'

import { checkInLocales } from '@/locales/checkInLocales'

type DashboardInsightItemProps = {
    insight: CheckInInsight
}

export const DashboardInsightItem = ({
    insight
}: DashboardInsightItemProps) => {
    const t = useTranslations()
    const { showInsight } = useCheckIn()

    return (
        <div className={cn(
            'space-y-2 rounded-md border-s-4 p-3',
            getInsightTypeStyle(insight.type)
        )}
        >
            <p className={'text-xs font-medium text-muted-foreground'}>
                {insight.title}
            </p>
            <blockquote className={'italic text-foreground text-sm line-clamp-3'}>
                {insight.content}
            </blockquote>
            <TextButton onClick={() => showInsight(insight)}>
                {t(checkInLocales.insightToast.showInFull)}
            </TextButton>
        </div>
    )
}
