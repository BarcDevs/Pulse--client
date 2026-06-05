import { useRouter } from 'next/navigation'

import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { ROUTES } from '@/constants/routes'

import { logout } from '@/api/auth'
import { deleteUser } from '@/api/users'

export const useDeactivateAccount = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: async () => {
            await deleteUser()
            await logout()
        },
        onSuccess: async () => {
            queryClient.removeQueries()
            router.push(ROUTES.LOGIN)
        }
    })
}
