'use client'

import {
    DehydratedState,
    HydrationBoundary,
    QueryClientProvider
} from '@tanstack/react-query'

import {LayoutProps} from '@/types'

import {getQueryClient} from '@/lib/queryClient'

type QueryProviderProps = LayoutProps & {
    dehydratedState?: DehydratedState | null
}

export const QueryProvider = ({
    children,
    dehydratedState
}: QueryProviderProps) => {
    const queryClient = getQueryClient()

    return (
        <HydrationBoundary state={dehydratedState}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </HydrationBoundary>
    )
}
