import type { AuthResponse } from '@/types/auth'
import type { Response } from '@/types/responses'
import type { Role } from '@/types/user'

import {
    getCsrfToken,
    setCsrfToken
} from '@/lib/csrf'

import { api } from '@/api/index'
import { ENDPOINTS } from '@/api/routes'
import type { ChangeEmailSchema } from '@/validations/forms/changeEmailSchema'
import type { LoginSchema } from '@/validations/forms/loginSchema'
import type { SignupSchema } from '@/validations/forms/signupSchema'

type ConfirmedEmailUser = {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    role: Role
}

export const login = async (
    credentials: LoginSchema
): Promise<AuthResponse> => {
    const res = await api.post<Response<AuthResponse>>(
        ENDPOINTS.auth.login,
        credentials
    )
    return res.data.data
}

export const signup = async (userData: Omit<
    SignupSchema, 'confirmPassword' | 'acceptTerms'
>): Promise<AuthResponse> => {
    const res = await api.post<Response<AuthResponse>>(
        ENDPOINTS.auth.signup,
        userData
    )
    return res.data.data
}

export const getMe = async ():
    Promise<AuthResponse> => {
    const res = await api.get<Response<AuthResponse>>(ENDPOINTS.auth.me)
    return res.data.data
}

// Logout is a CSRF-protected POST. The token lives in memory only, so after
// a reload fetch a fresh one first
export const logout = async ():
    Promise<null> => {
    if (!getCsrfToken())
        setCsrfToken((await refresh())._csrf)
    await api.post(ENDPOINTS.auth.logout)
    return null
}

export const refresh = async ():
    Promise<{ _csrf: string }> => {
    const res = await api.get<Response<{
        _csrf: string
    }>>(ENDPOINTS.auth.refresh)
    return res.data.data
}

// Always succeeds, whether or not the email has an account
export const requestPasswordReset = async (
    email: string
): Promise<void> => {
    await api.post(ENDPOINTS.auth.forgotPassword, { email })
}

// Does not consume the code; 400 AUTH_RESET_PASSWORD on a wrong/expired code or unknown email
export const verifyResetCode = async (input: {
    email: string
    userOTP: number
}): Promise<void> => {
    await api.post(ENDPOINTS.auth.verifyResetCode, input)
}

export const resetPassword = async (input: {
    email: string
    newPassword: string
    userOTP: number
}): Promise<void> => {
    await api.put(ENDPOINTS.auth.resetPassword, input)
}

export const changeEmail = async (
    input: ChangeEmailSchema
): Promise<void> => {
    await api.post(ENDPOINTS.auth.changeEmail, input)
}

export const confirmEmailChange = async (
    input: { OTP: number }
): Promise<{ user: ConfirmedEmailUser }> => {
    const res = await api.post<Response<{
        user: ConfirmedEmailUser
    }>>(ENDPOINTS.auth.confirmEmailChange, input)
    return res.data.data
}
