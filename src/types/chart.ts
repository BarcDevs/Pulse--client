export type ChartSeries = {
    dataKey: string
    color: string
    fillColor?: string
    label: string
    gradientId: string
    dashed?: boolean
}

export type ChartRow = Record<string, unknown>

export type BridgeKey = {
    key: string
    color: string
}

export type NoDataRange = {
    x1: string
    x2: string
}
