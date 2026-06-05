import { useTranslations } from 'next-intl'

import type { TodayObservationResponse } from '@/types/insight'

import { dashboardLocales } from '@/locales/dashboardLocales'

import { DailyObservationSkeletons } from './DailyObservationSkeletons'

type DailyObservationProps = {
    isLoading: boolean
    observation?: TodayObservationResponse | null
    activityLabel?: string | null
}

export const DailyObservationContent = ({
    isLoading,
    observation,
    activityLabel
}: DailyObservationProps) => {
    const t = useTranslations()

    if (isLoading)
        return <DailyObservationSkeletons/>

    const mainText = observation?.observation ?? (
        activityLabel
            ? t(dashboardLocales.dailyObservation.observation, {
                activity: activityLabel
            }) : t(dashboardLocales.dailyObservation.description)
    )

    const subText = observation?.supportiveDescription ?? (
        activityLabel
            ? t(dashboardLocales.dailyObservation.supportCopy)
            : null
    )

    return (
        <>
            <p className={'text-xl font-bold text-foreground leading-snug'}>
                {mainText}
            </p>
            {subText && (
                <p className={'mt-3 text-sm text-muted-foreground'}>
                    {subText}
                </p>
            )}
        </>
    )
}
