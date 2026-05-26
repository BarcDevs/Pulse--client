import { Skeleton } from '@/components/ui/skeleton'

const GoalCardSkeleton = () => (
    <div className={'p-6 rounded-xl bg-surface-container-lowest space-y-4'}>
        <div className={'flex justify-between items-start'}>
            <Skeleton className={'h-6 w-20 rounded-full'}/>
            <Skeleton className={'h-8 w-8 rounded-md'}/>
        </div>
        <Skeleton className={'h-6 w-2/3'}/>
        <div className={'space-y-2'}>
            <Skeleton className={'h-4 w-full'}/>
            <Skeleton className={'h-4 w-3/4'}/>
        </div>
        <div className={'space-y-2 pt-2'}>
            <div className={'flex justify-between'}>
                <Skeleton className={'h-3 w-16'}/>
                <Skeleton className={'h-3 w-8'}/>
            </div>
            <Skeleton className={'h-2 w-full rounded-full'}/>
        </div>
    </div>
)

const GoalsSidebarSkeleton = () => (
    <div className={'space-y-6'}>
        <div className={'bg-surface-card p-6 rounded-xl shadow-sm border border-border space-y-4'}>
            <div className={'flex items-center gap-2'}>
                <Skeleton className={'h-5 w-5 rounded-full'}/>
                <Skeleton className={'h-5 w-32'}/>
            </div>
            <div className={'space-y-3'}>
                <Skeleton className={'h-16 rounded-lg'}/>
                <Skeleton className={'h-16 rounded-lg'}/>
            </div>
        </div>
        <div className={'bg-surface-card p-6 rounded-xl shadow-sm border border-border space-y-3'}>
            <Skeleton className={'h-4 w-28'}/>
            <div className={'flex justify-between'}>
                <Skeleton className={'h-4 w-36'}/>
                <Skeleton className={'h-4 w-8'}/>
            </div>
        </div>
    </div>
)

export const RecoveryGoalsSkeletons = () => (
    <div className={'grid grid-cols-1 lg:grid-cols-12 gap-8'}>
        <div className={'lg:col-span-8 space-y-6'}>
            {[0, 1, 2].map((n) => (
                <GoalCardSkeleton key={n}/>
            ))}
        </div>
        <div className={'lg:col-span-4'}>
            <GoalsSidebarSkeleton/>
        </div>
    </div>
)
