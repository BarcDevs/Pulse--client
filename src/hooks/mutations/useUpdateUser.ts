import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { authQueryKeys } from '@/constants/queryKeys'

import { updateUser } from '@/api/users'

export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: authQueryKeys.getMe
            })
        }
    })
}
