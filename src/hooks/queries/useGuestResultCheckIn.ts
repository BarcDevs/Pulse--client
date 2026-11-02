import { useRef } from 'react'

import { useQuery } from '@tanstack/react-query'

import { checkInQueryKeys } from '@/constants/queryKeys'

import { timings } from '@/config/timings'

import { fetchCheckIns } from '@/api/checkIn'

// The guest's latest check-in, polled while its AI insight is pending and
// given up on after the same timeout the signed-in flow uses
export const useGuestResultCheckIn = (enabled: boolean) => {
    const startedAtRef = useRef<number | null>(null)

    return useQuery({
        queryKey: checkInQueryKeys.guestResult,
        queryFn: async () => {
            const [latest] = await fetchCheckIns(1)
            return latest ?? null
        },
        enabled,
        refetchInterval: (query) => {
            if (query.state.data?.insightsStatus !== 'pending') {
                startedAtRef.current = null
                return false
            }
            startedAtRef.current ??= Date.now()

            return Date.now() - startedAtRef.current
            >= timings.INSIGHTS_POLL_TIMEOUT
                ? false
                : timings.INSIGHTS_POLL_INTERVAL
        }
    })
}
