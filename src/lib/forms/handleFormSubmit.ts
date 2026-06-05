import axios from 'axios'
import type { FieldValues, UseFormReturn } from 'react-hook-form'

type Options = {
    resetOnSuccess?: boolean
    fallbackMessage?: string
}

// todo: wrap all form submits with this one
/**
 * Wraps react-hook-form's handleSubmit with standardised error handling.
 * Unwraps Axios error responses before falling back to Error.message or fallbackMessage.
 */
export const wrapFormSubmit = <T extends FieldValues>(
    form: UseFormReturn<T>,
    onSubmit: (data: T) => Promise<void>,
    options?: Options
) =>
    form.handleSubmit(async (data) => {
        try {
            await onSubmit(data)
            if (options?.resetOnSuccess) form.reset()
        } catch (error) {
            const message = axios.isAxiosError(error)
                ? (error.response?.data?.message ?? options?.fallbackMessage ?? 'Submission failed')
                : error instanceof Error
                    ? error.message
                    : (options?.fallbackMessage ?? 'Submission failed')
            form.setError('root', { type: 'manual', message })
        }
    })
