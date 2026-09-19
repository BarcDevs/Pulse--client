'use client'

import type { User } from '@/types/user'

import { useGetMe } from '@/hooks/queries/useGetMe'
import { useProfile } from '@/hooks/queries/useProfile'

type UseUserReturn = {
    user: User | null
    isAuthenticated: boolean
    status: {
        isLoading: boolean
        isError: boolean
        error: unknown | null
    }
}

export const useUser = (): UseUserReturn => {
    const me = useGetMe()

    const profileQuery = useProfile()

    const completeUser = me.user && profileQuery.profile
        ? { ...me.user, profile: profileQuery.profile }
        : me.user

    return {
        user: completeUser ?? null,
        isAuthenticated: !!completeUser,
        status: {
            isLoading: me.status.isLoading || profileQuery.status.isLoading,
            isError: !!me.status.error || profileQuery.status.isError,
            error: me.status.error
        }
    }
}