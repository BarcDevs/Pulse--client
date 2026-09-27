import { useRouter } from 'next/navigation'

import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { isNetworkError } from '@/utils/error'

import { ROUTES } from '@/constants/routes'

import { useAuth } from '@/context/AuthContext'

import { logout as logoutApi } from '@/api/auth'

export const useLogout = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { setNetworkError } = useAuth()

    const mutation = useMutation<
        void,
        Error,
        void
    >({
        mutationFn: async () => {
            await logoutApi()
        },
        onSettled: (_data, error) => {
            queryClient.removeQueries()
            router.push(ROUTES.HOME)
            if (!error) return
            if (isNetworkError(error)) setNetworkError(error)
            else console.error('Logout error:', error)
        }
    })

    return {
        actions: {
            logout: mutation.mutate,
            logoutAsync: mutation.mutateAsync
        },
        status: {
            value: mutation.status,
            isPending: mutation.isPending,
            isError: mutation.isError,
            error: mutation.error
        }
    }
}
