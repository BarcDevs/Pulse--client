import { useMutation } from '@tanstack/react-query'

import { sendSupportMessage } from '@/api/support'

export const useSendSupportMessage = () =>
    useMutation({
        mutationFn: sendSupportMessage
    })
