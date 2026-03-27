import {TrendingUp} from 'lucide-react'

type WellnessScoreCardProps = {
    label: string
    score: number
    trend: string
}

export const WellnessScoreCard = ({
    label,
    score,
    trend,
}: WellnessScoreCardProps) => (
    <div>
        <p className={'text-xs text-muted-foreground uppercase'}>
            {label}
        </p>
        <div className={'flex items-baseline gap-1 mt-1'}>
            <span className={'text-2xl font-bold text-foreground'}>
                {score}
            </span>
            <span className={'text-muted-foreground'}>
                / 10
            </span>
        </div>
        <div className={'flex items-center gap-1 mt-1 text-secondary text-sm'}>
            <TrendingUp className={'h-3 w-3'}/>
            {trend}
        </div>
    </div>
)
