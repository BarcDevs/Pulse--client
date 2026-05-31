import { ClassName } from '@/types/react'

import { cn } from '@/lib/utils'

type MilestoneDotProps = {
    className?: ClassName
}

export const MilestoneDot = ({
    className
}: MilestoneDotProps) => (
    <div className={cn(
        'h-2 w-2 rounded-full shrink-0',
        className
    )}/>
)
