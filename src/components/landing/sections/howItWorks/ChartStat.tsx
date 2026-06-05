import { cn } from '@/lib/utils'

type ChartStatProps = {
    label: string
    value: string
    highlight?: boolean
}

export const ChartStat = ({
    label,
    value,
    highlight
}: ChartStatProps) => (
    <div>
        <p className={cn(
            'text-xl font-bold',
            highlight ? 'text-chart-highlight' : 'text-white'
        )}>
            {value}
        </p>
        <p className={'mt-0.5 text-xs uppercase tracking-widest text-white/40'}>
            {label}
        </p>
    </div>
)
