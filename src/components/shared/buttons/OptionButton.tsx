import { ComponentProps } from 'react'

import { Button } from '@/components/shared/buttons/Button'

import { cn } from '@/lib/utils'

type OptionButtonLayout = 'row' | 'bordered'

type OptionButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size'> & {
    isSelected?: boolean
    layout?: OptionButtonLayout
}

const layoutStyles: Record<OptionButtonLayout, { base: string, selected: string, idle: string }> = {
    row: {
        base: 'h-auto w-full justify-start gap-2.5 px-3 py-2.5 text-start text-sm font-normal',
        selected: 'bg-primary/10 font-semibold text-primary hover:bg-primary/15 hover:text-primary',
        idle: 'text-foreground'
    },
    bordered: {
        base: 'gap-2 rounded-lg border px-4 py-2 text-sm',
        selected: 'border-primary bg-primary/5 text-primary hover:bg-primary/5 hover:text-primary',
        idle: 'border-border bg-transparent text-muted-foreground hover:text-foreground'
    }
}

export const OptionButton = ({
    isSelected = false,
    layout = 'row',
    className,
    ...props
}: OptionButtonProps) => (
    <Button
        variant={'ghost'}
        className={cn(
            layoutStyles[layout].base,
            isSelected
                ? layoutStyles[layout].selected
                : layoutStyles[layout].idle,
            className
        )}
        {...props}
    />
)
