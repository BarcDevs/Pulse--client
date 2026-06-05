import { Skeleton } from '@/components/ui/skeleton'

export const MilestonesCardSkeleton = () => (
    <div className={'card-base'}>
        <div className={'flex-start-between mb-3'}>
            <div>
                <Skeleton className={'h-3 w-24'}/>
                <div className={'mt-2 flex items-baseline gap-2'}>
                    <Skeleton className={'h-10 w-12'}/>
                    <Skeleton className={'h-5 w-10'}/>
                </div>
            </div>
            <Skeleton className={'h-12 w-12 rounded-xl'}/>
        </div>
        <div className={'flex-center-between mb-2'}>
            <Skeleton className={'h-3 w-28'}/>
            <Skeleton className={'h-3 w-16'}/>
        </div>
        <Skeleton className={'h-2 w-full rounded-full mb-3'}/>
        <div className={'flex items-center gap-4 mb-3'}>
            <Skeleton className={'h-3 w-14'}/>
            <Skeleton className={'h-3 w-16'}/>
            <Skeleton className={'h-3 w-16'}/>
        </div>
        <div className={'pt-3 border-t border-border flex-center-between'}>
            <Skeleton className={'h-4 w-16'}/>
            <Skeleton className={'h-4 w-28'}/>
        </div>
    </div>
)
