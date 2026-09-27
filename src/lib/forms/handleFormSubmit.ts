import axios from 'axios'
import type {
    FieldValues,
    Path,
    UseFormReturn
} from 'react-hook-form'

import { getErrorDetail } from '@/lib/errors'

import { getLocalizedApiErrorMessage } from '@/utils/error'

type Options = {
    resetOnSuccess?: boolean
    fallbackMessage?: string
    t?: (key: string, params?: Record<string, string>) => string
}

// todo: wrap all form submits with this one
/**
 * Wraps react-hook-form's handleSubmit with standardised error handling.
 * Unwraps Axios error responses before falling back to Error.message or fallbackMessage.
 * If the server names an offending field (`property`), highlights that field
 * instead of only showing a generic root error.
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
            const fallback = options?.fallbackMessage ?? 'Submission failed'
            const message = axios.isAxiosError(error)
                ? options?.t
                    ? getLocalizedApiErrorMessage(
                        options.t,
                        error,
                        fallback
                    )
                    : (error.response?.data?.message ?? fallback)
                : error instanceof Error
                    ? error.message
                    : fallback

            const detail = getErrorDetail(error)
            if (detail?.property && detail.property in data) {
                form.setError(detail.property as Path<T>, { type: 'manual', message })
                return
            }

            form.setError('root', { type: 'manual', message })
        }
    })
