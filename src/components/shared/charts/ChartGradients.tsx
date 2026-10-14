import type { ChartSeries } from '@/types/chart'

type ChartGradientsProps = {
    series: ChartSeries[]
}

export const ChartGradients = ({
    series
}: ChartGradientsProps) => (
    <defs>
        {series.filter(s => !s.dashed).map(s => (
            <linearGradient
                key={s.gradientId}
                id={s.gradientId}
                x1={'0'}
                y1={'0'}
                x2={'0'}
                y2={'1'}
            >
                <stop
                    offset={'5%'}
                    stopColor={s.fillColor ?? s.color}
                    stopOpacity={0.9}
                />
                <stop
                    offset={'95%'}
                    stopColor={s.fillColor ?? s.color}
                    stopOpacity={0}
                />
            </linearGradient>
        ))}
    </defs>
)
