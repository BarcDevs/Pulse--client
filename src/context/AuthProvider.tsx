'use client'

import {
    ReactNode,
    useEffect,
    useState
} from 'react'

import type {User} from '@/types'

import {getMe} from '@/api/auth'

import {AuthContext} from './AuthContext'

export const AuthProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [user, setUser] = useState<
        User | null
    >(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            try {
                const response = await getMe()
                const user = response.data.data.user
                setUser(user)
            } catch {
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        initAuth()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                setUser,
                setIsLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
