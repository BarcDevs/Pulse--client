import { useQuery } from '@tanstack/react-query'

import { checkInQueryKeys } from '@/constants/queryKeys'

import { timings } from '@/config/timings'

import { fetchCheckIns } from '@/api/checkIn'

// The guest's latest check-in, polled while its AI insight is pending
export const useGuestResultCheckIn = (enabled: boolean) =>
    useQuery({
        queryKey: [...checkInQueryKeys.all, 'guestResult'],
        queryFn: async () => {
            const [latest] = await fetchCheckIns(1)
            return latest ?? null
        },
        enabled,
        refetchInterval: (query) =>
            query.state.data?.insightsStatus === 'pending'
                ? timings.INSIGHTS_POLL_INTERVAL
                : false
    })
