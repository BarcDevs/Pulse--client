export type HeaderConfig = {
    title: string
    subtitle: string
}

export type StyleConfig = {
    color: string
    gradientId: string
}

export type LegendConfig = {
    label: string
    targetLabel?: string
}

export type ChartConfigBase = {
    dataKey: string
    targetKey?: string
}

export type ChartConfig = ChartConfigBase & {
    data: Array<Record<string, unknown>>
}
