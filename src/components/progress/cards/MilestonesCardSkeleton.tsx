import { Skeleton } from '@/components/ui/skeleton'

export const MilestonesCardSkeleton = () => (
    <div className={'card-base'}>
        <div className={'flex-start-between'}>
            <div>
                <Skeleton className={'h-3 w-20'}/>
                <div className={'mt-2 flex items-baseline gap-2'}>
                    <Skeleton className={'h-10 w-12'}/>
                    <Skeleton className={'h-5 w-14'}/>
                </div>
            </div>
            <Skeleton className={'h-12 w-12 rounded-xl'}/>
        </div>
    </div>
)
