'use client'

import { useQueryClient } from '@tanstack/react-query'

import type { CheckIn } from '@/types/checkIn'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'

import { checkInQueryKeys } from '@/constants/queryKeys'

import { CheckInForm } from './forms/CheckInForm'
import { CheckInQuote } from './sections/Quote'

export const CheckInPageContent = () => {
    const queryClient = useQueryClient()
    const latestCheckIn =
        queryClient.getQueryData<CheckIn[]>(checkInQueryKeys.all)?.[0] ?? null
    const { data: stats } = useCheckInStats('weekly')

    return (
        <div className={'space-y-6 p-6'}>
            <CheckInQuote/>
            <CheckInForm
                latestCheckIn={latestCheckIn}
                stats={stats ?? null}
            />
        </div>
    )
}
