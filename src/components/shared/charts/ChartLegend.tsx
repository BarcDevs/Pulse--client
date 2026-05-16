import { ChartSeries } from './TrendChart'

type ChartLegendProps = {
    series: Pick<
        ChartSeries,
        'color' | 'label' | 'dashed'
    >[]
}

export const ChartLegend = ({
    series
}: ChartLegendProps) => (
    <div className={'flex items-center gap-6'}>
        {series.map(s => (
            <div
                key={s.label}
                className={'flex items-center gap-2'}
            >
                {s.dashed ? (
                    <div className={'h-0.5 w-4 border-t-2 border-dashed border-muted-foreground'}/>
                ) : (
                    <div
                        className={'size-3 rounded-full'}
                        style={{ backgroundColor: s.color }}
                    />
                )}
                <span className={'text-sm text-muted-foreground'}>
                    {s.label}
                </span>
            </div>
        ))}
    </div>
)
