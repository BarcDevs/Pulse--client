import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'

const chartBarHeights = [
    { key: 'bar-1', height: 'h-24' },
    { key: 'bar-2', height: 'h-36' },
    { key: 'bar-3', height: 'h-32' },
    { key: 'bar-4', height: 'h-44' },
    { key: 'bar-5', height: 'h-24' },
    { key: 'bar-6', height: 'h-40' },
    { key: 'bar-7', height: 'h-36' }
]

export const HistoryChartSkeleton = () => (
    <div className={'flex items-end gap-2 h-60'}>
        {chartBarHeights.map(({ key, height }) => (
            <Skeleton
                key={key}
                className={cn(
                    'flex-1 rounded-t-sm rounded-b-none',
                    height
                )}
            />
        ))}
    </div>
)
