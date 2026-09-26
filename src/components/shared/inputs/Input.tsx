import { ComponentProps } from 'react'

import { Input as UiInput } from '@/components/ui/input'

import { cn } from '@/lib/utils'

export type InputVariant = 'default' | 'muted' | 'card' | 'support' | 'search'
type InputSize = 'md' | 'lg'

type InputProps = Omit<ComponentProps<typeof UiInput>, 'size'> & {
    variant?: InputVariant
    size?: InputSize
    isInvalid?: boolean
}

export const inputVariantStyles: Record<InputVariant, string> = {
    default: '',
    muted: 'bg-muted',
    card: 'bg-surface-card',
    support: 'h-auto rounded-[10px] border-[1.5px] border-border bg-surface-page p-3.5 text-sm focus-visible:border-primary focus-visible:ring-0',
    search: 'h-auto rounded-xl border-[1.5px] border-border bg-card py-3.5 pe-4 text-sm shadow-sm focus-visible:border-primary focus-visible:ring-0'
}

const sizeStyles: Record<InputSize, string> = {
    md: '',
    lg: 'h-11'
}

export const Input = ({
    variant = 'default',
    size = 'md',
    isInvalid,
    className,
    ...props
}: InputProps) => (
    <UiInput
        className={cn(
            inputVariantStyles[variant],
            sizeStyles[size],
            isInvalid && 'border-destructive',
            className
        )}
        {...props}
    />
)
