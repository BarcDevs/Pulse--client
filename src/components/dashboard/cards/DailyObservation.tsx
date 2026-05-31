'use client'

import { useTranslations } from 'next-intl'

import { Activity } from 'lucide-react'

import { RetryButton } from '@/components/shared/ui/RetryButton'
import {
    Card,
    CardContent,
    CardHeader
} from '@/components/ui/card'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'
import { useDailyObservation } from '@/hooks/queries/useDailyObservation'

import { observationIconMap } from '@/constants/mappings/dashboard'

import { DEFAULT_ACTIVITIES } from '@/config/defaultActivities'

import { checkInLocales } from '@/locales/checkInLocales'
import { dashboardLocales } from '@/locales/dashboardLocales'

import { DailyObservationContent } from './DailyObservationContent'

export const DashboardDailyObservation = () => {
    const t = useTranslations()
    const {
        data: observation,
        isLoading: observationLoading,
        refetch: refetchObservation
    } = useDailyObservation()
    const {
        data: stats,
        isLoading: statsLoading
    } = useCheckInStats('weekly')

    const isLoading = observationLoading || statsLoading

    const rawActivity = stats?.topActivities?.[0]
    const matchedActivity = DEFAULT_ACTIVITIES.find(
        (a) => a.toLowerCase() === rawActivity?.toLowerCase()
    ) ?? null

    const activityLabels =
        t.raw(checkInLocales.activities.default) as Record<string, string>
    const activityLabel = matchedActivity
        ? activityLabels[matchedActivity] ?? matchedActivity
        : null

    const Icon = observation
        ? observationIconMap[observation.type]
        : Activity

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader className={'pb-2'}>
                <div className={'flex items-start justify-between gap-3'}>
                    <div>
                        <h4 className={'text-base font-semibold text-foreground leading-snug'}>
                            {t(dashboardLocales.dailyObservation.title)}
                        </h4>
                        <p className={'mt-0.5 text-xs font-medium tracking-widest text-muted-foreground uppercase'}>
                            {t(dashboardLocales.dailyObservation.label)}
                        </p>
                    </div>
                    <div className={'flex--center size-10 shrink-0 rounded-xl bg-primary-light'}>
                        <Icon className={'size-5 text-primary'}/>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <DailyObservationContent
                    isLoading={isLoading}
                    observation={observation}
                    activityLabel={activityLabel}
                />
                {!isLoading && !observation && (
                    <RetryButton onClick={refetchObservation}/>
                )}
            </CardContent>
        </Card>
    )
}
