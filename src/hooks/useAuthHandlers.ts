'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useQueryClient } from '@tanstack/react-query'

import type { User } from '@/types/user'

import {
    getLocalizedApiErrorMessage,
    isNetworkError
} from '@/utils/error'
import { getSafeRedirectUrl } from '@/utils/redirect'

import { authQueryKeys } from '@/constants/queryKeys'
import { ROUTES } from '@/constants/routes'

import { useAuth } from '@/context/AuthContext'

import {
    login,
    logout,
    signup
} from '@/api/auth'
import type { LoginSchema } from '@/validations/forms/loginSchema'
import type { SignupSchema } from '@/validations/forms/signupSchema'

export const useAuthHandlers = () => {
    const {
        setIsLoading,
        setNetworkError
    } = useAuth()
    const router = useRouter()
    const queryClient = useQueryClient()
    const t = useTranslations()

    const getAuthErrorMessage = (
        error: unknown,
        fallback: string
    ): string | null => {
        if (error instanceof Error && isNetworkError(error)) {
            setNetworkError(error)
            return null
        }

        return getLocalizedApiErrorMessage(
            t,
            error,
            fallback
        )
    }

    // A visitor who was a guest keeps the guest's cached user and check-in
    // data, which would show up on the account they log in to
    const clearGuestCache = () => {
        const cachedUser = queryClient.getQueryData<User>(
            authQueryKeys.getMe
        )
        if (cachedUser?.isGuest) queryClient.clear()
    }

    const handleLogin = async (
        credentials: LoginSchema
    ): Promise<string | null> => {
        setIsLoading(true)
        try {
            await login(credentials)
            clearGuestCache()
            await queryClient.invalidateQueries({
                queryKey: authQueryKeys.getMe
            })
            const params = new URLSearchParams(
                window.location.search
            )
            router.push(
                getSafeRedirectUrl(
                    params.get('redirect'),
                    ROUTES.DASHBOARD
                )
            )

            return null
        } catch (error: unknown) {
            return getAuthErrorMessage(error, 'Login failed')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignup = async (
        userData: Omit<
            SignupSchema,
            'confirmPassword' | 'acceptTerms'
        >
    ): Promise<string | null> => {
        setIsLoading(true)
        try {
            await signup(userData)
            clearGuestCache()
            await queryClient.invalidateQueries({
                queryKey: authQueryKeys.getMe
            })
            router.push(ROUTES.DASHBOARD)
            return null
        } catch (error: unknown) {
            return getAuthErrorMessage(error, 'Signup failed')
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
