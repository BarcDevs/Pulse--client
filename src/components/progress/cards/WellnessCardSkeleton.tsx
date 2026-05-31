import { Skeleton } from '@/components/ui/skeleton'

import { WellnessScoreItemSkeleton } from './WellnessScoreItemSkeleton'

const WellnessCardSkeleton = () => (
    <div className={'card-base'}>
        <div className={'flex-center-between mb-4'}>
            <div>
                <Skeleton className={'h-3 w-20'}/>
                <Skeleton className={'mt-1 h-7 w-36'}/>
            </div>
            <Skeleton className={'h-4 w-16'}/>
        </div>
        <div className={'grid grid-cols-2 gap-4'}>
            <WellnessScoreItemSkeleton/>
            <WellnessScoreItemSkeleton/>
        </div>
    </div>
)

export { WellnessCardSkeleton }
