import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import {authQueryKeys} from '@/constants/queryKeys'

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
                queryKey: authQueryKeys.getMe
            })
            queryClient.removeQueries({
                queryKey: authQueryKeys.profile
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
