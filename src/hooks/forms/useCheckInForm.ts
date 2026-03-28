import {useMemo} from 'react'

import {useForm, useWatch} from 'react-hook-form'

import {zodResolver} from '@hookform/resolvers/zod'

import {CheckIn, CheckInStats} from '@/types/checkIn/checkIn'

import {isTodayCheckIn} from '@/lib/checkIn/loaderHelpers'

import {checkInFormSchema} from '@/config/schema/checkInForm'

import {
    CheckInSchema,
    checkInSchema
} from '@/validations/forms/checkInSchema'

const {
    moodScore: moodConfig,
    painLevel: painConfig
} = checkInFormSchema

type UseCheckInFormProps = {
    latestCheckIn: CheckIn | null
    stats: CheckInStats | null
}

export const useCheckInForm = ({
    latestCheckIn,
    stats
}: UseCheckInFormProps) => {
    const isTodayCheckInExists =
        latestCheckIn ? isTodayCheckIn(latestCheckIn) : false

    const topActivities = useMemo(
        () => stats?.topActivities ?? [],
        [stats]
    )

    const form = useForm<CheckInSchema>({
        resolver: zodResolver(checkInSchema),
        defaultValues: isTodayCheckInExists && latestCheckIn ? {
            moodScore: latestCheckIn.moodScore,
            painLevel: latestCheckIn.painLevel,
            activities: latestCheckIn.activities,
            notes: latestCheckIn.notes ?? ''
        } : {
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
                !selectedActivities?.includes(activity)
        ),
        [topActivities, selectedActivities]
    )

    const handleAddActivity = (activity: string) => {
        const currentActivities =
            form.getValues('activities')
        if (!currentActivities.includes(activity)) {
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
