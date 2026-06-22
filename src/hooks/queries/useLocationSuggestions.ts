import { useQuery } from '@tanstack/react-query'

import { useDebounce } from '@/hooks/useDebounce'

import { searchLocations } from '@/lib/location/searchLocations'

import { locationQueryKeys } from '@/constants/queryKeys'
import { minuteInMs } from '@/constants/time'

const MIN_QUERY_LENGTH = 3

export const useLocationSuggestions = (query: string) => {
    const debouncedQuery = useDebounce(query, 400)
    const trimmed = debouncedQuery.trim()

    return useQuery({
        queryKey: locationQueryKeys.suggestions(trimmed),
        queryFn: ({ signal }) => searchLocations(trimmed, signal),
        enabled: trimmed.length >= MIN_QUERY_LENGTH,
        staleTime: 10 * minuteInMs,
        retry: false
    })
}
