import { ComponentProps } from 'react'

import { Button } from '@/components/shared/buttons/Button'

import { cn } from '@/lib/utils'

type MenuTriggerButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size'>

export const MenuTriggerButton = ({
    className,
    ...props
}: MenuTriggerButtonProps) => (
    <Button
        variant={'secondary'}
        size={'sm'}
        className={cn(
            'gap-2 data-[state=open]:border-primary no-focus',
            className
        )}
        {...props}
    />
)
