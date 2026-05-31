import type {
    FieldErrors,
    FieldValues
} from 'react-hook-form'

import { ClassName } from '@/types/react'

import { cn } from '@/lib/utils'

type FormErrorProps<T extends FieldValues> = {
    errors: FieldErrors<T>
    className?: ClassName
}

export const FormError = <T extends FieldValues>({
    errors,
    className
}: FormErrorProps<T>) => {
    if (!errors.root?.message) return null

    return (
        <p
            role={'alert'}
            className={cn('text-sm text-destructive', className)}
        >
            {errors.root.message}
        </p>
    )
}
