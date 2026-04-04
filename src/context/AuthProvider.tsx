'use client'

import {
    useCallback,
    useState
} from 'react'

import { useQueryClient } from '@tanstack/react-query'

import type { LayoutProps, User } from '@/types'

import { useGetMe } from '@/hooks/queries/useGetMe'

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

    if (error)
        console.error('Auth error:', error)

    const isLoading = queryLoading || mutationLoading

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                error,
                setUser,
                setIsLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
