import Image from 'next/image'

import { ClassName } from '@/types/utils/react'

import { cn } from '@/lib/utils'

type IconProps = {
    name: string
    size: number
    className?: ClassName
}

export const Icon = ({
    name,
    size,
    className
}: IconProps) => (
    <Image
        src={`/assets/icons/${name}.svg`}
        alt={name}
        width={size}
        height={size}
        loading={'eager'}
        className={cn('object-contain', className)}
    />
)
