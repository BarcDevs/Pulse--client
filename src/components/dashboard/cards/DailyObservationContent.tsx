import { useTranslations } from 'next-intl'

import type { TodayObservationResponse } from '@/types/insight'

import { dashboardLocales } from '@/locales/dashboardLocales'

import { DailyObservationSkeletons } from './DailyObservationSkeletons'

type Props = {
    isLoading: boolean
    observation: TodayObservationResponse | null | undefined
    activityLabel: string | null
}

export const DailyObservationContent = ({
    isLoading,
    observation,
    activityLabel
}: Props) => {
    const t = useTranslations()

    if (isLoading) return <DailyObservationSkeletons/>

    if (observation) return (
        <>
            <p className={'text-xl font-bold text-foreground leading-snug'}>
                {observation.observation}
            </p>
            {observation.supportiveDescription && (
                <p className={'mt-3 text-sm text-muted-foreground'}>
                    {observation.supportiveDescription}
                </p>
            )}
        </>
    )

    if (activityLabel) return (
        <>
            <p className={'text-xl font-bold text-foreground leading-snug'}>
                {t(dashboardLocales.dailyObservation.observation, { activity: activityLabel })}
            </p>
            <p className={'mt-3 text-sm text-muted-foreground'}>
                {t(dashboardLocales.dailyObservation.supportCopy)}
            </p>
        </>
    )

    return (
        <p className={'text-xl font-bold text-foreground leading-snug'}>
            {t(dashboardLocales.dailyObservation.description)}
        </p>
    )
}
