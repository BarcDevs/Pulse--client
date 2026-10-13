import { ReferenceArea } from 'recharts'

import type { NoDataRange } from '@/types/chart'

type NoDataAreasProps = {
    ranges: NoDataRange[]
}

export const NoDataAreas = ({
    ranges
}: NoDataAreasProps) => (
    <>
        {ranges.map(range => (
            <ReferenceArea
                key={`${range.x1}-${range.x2}`}
                x1={range.x1}
                x2={range.x2}
                fill={'var(--muted-foreground)'}
                fillOpacity={0.15}
                ifOverflow={'visible'}
            />
        ))}
    </>
)
