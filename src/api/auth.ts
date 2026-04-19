import type { AuthResponse } from '@/types/auth'
import type { Response } from '@/types/responses'

import { api } from '@/api/index'
import type { LoginSchema } from '@/validations/forms/loginSchema'
import type { SignupSchema } from '@/validations/forms/signupSchema'

export const login = async (
    credentials: LoginSchema
): Promise<AuthResponse> => {
    const res = await api.post<Response<AuthResponse>>('/auth/login', credentials)
    return res.data.data
}

export const signup = async (userData: Omit<
    SignupSchema, 'confirmPassword'
>): Promise<AuthResponse> => {
    const res = await api.post<Response<AuthResponse>>('/auth/signup', userData)
    return res.data.data
}

export const getMe = async ():
    Promise<AuthResponse> => {
    const res = await api.get<Response<AuthResponse>>('/auth/me')
    return res.data.data
}

export const logout = async ():
    Promise<null> => {
    await api.get('/auth/logout')
    return null
}

export const refresh = async ():
    Promise<{ _csrf: string }> => {
    const res = await api.get<Response<{ _csrf: string }>>('/auth/refresh')
    return res.data.data
}
