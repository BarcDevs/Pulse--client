import { ChartSeries } from './TrendChart'

type PayloadItem = {
    name?: string | number
    value?: string | number | readonly (string | number)[]
    color?: string
}

type ChartTooltipProps = {
    active?: boolean
    payload?: readonly PayloadItem[]
    label?: string | number
    series: ChartSeries[]
    noDataLabel: string
}

const tooltipStyle = {
    backgroundColor: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: 12
}

export const ChartTooltip = ({
    active,
    payload,
    label,
    series,
    noDataLabel
}: ChartTooltipProps) => {
    if (!active) return null

    const realItems = (payload ?? []).filter(p => {
        const name = String(p.name)
        return !name.startsWith('_bridge_') && name !== '__hover'
    })
    const hasData = realItems.some(p => p.value !== null
        && p.value !== undefined && p.value !== '')

    return (
        <div style={tooltipStyle}>
            <p style={{
                color: 'var(--muted-foreground)',
                marginBottom: hasData ? 4 : 0
            }}>
                {label}
            </p>
            {hasData
                ? realItems.map(item => {
                    const s = series.find(s => s.dataKey === String(item.name))
                    return (
                        <p key={String(item.name)} style={{ color: s?.color ?? item.color }}>
                            {`${s?.label ?? item.name}: ${item.value}`}
                        </p>
                    )
                })
                : <p style={{ color: 'var(--muted-foreground)' }}>
                    {noDataLabel}
                </p>
            }
        </div>
    )
}
