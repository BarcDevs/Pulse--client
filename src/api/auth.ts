import type {Response} from '@/types/responses'
import {AuthResponse as AuthResponseT}
    from '@/types/responses/auth'

import {api} from '@/api/index'
import type {LoginSchema} from '@/validations/forms/loginSchema'
import type {SignupSchema} from '@/validations/forms/signupSchema'

type AuthResponse = Response<AuthResponseT>

export const login = (credentials: LoginSchema) =>
    api.post<AuthResponse>('/auth/login', credentials)

export const signup = (userData: Omit<
    SignupSchema, 'confirmPassword'>) =>
    api.post<AuthResponse>('/auth/signup', userData)

export const getMe = () =>
    api.get<AuthResponse>('/auth/me')

export const logout = () =>
    api.get<Response<null>>('/auth/logout')

export const refresh = () =>
    api.get<Response<{_csrf: string}>>('/auth/refresh')
