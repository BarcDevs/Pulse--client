import {
    defaultShouldDehydrateQuery,
    QueryClient
} from '@tanstack/react-query'

import { minuteInMs } from '@/constants/time'

export const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * minuteInMs,
                gcTime: 10 * minuteInMs,
                retry: (failureCount: number) =>
                    failureCount <= 2,
                refetchOnWindowFocus: false,
                refetchOnReconnect: true
            },
            mutations: {
                retry: (failureCount: number) =>
                    failureCount <= 1
            },
            dehydrate: {
                shouldDehydrateQuery: (query: any) =>
                    defaultShouldDehydrateQuery(query)
                    || query.state.status === 'pending'
            }
        }
    })

let clientSingleton: QueryClient | undefined

export const getQueryClient = () => {
    if (typeof window === 'undefined')
        return createQueryClient()

    if (!clientSingleton)
        clientSingleton = createQueryClient()

    return clientSingleton
}