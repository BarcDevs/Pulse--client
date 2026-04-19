'use client'

import {
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'

import { useQueryClient } from '@tanstack/react-query'

import type { LayoutProps } from '@/types'
import type { User } from '@/types/user'

import { ErrorBannerWrapper } from '@/components/shared/ErrorBannerWrapper'

import { useGetMe } from '@/hooks/queries/useGetMe'

import { isNetworkError } from '@/utils/error'

import { authQueryKeys } from '@/constants/queryKeys'

import { AuthContext } from './AuthContext'

export const AuthProvider = ({
    children
}: LayoutProps) => {
    const {
        user,
        isLoading: queryLoading,
        error
    } = useGetMe()

    const [mutationLoading, setMutationLoading] = useState(false)
    const [networkError, setNetworkError] =
        useState<Error | null>(null)
    const lastErrorRef = useRef<Error | null>(null)

    const queryClient = useQueryClient()

    const setUser = useCallback(
        (newUser: User | null) => {
            if (newUser === null) {
                queryClient.removeQueries({
                    queryKey: authQueryKeys.getMe
                })
            } else {
                queryClient.setQueryData(
                    authQueryKeys.getMe,
                    {
                        data: {
                            user: newUser,
                            _csrf: ''
                        },
                        success: true
                    }
                )
            }
        },
        [queryClient]
    )

    const setIsLoading = useCallback(
        (loading: boolean) => {
            setMutationLoading(loading)
        },
        []
    )

    const setNetworkErrorCallback = useCallback(
        (error: Error | null) => {
            setNetworkError(error)
        },
        []
    )

    useEffect(() => {
        const hasNetworkError = error && isNetworkError(error)
        const isErrorChanged = error !== lastErrorRef.current

        if (isErrorChanged) {
            lastErrorRef.current = error ?? null

            if (hasNetworkError) {
                setTimeout(() => setNetworkError(error), 0)
            } else if (!error) {
                setTimeout(() => setNetworkError(null), 0)
            }
        }
    }, [error])

    if (error)
        console.error('Auth error:', error)

    const isLoading = queryLoading || mutationLoading

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                error,
                networkError,
                setUser,
                setIsLoading,
                setNetworkError: setNetworkErrorCallback
            }}
        >
            <ErrorBannerWrapper>
                {children}
            </ErrorBannerWrapper>
        </AuthContext.Provider>
    )
}
