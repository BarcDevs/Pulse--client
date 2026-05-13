import type { ProfileOptions } from '@/types/profile'

import { useQueryWithNetworkError } from '@/hooks/useQueryWithNetworkError'

import { profileQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

import { getProfileOptions } from '@/api/profile'

export const useProfileOptions = () => {
    const query = useQueryWithNetworkError<ProfileOptions>({
        queryKey: profileQueryKeys.options,
        queryFn: getProfileOptions,
        staleTime: 30 * minuteInMs,
        retry: false
    })

    return {
        options: query.data ?? null,
        isLoading: query.isLoading,
        isError: query.isError
    }
}
