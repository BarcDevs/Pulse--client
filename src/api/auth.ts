import type {User} from '@/types'
import type {Response} from '@/types/responses'

import {api} from '@/api/index'
import type {LoginSchema} from '@/validations/forms/loginSchema'
import type {SignupSchema} from '@/validations/forms/signupSchema'

type AuthResponse = Response<{
    user: User
    _csrf: string
}>

export const login = (credentials: LoginSchema) =>
    api.post<AuthResponse>('/auth/login', credentials)

export const signup = (userData: Omit<
    SignupSchema, 'confirmPassword'>) =>
    api.post<AuthResponse>('/auth/signup', userData)

export const getMe = () =>
    api.get<AuthResponse>('/auth/me')

export const logout = () =>
    api.post<Response<null>>('/auth/logout')

export const refresh = () =>
    // todo: replace csrf route with refresh in server
    api.post<Response<{_csrf: string}>>('/auth/csrf')
