import { ComponentProps } from 'react'

import { Button } from '@/components/shared/buttons/Button'

import { cn } from '@/lib/utils'

type TileButtonAlign = 'center' | 'start'

type TileButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size'> & {
    align?: TileButtonAlign
    outlined?: boolean
}

const alignStyles: Record<TileButtonAlign, string> = {
    center: 'items-center text-center',
    start: 'items-start text-start'
}

export const TileButton = ({
    align = 'center',
    outlined = false,
    className,
    ...props
}: TileButtonProps) => (
    <Button
        variant={outlined ? 'secondary' : 'ghost'}
        className={cn(
            'h-auto flex-col whitespace-normal rounded-xl p-6',
            alignStyles[align],
            outlined
                ? 'border-border bg-card hover:bg-card'
                : 'bg-surface-section text-foreground hover:bg-muted',
            className
        )}
        {...props}
    />
)
