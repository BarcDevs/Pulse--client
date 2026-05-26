import { Skeleton } from '@/components/ui/skeleton'

const WellnessScoreCardSkeleton = () => (
    <div>
        <Skeleton className={'h-3 w-12'}/>
        <div className={'flex items-baseline gap-1 mt-1'}>
            <Skeleton className={'h-8 w-12'}/>
            <Skeleton className={'h-4 w-8'}/>
        </div>
        <Skeleton className={'mt-1 h-4 w-16'}/>
    </div>
)

export const WellnessScoreSkeleton = () => (
    <div className={'card-base'}>
        <div className={'flex-center-between mb-4'}>
            <div>
                <Skeleton className={'h-3 w-20'}/>
                <Skeleton className={'mt-1 h-7 w-36'}/>
            </div>
            <Skeleton className={'h-4 w-16'}/>
        </div>
        <div className={'grid grid-cols-2 gap-4'}>
            <WellnessScoreCardSkeleton/>
            <WellnessScoreCardSkeleton/>
        </div>
    </div>
)
