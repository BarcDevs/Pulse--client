import {
    Minus,
    TrendingDown,
    TrendingUp
} from 'lucide-react'

import { TrendData } from '@/lib/stats/getTrendLabel'

type WellnessScoreCardProps = {
    label: string
    score: number
    trend: TrendData
}

const getTrendIcon = (
    iconType: 'up' | 'down' | 'flat'
) => {
    switch (iconType) {
        case 'up':
            return <TrendingUp className={'h-3 w-3'}/>
        case 'down':
            return <TrendingDown className={'h-3 w-3'}/>
        case 'flat':
            return <Minus className={'h-3 w-3'}/>
    }
}

export const WellnessScoreCard = ({
    label,
    score,
    trend
}: WellnessScoreCardProps) => (
    <div>
        <p className={'text-xs text-muted-foreground uppercase'}>
            {label}
        </p>
        <div className={'flex items-baseline gap-1 mt-1'}>
            <span className={'text-2xl font-bold text-foreground'}>
                {score.toFixed(1)}
            </span>
            <span className={'text-muted-foreground'}>
                / 10
            </span>
        </div>
        <div className={`flex items-center gap-1 mt-1 text-sm ${trend.color}`}>
            {getTrendIcon(trend.icon)}
            {trend.label}
        </div>
    </div>
)
