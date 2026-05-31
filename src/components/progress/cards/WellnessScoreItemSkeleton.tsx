import { Skeleton } from '@/components/ui/skeleton'

const WellnessScoreItemSkeleton = () => (
    <div>
        <Skeleton className={'h-3 w-12'}/>
        <div className={'flex items-baseline gap-1 mt-1'}>
            <Skeleton className={'h-8 w-12'}/>
            <Skeleton className={'h-4 w-8'}/>
        </div>
        <Skeleton className={'mt-1 h-4 w-16'}/>
    </div>
)

export { WellnessScoreItemSkeleton }
