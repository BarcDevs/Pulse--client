import {User} from '@/types'
import {ApiResponse, Response} from '@/types/responses'
import {LoginResponse} from '@/types/responses/auth'

import {api} from '@/api/index'
import {LoginSchema} from '@/validations/forms/loginSchema'
import {SignupSchema} from '@/validations/forms/signupSchema'

export const login = async (credentials: LoginSchema) =>
    api.post<Response<LoginResponse>>('/auth/login', credentials)

export const signup = async (userData: Omit<SignupSchema, 'confirmPassword'>) =>
    api.post<Response<{ user: User }>>('/auth/signup', userData)

export const logout = async () => {
    await api.get('/auth/logout')
}

export const getCsrfToken = async (): ApiResponse<{ _csrf: string }> =>
    api.get<Response<{ _csrf: string }>>('/auth/csrf')

export const getMe = async () =>
    api.get<Response<{ user: User }>>('/auth/me')
