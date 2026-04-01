'use client'

import {
    createContext,
    useContext
} from 'react'

import type {User} from '@/types'

type AuthContextType = {
    user: User | null
    isLoading: boolean
    setUser: (user: User | null) => void
    setIsLoading: (loading: boolean) => void
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
