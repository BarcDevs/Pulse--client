type ChartLegendProps = {
    color: string
    legendLabel: string
    targetKey?: string
    targetLabel?: string
}

export const ChartLegend = ({
    color,
    legendLabel,
    targetKey,
    targetLabel = 'Weekly Target'
}: ChartLegendProps) => (
    <div className={'mt-4 flex items-center gap-6'}>
        <div className={'flex items-center gap-2'}>
            <div
                className={'size-3 rounded-full'}
                style={{ backgroundColor: color }}
            />
            <span className={'text-sm text-muted-foreground'}>
                {legendLabel}
            </span>
        </div>
        {targetKey && (
            <div className={'flex items-center gap-2'}>
                <div className={'h-0.5 w-4 border-t-2 border-dashed border-muted-foreground'}/>
                <span className={'text-sm text-muted-foreground'}>
                    {targetLabel}
                </span>
            </div>
        )}
    </div>
)
