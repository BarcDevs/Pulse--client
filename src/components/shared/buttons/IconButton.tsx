import { ComponentProps } from 'react'

import { Button } from '@/components/shared/buttons/Button'

import { cn } from '@/lib/utils'

type IconButtonSize = 'xs' | 'sm' | 'md'
type IconButtonTone = 'muted' | 'primary' | 'destructive'

type IconButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size'> & {
    size?: IconButtonSize
    tone?: IconButtonTone
    outlined?: boolean
    round?: boolean
}

const sizeStyles: Record<IconButtonSize, string> = {
    xs: 'size-5',
    sm: 'size-8',
    md: 'size-9'
}

const toneStyles: Record<IconButtonTone, string> = {
    muted: 'text-muted-foreground hover:text-foreground',
    primary: 'text-primary hover:text-primary',
    destructive: 'text-destructive hover:text-destructive'
}

export const IconButton = ({
    size = 'md',
    tone = 'muted',
    outlined = false,
    round = false,
    className,
    ...props
}: IconButtonProps) => (
    <Button
        variant={outlined ? 'secondary' : 'ghost'}
        className={cn(
            'p-0',
            sizeStyles[size],
            toneStyles[tone],
            round && 'rounded-full',
            className
        )}
        {...props}
    />
)
