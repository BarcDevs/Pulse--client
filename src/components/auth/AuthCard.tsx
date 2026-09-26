import { ReactNode } from 'react'

import { ClassName } from '@/types/react'

import { Card } from '@/components/shared/cards/Card'
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { cn } from '@/lib/utils'

type AuthCardProps = {
    title: string
    description: string
    isCentered?: boolean
    className?: ClassName
    children: ReactNode
}

export const AuthCard = ({
    title,
    description,
    isCentered,
    className,
    children
}: AuthCardProps) => (
    <Card
        variant={'elevated'}
        className={className}
    >
        <CardHeader className={cn(isCentered && 'text-center')}>
            <CardTitle className={'text-2xl font-semibold'}>
                {title}
            </CardTitle>
            <CardDescription>
                {description}
            </CardDescription>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
)
