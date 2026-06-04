'use client'

import {
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'

import { usePathname } from 'next/navigation'

import { useQueryClient } from '@tanstack/react-query'

import type { LayoutProps } from '@/types'
import type { User } from '@/types/user'

import { ErrorBannerWrapper } from '@/components/shared/ErrorBannerWrapper'

import { useGetMe } from '@/hooks/queries/useGetMe'

import { authState, initiateLogout } from '@/lib/auth'

import {
    isNetworkError,
    isUnauthorizedError
} from '@/utils/error'

import { protectedRoutes } from '@/constants/proxyRoutes'
import { authQueryKeys } from '@/constants/queryKeys'
import { ROUTES } from '@/constants/routes'
import { minuteInMs } from '@/constants/time'

import { AuthContext } from './AuthContext'

const PUBLIC_ROUTES = [
    ROUTES.HOME,
    ROUTES.LOGIN,
    ROUTES.SIGNUP,
    ROUTES.VERIFY,
    ROUTES.FORGOT_PASSWORD
] as const

export const AuthProvider = ({
    children
}: LayoutProps) => {
    const pathname = usePathname()
    const isPublicRoute = PUBLIC_ROUTES.includes(
        pathname as typeof PUBLIC_ROUTES[number]
    )

    const {
        user,
        isLoading: queryLoading,
        error,
        refetch: refetchMe
    } = useGetMe(!isPublicRoute)

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
        authState.onRefreshSuccess = () => {
            queryClient.invalidateQueries({
                queryKey: authQueryKeys.getMe
            })
        }
        return () => void (authState.onRefreshSuccess = null)
    }, [queryClient])

    useEffect(() => {
        authState.onNetworkRecovery = () => setNetworkError(null)
        return () => void (authState.onNetworkRecovery = null)
    }, [])

    useEffect(() => {
        if (error && isNetworkError(error)) {
            const timer = setTimeout(refetchMe, 2 * minuteInMs)
            return () => clearTimeout(timer)
        }
    }, [error, refetchMe])

    useEffect(() => {
        const isProtected = protectedRoutes.some(
            (route) => pathname.startsWith(route)
        )
        if (error && isUnauthorizedError(error) && isProtected) {
            initiateLogout(pathname)
        }
    }, [error, pathname])

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
