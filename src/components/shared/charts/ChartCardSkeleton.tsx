import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'

const barHeights = [
    { key: 'bar-1', height: 'h-28' },
    { key: 'bar-2', height: 'h-40' },
    { key: 'bar-3', height: 'h-36' },
    { key: 'bar-4', height: 'h-48' },
    { key: 'bar-5', height: 'h-28' },
    { key: 'bar-6', height: 'h-44' },
    { key: 'bar-7', height: 'h-32' }
]

export const ChartCardSkeleton = () => (
    <div className={'h-60 flex items-end gap-2'}>
        {barHeights.map(({ key, height }) => (
            <Skeleton
                key={key}
                className={cn('flex-1 rounded-t-sm rounded-b-none', height)}
            />
        ))}
    </div>
)
