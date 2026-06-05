'use client'

import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type EmptyStateProps = {
    message: string | ReactNode
    icon?: ReactNode
    className?: string
}

export const EmptyState = ({
    message,
    icon,
    className = 'p-6'
}: EmptyStateProps) => (
    <div
        className={cn(
            'text-center text-muted-foreground',
            className
        )}
    >
        {icon && (
            <div className={'mb-4 flex justify-center'}>
                {icon}
            </div>
        )}
        {typeof message === 'string' ? (
            <p className={'text-sm md:text-base'}>
                {message}
            </p>
        ) : (
            message
        )}
    </div>
)
