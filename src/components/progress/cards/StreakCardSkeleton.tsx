import { Skeleton } from '@/components/ui/skeleton'

export const StreakCardSkeleton = () => (
    <div className={'card-base'}>
        <div className={'flex-start-between mb-3'}>
            <div>
                <Skeleton className={'h-3 w-20'}/>
                <div className={'mt-2 flex items-baseline gap-2'}>
                    <Skeleton className={'h-10 w-12'}/>
                    <Skeleton className={'h-5 w-8'}/>
                </div>
            </div>
            <Skeleton className={'h-12 w-12 rounded-xl'}/>
        </div>
        <div className={'flex-center-between mb-2'}>
            <Skeleton className={'h-3 w-20'}/>
            <Skeleton className={'h-3 w-16'}/>
        </div>
        <div className={'flex items-end gap-1'}>
            {Array.from({ length: 14 }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={'flex-1 h-6 rounded-sm'}
                />
            ))}
        </div>
        <div className={'mt-3 pt-3 border-t border-border flex-center-between'}>
            <Skeleton className={'h-4 w-24'}/>
            <Skeleton className={'h-4 w-12'}/>
        </div>
    </div>
)
