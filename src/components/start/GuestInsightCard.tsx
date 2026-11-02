'use client'

import { useTranslations } from 'next-intl'

import type { CheckIn } from '@/types/checkIn'

import { Card } from '@/components/shared/cards/Card'

import { getDisplayInsights } from '@/lib/insights/getLatestInsights'

import { startLocales } from '@/locales/startLocales'

type GuestInsightCardProps = {
    checkIn: CheckIn | null | undefined
}

export const GuestInsightCard = ({
    checkIn
}: GuestInsightCardProps) => {
    const t = useTranslations()
    const insights = getDisplayInsights(checkIn?.insights)
    const isPending = !checkIn || checkIn.insightsStatus === 'pending'

    return (
        <Card className={'space-y-3 p-6'}>
            {insights.map((insight) => (
                <div key={insight.id}>
                    <h2 className={'font-semibold text-foreground'}>
                        {insight.title}
                    </h2>
                    <p className={'text-muted-foreground'}>
                        {insight.content}
                    </p>
                </div>
            ))}
            {!insights.length && (
                <p className={'text-muted-foreground'}>
                    {t(
                        isPending
                            ? startLocales.result.insightPending
                            : startLocales.result.insightEmpty
                    )}
                </p>
            )}
        </Card>
    )
}
