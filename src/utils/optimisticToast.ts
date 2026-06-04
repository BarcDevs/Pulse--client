import { toast } from 'sonner'

import { isUnauthorizedError } from '@/utils/error'

import { secondInMs } from '@/constants/time'

type OptimisticToastOptions = {
    action: Promise<unknown>
    successMsg: string
    errorMsg: string
    retryLabel: string
    onRetry: () => void
    onError?: () => void
    onSuccess?: () => void
    onUnauthorized?: () => void
}

export const withOptimisticToast = async ({
    action,
    successMsg,
    errorMsg,
    retryLabel,
    onRetry,
    onError,
    onSuccess,
    onUnauthorized
}: OptimisticToastOptions): Promise<void> => {
    try {
        await action
        onSuccess?.()
        toast.success(successMsg, {
            duration: 2.5 * secondInMs
        })
    } catch (error) {
        if (onUnauthorized && isUnauthorizedError(error as Error)) {
            onError?.()
            onUnauthorized()
            return
        }
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
