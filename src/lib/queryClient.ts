import {QueryClient} from '@tanstack/react-query'

import {minuteInMs} from '@/constants/time'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * minuteInMs,
            gcTime: 10 * minuteInMs
        }
    }
})