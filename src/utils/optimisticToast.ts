import { toast } from 'sonner'

import { secondInMs } from '@/constants/time'

type OptimisticToastOptions = {
    action: Promise<unknown>
    successMsg: string
    errorMsg: string
    retryLabel: string
    onRetry: () => void
    onError?: () => void
}

export const withOptimisticToast = async ({
    action,
    successMsg,
    errorMsg,
    retryLabel,
    onRetry,
    onError
}: OptimisticToastOptions): Promise<void> => {
    try {
        await action
        toast.success(successMsg, {
            duration: 2.5 * secondInMs
        })
    } catch {
        onError?.()
        toast.error(errorMsg, {
            action: {
                label: retryLabel,
                onClick: onRetry
            },
            duration: 5 * secondInMs
        })
    }
}
