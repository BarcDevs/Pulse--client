import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import type {Response} from '@/types/responses'
import type {AuthResponse} from '@/types/responses/auth'

import {login as loginApi} from '@/api/auth'
import type {LoginSchema} from '@/validations/forms/loginSchema'

export const useLogin = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        Response<AuthResponse>,
        Error,
        LoginSchema
    >({
        mutationFn: async (
            credentials: LoginSchema
        ) => {
            const response = await loginApi(credentials)
            return response.data
        },
        onSuccess: () => {
            queryClient.resetQueries()
        },
        onError: (
            error: Error
        ) => {
            console.error('Login error:', error)
        }
    })

    return {
        login: mutation.mutate,
        loginAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        status: mutation.status
    }
}
