import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import {AUTH_QUERY_KEYS} from '@/constants/queryKeys'

import {logout as logoutApi} from '@/api/auth'

export const useLogout = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        void,
        Error,
        void
    >({
        mutationFn: async () => {
            await logoutApi()
        },
        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: AUTH_QUERY_KEYS.getMe
            })
            queryClient.removeQueries({
                queryKey: AUTH_QUERY_KEYS.profile
            })
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
