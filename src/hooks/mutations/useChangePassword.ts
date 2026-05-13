import { useMutation } from '@tanstack/react-query'

import { changePassword } from '@/api/users'

export const useChangePassword = () =>
    useMutation({
        mutationFn: changePassword
    })
