import { ComponentProps } from 'react'

import { Button } from '@/components/shared/buttons/Button'

import { cn } from '@/lib/utils'

type FieldButtonSize = 'md' | 'lg'

type FieldButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size'> & {
    isPlaceholder?: boolean
    size?: FieldButtonSize
}

const sizeStyles: Record<FieldButtonSize, string> = {
    md: 'gap-2 px-3 py-2.5',
    lg: 'gap-3 rounded-xl p-3'
}

export const FieldButton = ({
    isPlaceholder = false,
    size = 'md',
    className,
    ...props
}: FieldButtonProps) => (
    <Button
        variant={'secondary'}
        className={cn(
            'h-auto min-h-9 w-full justify-between border-input bg-surface-container-low text-start font-normal hover:border-primary hover:bg-surface-container-low',
            sizeStyles[size],
            isPlaceholder && 'text-muted-foreground',
            className
        )}
        {...props}
    />
)
