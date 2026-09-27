import { ComponentProps } from 'react'

import { Textarea as UiTextarea } from '@/components/ui/textarea'

import { cn } from '@/lib/utils'

type TextAreaVariant = 'default' | 'muted' | 'card' | 'soft' | 'support'
type TextAreaResize = 'none' | 'vertical'

type TextAreaProps = ComponentProps<typeof UiTextarea> & {
    variant?: TextAreaVariant
    resize?: TextAreaResize
}

const variantStyles: Record<TextAreaVariant, string> = {
    default: '',
    muted: 'bg-muted',
    card: 'bg-surface-card',
    soft: 'bg-surface-container-low',
    support: 'min-h-[130px] rounded-[10px] border-[1.5px] border-border bg-surface-page p-3.5 text-sm leading-[1.6] focus-visible:border-primary focus-visible:ring-0'
}

const resizeStyles: Record<TextAreaResize, string> = {
    none: 'resize-none',
    vertical: 'resize-y'
}

export const TextArea = ({
    variant = 'default',
    resize,
    className,
    ...props
}: TextAreaProps) => (
    <UiTextarea
        className={cn(
            variantStyles[variant],
            resize && resizeStyles[resize],
            className
        )}
        {...props}
    />
)
