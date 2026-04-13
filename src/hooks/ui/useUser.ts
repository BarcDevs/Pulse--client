'use client'

import type { User } from '@/types/user'

import { useGetMe } from '@/hooks/queries/useGetMe'
import { useProfile } from '@/hooks/queries/useProfile'

type UseUserReturn = {
    user: User | null
    isLoading: boolean
    error: unknown | null
    isAuthenticated: boolean
}

export const useUser = (): UseUserReturn => {
    const {
        user,
        isLoading: userLoading,
        error: userError
    } = useGetMe()

    const {
        profile,
        isLoading: profileLoading
    } = useProfile()

    const completeUser = user && profile
        ? { ...user, profile }
        : user

    return {
        user: completeUser ?? null,
        isLoading: userLoading || profileLoading,
        error: userError,
        isAuthenticated: !!completeUser
    }
}