import { Skeleton } from '@/components/ui/skeleton'

export const ActiveGoalsSkeleton = () => (
    <div className={'space-y-4'}>
        {[0, 1, 2].map((n) => (
            <div key={n} className={'space-y-1.5'}>
                <Skeleton className={'h-4 w-32 bg-white/20'}/>
                <Skeleton className={'h-2 w-full rounded-full bg-white/20'}/>
            </div>
        ))}
    </div>
)
