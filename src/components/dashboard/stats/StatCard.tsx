import { ReactNode } from 'react'

import { Card, CardContent } from '@/components/ui/card'

import { cn } from '@/lib/utils'

type StatCardProps = {
    label: string
    value: string | number
    subValue?: string
    description: string
    icon: ReactNode
    iconBg: string
    descriptionColor?: string
}

export const StatCard = ({
    label,
    value,
    subValue,
    description,
    icon,
    iconBg,
    descriptionColor
}: StatCardProps) => (
    <Card className={'border-0 shadow-sm'}>
        <CardContent className={'pt-6'}>
            <div className={'flex items-center gap-4'}>
                <div className={cn(
                    'size-12 shrink-0 flex--center rounded-xl',
                    iconBg
                )}>
                    {icon}
                </div>
                <div>
                    <p className={'label-uppercase text-muted-foreground'}>
                        {label}
                    </p>
                    <p className={'text-2xl font-bold text-foreground'}>
                        {value}
                        {subValue
                            && <span className={'text-lg font-normal text-muted-foreground'}>
                                {subValue}
                            </span>}
                    </p>
                    <p className={cn(
                        'text-sm',
                        descriptionColor || 'text-muted-foreground'
                    )}>
                        {description}
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
)
