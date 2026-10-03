import { ComponentProps } from 'react'

import { Button } from '@/components/shared/buttons/Button'

import { cn } from '@/lib/utils'

type FabButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size'>

export const FabButton = ({
    className,
    ...props
}: FabButtonProps) => (
    <Button
        size={'default'}
        className={cn(
            'fixed bottom-24 end-4 z-40 size-14 rounded-full p-0 lg:bottom-6',
            className
        )}
        {...props}
    />
)
