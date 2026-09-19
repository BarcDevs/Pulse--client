'use client'

import type { User } from '@/types/user'

import { useGetMe } from '@/hooks/queries/useGetMe'
import { useProfile } from '@/hooks/queries/useProfile'

type UseUserReturn = {
    user: User | null
    isLoading: boolean
    isError: boolean
    error: unknown | null
    isAuthenticated: boolean
}

export const useUser = (): UseUserReturn => {
    const me = useGetMe()

    const {
        profile,
        isLoading: profileLoading,
        isError: profileError
    } = useProfile()

    const completeUser = me.user && profile
        ? { ...me.user, profile }
        : me.user

    return {
        user: completeUser ?? null,
        isLoading: me.status.isLoading || profileLoading,
        isError: !!me.status.error || profileError,
        error: me.status.error,
        isAuthenticated: !!completeUser
    }
}