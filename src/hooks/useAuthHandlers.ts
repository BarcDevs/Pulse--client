'use client'

import { useRouter } from 'next/navigation'

import { useQueryClient } from '@tanstack/react-query'

import { getApiErrorMessage } from '@/utils/error'
import { getSafeRedirectUrl } from '@/utils/redirect'

import { authQueryKeys } from '@/constants/queryKeys'

import { useAuth } from '@/context/AuthContext'

import {
    login,
    logout,
    signup
} from '@/api/auth'
import type { LoginSchema } from '@/validations/forms/loginSchema'
import type { SignupSchema } from '@/validations/forms/signupSchema'

export const useAuthHandlers = () => {
    const { setIsLoading } = useAuth()
    const router = useRouter()
    const queryClient = useQueryClient()

    const handleLogin = async (
        credentials: LoginSchema
    ): Promise<string | null> => {
        setIsLoading(true)
        try {
            await login(credentials)
            await queryClient.invalidateQueries({
                queryKey: authQueryKeys.getMe
            })
            const params = new URLSearchParams(
                window.location.search
            )
            router.push(
                getSafeRedirectUrl(
                    params.get('redirect'),
                    '/dashboard'
                )
            )

            return null
        } catch (error: unknown) {
            return getApiErrorMessage(error, 'Login failed')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignup = async (
        userData: Omit<
            SignupSchema,
            'confirmPassword'
        >
    ): Promise<string | null> => {
        setIsLoading(true)
        try {
            await signup(userData)
            await queryClient.invalidateQueries({
                queryKey: authQueryKeys.getMe
            })
            router.push('/dashboard')
            return null
        } catch (error: unknown) {
            return getApiErrorMessage(error, 'Signup failed')
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
                error instanceof Error
                    ? error.message
                    : 'Logout failed'
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
