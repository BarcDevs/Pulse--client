import { Skeleton } from '@/components/ui/skeleton'

export const TodaysFocusSkeletons = () => (
    <>
        <Skeleton className={'h-7 w-3/4 mb-3'}/>
        <Skeleton className={'h-7 w-1/2 mb-6'}/>
        <Skeleton className={'h-4 w-full'}/>
    </>
)
