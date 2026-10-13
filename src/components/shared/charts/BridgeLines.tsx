import { Line } from 'recharts'

import type { BridgeKey } from '@/types/chart'

type BridgeLinesProps = {
    bridgeKeys: BridgeKey[]
}

export const BridgeLines = ({
    bridgeKeys
}: BridgeLinesProps) => (
    <>
        {bridgeKeys.map(b => (
            <Line
                key={b.key}
                type={'monotone'}
                dataKey={b.key}
                stroke={b.color}
                strokeDasharray={'4 4'}
                strokeWidth={2}
                strokeOpacity={0.2}
                connectNulls={true}
                dot={false}
                activeDot={false}
                legendType={'none'}
                isAnimationActive={false}
            />
        ))}
    </>
)
