import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'

const pillWidths = [
    { key: 'pill-1', width: 'w-20' },
    { key: 'pill-2', width: 'w-24' },
    { key: 'pill-3', width: 'w-16' },
    { key: 'pill-4', width: 'w-24' },
    { key: 'pill-5', width: 'w-20' }
]

export const TrendingTopicsSkeletons = () => (
    <div className={'flex flex-wrap gap-2'}>
        {pillWidths.map(({ key, width }) => (
            <Skeleton
                key={key}
                className={cn('h-8 rounded-full', width)}
            />
        ))}
    </div>
)
