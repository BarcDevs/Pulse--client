'use client'

import { LucideIcon } from 'lucide-react'

type InsightItemProps = {
    icon: LucideIcon
    label: string
    title: string
    description: string
    iconBgColor: string
    iconColor: string
    labelColor: string
}

export const InsightItem = ({
    icon: Icon,
    label,
    title,
    description,
    iconBgColor,
    iconColor,
    labelColor,
}: InsightItemProps) => (
    <div className={'flex gap-3'}>
        <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${iconBgColor}`}>
            <Icon className={`size-4 ${iconColor}`} />
        </div>
        <div>
            <p className={`text-xs font-medium uppercase ${labelColor}`}>
                {label}
            </p>
            <p className={'text-sm font-semibold text-foreground'}>
                {title}
            </p>
            <p className={'text-xs text-muted-foreground'}>
                {description}
            </p>
        </div>
    </div>
)