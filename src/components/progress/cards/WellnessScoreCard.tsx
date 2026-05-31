import type { LucideIcon } from 'lucide-react'

import type { TrendData } from '@/lib/stats/getTrendLabel'

type WellnessScoreCardProps = {
    label: string
    score: number | string
    trend: TrendData
    trendLabel: string
    icon: LucideIcon
    color: string
}

export const WellnessScoreCard = ({
    label,
    score,
    trend,
    trendLabel,
    icon: Icon,
    color
}: WellnessScoreCardProps) => {
    const TrendIcon = trend.icon

    return (
        <div>
            <div className={'flex items-center gap-1.5 mb-1'}>
                <Icon
                    className={'h-3.5 w-3.5'}
                    style={{ color }}
                />
                <p className={'text-xs text-muted-foreground uppercase'}>
                    {label}
                </p>
            </div>
            <div className={'flex items-baseline gap-1'}>
                <span className={'text-2xl font-bold text-foreground'}>
                    {typeof score === 'string'
                        ? score
                        : score.toFixed(1)}
                </span>
                <span className={'text-muted-foreground'}>
                    / 10
                </span>
            </div>
            <div
                className={'flex items-center gap-1 mt-1 text-sm'}
                style={{ color }}
            >
                <TrendIcon className={'h-3 w-3'}/>
                {trendLabel}
            </div>
        </div>
    )
}
