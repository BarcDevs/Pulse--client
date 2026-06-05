import { Skeleton } from '@/components/ui/skeleton'

export const GoalPageSkeletons = () => (
    <>
        <Skeleton className={'h-12 w-64'}/>
        <Skeleton className={'h-64 rounded-xl mt-8'}/>
        <div className={'space-y-4 mt-8'}>
            {[...Array(3)].map((_, i) => (
                <Skeleton
                    key={`skeleton-${i}`}
                    className={'h-40'}
                />
            ))}
        </div>
    </>
)
