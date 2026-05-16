import { TrendData } from '@/lib/stats/getTrendLabel'
import { cn } from '@/lib/utils'

type WellnessScoreCardProps = {
    label: string
    score: number | string
    trend: TrendData
    trendLabel: string
}

export const WellnessScoreCard = ({
    label,
    score,
    trend,
    trendLabel
}: WellnessScoreCardProps) => {
    const Icon = trend.icon

    return (
        <div>
            <p className={'text-xs text-muted-foreground uppercase'}>
                {label}
            </p>
            <div className={'flex items-baseline gap-1 mt-1'}>
                <span className={'text-2xl font-bold text-foreground'}>
                    {typeof score === 'string'
                        ? score
                        : score.toFixed(1)}
                </span>
                <span className={'text-muted-foreground'}>
                    / 10
                </span>
            </div>
            <div className={cn(
                'flex items-center gap-1 mt-1 text-sm',
                trend.color
            )}>
                <Icon className={'h-3 w-3'}/>
                {trendLabel}
            </div>
        </div>
    )
}
