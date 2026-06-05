'use client'

import {
    createContext,
    useContext
} from 'react'

import type { User } from '@/types/user'

type AuthContextType = {
    user: User | null
    isLoading: boolean
    error: Error | null
    networkError: Error | null
    setUser: (user: User | null) => void
    setIsLoading: (loading: boolean) => void
    setNetworkError: (error: Error | null) => void
}

export const AuthContext = createContext<
    AuthContextType | null
>(null)

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error(
            'useAuth must be used within AuthProvider'
        )
    }
    return context
}
