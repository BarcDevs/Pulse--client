import { ComponentProps } from 'react'

import { Button } from '@/components/shared/buttons/Button'

import { cn } from '@/lib/utils'

type TextButtonTone = 'primary' | 'muted' | 'onDark' | 'inherit'
type TextButtonSize = 'xs' | 'sm'

type TextButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size'> & {
    tone?: TextButtonTone
    size?: TextButtonSize
}

const toneStyles: Record<TextButtonTone, string> = {
    primary: 'text-primary hover:text-primary hover:underline',
    muted: 'text-muted-foreground hover:text-foreground',
    onDark: 'text-white/70 hover:text-white',
    inherit: ''
}

const sizeStyles: Record<TextButtonSize, string> = {
    xs: 'text-xs',
    sm: 'text-sm'
}

export const TextButton = ({
    tone = 'primary',
    size = 'sm',
    className,
    ...props
}: TextButtonProps) => (
    <Button
        variant={'ghost'}
        className={cn(
            'h-auto w-fit p-0 hover:bg-transparent',
            toneStyles[tone],
            sizeStyles[size],
            className
        )}
        {...props}
    />
)
