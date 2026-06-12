import { useMemo } from 'react'

import { useTranslations } from 'next-intl'

import { useForm, useWatch } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { CheckIn, CheckInStats } from '@/types/checkIn'

import { isTodayCheckIn } from '@/lib/checkIn/loaderHelpers'

import { checkInFormSchema } from '@/config/schema/checkInForm'

import {
    type CheckInSchema,
    createCheckInSchema
} from '@/validations/forms/checkInSchema'

const {
    moodScore: moodConfig,
    painLevel: painConfig
} = checkInFormSchema

type UseCheckInFormProps = {
    latestCheckIn: CheckIn | null
    stats: CheckInStats | null
    timezone?: string
}

export const useCheckInForm = ({
    latestCheckIn,
    stats,
    timezone
}: UseCheckInFormProps) => {
    const t = useTranslations()
    const isTodayCheckInExists =
        latestCheckIn
            ? isTodayCheckIn(latestCheckIn, timezone)
            : false

    const topActivities = useMemo(
        () => stats?.topActivities ?? [],
        [stats]
    )

    const form = useForm<CheckInSchema>({
        resolver: zodResolver(
            createCheckInSchema(t)
        ),
        defaultValues:
            isTodayCheckInExists
            && latestCheckIn
                ? {
                    moodScore:
                        latestCheckIn.moodScore,
                    painLevel:
                        latestCheckIn.painLevel,
                    activities:
                        latestCheckIn.activities,
                    notes:
                        latestCheckIn.notes ?? ''
                }
                : {
                    moodScore: moodConfig.min,
                    painLevel: painConfig.min,
                    activities: [],
                    notes: ''
                }
    })

    const selectedActivities = useWatch({
        control: form.control,
        name: 'activities'
    })

    const suggestedActivities = useMemo(
        () => topActivities.filter(
            activity =>
                !selectedActivities?.includes(
                    activity
                )
        ),
        [topActivities, selectedActivities]
    )

    const handleAddActivity = (
        activity: string
    ) => {
        const currentActivities =
            form.getValues('activities')
        if (
            !currentActivities.includes(
                activity
            )
        ) {
            form.setValue(
                'activities',
                [...currentActivities, activity]
            )
        }
    }

    return {
        form,
        isTodayCheckInExists,
        suggestedActivities,
        handleAddActivity
    }
}
