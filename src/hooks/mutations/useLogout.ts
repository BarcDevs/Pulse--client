import { useRouter } from 'next/navigation'

import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { ROUTES } from '@/constants/routes'

import { logout as logoutApi } from '@/api/auth'

export const useLogout = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation<
        void,
        Error,
        void
    >({
        mutationFn: async () => {
            await logoutApi()
        },
        onSuccess: async () => {
            queryClient.removeQueries()
            router.push(ROUTES.HOME)
        },
        onError: (error: Error) => {
            console.error('Logout error:', error)
        }
    })

    return {
        logout: mutation.mutate,
        logoutAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        status: mutation.status
    }
}
