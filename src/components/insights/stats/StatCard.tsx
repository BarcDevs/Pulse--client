import { cn } from '@/lib/utils'

import {
    getTrendIcon,
    parseTrendText
} from '../utils/trendUtils'

type StatCardProps = {
    label: string
    value: string
    trend: string
    description: string
    trendColor: string
}

export const StatCard = ({
    label,
    value,
    trend,
    description,
    trendColor
}: StatCardProps) => {
    const { iconName, text } = parseTrendText(trend)

    return (
        <div className={'rounded-xl bg-surface-section p-4'}>
            <p className={'text-xs font-medium uppercase tracking-wider text-muted-foreground'}>
                {label}
            </p>
            <div className={'mt-2 flex items-baseline gap-2'}>
                <span className={'text-2xl font-bold text-foreground'}>
                    {value}
                </span>
                <span className={cn(
                    'text-sm flex items-center gap-1',
                    trendColor
                )}>
                    {getTrendIcon(iconName)}
                    {text}
                </span>
            </div>
            <p className={'mt-1 text-sm text-muted-foreground'}>
                {description}
            </p>
        </div>
    )
}
