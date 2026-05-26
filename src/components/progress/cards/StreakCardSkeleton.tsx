import { Skeleton } from '@/components/ui/skeleton'

export const StreakCardSkeleton = () => (
    <div className={'card-base'}>
        <div className={'flex-start-between'}>
            <div>
                <Skeleton className={'h-3 w-16'}/>
                <div className={'mt-2 flex items-baseline gap-2'}>
                    <Skeleton className={'h-10 w-12'}/>
                    <Skeleton className={'h-5 w-8'}/>
                </div>
                <Skeleton className={'mt-1 h-4 w-24'}/>
            </div>
            <Skeleton className={'h-12 w-12 rounded-xl'}/>
        </div>
    </div>
)
