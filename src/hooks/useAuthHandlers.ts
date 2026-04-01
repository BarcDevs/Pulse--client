'use client'

import {useRouter} from 'next/navigation'

import {useAuth} from '@/context/AuthContext'

import {
    login,
    logout,
    signup
} from '@/api/auth'
import type {LoginSchema} from '@/validations/forms/loginSchema'
import type {SignupSchema} from '@/validations/forms/signupSchema'

export const useAuthHandlers = () => {
    const { setUser, setIsLoading } = useAuth()
    const router = useRouter()

    const handleLogin = async (
        credentials: LoginSchema
    ): Promise<boolean> => {
        setIsLoading(true)
        try {
            const response = await login(credentials)
            const user = response.data.data.user
            setUser(user)
            router.push('/dashboard')
            return true
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Login failed'
            console.error(
                'Login error:',
                message
            )
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignup = async (
        userData: Omit<
            SignupSchema,
            'confirmPassword'
        >
    ): Promise<boolean> => {
        setIsLoading(true)
        try {
            const response = await signup(userData)
            const user = response.data.data.user
            setUser(user)
            router.push('/dashboard')
            return true
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Signup failed'
            console.error(
                'Signup error:',
                message
            )
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = async (): Promise<void> => {
        setIsLoading(true)
        try {
            await logout()
        } catch (error: unknown) {
            const message =
                error instanceof Error ?
                    error.message :
                    'Logout failed'
            console.error(
                'Logout error:',
                message
            )
        }
    }

    return {
        handleLogin,
        handleSignup,
        handleLogout
    }
}
