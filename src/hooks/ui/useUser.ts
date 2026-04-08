'use client'

import {
    useEffect,
    useState
} from 'react'

import type { User } from '@/types/user'

import { getProfile } from '@/api/profile'

type UseUserReturn = {
    user: User | null
    isLoading: boolean
    error: unknown | null
    isAuthenticated: boolean
}

export const useUser = (): UseUserReturn => {
    const [user, setUser] =
        useState<User | null>(null)

    const [isLoading, setIsLoading] =
        useState(true)

    const [error, setError] =
        useState<unknown | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true)
                const profile =
                    await getProfile()

                setUser(
                    profile as unknown as User
                )

                setError(null)
            } catch (err) {
                setError(err)
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUser()
    }, [])

    return {
        user,
        isLoading,
        error,
        isAuthenticated: !!user
    }
}