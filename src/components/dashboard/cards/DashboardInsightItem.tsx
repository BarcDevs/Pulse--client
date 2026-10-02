'use client'

import { useTranslations } from 'next-intl'

import type { CheckInInsight } from '@/types/checkIn'

import { TextButton } from '@/components/shared/buttons/TextButton'

import { getInsightTypeStyle } from '@/lib/insights/getInsightTypeStyle'
import { cn } from '@/lib/utils'

import { checkInLocales } from '@/locales/checkInLocales'

type DashboardInsightItemProps = {
    insight: CheckInInsight
    onShowFullAction: () => void
}

export const DashboardInsightItem = ({
    insight,
    onShowFullAction
}: DashboardInsightItemProps) => {
    const t = useTranslations()

    return (
        <div className={cn(
            'space-y-2 rounded-md border-s-4 p-3',
            getInsightTypeStyle(insight.type)
        )}
        >
            <p className={'text-xs font-medium text-muted-foreground'}>
                {insight.title}
            </p>
            <blockquote className={'italic text-foreground text-sm line-clamp-3 px-1'}>
                {insight.content}
            </blockquote>
            <TextButton onClick={onShowFullAction}>
                {t(checkInLocales.insightToast.showInFull)}
            </TextButton>
        </div>
    )
}
