'use client'

import { useTranslations } from 'next-intl'

import type { CheckIn } from '@/types/checkIn'

import { wellnessColors } from '@/lib/wellnessColors'

import { checkInLocales } from '@/locales/checkInLocales'

import { GuestPointChart } from './GuestPointChart'

type GuestResultChartsProps = {
    checkIn: CheckIn
}

// A guest has one check-in and no history, so each chart is a single point
export const GuestResultCharts = ({
    checkIn
}: GuestResultChartsProps) => {
    const t = useTranslations()

    return (
        <div className={'grid gap-4 md:grid-cols-2 md:gap-5'}>
            <GuestPointChart
                name={t(checkInLocales.mood.label)}
                value={checkIn.moodScore}
                color={wellnessColors.mood.primary}
            />
            <GuestPointChart
                name={t(checkInLocales.pain.label)}
                value={checkIn.painLevel}
                color={wellnessColors.pain.primary}
            />
        </div>
    )
}
