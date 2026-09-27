import { ComponentProps } from 'react'

import { Button as UiButton } from '@/components/ui/button'

import { cn } from '@/lib/utils'

type UiButtonProps = ComponentProps<typeof UiButton>

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'onGradient'
type ButtonSize = 'default' | 'xs' | 'sm' | 'lg' | 'xl'

type ButtonProps = Omit<UiButtonProps, 'variant' | 'size'> & {
    variant?: ButtonVariant
    size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, { uiVariant: UiButtonProps['variant'], className: string }> = {
    primary: {
        uiVariant: 'default',
        className: 'bg-linear-to-r from-primary-gradient-start to-primary-gradient-end text-primary-foreground shadow-button hover:opacity-90 disabled:bg-none disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none disabled:opacity-100'
    },
    secondary: {
        uiVariant: 'outline',
        className: 'bg-card text-foreground'
    },
    ghost: {
        uiVariant: 'ghost',
        className: 'text-primary'
    },
    destructive: {
        uiVariant: 'destructive',
        className: ''
    },
    onGradient: {
        uiVariant: 'default',
        className: 'bg-white text-primary-gradient-start hover:bg-white/90'
    }
}

const sizeStyles: Record<ButtonSize, { uiSize: UiButtonProps['size'], className: string }> = {
    default: { uiSize: 'default', className: '' },
    xs: { uiSize: 'sm', className: 'text-xs' },
    sm: { uiSize: 'sm', className: '' },
    lg: { uiSize: 'lg', className: '' },
    xl: { uiSize: 'lg', className: 'h-11' }
}

export const Button = ({
    variant = 'primary',
    size = 'default',
    className,
    ...props
}: ButtonProps) => (
    <UiButton
        variant={variantStyles[variant].uiVariant}
        size={sizeStyles[size].uiSize}
        className={cn(
            'font-semibold',
            variantStyles[variant].className,
            sizeStyles[size].className,
            className
        )}
        {...props}
    />
)
