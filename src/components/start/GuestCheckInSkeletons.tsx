import { Skeleton } from '@/components/ui/skeleton'

export const GuestCheckInSkeletons = () => (
    <div
        aria-busy={true}
        className={'flex flex-col gap-4'}
    >
        <div className={'grid gap-2.5'}>
            <Skeleton className={'h-7.5 w-3/5'}/>
            <Skeleton className={'h-4 w-4/5'}/>
        </div>
        <div className={'grid gap-5 rounded-2xl bg-card p-5 shadow-sm'}>
            <Skeleton className={'h-22'}/>
            <Skeleton className={'h-22'}/>
            <Skeleton className={'h-12'}/>
        </div>
        <Skeleton className={'h-13 rounded-[10px]'}/>
    </div>
)
