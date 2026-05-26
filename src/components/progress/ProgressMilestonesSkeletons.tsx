import { Skeleton } from '@/components/ui/skeleton'

type ProgressMilestonesSkeletonsProps = {
    count?: number
}

const ProgressGoalCardSkeleton = () => (
    <div className={'flex flex-col gap-3 rounded-xl bg-surface-section p-5'}>
        <Skeleton className={'h-5 w-20 rounded-full'}/>
        <Skeleton className={'h-4 w-full'}/>
        <Skeleton className={'h-4 w-3/4'}/>
        <div className={'mt-auto space-y-1.5'}>
            <div className={'flex justify-between'}>
                <Skeleton className={'h-3 w-16'}/>
                <Skeleton className={'h-3 w-8'}/>
            </div>
            <Skeleton className={'h-1.5 w-full rounded-full'}/>
        </div>
    </div>
)

export const ProgressMilestonesSkeletons = ({
    count = 4
}: ProgressMilestonesSkeletonsProps) => (
    <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
        {Array.from({ length: count }, (_, i) => (
            <ProgressGoalCardSkeleton key={`milestone-${i}`}/>
        ))}
    </div>
)
