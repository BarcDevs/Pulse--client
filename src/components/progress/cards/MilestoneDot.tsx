import { ClassName } from '@/types/react'

import { cn } from '@/lib/utils'

export const MilestoneDot = ({ className }: {
    className?: ClassName
}) => (
    <div className={cn(
        'h-2 w-2 rounded-full shrink-0',
        className
    )}/>
)
