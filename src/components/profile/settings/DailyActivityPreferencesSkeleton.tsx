import { Skeleton } from '@/components/ui/skeleton'

export const DailyActivityPreferencesSkeleton = () => (
    <div className={'flex flex-wrap gap-3'}>
        {[80, 120, 96, 110, 88].map((w) => (
            <Skeleton
                key={w}
                className={'h-9 rounded-full'}
                style={{ width: w }}
            />
        ))}
    </div>
)
