import { ComponentProps } from 'react'

import { ClassName } from '@/types/react'

import { Button } from '@/components/shared/buttons/Button'

import { cn } from '@/lib/utils'

type ChipButtonSize = 'sm' | 'md'

type ChipButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size'> & {
    isSelected?: boolean
    solid?: boolean
    size?: ChipButtonSize
    selectedClassName?: ClassName
}

const sizeStyles: Record<ChipButtonSize, string> = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-3.5 py-1.5 text-sm'
}

const idleStyles = 'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
const softStyles = 'border-primary bg-primary-light text-primary hover:bg-primary-light hover:text-primary'
const solidStyles = 'border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'

export const ChipButton = ({
    isSelected = false,
    solid = false,
    size = 'sm',
    selectedClassName,
    className,
    ...props
}: ChipButtonProps) => (
    <Button
        variant={'secondary'}
        className={cn(
            'h-auto rounded-full border font-medium',
            sizeStyles[size],
            !isSelected && idleStyles,
            isSelected && (solid ? solidStyles : softStyles),
            isSelected && selectedClassName,
            className
        )}
        {...props}
    />
)
