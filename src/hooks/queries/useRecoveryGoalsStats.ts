import type { RecoveryGoalsStats } from '@/types/goals'

import { useQueryWithNetworkError }
    from '@/hooks/useQueryWithNetworkError'

import { recoveryGoalsQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { fetchRecoveryGoalsStats } from '@/api/goals'

export const useRecoveryGoalsStats = () => {
    return useQueryWithNetworkError<RecoveryGoalsStats>({
        queryKey: recoveryGoalsQueryKeys.stats,
        queryFn: fetchRecoveryGoalsStats,
        staleTime: 10 * minuteInMs,
        // Goals stats are UI-supplementary (milestones count on share card);
        // fail fast without retries
        retry: false
    })
}
