'use client'

import {
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'

import { usePathname } from 'next/navigation'

import { useQueryClient } from '@tanstack/react-query'

import type { LayoutProps } from '@/types/react'
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
import { networkRetryMs } from '@/constants/time'

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

    const me = useGetMe(!isPublicRoute)

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
        authState.isCommunityPage =
            pathname.startsWith(ROUTES.COMMUNITY)
    }, [pathname])

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
        if (me.status.error && isNetworkError(me.status.error)) {
            const timer = setTimeout(me.actions.refetch, networkRetryMs)
            return () => clearTimeout(timer)
        }
    }, [me.status.error, me.actions.refetch])

    useEffect(() => {
        const isProtected = protectedRoutes.some(
            (route) => pathname.startsWith(route)
        )
        if (
            me.status.error
            && isUnauthorizedError(me.status.error)
            && isProtected
        ) {
            initiateLogout(pathname)
        }
    }, [me.status.error, pathname])

    useEffect(() => {
        const hasNetworkError = me.status.error
            && isNetworkError(me.status.error)
        const isErrorChanged = me.status.error !== lastErrorRef.current

        if (isErrorChanged) {
            lastErrorRef.current = me.status.error ?? null

            if (hasNetworkError) {
                setTimeout(() => setNetworkError(me.status.error), 0)
            } else if (!me.status.error) {
                setTimeout(() => setNetworkError(null), 0)
            }
        }
    }, [me.status.error])

    if (me.status.error && !isUnauthorizedError(me.status.error))
        console.error('Auth error:', me.status.error)

    const isLoading = me.status.isLoading || mutationLoading

    return (
        <AuthContext.Provider
            value={{
                user: me.user,
                isLoading,
                error: me.status.error,
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
